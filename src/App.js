import React, { useEffect, useState, useReducer } from 'react';
import * as d3 from 'd3';
import dataCSV from './data_sample.csv';
import clusterCSV from './data_short.csv';
import LineChart from './components/Linechart/LineChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';
import Checkbox from '@mui/material/Checkbox';
import { Box, Grid } from '@mui/material';
import BoxPlot from './components/boxPlot/BoxPlot';
import RadarPlot from './components/RadarPlot/RadarPlot';

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
  const [cluster, setCluster] = useState([]);
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
    d3.csv(clusterCSV).then((d) => {
      setCluster(d);
      console.log(d);
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
    <div
      style={{
        naxHeight: '100wh',
        padding: '0px 24px',
      }}
    >
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
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

      <Grid container spacing={0}>
        <Grid item xs={6}>
          <ScatterPlot data={filteredData} />
        </Grid>
        <Grid item xs={6}>
          <LineChart data={cluster} />
        </Grid>
        <Grid item xs={6}>
          <RadarPlot data={cluster} />
        </Grid>
        <Grid item xs={6}>
          <BoxPlot data={filteredData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
