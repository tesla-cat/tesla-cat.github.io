
import React, { useEffect, useState } from 'react'
import { View, Text, Editor } from '@tarojs/components'

import {isPC} from '../../comps/MV/MV'
import { AtButton, AtInput } from 'taro-ui'
import Fuse from 'fuse.js'
import { AtInputProps } from 'taro-ui/types/input'
import cloudbase from '@cloudbase/js-sdk'

const cloud = cloudbase.init({
  env: 'rick-5g5jicykd55413f5',
  region: "ap-guangzhou"
})
const db = cloud.database()
const techDB = db.collection('TR-tech')

cloud.auth({persistence:'local'}).anonymousAuthProvider().signIn().then(r1=>{
  console.log(r1)
  techDB.add({ _id: 'there' }).then(r=>{
    console.log(r)
  })
  techDB.get().then(r=>{
    console.log(r)
  })
})

export default function App(){
  return(
    <View className='col'>
      <View className={`col${isPC && ' w60v'}`}>
        <Text className='t3'>TechRank v1 by Rick, spent 1 day, 2021.2.19</Text>
        <MyForm temp={temp} btn='Add Tech' on={(form)=>{
          console.log(form)
        }}/>
      </View>
    </View>
  )
}

const temp = `Goal\: Mapping the Human Connectome
Tech Name\: Sequencing the connectome
Main Proposer\: Prof. Anthony Zador, CSHL
Intro Link\: www.youtube.com/watch?v=LIAMYMJFHPk&t=1522s`

const search = {
  Goal: [ 'Mapping the Human Connectome' ],
  'Tech Name': [ 'Sequencing the connectome' ],
  'Main Proposer': [ 'Prof. Anthony Zador, CSHL' ],
}
const fuses = {}
Object.keys(search).map(key=>{
  const fuse = new Fuse(search[key])
  fuses[key] = fuse
})

type MyFormType = { 
  temp: string, btn: string, on:(form: object)=>void
}
function MyForm(p: MyFormType){
  const [form, setForm] = useState({})
  const lines = p.temp.split('\n').map(line=>line.split('\:'))
  const check = lines.every(line=> form[line[0]] )
  function set(key, val){
    const old = {...form}; old[key] = val; setForm(old)
  }
  return(
    <View className='col'>
      {lines.map((line, idx)=>{
        const key = line[0], ph = line[1]
        return(
          <View key={key} className='col'>
            <Text>{idx+1}. {key}</Text>
            <H5Input name={key} placeholder={'Example: '+ph} 
              value={form[key]} onChange={val=>set(key, val)}
              autoFocus={idx==0}
            />
            <Search field={key} val={form[key]} on={val=>set(key, val)}/>
          </View>
        )
      })}
      <AtButton className={check?'':'bg-gray'} onClick={()=>{
        if(check) p.on(form)
      }}>
        {p.btn}
      </AtButton>
    </View>
  )
}

type SearchType = { 
  field: string, val: string, on: (res: string)=>void
}
function Search(p: SearchType){
  if(!search[p.field] || !p.val) return null
  const fuse: Fuse<string> = fuses[p.field]
  return(
    <View>
      {fuse.search(p.val).map(res=>(
        <View key={res.refIndex}>
          <Text onClick={()=> p.on(res.item) }>{res.item}</Text>
        </View>
      ))}
    </View>
  )
}

function H5Input(p: AtInputProps){
  return(
    <input 
      className='in2 at-input' autoFocus={p.autoFocus}
      placeholder={p.placeholder} value={p.value || ''}
      onChange={(e)=>p.onChange(e.target.value)} 
    />
  )
}
