import React, { useEffect, useState, useReducer } from 'react';
import * as d3 from 'd3';
import dataCSV from './data_short.csv';
import LineChart from './components/Linechart/LineChart';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const SEXO_1 = 'sexo1';
const SEXO_2 = 'sexo2';
const SEXO_3 = 'sexo3';

const initialCheckBoxesStates = {
  sexo1: true,
  sexo2: true,
  sexo3: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEXO_1:
      return {
        ...state,
        sexo1: !state[SEXO_1],
      };
    case SEXO_2:
      return {
        ...state,
        sexo2: !state[SEXO_2],
      };
    default:
      return {
        ...state,
        sexo3: !state[SEXO_3],
      };
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sexo, dispatch] = useReducer(reducer, initialCheckBoxesStates);

  const onChangeSexo = (sexo) => {
    if (sexo === SEXO_1) {
      dispatch({ type: SEXO_1 });
    } else if (sexo === SEXO_2) {
      dispatch({ type: SEXO_2 });
    } else {
      dispatch({ type: SEXO_3 });
    }
  };

  useEffect(() => {
    d3.csv(dataCSV).then((d) => {
      setData(d);
      // console.log(d)
    });
  }, []);

  useEffect(() => {
    const newFilteredData = data.filter((d) => {
      if (!sexo[SEXO_1] && d['ERN_Sexo'] === '1') {
        return false;
      } else if (!sexo[SEXO_2] && d['ERN_Sexo'] === '2') {
        return false;
      } else if (!sexo[SEXO_3] && d['ERN_Sexo'] === '3') {
        return false;
      }
      return true;
    });
    setFilteredData(newFilteredData);
  }, [sexo.SEXO_1, sexo.SEXO_2, sexo.SEXO_3, data, sexo]);

  return (
    <div>
      <Box display="flex">
        <div>
          {' '}
          <Checkbox
            checked={sexo[SEXO_1]}
            onChange={() => onChangeSexo(SEXO_1)}
            inputProps={{ 'aria-label': 'controlled' }}
          />{' '}
          sexo1
        </div>
        <div>
          {' '}
          <Checkbox
            checked={sexo[SEXO_2]}
            onChange={() => onChangeSexo(SEXO_2)}
            inputProps={{ 'aria-label': 'controlled' }}
          />{' '}
          sexo2
        </div>
        <div>
          {' '}
          <Checkbox
            checked={sexo[SEXO_3]}
            onChange={() => onChangeSexo(SEXO_3)}
            inputProps={{ 'aria-label': 'controlled' }}
          />{' '}
          sexo3
        </div>
      </Box>

      <LineChart data={filteredData} sexo={sexo} />
      {/* {data.map((d)=><div>{d['@_id']}</div>)} */}
    </div>
  );
};

export default App;
