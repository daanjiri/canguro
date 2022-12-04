import React,{ useEffect, useState, useRef } from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const LineChart = ({data}) => {
  const ref = useRef();
  const [variable, setVariable] = React.useState('peso');
  
  const pesoDataset = data.map((d,idx)=>{

    const nacimiento = d['ERN_Peso'] === '#NULL!'?0: parseInt(d['ERN_Peso'],10)
    const hospNeonatal = d['HD_PesoSalida'] === '#NULL!'?0:parseInt(d['HD_PesoSalida'],10)
    const entrada =d['V196A'] === '#NULL!'?0:parseInt(d['V196A'],10)
    const sem40 = d['V218']=== '#NULL!'?0:parseInt(d['V218'],10)
    const mes3 = d['V261']=== '#NULL!'?0:parseInt(d['V261'],10)
    const mes6 = d['V304']=== '#NULL!'?0:parseInt(d['V304'],10)
    const mes9 = d['V347']=== '#NULL!'?0:parseInt(d['V347'],10)
    const mes12 = d['V389']=== '#NULL!'?0:parseInt(d['V389'],10)

    return(
      {
        id:d['@_id'],
        label:`paciente:${d['@_id']} `,
        data:[nacimiento,hospNeonatal,entrada,sem40,mes3,mes6,mes9,mes12]
      }
    )
  })

  const tallaDataset = data.map((d,idx)=>{

    const nacimiento = d['ERN_Talla'] === '#NULL!'?0: parseInt(d['ERN_Talla'],10)
    const entrada = d['V196B'] === '#NULL!'?0:parseInt(d['V196B'],10)
    const sem40 = d['V219']=== '#NULL!'?0:parseInt(d['V219'],10)
    const mes3 = d['V262']=== '#NULL!'?0:parseInt(d['V262'],10)
    const mes6 = d['V305']=== '#NULL!'?0:parseInt(d['V305'],10)
    const mes9 = d['V348']=== '#NULL!'?0:parseInt(d['V348'],10)
    const mes12 = d['V390']=== '#NULL!'?0:parseInt(d['V390'],10)

    return(
      {
        id:d['@_id'],
        label:`paciente:${d['@_id']} `,
        data:[nacimiento,entrada,sem40,mes3,mes6,mes9,mes12]
      }
    )
  })

  const handleChange = (event) => {
    setVariable(event.target.value);
  };

  return (
    <div style={{width: '40vw', paddingTop:50}}>
      <Box sx={{ width: '40%' }}>
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
      <Line ref={ref}
      datasetIdKey='id'
      data={{
        labels: variable ==='peso'?
        ['nacimiento','hospNeonatal','entrada','sem40','mes3','mes6','mes9','mes12']:
        ['nacimiento','entrada','sem40','mes3','mes6','mes9','mes12'],
        datasets: variable ==='peso'? pesoDataset: tallaDataset,
      }}
      options={{
        legend: {
          display: false
       },
        // title: { display: true, text: 'My Chart' },
        responsive:true,
      }}
      />
    </div>
  )
}

export default LineChart