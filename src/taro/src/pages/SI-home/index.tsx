
import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

export default function App(){
  return(
    <View>
      <Text>home</Text>
      <ToAdd/>
    </View>
  )
}

function ToAdd(){
  return(
    <AtButton onClick={()=>{
      Taro.navigateTo({
        url: '/pages/SI-add/index'
      })
    }}>
      add
    </AtButton>
  )
}