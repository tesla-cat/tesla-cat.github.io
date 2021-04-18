// lib import
import React, {useState} from 'react'
import { View, ScrollView, Dimensions } from "react-native"
import {
  Button
} from 'react-native-paper'
// local import
import { Box } from '../components/basic'
import { cssView, IdeaCard, HomeHead } from './home'
import { allIdeas, getIdeasByIds } from '../data/data'
import { useRoute } from '@react-navigation/core'
import ReactPlayer from 'react-player'

export default function IdeaPage(){
  const p: any = useRoute().params
  const [idea, setIdea] = useState(allIdeas[p.id])
  const [index, setIndex] = useState(0)
  
  if(!allIdeas[p.id]){
    getIdeasByIds(p.id).then((ideas)=> setIdea(ideas[0]) )
    return null
  }
  return(
    <View style={cssView.screen}>
      <HomeHead/>
      <ScrollView>
        <IdeaCard {...idea}/>
        <Player uri={idea.uris[index].split('$')[1]}/>
        <View style={cssView.rowGrid}>
          {idea.uris.map((nameAndUri, indexI)=>{
            const [name, uri] = nameAndUri.split('$')
            const color = index==indexI?'red':'blue'
            function onPress(){ setIndex(indexI) }
            return <Button key={name} color={color} onPress={onPress}>{name}</Button>
          })}
        </View>
        {Box(1, 200)}
      </ScrollView>
    </View>
  )
}

function Player(p: {uri: string}){
  const windowSize = Dimensions.get('window')
  return(
    <ReactPlayer 
      width={windowSize.width} height={windowSize.width/(4/3)} 
      style={{backgroundColor:'black'}} 
      url={p.uri} 
      controls
    />
  )
}