import React, { useEffect, useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import { Box, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ScatterPlot = ({ data }) => {
  const ref = useRef();
  const [x, setX] = React.useState('CP_edadmaterna');
  const [y, setY] = React.useState('CSP_EmbarazoDeseado');
  const [mappedData, setMappedData] = useState(data);

  useEffect(() => {
    const newMappedData = data.map((d) => {
      return {
        x: parseInt(d[x], 10),
        y: parseInt(d[y], 10),
      };
    });
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
      <Scatter
        ref={ref}
        datasetIdKey="id"
        data={{
          datasets: [
            {
              label: `${x} vs ${y}`,
              data: mappedData,
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        }}
        // backgroundColor="rgba(255, 99, 132, 1)"
        options={{
          legend: {
            display: false,
          },
          // title: { display: true, text: 'My Chart' },
          responsive: true,
        }}
      />
    </div>
  );
};

export default ScatterPlot;
