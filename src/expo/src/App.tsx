
import React, { memo, ReactNode, useEffect, useState } from 'react'
import { 
  Text, View, StyleSheet, Image, FlatList, ScrollView,
  Modal, TextInput, Dimensions, StyleProp, ViewStyle,
} from 'react-native'
import { 
  TouchableRipple, Badge, Button, IconButton, FAB
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Linking from 'expo-linking'

import cloudbase from '@cloudbase/js-sdk'

import {pickWeb, pickWebType} from './pickWeb'
import './app.css'

const win = Dimensions.get('window')
const isPC = win.height < win.width

const app = cloudbase.init({
  env: 'rick-5g5jicykd55413f5',
  region: "ap-guangzhou",
})
const db = app.database()
const auth = app.auth({persistence:'local'})

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const prefixes = [Linking.createURL('https://tesla-cat.github.io/SI/')]
export default function App(){
  const app = (
    <NavigationContainer linking={{prefixes}}>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='tabs' component={Tabs}/>
        <Stack.Screen name='add' component={Add}/>
        <Stack.Screen name='idea' component={Idea}/>
        <Stack.Screen name='user' component={User}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  if(!isPC) return app
  return(
    <View style={css.base1}>
      <View style={css.base2}>
        {app}
      </View>
    </View>
  )
}

function Tabs(){
  return(
    <Tab.Navigator screenOptions={({route:{name}})=>({
      tabBarIcon:({focused, size, color})=>{
        if(name=='home') return <Ionicons name='home' size={size} color={color}/>
        else if(name=='home2') return <Ionicons name='home-outline' size={size} color={color}/>
      }
    })}>
      <Tab.Screen name='home' component={Home}/>
      <Tab.Screen name='home2' component={Home}/>
    </Tab.Navigator>
  )
}

function User(){
  return(
    <View style={css.screen}>
      <Text>user</Text>
    </View>
  )
}

function Idea(){
  const nav = useNavigation()
  const head = <>
    <View style={css.row2}>
      <IconButton icon='arrow-left' onPress={()=>{
        nav.navigate('tabs',{screen:'home'})
      }}/>
      {flex()}
      <Btn color={'skyblue'} size={20} on={()=>{
        nav.navigate('add', {
          replyToID: data0._id, title: `Re: ${data0.title}`
        })
      }}>advise / reply</Btn>
    </View>
    <Data0Card {...data0}/>
  </>
  return(
    <View style={css.screen}>
      <Data0List style={css.replyList} head={head}/>
    </View>
  )
}

type AddType = { 
  replyToID: string, title: string
} | undefined
function Add(){
  const nav = useNavigation()
  const route: any = useRoute()
  const p: AddType = route.params
  const [imgs, setImgs] = useState<pickWebType[]>([])
  const txts1 = [
    'share', 'Title: summarize your startup idea', 'Detail: elaborate this idea'
  ]
  const txts2 = [
    'reply', p?.title||'' , 'Reply: make an advice or offer a cooperation'
  ]
  const txts = p?.title ? txts2 : txts1 
  return(
    <View style={css.screen}>
      <View style={css.row2}>
        <IconButton icon='close' onPress={()=>{
          if(nav.canGoBack()) nav.goBack()
          else nav.navigate('tabs',{screen:'home'})
        }}/>
        {flex()}
        <Btn color={'skyblue'} size={20}>{txts[0]}</Btn>
      </View>
      <View style={css.row}>
        <View>
          <Icon uri={data0.avatar} size={40}/>
        </View>
        <View style={css.f1}>
          <TextInput style={css.in1} placeholder={txts[1]} autoFocus
            value={p?.title}
          />
          <TextInput style={css.in2} placeholder={txts[2]} multiline numberOfLines={6}/>
          <Imgs imgs={imgs.map(i=>i.uri)} height={200}/>
        </View>
      </View>
      <View style={css.row2}>
        <IconButton icon='image-outline' onPress={()=>{
          pickWeb().then(setImgs)
        }}/>
      </View>
    </View>
  )
}

function Home(){
  const nav = useNavigation()
  return(
    <View style={css.screen}>
      <Data0List head={<Head/>}/>
      <FAB style={css.abs2} icon='feather' onPress={()=>{
        nav.navigate('add')
      }}/>
    </View>
  )
}

function Head(){
  return(
    <View style={[css.card0, css.row2]}>
      <Icon name='idea' size={30}/>
      <View>
        <Text style={css.t2}>Startup Ideas</Text>
        <Text style={css.t1}>share idea, get advice, find team</Text>
      </View>
      {flex()}
      <IconButton icon='magnify' onPress={on0}/>
      <Icon uri={data0.avatar} size={30}/>
    </View>
  )
}

const data0 = {
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg',
  username: 'Elon Musk',
  time: new Date().getTime(),
  title: 'Neuralink',
  body: 'Neuralink Corporation is a neurotechnology company founded by Elon Musk and others, developing implantable brain–machine interfaces (BMIs).',
  imgs: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Neuralink_logo.svg/330px-Neuralink_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pioneer_Building%2C_San_Francisco_%282019%29_-1.jpg/330px-Pioneer_Building%2C_San_Francisco_%282019%29_-1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Elon_Musk_and_the_Neuralink_Future.jpg/330px-Elon_Musk_and_the_Neuralink_Future.jpg',
  ],
  numComment: 10,
  numLike: 10,
  numHate: 10,
  numJoin: 10,
  _id: '0',
  _openid: 'rick',
}
const data0Arr = Array(10).fill(data0)
const Data0Card = memo((p: typeof data0)=>{
  const nav = useNavigation()
  return(
    <View style={[css.card0, css.row]}>
      <View>
        <Icon uri={p.avatar} size={40} on={()=>{
          nav.navigate('user',{_openid: p._openid})
        }}/>
      </View>
      <View style={css.f1}>
        <Text style={css.t1}>{p.username} · {timeDiff(p.time)}</Text>
        <TouchableRipple onPress={()=>{
          nav.navigate('idea',{_id: p._id})
        }}>
          <Text style={css.t2}>{p.title}</Text>
        </TouchableRipple>
        <Text style={css.t3}>{p.body}</Text>
        <Imgs imgs={p.imgs} height={100}/>
        <View style={css.row2}>
          <Button icon='comment-outline' onPress={on0}>{p.numComment}</Button>
          <Button icon='thumb-down-outline' onPress={on0}>{p.numHate}</Button>
          <Button icon='heart-outline' onPress={on0}>{p.numLike}</Button>
          <Button icon='hand' onPress={on0}>{p.numJoin}</Button>
        </View>
      </View>
      <IconButton style={css.abs1} icon='chevron-down' onPress={on0}/>
    </View>
  )
})

type DataListType = {
  style?: StyleProp<ViewStyle>,
  head?: ReactNode
}
function Data0List(p: DataListType){
  const [show, setShow] = useState(true)
  const [last, setLast] = useState(0)
  return <>
    <View style={{display:show?'flex':'none'}}>
      {p.head}
    </View>
    <FlatList 
      data={data0Arr} style={p.style} 
      renderItem={({item})=>(<Data0Card {...item}/>)} 
      keyExtractor={(item, idx)=>idx+''}
      onScroll={e=>{
        const cur = e.nativeEvent.contentOffset.y
        const diff = cur - last
        if(diff > 10) setShow(false) 
        if(diff < -10) setShow(true) 
        setLast(cur)
      }}
    />
  </>
}

type IconType = {
  name?: string, size: number, on?: ()=>void
  uri?: string
}
function Icon(p: IconType){
  const uri = p.uri || require(`./imgs/${p.name}.svg`)
  return(
    <TouchableRipple onPress={p.on || on0} style={css.iconBody}>
      <Image source={{uri}} style={{
        height: p.size, width: p.size, borderRadius: 1e3
      }}/>
    </TouchableRipple>
  )
}

type BtnType = {
  children: string, size?: number, on?:()=>void
  color: string,
}
function Btn(p: BtnType){
  return(
    <TouchableRipple onPress={p.on || on0} style={[css.btnBody,{
      backgroundColor:p.color, 
    }]}>
      <Text style={[css.t4, {color: p.color?'white':'blue'}]}>
        {p.children}
      </Text>
    </TouchableRipple>
  )
}

type ImgsType = {
  imgs: string[], height: number,
}
function Imgs(p: ImgsType){
  if(!p.imgs.length) return null
  const [show, setShow] = useState(false)
  const style = show?{
    height:'30vh', width:'100%',
  }:{
    height:p.height, width:'100%',
  }
  const imgs = <>
    <ScrollView horizontal={!show} style={{
      margin:3
    }} contentContainerStyle={style}>
      {p.imgs.map((img, idx)=>(
        <TouchableRipple key={idx} style={style} onPress={()=>{
          setShow(!show)
        }}>
          <Image source={{uri: img}} style={style} resizeMode='contain'/>
        </TouchableRipple>
      ))}
    </ScrollView>
    <Badge visible style={[css.abs1, css.gray]}>{p.imgs.length}</Badge>
  </>
  return(
    <View>
      {imgs}
      <Modal visible={show}>
        {imgs}
      </Modal>
    </View>
  )
}

function flex(f=1){return <View style={{flex: f}}></View>}
const on0 = ()=>{}
function timeDiff(time: number){
  const diff = new Date().getTime() - time
  const sec=1e3, min=60*sec, hour=60*min, day=24*hour, 
    month=30*day, year=365*day
  const units = [year, month, day, hour, min, sec]
  const labels = ['year', 'month', 'day', 'hour', 'min', 'sec']
  for(var i=0; i<units.length; i++){
    const num = Math.floor(diff / units[i])
    if(num) return `${num} ${labels[i]}`
  }
  return '0 sec'
}

const css = StyleSheet.create({
  screen:{
    height:'100%', 
    backgroundColor:'white',
  },
  row:{
    flexDirection:'row'
  },
  row2:{
    flexDirection:'row', alignItems:'center'
  },
  aictr:{
    alignItems:'center',
  },
  card0:{
    borderBottomWidth:1, borderColor:'lightgray',
    padding: 3,
  },
  replyList:{
    borderLeftWidth: 6, borderColor:'gray',
  },
  iconBody:{
    borderRadius: 1e3, padding: 3, margin: 3,
  },
  btnBody:{
    borderRadius: 30, 
    paddingHorizontal: 10, paddingVertical: 3, 
    margin: 3,
  },
  gray:{
    backgroundColor:'lightgray', color:'white'
  },
  abs1:{
    position:'absolute', top:0, right:0
  },
  abs2:{
    position:'absolute', bottom:10, right:10
  },
  f1:{
    flex:1
  },
  t1:{
    color:'gray',
  },
  t2:{
    fontWeight:'bold',
    fontSize:18,
  },
  t3:{
    
  },
  t4:{
    fontWeight:'600',
    fontSize:16,
  },
  in1:{
    margin: 5,
    fontSize:18,
  },
  in2:{
    margin: 5,
    //borderBottomWidth:1, borderColor:'lightgray',
  },
  base1:{
    height:'100vh', width:'100vw', 
    backgroundColor:'black',
  },
  base2:{
    height:'100vh', width:'56vh',
    alignSelf:'center',
  },
})