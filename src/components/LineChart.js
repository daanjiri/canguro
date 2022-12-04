import React,{ useEffect, useState, useRef } from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({data}) => {
  const ref = useRef();
  
  const PesoDataset = data.map((d,idx)=>{

    const nacimiento = d['ERN_Peso'] === '#NULL!'?0: parseInt(d['ERN_Peso'],10)
    const hospNeonatal = d['HD_PesoSalida'] === '#NULL!'?0:parseInt(d['HD_PesoSalida'],10)
    const entrada = d['V234']=== '#NULL!'?0:parseInt(d['V234'],10)
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

  console.log(PesoDataset)

  return (
    <div style={{width: '40vw'}}>
      <Line ref={ref}
      datasetIdKey='id'
      data={{
        labels: ['nacimiento','hospNeonatal','entrada','sem40','mes3','mes6','mes9','mes12'],
        datasets: PesoDataset,
      }}
      />
    </div>
  )
}

export default LineChart