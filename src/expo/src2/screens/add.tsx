// lib import
import React, { useEffect, useState } from 'react'
import { View } from "react-native"
import {
  IconButton as IconB, 
} from 'react-native-paper'
// local import
import { allIdeas } from '../data/data'
import { Img, Input, Flex, MyLink } from '../components/basic'
import { icon, icons } from '../components/icons'
import { cssView, cssImg, cssText, ideaType } from './home'

export default function AddPage(){
  return(
    <View style={cssView.screen}>
      <Head/>
      <Add {...Object.values(allIdeas)[0]}/>
      
    </View>
  )
}

function Head(){
  return(
    <View style={cssView.row}>
      <MyLink to='home' icon={icons.left}/>
      {Flex()}
      <IconB icon={icons.check}/>
    </View>
  )
}

function Add(p: ideaType){
  return(
    <View style={[cssView.row, {flex:1}]}>
      <View style={cssView.center}>
        <Img style={cssImg.avatar} uri={p.avatar}/>
      </View>
      <View style={{flex:1}}>
        <Input style={cssText.title} placeholder={p.title} autoFocus/>
        <Input mode='editor' value={'$x$'}/>
        <Input style={cssText.tags} placeholder={p.tags?.join(', ')}/>
      </View>
    </View>
  )
}


