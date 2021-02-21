
import React, { useState, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Fuse from 'fuse.js'
import { AtInput } from 'taro-ui'
import VirtualList from '@tarojs/components/virtual-list'
import Taro from '@tarojs/taro'

export { Search, isPC }

const {windowWidth, windowHeight} = Taro.getSystemInfoSync()
const isPC = windowWidth > windowHeight

var profs: profType[] = require('./find_prof_NUS_2000.json')
profs = profs.map((prof, idx)=>({
  idx: idx+1, ...prof, 
  _name: prof.name.toLowerCase(),
  _fields: prof.fields.toLowerCase(),
}))
const fuse = new Fuse<profType>(profs, {
  keys: ['name', 'fields', 'idx'],
  threshold: 0.2,
  //sortFn: (a, b)=>{
    //return a.item.cited - b.item.cited
  //}
})

function search(wd: string, mode: 'fuzzy'|'contain'='contain'){
  wd = wd.toLowerCase()
  return new Promise<res1Type>((res, rej)=>{
    if(wd){
      if(mode=='fuzzy') res(fuse.search(wd).map(i=>i.item))
      else res(profs.filter(p=>( 
        p._name.includes(wd) ||
        p._fields.includes(wd) ||
        p.idx == parseInt(wd)
      )))
    }
    else res(profs)
  })
}

const profSize = 100
const prof0 = {
  cited: 191665,
  fields: "orthopaedic surgery",
  img: "/citations/images/avatar_scholar_56.png",
  name: "Chen Yongsheng",
  idx: 0,
  _name: '', _fields: '',
}
type profType = typeof prof0

type res1Type = profType[]
function Search(){
  const [res1, setRes1] = useState<res1Type>(profs)
  return(
    <View className='col'>
      <AtInput className='in1' name='inp1' onChange={(val)=>{
        search(val.toString()).then(setRes1)
      }} placeholder={`search ${profs.length} profs by: name / area / index`}/>
      <Text className='t3'>{res1.length} results</Text>
      <List data={res1} Row={ProfVL} size={profSize}
        height={windowHeight-100}/>
    </View>
  )
}

type ListType = { 
  data: any[], Row: any, size: number, height: number 
}
function List(p: ListType){
  return(
    <VirtualList
      height={p.height} width='100%' 
      itemData={p.data} itemCount={p.data.length} itemSize={p.size}
    >{p.Row}</VirtualList>
  )
}

const ProfVL = memo(({index, data}: { index: number, data: any[] }) => {
  return <Prof prof={data[index]}/>
})
function Prof({prof} : {prof: profType}){
  return(
    <a href={`https://www.google.com/search?q=NUS+${prof.name}`}
    target='_blank'>
    <View className='row card1 scr' style={{height: `${profSize}px`}}>
      <View className='col'>  
        <Avatar src={prof.img} size={80}/>
      </View>
      <View className='col f1'>
        <View className='row'>
          <Text className='t1'>{prof.idx}. {prof.name}</Text>
          <View className='f1'></View>
          <Text className='t2'>{prof.cited}</Text>
        </View>
        <Text className='t3'>{prof.fields}</Text>
      </View>
    </View>
    </a>
  )
}

type AvatarType = { src: string, size: number }
function Avatar(p: AvatarType){
  const size = `${p.size}px`
  return <Image src={p.src} style={{
    height:size, width:size, borderRadius: '10px',
    margin: '5px',
  }} mode='aspectFill'/>
}