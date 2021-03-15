
import React, { useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react'

import { TopBar } from '../Component/TopBar'
import { Picker } from '../Component/Picker'
import { options2 } from '../Const/Options'
import { Txt, Icon, Input } from '../Component/Basic'
import { form0, form1 } from '../Const/Forms'
import { signIn, signUp, signOut, resetPass } from '../Backend/backend'
import { center } from '../Mobx/DataCenter'

export { Auth }

const Auth = observer(()=>{
  const [mode, setMode] = useState(1)
  const uid = center.data.system?.uid
  const SignUp = (
    <View style={{flex:1, padding:20, alignItems:'center', overflow:'scroll'}}>
      <Icon size={50} name='superman' marg={20} bgc='black'/>
      {Object.entries(form1).map(([key, {text}])=>(
        <Input key={key} size={20} name={text} mh={20} mv={5} marg={10} id={key}/>
      ))}
      <Txt size={15} name='加入萤雪' mh={30} mv={5} marg={10} bold color='white' bgc='blue' on={signUp}/>
      <View style={{flexDirection:'row'}}>
        <Txt size={12} name='已有帐户? 去登录' mh={30} mv={5} marg={10} bold color='blue' elev={0} on={()=>setMode(1)}/>
      </View>
    </View>
  )
  const SignIn = (
    <View style={{flex:1, padding:20, alignItems:'center'}}>
      <Icon size={50} name='superman' marg={20} bgc='black'/>
      {Object.entries(form0).map(([key, {text}])=>(
        <Input key={key} size={20} name={text} mh={20} mv={5} marg={10} id={key}/>
      ))}
      <Txt size={15} name='登录萤雪' mh={30} mv={5} marg={10} bold color='white' bgc='blue' on={signIn}/>
      <View style={{flexDirection:'row'}}>
        <Txt size={12} name='忘记密码?' mh={30} mv={5} marg={10} bold color='blue' elev={0} on={resetPass}/>
        <Txt size={12} name='注册新用户' mh={30} mv={5} marg={10} bold color='blue' elev={0} on={()=>setMode(0)}/>
      </View>
    </View>
  )
  const SignOut = (
    <View style={{flex:1, padding:20, alignItems:'center'}}>
      <Icon size={50} name='superman' marg={20} bgc='black'/>
      <Txt size={15} name='退出登录' mh={30} mv={5} marg={10} bold color='white' bgc='blue' on={signOut}/>
    </View>
  )
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <View style={{flexDirection:'row', flex:1}}>
        <Picker val={options2}/>
        { uid ? SignOut : (mode == 0? SignUp: SignIn) }
      </View>
    </View>
  )
})
