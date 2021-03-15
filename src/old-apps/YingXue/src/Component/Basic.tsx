
import React, { memo, useState } from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { Surface, TouchableRipple } from 'react-native-paper'

import { observer } from 'mobx-react'

import { center } from '../Mobx/DataCenter'
import { latex } from '../Quill/init'
import { MyComponent, Obj } from '../Type/Type'

export { Flex1, Icon, Txt, Input, Latex, Modal, Alert }

const Flex1 = <View style={{flex:1}}></View>

const onPress = (arg:any)=>{ 
  if(arg.on) arg.on()
  if(arg.nav && center.nav) center.nav.navigate( arg.nav.to, arg.nav.arg )
}

const Icon = memo((arg : MyComponent)=>{
  const uri = arg.val || require(`../../assets/image/${arg.name}.png`)
  return(
    <Surface style={{borderRadius: arg.rad || arg.size, overflow:'hidden', elevation: arg.elev, margin:arg.marg,
      backgroundColor:arg.bgc}}>
      <TouchableRipple onPress={ ()=> onPress(arg) }>
        <Image style={{height:arg.size, width:arg.size, margin: arg.cov? 0 : arg.marg}} 
          resizeMode={arg.cov? 'cover':'contain'} source={{uri: uri }}/>
      </TouchableRipple>
    </Surface>
  )
})

const Txt = memo((arg : MyComponent)=>{
  return(
    <Surface style={{borderRadius: arg.size, overflow:'hidden', elevation: arg.elev, margin: arg.marg, 
    flex: arg.flex, backgroundColor: arg.bgc}}>
      <TouchableRipple onPress={ ()=> onPress(arg) }>
        <Text style={{fontSize: arg.size, color: arg.color, fontWeight: arg.bold? 'bold' : undefined,
          marginHorizontal: arg.mh, marginVertical: arg.mv}}>
          {arg.name}
        </Text>
      </TouchableRipple>
    </Surface>
  )
})

const Latex = memo((arg : MyComponent)=>{
  return(
    <Surface style={{borderRadius: arg.size, overflow:'hidden', elevation: arg.elev, margin: arg.marg, 
    flex: arg.flex, backgroundColor: arg.bgc}}>
      <TouchableRipple onPress={ ()=> onPress(arg) } style={{paddingHorizontal: arg.mh, paddingVertical: arg.mv}}>
        <div style={{fontSize: arg.size, color: arg.color, fontWeight: arg.bold? 'bold' : undefined }}
          dangerouslySetInnerHTML={{__html: latex(arg.name)}}/>
      </TouchableRipple>
    </Surface>
  )
})

const Input = observer((arg : MyComponent)=>{
  const [show, setShow] = useState(false)
  const Inp = center.data.Input
  const value = (arg.id && Inp) ? Inp[arg.id] : arg.val
  const on = (text: string)=>{
    if(!arg.id) return
    var obj : Obj = {}; obj[arg.id] = text 
    center.set('Input', obj)
  }
  const sec = arg.id == 'password'
  return(
    <Surface style={{borderRadius: arg.size, overflow:'hidden', elevation: arg.elev, margin: arg.marg, 
    flex: arg.flex}}>
      <TouchableRipple onPress={()=>{}} onPressIn={()=>setShow(true)} onPressOut={()=>setShow(false)}>
        <TextInput style={[{fontSize: arg.size, color: arg.color, 
          marginHorizontal: arg.mh, marginVertical: arg.mv}, {outline:'none'} ]} placeholder={arg.name}
          value={value || ''} onChangeText={arg.id ? on : arg.on } multiline={(arg.lines || 1)>1} 
          numberOfLines={arg.lines} secureTextEntry={sec} editable={arg.edit}
        />
      </TouchableRipple>
      {sec && show?<Text style={{margin: 5, alignSelf:'center', color:'grey'}}>{value}</Text>:null}
    </Surface>
  )
})

const Modal = memo((arg: MyComponent)=>{
  const { pad } = arg
  return(
    <>
      <TouchableRipple style={{ position:'absolute', left:0, right:0, bottom:0, top:0, opacity: 0.5, 
        backgroundColor: arg.bgc, display: arg.show? 'flex':'none', }} onPress={arg.on}>
        <View/>
      </TouchableRipple>
      <Surface style={{position:'absolute', overflow:'scroll', left:pad, right:pad, bottom:pad, top:pad, 
        display: arg.show? 'flex':'none'}}>
        {arg.children}
      </Surface>
    </>
  )
})

const Alert = observer(()=>{
  const text = center.data.system?.alert
  return(
    <View style={{position:'absolute', bottom:5, left:5, right:5, display: text?'flex':'none' }}>
      <Txt size={20} name={text} mh={20} mv={10} bgc='black' color='white' bold 
        on={()=> center.set('system', {alert:null}) }/>
    </View>
  )
})