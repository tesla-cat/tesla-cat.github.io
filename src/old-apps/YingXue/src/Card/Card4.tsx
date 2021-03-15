
import React, { memo } from 'react'
import { View } from 'react-native'

import { MyComponent, MyData } from '../Type/Type'
import { Icon } from '../Component/Basic'
import { QuillView } from '../Quill/QuillView'

export { Card4 }

const Card4 = memo((arg: MyComponent)=>{
  const val : MyData = arg.val
  return(
    <View>
      <View style={{flexDirection: arg.rev? 'row-reverse': 'row', alignItems:'flex-start'}}>
        <Icon size={40} val={val.avatar} marg={5} cov/>
        <View style={{flex:1, backgroundColor: arg.rev?'aqua': undefined, borderRadius:30}}>
          <QuillView name={arg.name} val={val.body}/>
        </View>
        <View style={{width:50}}></View>
      </View>
    </View>
  )
})