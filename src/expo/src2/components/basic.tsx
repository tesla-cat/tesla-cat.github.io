// lib import
import React from 'react'
import { 
  Image, ImageProps,
  TextInput, TextInputProps, View
} from "react-native"
// local import
export { Img, Input, Flex }

function Flex(flex=1){return <View style={{flex}}/>}

interface ImgType extends Partial<ImageProps> {
  uri?: string, 
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