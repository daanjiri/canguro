import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const normalizeData = (data, selectedVariables) => {
  let normalizeData = [];
  const filteredData = data.map((d) => {
    const obj = {};
    selectedVariables.forEach((variable) => {
      obj[variable] = parseInt(d[variable], 10);
    });
    return obj;
  });
  console.log('filteredData', filteredData);

  if (filteredData.length > 0) {
    const minMaxsObj = {};
    selectedVariables.forEach((variable) => {
      const max = Math.max(
        ...filteredData.map((d) => parseInt(d[variable], 10))
      );
      const min = Math.min(
        ...filteredData.map((d) => parseInt(d[variable], 10))
      );
      minMaxsObj[variable] = {
        max,
        min,
      };
    });
    console.log('minMaxsObj', minMaxsObj);

    normalizeData = filteredData.map((d) => {
      const normObj = {};
      Object.keys(d).forEach((key) => {
        normObj[key] = (d[key] * 100) / minMaxsObj[key].max;
      });
      return normObj;
    });
  }

  return normalizeData;
};

const RadarPlot = ({ data }) => {
  const [mappedData, setMappedData] = useState(data);
  const variables = ['CP_edadmaterna', 'CSP_EmbarazoDeseado', 'ERN_Peso'];
  const [selected, setSelected] = useState(variables);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const nomData = normalizeData(data, selected);

    const newMappedData = nomData.map((d) => {
      const radarArray = selected.map((variable) => parseInt(d[variable], 10));
      console.log('radarArray', radarArray);
      return {
        type: 'scatterpolar',
        r: radarArray,
        theta: selected,
        fill: 'toself',
      };
    });

    setMappedData(newMappedData);
  }, [selected, data]);

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selected}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
          >
            {variables.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Plot
        layout={{
          title: false,
          margin: {
            l: 24,
            r: 24,
            b: 24,
            t: 24,
            pad: 4,
          },
        }}
        data={mappedData}
        style={{ heigh: '100%' }}
      />
    </div>
  );
};

export default RadarPlot;
