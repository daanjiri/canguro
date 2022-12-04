import Papa from 'papaparse';

import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { pink } from '@mui/material/colors';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const categories = [
  'Iden_Codigo', 'ERN_Sexo', 'ERN_Ballard', 'AC_CirujiaSeno', 'CP_edadmaterna', 'CP_PesoMadre', 'CP_PesoPadre', 'CP_TallaMadre',
  'CP_TallaPadre', 'CSP_DistanciaVivienda', 'CSP_EmbarazoDeseado', 'CSP_EscolaridadMadre', 'CSP_EscolaridadPadre', 'CSP_IngresoMensual',
  'CSP_numPersVivenIngMen', 'CSP_NutricionFam', 'CSP_SituacionLaboralMadre', 'CSP_SituacionLaboralPadre', 'CSP_SituaPareja', 'CSP_TipoVivienda',
  'edadmatcat', 'educmadresimplificada', 'educpadresimplificada', 'embbajoplanificacion', 'ninosmenosde5anos', 'percapindic', 'percapita',
  'anoxia5mn', 'ERN_LubchencoFenton', 'ERN_PC','ERN_Peso', 'ERN_Talla', 'menosde1001', 'PESO1500G', 'pesocat','ALIMENTAPARENTERAL',
  'alisalida', 'HD_C_ExamenNeurologico', 'HD_PesoSalida', 'V205','problemaneurologico', 'V196A', 'V196B', 'V196C', 'V196D',
  'V196F', 'V197', 'V198', 'V199', 'V234', 'V236J', 'V243', 'V244C','algoLM40sem', 'ali40', 'Indexnutricion40sem', 'NEURO40',
  'V218', 'V219', 'V220', 'V221', 'V222', 'V223', 'V252','algoLM3meses', 'ali3m', 'infanib3m', 'V261', 'V262', 'V263',
  'V264', 'V265', 'V266', 'V278', 'V279', 'V281', 'V282', 'V289', 'V290','algoLM6meses','ali6m', 'CD6', 'infanib6m', 'IQ6cat', 'rsm6m', 'V304', 'V305', 'V306', 'V307', 'V308',
  'V309', 'V312', 'V320', 'V321', 'V323', 'V324', 'V331', 'V332', 'V344', 'V344B','ali9m', 'infanib9m',
  'V347', 'V348', 'V349', 'V350', 'V351', 'V352', 'V355', 'V363', 'V364', 'V366', 'V367', 'V374', 'V375','ali12m', 'CD12',
  'examenneurodurante12meses', 'indexnutricion12meses', 'infanib12m', 'IQ12cat', 'riesgoPC12m','rsm12m', 'V389', 'V390', 'V391', 'V392', 'V393', 'V394', 'V397', 'V405', 'V406', 'V408', 'V409', 'V416', 'V417', 'V429','V430', 'V430B'
]
const backgroundColors = ['rgba(237, 201, 255, 0.3)', 'rgba(254, 212, 231, 0.3)', 'rgba(242, 183, 159, 0.3)', 'rgba(229, 183, 105, 0.3)', 'rgba(216, 204, 52, 0.3)']

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 400,
      width: 250,
    },
  },
};

const RadarChart = () => {

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });
  const [allKeys , setAllKeys] = useState(categories);
  const [allData , setAllData] = useState([]);
  const [labelsLimit , setLabelsLimit] = useState(10);
  const [idLimit , setIdLimit] = useState(5);
  const [keys, setKeys] = useState();
  const [idList, setIdList] = useState([]);
  const [justGirls, setJustGirls] = useState(false);
  const [justBoys, setJustBoys] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(['CP_edadmaterna', 'CP_PesoMadre', 'CP_PesoPadre', 'CP_TallaMadre']);

  const handleChangeKey = (event) => {
    const {
      target: { value },
    } = event;
    if(selectedKeys.length<10 || value.length<selectedKeys.length){

      setSelectedKeys(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

      mapDataset(value);
    }
  };

  const randomize = (data) => {
    mapDataset(selectedKeys);
  }

  const mapDataset = (value) => {
    const randomAll = [];
    for(let i=0;i<idLimit;i++){
      const random = Math.floor(Math.random() * allData.length);
      if(!allData[random] || !allData[random]['ERN_Sexo'] || allData[random]['ERN_Sexo']>2) {
        i--;
        continue;
      }
      if(allData[random]['ERN_Sexo'] == 1 && (justGirls && !justBoys)) {
        randomAll.push(random);
      } else if(allData[random]['ERN_Sexo'] == 2 && (!justGirls && justBoys)) {
        randomAll.push(random);
      } else {
        randomAll.push(random);
      }
    }
    const datasets = [];
      const ids = [];
      for(let i=0;i<idLimit;i++){
        ids.push(allData[randomAll[i]]['Iden_Codigo']);
          datasets.push({
            label: 'Data ' + allData[randomAll[i]]['Iden_Codigo'],
            data: mapValues(value, allData, labelsLimit, i, randomAll),
            backgroundColor: backgroundColors[i],
            opacity: 0.1,
            borderColor: backgroundColors[i],
            borderWidth: 1,
          });
      }
      setSelectedIds(ids);

      const newData = {
        labels: value,
        datasets,
      };
      setData(newData);
  }

  const mapValues = (keys, allData, limit, el, randomArray) => {
    const mappedValues = [];
    
    for (let i = 0; i < limit; i++) {
      const value = allData[randomArray&&randomArray[el]?randomArray[el]:el]?allData[randomArray?randomArray[el]:el][keys[i]]:0;
      if(justBoys && !justGirls) {
        if(allData[el]['ERN_Sexo'] == 1) {
          mappedValues.push(value?value:0);
        }
      } else if(justGirls && !justBoys) {
        if(allData[el]['ERN_Sexo'] == 2) {
          mappedValues.push(value?value:0);
        }
      } else {
        mappedValues.push(value?value:0);
      }
    }
    return mappedValues;
  }

  const mapData = (downloadedData) => {
    const labels = allKeys.slice(0, labelsLimit);
    setSelectedKeys(labels);
    setAllData(downloadedData);
    setKeys(labels);
    randomize(labels);
  }
  const getData = file => {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: results => {
        mapData(results.data);
      },
    });
  };

  useEffect(() => {
    getData('./KMC-50k-Base-1993-2022-Jul-20220929-JTH.csv');
  }, []);



  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to Canguro Dashboard!
        </h1>
        <Box>
        <Checkbox
          onChange={(e) => {setJustBoys(e.target.checked); mapDataset()}}
          value={justBoys}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        /> Niños
        <Checkbox
          onChange={(e) => {setJustGirls(e.target.checked); mapDataset()}}
          value={justGirls}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        /> Niñas
        </Box>
        <Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Datos</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={selectedKeys}
              onChange={handleChangeKey}
              max={2}
              input={<OutlinedInput label="Datos" />}
              MenuProps={MenuProps}
            >
              {allKeys?allKeys.map((key) => (
                <MenuItem
                  key={key}
                  value={key}
                >
                  {key}
                </MenuItem>
              )): null}
            </Select>
          </FormControl>
        </Box>
        <Radar data={data} />
          <Button variant="outlined" onClick={randomize}>Randomize data</Button>
      </main>
    </div>
  )
}

export default RadarChart;
