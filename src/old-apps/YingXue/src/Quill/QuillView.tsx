
import React, { memo, useEffect } from 'react'

import { MyComponent } from '../Type/Type'

import './init'
import Quill from './quill.min'

import './quill.bubble.css'

export { QuillView }

type QuillType = { setContents: (arg:any)=>any }

const QuillView = memo((arg : MyComponent)=>{
  useEffect(()=>{
    const quill : QuillType = new Quill(`#${arg.name}`, {
      readOnly: true,
      modules: {
        formula: true, syntax: true,
      }
    })
    quill.setContents(JSON.parse(arg.val))
  },[])
  return(
    <div id={arg.name}/>
  )
})