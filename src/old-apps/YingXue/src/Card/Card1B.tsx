
import React, { memo } from 'react'
import { View } from 'react-native'

import { fmtcnt } from '../Function/fmtcnt'
import { QuillView } from '../Quill/QuillView'
import { MyComponent, MyData } from '../Type/Type'
import { Txt, Icon, Flex1 } from '../Component/Basic'

export { Card1B }

const Card1B = memo((arg : MyComponent)=>{
  const val : MyData = arg.val
  return(
    <View style={{flex:1, margin:10, height: 200, flexDirection:'row'}}>
      <View style={{alignItems:'center', marginHorizontal:10}}>
        <Icon size={20} name='angle-up' marg={5}/>
        <Txt size={13} name={`${fmtcnt(val.likeCount)}赞同`} mh={5} mv={5} elev={0} bold color='blue'/>
        <Icon size={20} name='angle-down' marg={5}/>
        <Icon size={20} name='idea' marg={5}/>
        <Txt size={13} name={`${fmtcnt(val.commentCount)}回答`} mh={5} mv={5} elev={0} bold color='blue'/>
      </View>
      <View style={{flex:1}}>
        <Txt size={15} name={val.title} mh={5} elev={0} color='blue' bold nav={{to: 'Post' }}/>
        <View style={{flex:1, borderBottomWidth: 3, borderColor:'aqua', marginBottom: 5}}>
          <QuillView name={arg.name} val={val.body}/>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
          <Txt size={13} name={`${fmtcnt(val.viewCount)}浏览\n${val.time}`} mh={5} elev={0} color='grey'/>
          <Txt size={14} name={val.form} mh={5} elev={0} color='blue'/>
          <Txt size={14} name={`${val.level}${val.subject}`} mh={5} elev={0} color='blue'/>
          {val.tags? val.tags.split(',').map(tag=> <Txt key={tag} size={14} name={tag} mh={5} elev={0} color='blue'/> ) : null }
          {Flex1}
          <Icon size={30} val={val.avatar} marg={5} cov/>
          <View>
            <Txt size={14} name={val.username} mh={5} elev={0} color='darkslategrey'/>
            <Txt size={13} name={`${fmtcnt(val.userLikeCount)}赞同`} mh={5} elev={0} color='grey'/>
          </View>
        </View>
      </View>
    </View>
  )
})
