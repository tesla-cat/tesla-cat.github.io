
import React, { useState } from 'react'
import { View } from 'react-native'
import { Surface } from 'react-native-paper'

import { useRoute } from '@react-navigation/native'

import { TopBar } from '../Component/TopBar'
import { Card1List } from '../CardList/Card1List'
import { Card1C } from '../Card/Card1C'
import { Txt } from '../Component/Basic'
import { MyData } from '../Type/Type'
import { Card1B } from '../Card/Card1B'

export { Post }

const Post = ()=>{
  const val : MyData = useRoute().params 
  const [show, setShow] = useState(false)
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <Surface style={{flexDirection:'row', paddingHorizontal:40, paddingVertical:10, alignItems:'center'}}>
        <Txt size={12} name={show?'收起':'展开提问'} mh={10} mv={5} marg={5} color='white' bgc='blue' on={()=>setShow(!show)}/>
        {show? <Card1B name='Post' val={val}/> :<Txt size={18} name={val.title} mh={10} elev={0} bold/>}
      </Surface>
      <View style={{flexDirection:'row', flex:1}}>
        <View style={{flex:3}}>
          <Card1List Card={Card1C} cols={1} ph={40} pv={20} name='Post'/>
        </View>
      </View>
    </View>
  )
}
