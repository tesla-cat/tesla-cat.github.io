
import React, { memo } from 'react'
import { View } from 'react-native'

import { MyComponent, MyData } from '../Type/Type'
import { Txt, Icon } from '../Component/Basic'

export { Card3 }

const Card3 = memo((arg: MyComponent)=>{
  const val : MyData = arg.val
  return(
    <View>
      <View style={{flexDirection:'row', alignItems:'flex-start'}}>
        <Icon size={40} val={val.avatar} marg={5} cov/>
        <View style={{flex:1}}>
          <Txt size={14} name={val.username} mh={5} elev={0} color='darkslategrey' bold/>
          <Txt size={13} name={val.title} mh={5} elev={0} color='grey'/>
        </View>
        <Txt size={13} name={val.time} mh={5} elev={0} color='grey'/>
      </View>
      <View style={{height:2, margin:10}}/>
    </View>
  )
})