
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Search, isPC } from '../../comps/FP/FP'

export default function App(){
  return(
    <View className='col'>
      <View className={`col${isPC && ' w60v'}`}>
        <Text className='t3'>FindProf v1 by Rick, spent 4 h, 2021.2.21</Text>
        <Search/>
      </View>
    </View>
  )
}
