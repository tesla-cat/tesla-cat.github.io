// lib import
import React, { useEffect, useState } from 'react'
import { Text, View } from "react-native"
import {
  IconButton as IconB, 
} from 'react-native-paper'
// local import
import { allIdeas } from '../data/data'
import { Img, Input, Flex, MyLink } from '../components/basic'
import { icon, icons } from '../components/icons'
import { cssView, cssImg, cssText, ideaType } from './home'
import { coinType } from '../data/coin/coin'
import Plot from 'react-plotly.js'

type cleanedCoinType = {
  metricID: string, description: string, 
  xLabel: string, x: string[], yLabel: string, y: number[]
}

function cleanCoin(){
  const coin: coinType = require('../data/coin/coin.json')
  const cleanedCoin: cleanedCoinType[]  = []
  Object.keys(coin).map(metricID=>{
    const { data: { parameters: {
      columns,
    }, schema: {
      description, values_schema, 
    }, values } } = coin[metricID]  
    if(values == null) return null
    if(columns[0] != 'timestamp'){
      alert(`${metricID} - ${columns[0]}`); return null
    }
    
    const xLabel = 'timestamp'
    const x = values.map(value=>new Date(value[0]).toISOString())
    const yLabels = Object.values(values_schema).slice(1)
    const yList = Object.keys(values_schema).map((key, index)=>{
      return values.map(value=> value[index] )
    }).slice(1)
    yList.map((y, index)=>{
      const yLabel = yLabels[index]
      cleanedCoin.push({ metricID, description, xLabel, x, yLabel, y })
    })
  })
  return cleanedCoin
}
const cleanedCoin = cleanCoin()

export default function DogePage(){
  return(
    <View style={cssView.screen}>
      {cleanedCoin.map(metric=>{
        if(metric) return(
          <View>
            <h3>{metric.yLabel}</h3>
            <Plot key={ metric.metricID }
              data={[ { x: metric.x, y: metric.y, type: 'scatter' } ]}
            />
          </View>
        )
      })}
    </View>
  )
}
