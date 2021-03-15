
import React, { useState } from 'react'
import { View } from 'react-native'

import { TopBar } from '../Component/TopBar'
import { Picker } from '../Component/Picker'
import { options1B } from '../Const/Options'
import { QuillEdit } from '../Quill/QuillEdit'
import { cardVal0 } from '../Const/CardVal0'
import { LatexHelper } from '../Component/LatexHelper'
import { Input, Txt, Modal } from '../Component/Basic'
import { MyComponent, Obj } from '../Type/Type'
import { TreeChild } from '../Component/TreeChild'

export { Ask }

const Ask = ()=>{
  const [show, setShow] = useState(false)
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <View style={{flexDirection:'row', flex:1}}>
        <Tree flex={1}/>
        <View style={{flex:4}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Txt size={15} name='选择学科' mh={10} mv={5} marg={5} bold color='white' bgc='blue' on={()=>setShow(!show)}/>
            <Input size={20} name='标题: 一句话总结你的问题, 包含细节关键词' mh={20} mv={5} marg={10} flex={1}/>
            <Txt size={15} name='发布' mh={10} mv={5} marg={5} bold color='white' bgc='blue' nav={{to:'Ask'}}/>
          </View>
          <QuillEdit name={'quillAsk'} val={cardVal0.body} flex={2}/>
        </View>
        <LatexHelper flex={2} show/>
        <Modal show={show} on={()=>setShow(!show)} bgc='aqua' pad={40}>
          <Picker val={options1B} hori/>
          <Input size={15} name='添加标签, 用逗号隔开' mh={10} mv={10} marg={5} lines={3}/>
        </Modal>
      </View>
    </View>
  )
}

const treeData0 = {
  id1: { form: '提问', subject: '数学', date: '2020年', title: '是否存在无穷多个孪生素数' },
  id2: { form: '笔记', subject: '数学', date: '2020年', title: '是否存在无穷多个四胞胎素数' },
  id3: { form: '提问', subject: '物理', date: '2020年', title: '真空灾变' },
  id4: { form: '提问', subject: '物理', date: '2020年', title: '量子引力' },
  id5: { form: '笔记', subject: '物理', date: '2020年', title: '黑洞、黑洞信息佯谬、黑洞辐射' },
}

const Tree =(arg: MyComponent)=>{
  var obj : Obj = {}
  Object.entries(treeData0).map(([id, data])=>{
    const { form, subject, date, title } = data
    if(!obj[form]) obj[form] = {}
    if(!obj[form][subject]) obj[form][subject] = {}
    if(!obj[form][subject][date]) obj[form][subject][date] = {}
    obj[form][subject][date][title] = id
  })
  return(
    <View style={{overflow:'scroll', flex: arg.flex, padding:10}}>
      <TreeChild val={obj}/>
    </View>
  )
}
