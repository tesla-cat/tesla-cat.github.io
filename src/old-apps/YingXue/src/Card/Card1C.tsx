
import React, { memo } from 'react'
import { View } from 'react-native'

import { fmtcnt } from '../Function/fmtcnt'
import { QuillView } from '../Quill/QuillView'
import { MyComponent, MyData } from '../Type/Type'
import { Txt, Icon, Flex1 } from '../Component/Basic'

export { Card1C }

const Card1C = memo((arg : MyComponent)=>{
  const val : MyData = arg.val
  return(
    <View style={{flex:1, margin:10, flexDirection:'row'}}>
      <View style={{alignItems:'center', marginHorizontal:10}}>
        <Icon size={20} name='angle-up' marg={5}/>
        <Txt size={13} name={`${fmtcnt(val.likeCount)}赞同`} mh={5} mv={5} elev={0} bold color='blue'/>
        <Icon size={20} name='angle-down' marg={5}/>
      </View>
      <View style={{flex:1}}>
        <QuillView name={arg.name} val={val.body}/>
        <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
          <Txt size={13} name={val.time} mh={5} elev={0} color='grey'/>
          {Flex1}
          <Icon size={30} val={val.avatar} marg={5} cov/>
          <View>
            <Txt size={14} name={val.username} mh={5} elev={0} color='darkslategrey'/>
            <Txt size={13} name={`${fmtcnt(val.userLikeCount)}赞同`} mh={5} elev={0} color='grey'/>
          </View>
        </View>
      </View>
    </View>
  )
})
