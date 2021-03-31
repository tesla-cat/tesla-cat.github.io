// lib import
import React from 'react'
import { View } from "react-native"
import {
  IconButton as IconB, 
} from 'react-native-paper'
// local import
import { movies, movieType } from '../data/movies/movies'
import { Img, Input, Flex } from '../components/basic'
import { icon, icons } from '../components/icons'
import { cssView, cssImg, cssText } from './home'

export default function SearchPage(){
  return(
    <View style={cssView.screen}>
      <Head/>
      
    </View>
  )
}

function Head(){
  return(
    <View style={cssView.row}>
      <IconB icon={icons.left}/>
      <Input style={cssText.search} placeholder={'search'} autoFocus/>
      <IconB icon={icons.check}/>
    </View>
  )
}


