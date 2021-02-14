
import React from 'react'
import { View, Text } from '@tarojs/components'

import {Hists, Search} from '../../comps/MV/MV'

export default function App(){
  return(
    <View>
      <Text className='t3'>简易影视v1 by Rick, 用时 1 天, 2021.2.14</Text>
      <Hists/>
      <Search/>
    </View>
  )
}