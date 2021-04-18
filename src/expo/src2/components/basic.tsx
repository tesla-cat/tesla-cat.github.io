// lib import
import { useNavigation } from '@react-navigation/core'
import React, { ReactNode } from 'react'
import { 
  Image, ImageProps,
  TextInput, TextInputProps, 
  View
} from "react-native"
import {
  TouchableRipple as Ripple, IconButton as IconB, FAB, 
} from 'react-native-paper'
import { cssView } from '../screens/home'
// local import
export { Img, Input, Flex, Box, MyLink }

function Flex(flex=1){return <View style={{flex}}/>}
function Box(width=0, height=0){return <View style={{width, height}}/>}

interface ImgType extends Partial<ImageProps> {
  uri?: string, 
  on?: ()=>void,
}
function Img(p: ImgType){
  return(
    <Image {...p} source={{uri: p.uri}}/>
  )
}

interface InputType extends Partial<TextInputProps> {
  n?: number,
}
function Input(p: InputType){
  return(
    <TextInput 
      {...p}
      numberOfLines={p.n} multiline={p.n ? true : false}
    />
  )
}

type MyLinkType = {
  to: string, params?: object, 
  children?: ReactNode, icon?: string, fab?: string,
}
function MyLink(p: MyLinkType){
  const nav = useNavigation()
  function onPress(){ 
    if(p.params) nav.push(p.to, p.params)
    else nav.navigate(p.to)
  }
  if(p.icon) return <IconB onPress={onPress} icon={p.icon}/>
  if(p.fab) return <FAB onPress={onPress} style={cssView.fab} icon={p.fab}/>
  return <Ripple onPress={onPress}>{p.children}</Ripple>
}
