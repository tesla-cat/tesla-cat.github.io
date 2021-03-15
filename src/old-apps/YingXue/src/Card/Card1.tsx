
import React, { memo } from 'react'
import { View } from 'react-native'

import { fmtcnt } from '../Function/fmtcnt'
import { QuillView } from '../Quill/QuillView'
import { MyComponent, MyData } from '../Type/Type'
import { Txt, Icon } from '../Component/Basic'

export { Card1 }

const Card1 = memo((arg : MyComponent)=>{
  const val : MyData = arg.val
  return(
    <View style={{flex:1, margin:10, height: 424}}>
      <Txt size={15} name={val.title} mh={5} elev={0} color='blue' bold/>
      <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
        <Icon size={30} val={val.avatar} marg={5} cov/>
        <View>
          <Txt size={14} name={val.username} mh={5} elev={0} color='darkslategrey'/>
          <Txt size={13} name={`${fmtcnt(val.viewCount)}浏览 ${val.time}`} mh={5} elev={0} color='grey'/>
        </View>
      </View>
      <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
        <Icon size={15} name='like' marg={5}/>
        <Txt size={13} name={`${fmtcnt(val.likeCount)}赞同`} mh={5} mv={5} elev={0} bold color='blue'/>
        <Icon size={15} name='dislike' marg={5}/>
        <Icon size={15} name='idea' marg={5}/>
        <Txt size={13} name={`${fmtcnt(val.commentCount)}回答`} mh={5} mv={5} elev={0} bold color='blue'/>
      </View>
      <View style={{flex:1, borderBottomWidth: 3, borderColor:'aqua', marginBottom: 5}}>
        <QuillView name={arg.name} val={val.body}/>
      </View>
    </View>
  )
})
