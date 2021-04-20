
import React, { useEffect, useState } from "react"
import { TextInputProps, View } from "react-native"
import Vditor from 'vditor'
import "./vditor.css"
import { editor } from 'monaco-editor'
import { cssView } from "../screens/home"
import AsyncStorage from '@react-native-async-storage/async-storage'
export { Editor, Viewer }

/*
function Editor(p: TextInputProps){
  useEffect(()=>{
    const vditor = new Vditor('vditor', {
      lang: 'en_US', 
      input(value: string){ p.onChangeText && p.onChangeText(value) },
      mode: 'wysiwyg',
    })
  },[])
  return <div id='vditor' style={{flex:1, overflow:'scroll'}}/>   
}
*/

function Editor(p: TextInputProps){
  const [value, setValue] = useState('')
  useEffect(()=>{
    AsyncStorage.getItem('EditorValue').then(oldValue=>{
      if(oldValue) setValue(oldValue)
      const myEditor = editor.create(document.getElementById('monaco'), {
        language:'markdown',
        value: oldValue,
      })
      myEditor.onDidChangeModelContent(e=>{
        const newValue = myEditor.getValue()
        setValue(newValue)
        AsyncStorage.setItem('EditorValue', newValue)
      })
    })
  },[])
  return(
    <View style={[cssView.row, {flex:1}]}>
      <div style={{flex:1}} id='monaco'/>
      <Viewer value={value}/>
    </View>
  )
}

function Viewer(p: TextInputProps){
  useEffect(()=>{
    if(p.value?.length) Vditor.preview(document.getElementById('vditor'), p.value)
  },[p.value])
  return <div style={{flex:1, paddingBottom: '50vh'}} id='vditor'/>   
}