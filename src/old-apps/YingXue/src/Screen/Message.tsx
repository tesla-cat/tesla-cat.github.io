
import React from 'react'
import { View } from 'react-native'

import { TopBar } from '../Component/TopBar'
import { Picker } from '../Component/Picker'
import { Card1List } from '../CardList/Card1List'
import { options3 } from '../Const/Options'
import { Card3 } from '../Card/Card3'
import { Card4 } from '../Card/Card4'
import { QuillEdit } from '../Quill/QuillEdit'
import { cardVal0 } from '../Const/CardVal0'
import { Txt } from '../Component/Basic'

export { Message }

const Message = ()=>{
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <View style={{flexDirection:'row', flex:1}}>
        <Card1List Card={Card3} flex={1} ph={20} pv={10}/>
        <View style={{flex:3}}>
          <Card1List Card={Card4} flex={3} ph={20} pv={10} rev name='Message'/>
          <View style={{height:4, backgroundColor:'grey'}}/>
          <QuillEdit name={'quillMessage'} val={cardVal0.body} flex={1}/>
          <View style={{alignItems:'flex-end'}}>
            <Txt size={15} name='发送' mh={20} mv={5} marg={5} bold color='white' bgc='blue'/>
          </View>
        </View>
        <Picker val={options3}/>
      </View>
    </View>
  )
}
