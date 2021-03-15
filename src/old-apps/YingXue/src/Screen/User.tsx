
import React, { useState } from 'react'
import { View } from 'react-native'

import { TopBar } from '../Component/TopBar'
import { Picker } from '../Component/Picker'
import { options2 } from '../Const/Options'
import { Resume } from '../Component/Resume'
import { Txt } from '../Component/Basic'

export { User }

const User = ()=>{
  const [edit, setEdit] = useState(true)
  const on = ()=>{
    if(edit) console.log('update cv')
    setEdit(!edit)
  }
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <View style={{flexDirection:'row', flex:1}}>
        <Picker val={options2}/>
        <View style={{flex:1, paddingVertical:10}}>
          <Resume edit={edit}/>
          <View style={{alignItems:'flex-start', position:'absolute', top:0, left:0}}>
            <Txt size={15} name={edit?'更新':'编辑'} mh={10} mv={5} marg={10} bold color='white' bgc='blue' on={on}/>
          </View>
        </View>
      </View>
    </View>
  )
}
