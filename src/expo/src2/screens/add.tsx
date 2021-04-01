// lib import
import React from 'react'
import { View } from "react-native"
import {
  IconButton as IconB, 
} from 'react-native-paper'
// local import
import { movies } from '../data/movies/movies'
import { Img, Input, Flex } from '../components/basic'
import { icon, icons } from '../components/icons'
import { cssView, cssImg, cssText, ideaType } from './home'

export default function AddPage(){
  return(
    <View style={cssView.screen}>
      <Head/>
      <Add {...movies[0]}/>
    </View>
  )
}

function Head(){
  return(
    <View style={cssView.row}>
      <IconB icon={icons.left}/>
      {Flex()}
      <IconB icon={icons.check}/>
    </View>
  )
}

function Add(p: ideaType){
  return(
    <View style={cssView.row}>
      <View style={cssView.center}>
        <Img style={cssImg.avatar} uri={p.avatar}/>
      </View>
      <View style={cssView.main}>
        <Input style={cssText.title} placeholder={p.title} autoFocus/>
        <Input style={cssText.body} placeholder={p.body} n={6}/>
        <Input style={cssText.tags} placeholder={p.tags.join(', ')}/>
        <Img style={cssImg.image} uri={icon('image')} resizeMode='contain'/>
      </View>
    </View>
  )
}
