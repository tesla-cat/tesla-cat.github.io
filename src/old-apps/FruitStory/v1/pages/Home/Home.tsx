
import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import AddPost from '../AddPost/AddPost'
import { navTo, pageType } from '../../comps/funcs'

export default Home 

const pages = ['AddPost']

function Home(){
  return(
    <View>
      {pages.map((page: pageType)=>(
        <AtButton type='primary' onClick={()=>{
          navTo(page)
        }}>{page}</AtButton>
      ))}
    </View>
  )
}