
import React, { memo } from 'react'
import { FlatList } from 'react-native'

import { center } from '../Mobx/DataCenter'
import { cardVal0 } from '../Const/CardVal0'
import { MyComponent } from '../Type/Type'

export { Card1List }

const Card1List = memo((arg : MyComponent)=>{
  const { Card } = arg
  const renderItem = ({item, index}:any)=>{
    if(Card) return <Card val={cardVal0} name={arg.name + item} rev={index%2==1}/>
    return null
  }
  const onEndReached = ()=>{
    
  }
  const getItemLayout = (data :any, index:number) =>{
    const size = arg.size || 0
    return ({length: size, offset: size * index, index})
  }
  return(
    <FlatList style={{
      paddingHorizontal:arg.ph, paddingVertical:arg.pv, flex: arg.flex, 
    }} data={center.postData} numColumns={arg.cols}  keyExtractor={(item)=>item} 
      getItemLayout={ arg.size? getItemLayout : undefined } renderItem={renderItem} onEndReached={onEndReached}
      inverted={arg.rev}
    />
  )
})