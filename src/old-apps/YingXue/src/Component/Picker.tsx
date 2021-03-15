
import React, { memo } from 'react'
import { View } from 'react-native'
import { Surface } from 'react-native-paper'

import { MyComponent } from '../Type/Type'
import { Txt, Icon } from './Basic'

export { Picker }

const Picker = memo((arg : MyComponent)=>{
  const keys = Object.keys(arg.val)
  const dir = arg.hori?'row':undefined
  return(
    <View style={{overflow:'scroll', flex:arg.flex}}>
      {keys.map((key: string, idx1:number)=>(
        <Surface key={idx1} style={{margin:5, borderRadius:10, padding:5, flexDirection: dir, flexWrap:'wrap' }}>
          <Txt size={15} name={key} mh={10} elev={0} color='grey'/>
          {arg.val[key].map((option:any, idx2:number)=>(
            <View key={idx2} style={{flexDirection:'row', alignItems:'center'}}>
              <Icon size={20} name={option.icon} marg={5} elev={0} nav={option.nav}/>
              <Txt size={15} name={option.text} mh={10} mv={5} elev={0} nav={option.nav}/>
            </View>
          ))}
        </Surface>
      ))}
    </View>
  )
})