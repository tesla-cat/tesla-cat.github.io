
import React, { memo } from 'react'
import { View } from 'react-native'

import { MyComponent } from '../Type/Type'
import { Icon } from './Basic'

export { ActBar }

const ActBar = memo((arg: MyComponent)=>{
  return(
    <View style={{flexDirection:'row', flexWrap:'wrap', position:'absolute', top:0, right:0}}>
      {arg.val.map((option:any, idx:number)=>(
        <Icon key={idx} size={20} name={option.icon} marg={5} elev={0} on={()=>{if(arg.on) arg.on(idx)}}/>
      ))}
    </View>
  )
})