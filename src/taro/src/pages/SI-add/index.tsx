
import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTextarea } from 'taro-ui'
import Taro from '@tarojs/taro'
import { auth, ideaDB } from '../../comps/cloud'

export default function App(){
  return(
    <View>
      <Text>add</Text>
      <MyForm/>
    </View>
  )
}

function MyForm(){
  const [val1, setVal1] = useState('')
  const [idle, setIdle] = useState(true)
  const check = (
    val1.length > 10 
    && idle
  )
  return(
    <View>
      <AtTextarea
        value={val1}
        onChange={setVal1}
        maxLength={200}
        placeholder='输入你的创业想法'
      />
      <View style={{display: check?'flex':'none' }}>
        <AtButton onClick={()=>{
          console.log(val1)
          setIdle(false)
          add({ idea: val1 })
          .catch(e=>{
            setIdle(true)
          })
        }}>
          提交
        </AtButton>
      </View>
    </View>
  )
}

function add(data: any){
  data._openid = auth.currentUser.uid
  Taro.showLoading()
  return ideaDB.add({
    data
  }).then((res)=>{
    console.log(data)
    console.log(res)
    Taro.hideLoading()
    Taro.navigateTo({
      url: '/pages/index/index'
    })
    Taro.showToast({
      title: '发布成功', icon:'success',
    })
  })
  .catch(e=>{
    Taro.hideLoading()
    Taro.showToast({
      title: '失败', icon:'none', 
    })
    return Promise.reject()
  })
}
