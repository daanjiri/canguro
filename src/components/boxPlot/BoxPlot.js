import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BoxPlot = ({ data }) => {
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
    const newMappedData = selected.map((variable) => {
      const newBoxData = data.map((d) => parseInt(d[variable], 10));
      return {
        y: newBoxData,
        type: 'box',
      };
    });
    setMappedData(newMappedData);
  }, [selected, data]);

  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
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
      <div style={{}}>
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
            // height: '300',
            // width: '100%',
          }}
          data={mappedData}
          //   config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default BoxPlot;
