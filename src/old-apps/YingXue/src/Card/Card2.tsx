
import React, { memo } from 'react'
import { View } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { MyComponent } from '../Type/Type'
import { Icon, Txt, Input } from '../Component/Basic'
import { ActBar } from '../Component/ActBar'
import { MyData2 } from '../Type/Type'
import { cardVal1 } from '../Const/CardVal1'

export { Card2 }

const Card2 = memo((arg: MyComponent)=>{
  const realVal : MyData2 = arg.val.card
  const val : MyData2 = cardVal1[ arg.val.idx ]
  const pick = ()=>{
    ImagePicker.launchImageLibraryAsync().then(res=>{ if(arg.on)  arg.on({ key:'icon', val: res.uri }) })
  }
  return(
    <View style={{flexDirection:'row', alignItems:'flex-start', marginVertical:10}}>
      {val.icon?<View style={{alignItems:'center'}}>
        <Icon size={120} rad={20} name={val.icon} val={realVal.icon} marg={10} cov on={pick}/>
        <Txt size={13} name='点击添加照片' mh={5} elev={0} color='grey' on={pick}/>
      </View>:null}
      <View style={{flex:1}}>
        <Input size={20} name={val.title} val={realVal.title || ''} mh={10} mv={5} elev={0} edit={arg.edit}
          on={(text: string)=>{ if(arg.on) arg.on({ key:'title', val: text }) }}/>
        <Input size={15} name={val.subtitle} val={realVal.subtitle || ''} mh={10} mv={5} elev={0} edit={arg.edit}
          on={(text: string)=>{ if(arg.on) arg.on({ key:'subtitle', val: text }) }}/>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          {val.links?.map((option:any, idx2:number)=>(
            <View key={idx2} style={{flexDirection:'row', alignItems:'center'}}>
              <Icon size={20} name={option.icon} marg={5} elev={0}/>
              <Input size={15} name={option.text} val={realVal.links? realVal.links[idx2]: ''} 
                mh={10} mv={5} elev={0} edit={arg.edit} 
                on={(text: string)=>{ if(arg.on) arg.on({ key:'links', val: text, idx3: idx2 }) }}/>
            </View>
          ))}
        </View>
        {val.body? <Input size={15} name={val.body} val={realVal.body} mh={10} mv={10} edit={arg.edit} lines={3}
          on={(text: string)=>{ if(arg.on) arg.on({ key:'body', val: text }) }}/>:null}
      </View>
      {arg.edit && val.actions ? <ActBar val={val.actions} on={(action)=>{ if(arg.on) arg.on({ key: 'action', val: action }) }}/> : null}
    </View>
  )
})