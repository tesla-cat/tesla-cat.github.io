
import React, { memo, useState } from 'react'
import { View } from 'react-native'

import { IconText, MyComponent, MyData2 } from '../Type/Type'
import { Txt, Input } from './Basic'
import { Card2 } from '../Card/Card2'

export { Resume }

type MyData3 = Array<{ name: string, cardVals: Array<MyData2> }>

const Resume = (arg: MyComponent)=>{
  const [data, setData] = useState<MyData3>([
    { name: '简历', cardVals: [ {  } ] },
    { name: '教育经历', cardVals: [ {  } ] },
    { name: '工作/项目经历', cardVals: [ {  } ] },
    { name: '荣誉与奖项', cardVals: [ {  } ] },
  ])
  const [data2, setData2] = useState('')
  return(
    <View style={{flex:1, overflow:'scroll', paddingHorizontal:40, paddingVertical:10}}>
      <View style={{flex:1, maxWidth: 920}}>
        {data.map((sec, idx)=>(
          <View key={idx} style={{margin:20}}>
            <Txt size={20} name={sec.name} mh={5} elev={0} bold/>
            <View style={{height:5, backgroundColor:'aqua', marginVertical:5}}/>
            <View style={{paddingLeft:20}}>  
              {sec.cardVals.map((card, idx2)=> <Card2 key={idx2} val={{card, idx}} edit={arg.edit}
              on={({ key, val, idx3 }: { key: keyof MyData2, val: any, idx3: number })=>{
                var old = [...data]
                if(key=='links'){
                  const links : IconText = []
                  if(!old[idx].cardVals[idx2].links) old[idx].cardVals[idx2].links = links
                  old[idx].cardVals[idx2].links[idx3] = val
                }
                else if(key=='action'){
                  if(val==0 && idx2 > 0){
                    old[idx].cardVals.splice(idx2, 1)
                    old[idx].cardVals.splice(idx2-1, 0, card)
                  }
                  else if(val==1 && idx2 < old[idx].cardVals.length-1){
                    old[idx].cardVals.splice(idx2, 1)
                    old[idx].cardVals.splice(idx2+1, 0, card)
                  }
                  else if(val==2){
                    old[idx].cardVals.splice(idx2+1, 0, { })
                  }
                  else if(val==3 && old[idx].cardVals.length>1){
                    old[idx].cardVals.splice(idx2, 1)
                  }
                }
                else{
                  old[idx].cardVals[idx2][key] = val
                }
                setData(old)
              }}/>)}
            </View>
          </View>
        ))}
        <View style={{margin:20}}>
          <Txt size={20} name='技能' mh={5} elev={0} bold/>
          <Input size={15} name='用逗号隔开' val={data2} mh={10} mv={10} edit={arg.edit} lines={3}
            on={(text:string)=> setData2(text) }/>
        </View>
      </View>
    </View>
  )
}