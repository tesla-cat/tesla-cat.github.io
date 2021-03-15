
import React, { memo } from 'react'
import { View } from 'react-native'
import { Surface } from 'react-native-paper'

import { Txt, Icon, Flex1, Input } from './Basic'

export { TopBar }

const TopBar = memo(()=>{
  return(
    <Surface style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10}}>
      <Icon size={30} name='superman' marg={5} bgc='black' nav={{to:'Home'}}/>
      <View>
        <Txt size={18} name='萤雪' mh={10} elev={0} bold nav={{to:'Home'}}/>
        <Txt size={12} name='知识是一种超能力' mh={10} elev={0} color='grey' bold nav={{to:'Home'}}/>
      </View>
      {Flex1}
      <Input size={20} name='搜索' mh={20} mv={5} flex={2}/>
      <Icon size={20} name='search' marg={10} bgc='white'/>
      {Flex1}
      <Icon size={25} name='edit' marg={5} elev={0}/>
      <Txt size={15} name='笔记' mh={10} mv={5} marg={5} bold color='white' bgc='blue' nav={{to:'Ask'}}/>
      <Txt size={15} name='提问' mh={10} mv={5} marg={5} bold color='white' bgc='blue' nav={{to:'Ask'}}/>
      <Icon size={25} name='email' marg={5} nav={{to:'Message'}} bgc='white'/>
      <Icon size={25} name='account' marg={5} nav={{to:'User'}} bgc='white'/>
    </Surface>
  )
})