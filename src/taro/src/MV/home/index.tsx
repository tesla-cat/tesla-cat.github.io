
import React from 'react'
import { View, Text } from '@tarojs/components'

import {Hists, Search, isPC} from '../../comps/MV/MV'

export default function App(){
  return(
    <View className='col'>
      <View className={`col${isPC && ' w60v'}`}>
        <Text className='t3'>简易影视v1 by Rick, 用时 1 天, 2021.2.14</Text>
        <Hists/>
        <Search/>
      </View>
    </View>
  )
}