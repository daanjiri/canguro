import React, { useEffect, useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import { Box, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Plot from 'react-plotly.js';

const ScatterPlot = ({ data }) => {
  const [x, setX] = React.useState('CP_edadmaterna');
  const [y, setY] = React.useState('CSP_EmbarazoDeseado');
  const [mappedData, setMappedData] = useState(data);

  useEffect(() => {
    const arrayX = data.map((d) => parseInt(d[x], 10));
    const arrayY = data.map((d) => parseInt(d[y], 10));
    const newMappedData = [
      {
        x: arrayX,
        y: arrayY,
        mode: 'markers',
        type: 'scatter',
      },
    ];
    setMappedData(newMappedData);
  }, [x, y, data]);

  const handleChangeX = (event) => {
    setX(event.target.value);
  };
  const handleChangeY = (event) => {
    setY(event.target.value);
  };

  return (
    <div style={{ paddingTop: 12 }}>
      <Grid container display="flex" spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="varx">var y</InputLabel>
            <Select
              labelId="varx"
              id="demo-simple-select"
              value={x}
              label="Var x"
              onChange={handleChangeX}
            >
              <MenuItem value={'CP_edadmaterna'}>CP_edadmaterna</MenuItem>
              <MenuItem value={'CSP_EmbarazoDeseado'}>
                CSP_EmbarazoDeseado
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="vary">var y</InputLabel>
            <Select
              labelId="vary"
              id="demo-simple-select"
              value={y}
              label="Var y"
              onChange={handleChangeY}
            >
              <MenuItem value={'CP_edadmaterna'}>CP_edadmaterna</MenuItem>
              <MenuItem value={'CSP_EmbarazoDeseado'}>
                CSP_EmbarazoDeseado
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Plot
        data={mappedData}
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
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default ScatterPlot;
