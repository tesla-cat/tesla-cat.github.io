
import React, { useState, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { 
  AtButton, AtInput, AtTextarea, AtFab, 
  AtSearchBar, AtIcon 
} from 'taro-ui'
import Taro from '@tarojs/taro'
import cloudbase from '@cloudbase/js-sdk'
import VirtualList from '@tarojs/components/virtual-list'


export {AddIdea, isPC, Search, ToAdd}

function AddIdea(){
  const [form, setForm] = useState({})
  const [idle, setIdle] = useState(true)
  function set(k: string, v: string){
    const o = {...form}; o[k] = v; setForm(o)
  }
  return(
    <View>
      <AtInput
        name='标题'
        title='标题' placeholder='简要概括你的创业想法'
        value={form['标题']} 
        onChange={v=>set('标题', v.toString())}
      />
      <AtTextarea
        placeholder='详细描述你的创业想法'
        value={form['正文']}
        onChange={v=>set('正文', v.toString())}
      />
      <View style={{display: idle?'flex':'none'}}>
        <View className='f1'></View>
        <AtButton onClick={()=>{
          setIdle(false)
          addIdea(form).catch(e=>setIdle(true))
        }}>发布</AtButton>
      </View>
    </View>
  )
}

const app = cloudbase.init({
  env: 'rick-5g5jicykd55413f5',
  region: "ap-guangzhou"
})
const auth = app.auth({persistence: 'local'})
const db = app.database()
const _ = db.command
const ideaDB = db.collection('SI-idea')

function signIn(){
  return auth.anonymousAuthProvider().signIn().then(r=>{
    console.log(r)
  })
}
signIn()

function addIdea(form){
  const keys = ['标题', '正文']
  const check = keys.every(key=>form[key])
  if(!check){
    Taro.showToast({
      title: '请完善信息', icon: 'none'
    })
    return Promise.reject()
  }
  else return ideaDB.add(form).then(r=>{
    Taro.showToast({
      title: '发布成功', icon: 'success'
    })
    setTimeout(()=>{
      Taro.redirectTo({url: '/SI/home/index'})
    }, 2000)
  })
}

//==============================

function ToAdd(){
  return(
    <AtFab className='abs-rb' onClick={()=>{
      Taro.redirectTo({ url:'/SI/add/index' })
    }}>
      <Text className='at-fab__icon at-icon at-icon-add'></Text>
    </AtFab>
  )
}

const {windowWidth, windowHeight} = Taro.getSystemInfoSync()
const isPC = windowWidth > windowHeight

const pageSize = 6
const itemSize = 120
type dataType = {
  标题: string,
  正文: string,
}
function Search(){
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<dataType[]>([])
  const [idle, setIdle] = useState(true)
  const height = windowHeight-100
  function load(){
    if(!idle) return
    setIdle(false)
    search(query, res).then(newData=>{
      setRes(res.concat(newData))
      if(newData.length==pageSize) setIdle(true)
    })
  }
  return(
    <View className='col'>
      <View className='row aictr'>
        <AtInput name='s' className='in1 f1' placeholder='搜索' 
          onChange={v=>{
            setQuery(v.toString())
            setRes([])
            setIdle(true)
          }}
        />
        <AtButton onClick={load}>搜索</AtButton>
        
      </View>     
      <VirtualList
        height={height} width='100%' 
        itemData={res} itemCount={res.length} 
        itemSize={itemSize}
        onScroll={s=>{
          const n = (s.scrollOffset + height)/itemSize
          if(n > res.length - 1) load()
        }}
      >{DataCard}</VirtualList>
    </View>
  )
}

type CardType = {index: number, data: dataType[]}
const DataCard = memo((p: CardType)=>{
  const d = p.data[p.index]
  return(
    <View className='col' style={{
      height:`${itemSize}px`, 
      //backgroundColor:'red'
    }}>
      <Text className='t1'>{d.标题}</Text>
      <Text className='t3 f1 scr'>{d.正文}</Text>
      <View className='row abs-rb'>
        <View className='f1'></View>
        <AtButton>反对</AtButton>
        <AtButton>赞同</AtButton>
        <AtButton>合作</AtButton>
      </View>
    </View>
  )
})

function search(wd: string, old: dataType[]){
  console.log(`search ${wd} ${old.length}`)
  const reg = db.RegExp({ regexp: '.*' + wd, options: 'i' })
  return ideaDB.where(_.or([
    { 标题: reg },
    { 正文: reg },
  ])).skip(old.length).limit(pageSize).get().then(res=>res.data)
}
