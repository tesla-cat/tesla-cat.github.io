
import React, { memo, useEffect } from 'react'
import { View } from 'react-native'

import { Icon } from '../Component/Basic'
import { MyComponent } from '../Type/Type'

import './init'
import Quill from './quill.min'

import './quill.snow.css'

export { QuillEdit }

window.Quill = Quill
require('./image-resize.min.js')

type QuillType = { 
  setContents: (arg:any)=>any, getContents: ()=>any, on: (...arg:any)=>any,
  history: { undo: ()=>any, redo: ()=>any },
}

const QuillEdit = memo((arg : MyComponent)=>{
  var quill : QuillType
  useEffect(()=>{
    quill = new Quill(`#${arg.name}`, { 
      theme: 'snow',
      modules: {
        formula: true, syntax: true,
        toolbar: `#${arg.name}tools`,
        imageResize: {},
      } 
    })
    quill.setContents(JSON.parse(arg.val))
    quill.on('text-change', ()=>{ if(arg.on) arg.on( quill.getContents() ) })
  },[])
  return(
    <div style={{flex:arg.flex, overflow:'scroll'}}>
      <div id={`${arg.name}tools`} style={{border:0, margin:0, padding:0, 
        position:'sticky', top:0, backgroundColor:'white', zIndex:1}}>
        {tools}
        <span className="ql-formats">
          <View style={{flexDirection:'row'}}>
            <Icon size={15} name='undo' marg={5} elev={0} on={()=>{ if(quill) quill.history.undo() }}/>
            <Icon size={15} name='redo' marg={5} elev={0} on={()=>{ if(quill) quill.history.redo() }}/>
          </View>
        </span>
      </div>
      <div>
        <div id={arg.name} style={{border:0, margin:0, padding:0}}/>
      </div>
    </div>
  )
})

const tools = (
  <>
    <span className="ql-formats">
      <select className="ql-font"></select>
      <select className="ql-size"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
    </span>
    <span className="ql-formats">
      <select className="ql-color"></select>
      <select className="ql-background"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-header" value="1"></button>
      <button className="ql-header" value="2"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-direction" value="rtl"></button>
      <select className="ql-align"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <button className="ql-formula"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-clean"></button>
    </span>
  </>
)