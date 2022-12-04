import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import dataCSV from './data_short.csv';
import LineChart from './components/LineChart';



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
      <LineChart data={data}/>
      {/* {data.map((d)=><div>{d['@_id']}</div>)} */}
    </div>
  );
}

export default App;
