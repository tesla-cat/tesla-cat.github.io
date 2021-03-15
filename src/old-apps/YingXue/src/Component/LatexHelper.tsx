
import React, { memo, useState } from 'react'
import { View } from 'react-native'
import { Surface, TouchableRipple } from 'react-native-paper'

import { Flex1, Input, Txt, Icon, Latex } from './Basic'
import { MyComponent } from '../Type/Type'
import { latex } from '../Quill/init'
import { latexHelpers0 } from '../Const/LatexHelpers'

export { LatexHelper }

const LatexHelper = memo((arg: MyComponent)=>{
  const [text, setText] = useState('')
  const [helperIdx, setHelperIdx] = useState(0)
  const latexElms = latexHelpers0.map(({vals})=>(
    vals.map((val, idx)=>(
      <Latex key={idx} size={13} name={val} mh={10} mv={5} marg={5} on={()=> setText(`${text}  ${val}`) }/>
    ))
  ))
  return(
    <View style={{flex:arg.flex, padding:5, display: arg.show? 'flex':'none' }}>
      <Surface style={{margin:5}}>
        <TouchableRipple onPress={()=>{}} style={{padding:10}}>
          <div style={{height:80, overflow:'scroll'}} dangerouslySetInnerHTML={{__html: latex(text) || '预览区'}}/>
        </TouchableRipple>
      </Surface>
      <Input size={15} name='编辑数学、物理、化学等公式, 试试下方的快捷键!' mh={10} mv={10} marg={5} lines={6} on={setText} val={text}/>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        {latexHelpers0.map((helper, idx)=>(
          <Icon key={idx} size={20} name={helper.icon} marg={5} on={()=> setHelperIdx(idx) }/>
        ))}
        {Flex1}
        <Txt size={15} name='插入到正文' mh={10} mv={5} marg={5} bold color='white' bgc='blue'/>
      </View>
      <View style={{flexDirection:'row', flexWrap:'wrap', overflow:'scroll', flex:1, alignItems:'center'}}>
        {latexElms[helperIdx]}
      </View>
    </View>
  )
})