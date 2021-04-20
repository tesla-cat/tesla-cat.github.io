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
// local import
import { Editor, Viewer } from './vditor'
import { cssView } from '../screens/home'
export { Img, Input, Flex, Box, MyLink }

function Flex(flex=1, children: ReactNode=null){return <View style={{flex}}>{children}</View>}
function Box(width=0, height=0){return <View style={{width, height}}/>}

interface ImgType extends Partial<ImageProps> {
  uri?: string, 
  on?: ()=>void,
}
function Img(p: ImgType){
  if(!p.uri) return null
  return(
    <Image {...p} source={{uri: p.uri}}/>
  )
}

interface InputType extends Partial<TextInputProps> {
  n?: number,
  mode?: 'editor' | 'viewer'
}
function Input(p: InputType){
  if(p.mode=='editor') return <Editor {...p}/>
  if(p.mode=='viewer') return <Viewer {...p}/>
  return <TextInput {...p} numberOfLines={p.n} multiline={p.n ? true : false}/>
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
