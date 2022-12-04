import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import dataCSV from './data_short.csv';
import LineChart from './components/Linechart/LineChart';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


const App=()=> {

const [data, setData] = useState([])

  useEffect(() => {
   d3.csv(dataCSV).then((d) => {
    setData(d);
    // console.log(d)
  });
  }, [])
  
 
  // console.log(data)
  return (
    <div >
      <div> <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /> sexo1</div>
   
      <LineChart data={data}/>
      {/* {data.map((d)=><div>{d['@_id']}</div>)} */}
    </div>
  );
}

export default App;
