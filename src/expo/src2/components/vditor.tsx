
import React, { useEffect } from "react"
import { TextInputProps } from "react-native"
import Vditor from 'vditor'
import "./vditor.css"
export { Editor, Viewer }

function Editor(p: TextInputProps){
  useEffect(()=>{
    const vditor = new Vditor('vditor', {
      lang: 'en_US', 
      input(value: string){ p.onChangeText && p.onChangeText(value) },
      mode: 'wysiwyg',
    })
  },[])
  return <div id='vditor'/>   
}

function Viewer(p: TextInputProps){
  useEffect(()=>{
    Vditor.preview(document.getElementById('vditor'), p.value)
  },[])
  return <div id='vditor'/>   
}