import React from 'react';
import Plot from 'react-plotly.js';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LineChart = ({ data }) => {
  const [variable, setVariable] = React.useState('peso');

  const pesoDataset = data.map((d, idx) => {
    const nacimiento =
      d['ERN_Peso'] === '#NULL!' ? 0 : parseInt(d['ERN_Peso'], 10);
    const hospNeonatal =
      d['HD_PesoSalida'] === '#NULL!' ? 0 : parseInt(d['HD_PesoSalida'], 10);
    const entrada = d['V196A'] === '#NULL!' ? 0 : parseInt(d['V196A'], 10);
    const sem40 = d['V218'] === '#NULL!' ? 0 : parseInt(d['V218'], 10);
    const mes3 = d['V261'] === '#NULL!' ? 0 : parseInt(d['V261'], 10);
    const mes6 = d['V304'] === '#NULL!' ? 0 : parseInt(d['V304'], 10);
    const mes9 = d['V347'] === '#NULL!' ? 0 : parseInt(d['V347'], 10);
    const mes12 = d['V389'] === '#NULL!' ? 0 : parseInt(d['V389'], 10);

    return {
      x: [
        'nacimiento',
        'hospNeonatal',
        'entrada',
        'sem40',
        'mes3',
        'mes6',
        'mes9',
        'mes12',
      ],
      y: [nacimiento, hospNeonatal, entrada, sem40, mes3, mes6, mes9, mes12],
      type: 'scatter',
      mode: 'lines+markers',
      // marker: { color: 'red' },
    };
  });

  const tallaDataset = data.map((d, idx) => {
    const nacimiento =
      d['ERN_Talla'] === '#NULL!' ? 0 : parseInt(d['ERN_Talla'], 10);
    const entrada = d['V196B'] === '#NULL!' ? 0 : parseInt(d['V196B'], 10);
    const sem40 = d['V219'] === '#NULL!' ? 0 : parseInt(d['V219'], 10);
    const mes3 = d['V262'] === '#NULL!' ? 0 : parseInt(d['V262'], 10);
    const mes6 = d['V305'] === '#NULL!' ? 0 : parseInt(d['V305'], 10);
    const mes9 = d['V348'] === '#NULL!' ? 0 : parseInt(d['V348'], 10);
    const mes12 = d['V390'] === '#NULL!' ? 0 : parseInt(d['V390'], 10);

    return {
      x: ['nacimiento', 'entrada', 'sem40', 'mes3', 'mes6', 'mes9', 'mes12'],
      y: [nacimiento, entrada, sem40, mes3, mes6, mes9, mes12],
      type: 'scatter',
      mode: 'lines+markers',
    };
  });

  const handleChange = (event) => {
    setVariable(event.target.value);
  };

  return (
    <div style={{ paddingTop: 12 }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            width: '40%',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">variable</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={variable}
              label="Variable"
              onChange={handleChange}
            >
              <MenuItem value={'peso'}>peso</MenuItem>
              <MenuItem value={'talla'}>talla</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <Plot
        data={variable === 'peso' ? pesoDataset : tallaDataset}
        style={{ width: '100%' }}
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
      />
    </div>
  );
};

export default LineChart;
