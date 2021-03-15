
import React, { memo, useState } from 'react'
import { View } from 'react-native'

import { Txt, Icon } from './Basic'
import { MyComponent } from '../Type/Type'

export { TreeChild }

const TreeChild = memo((arg: MyComponent)=>{
  const [show, setShow] = useState(true)
  if(!arg.val) return null
  if(typeof arg.val == 'string'){
    return(
      <Txt size={12} name={arg.name} mh={5} elev={0} color='blue'/>
    )
  }
  return(
    <View>
      {arg.name?<View style={{flexDirection:'row', alignItems:'center'}}>
        <Icon size={12} name={show? 'angle-down':'angle-right'} elev={0} on={()=>setShow(!show)}/>
        <Txt size={12} name={arg.name} mh={5} elev={0} color='grey' on={()=>setShow(!show)}/>
      </View>: null}
      <View style={{paddingLeft: arg.name? 10: 0, display: show?'flex':'none'}}>
        {Object.entries(arg.val).map(([key, child])=> <TreeChild key={key} name={key} val={child}/> )}
      </View>
    </View>
  )
})