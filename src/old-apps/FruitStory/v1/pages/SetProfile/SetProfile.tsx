
import React, { useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Form } from '../../comps/Form'
import { center } from '../../comps/center'
import { info, navTo } from '../../comps/funcs'

const formTemp1 = [
  ['title', '卖家类型', '个人 | 店长 | 批发商 | 厂家'],
]

export default function AddPost(){
  const { myId, myInfo, myDoc } = center.data
  return(
    <View>
      <UserBasicInfo info={myInfo}/>
      <Form title='设置个人信息' imgTitle={'上传微信二维码'} temp={formTemp1} onSubmit={(form)=>{
        
      }}/>
    </View>
  )
}

function UserBasicInfo({info}: {info: Taro.UserInfo}){
  const genders = ['black', 'blue', 'pink']
  return(
    <View>
      <Image src={info.avatarUrl}/>
      <Text style={{color: genders[info.gender] }}>{info.nickName}</Text>
      <Text>{info.country} {info.province} {info.city}</Text>
    </View>
  )
}

