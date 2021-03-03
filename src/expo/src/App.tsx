
import React, { 
  memo, ReactNode, useEffect, useRef, useState 
} from 'react'
import { 
  Text, View, StyleSheet, Image, FlatList, ScrollView,
  Modal, TextInput, Dimensions, StyleProp, ViewStyle, 
  ImageStyle,
} from 'react-native'
import { 
  TouchableRipple, Badge, Button, IconButton, FAB
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { 
  NavigationContainer, useNavigation, useRoute 
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Linking from 'expo-linking'

import cloudbase from '@cloudbase/js-sdk'

import {pickWeb, pickWebType} from './pickWeb'
import {getData, getDataById} from './movies'
import './app.css'

export {data0Type}

var win = Dimensions.get('window')
const isPC = win.width > 0.75*win.height
if(isPC){
  win.width = 0.56 * win.height
}

const app = cloudbase.init({
  env: 'rick-5g5jicykd55413f5',
  region: "ap-guangzhou",
})
const db = app.database()
const auth = app.auth({persistence:'local'})

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const prefixes = [Linking.createURL('/SI/')]
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
      tabBarIcon:({size, color})=>{
        if(name=='home') return <Ionicons name='home-outline' size={size} color={color}/>
        else if(name=='home2') return <Ionicons name='home-outline' size={size} color={color}/>
      }
    })}>
      <Tab.Screen name='home' component={Home}/>
    </Tab.Navigator>
  )
}

const data1 = {
  // ids
  _openid: 'elonmusk',
  // user
  username: 'Elon Musk',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg',
  // about
  info: 'Neuralink Corporation is a neurotechnology company founded by Elon Musk and others, developing implantable brain–machine interfaces (BMIs).',
  cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Neuralink_logo.svg/330px-Neuralink_logo.svg.png',
  link: 'https://en.wikipedia.org/wiki/Elon_Musk',
  // stats
  numFollowing: 10,
  numFollowers: 10,
  // space
  joinedDate: new Date().getTime(),
  location: 'usa',
}
function User(){
  const [show, setShow] = useState(true)
  const p = data1
  const head = (
    <View style={[{display: show?'flex':'none'}]}>
      <View>
        <Imgs imgs={[p.cover]} style={{height:100}} 
          mode='contain'/>
        <View style={[css.row2, css.ph6]}>
          {flex()}
          <IconButton icon='email-outline' onPress={on0}/>
          <Btn on={on0}>follow</Btn>
        </View>
        <IconButton style={css.abs1} icon='dots-vertical' 
          onPress={on0}/>
        <Back style={css.abs3}/>
        <View style={css.abs4}>
          <Imgs imgs={[p.avatar]} style={css.avatar}/>
        </View>
      </View>
      <View style={css.ph6}>
        <Text style={css.t2}>{p.username}</Text>
        <Text style={css.t1}>@{p._openid}</Text>
        {box()}
        <Text style={css.t3}>{p.info}</Text>
        {box()}
        <View style={[css.row2, css.wrap]}>
          <Tag icon='location-outline'>{p.location}</Tag>
          <Tag icon='calendar-sharp'>{p.joinedDate}</Tag>
          <Tag icon='link'>{p.link}</Tag>
        </View>
        <View style={css.row2}>
          <Btn>{p.numFollowing} Following</Btn>
          <Btn>{p.numFollowers} Followers</Btn>
        </View>
      </View>
    </View>
  )
  const swiper = (
    <Swiper names={['Ideas', 'Replies', 'Media', 'Likes']}>{[
      <Data0List onShow={setShow}/>,
      <Data0List onShow={setShow}/>,
      <Data0List onShow={setShow}/>,
      <Data0List onShow={setShow}/>,
    ]}</Swiper>
  )
  return(
    <View style={css.screen}>
      {head}
      {swiper}
    </View>
  )
}

type SwiperType = {
  children: ReactNode[],
  names: string[]
}
function Swiper(p: SwiperType){
  const [percent, setPercent] = useState(0) 
  const scroll = useRef<ScrollView>(null)
  const N = p.names.length
  const active = Math.round( percent*N )
  //const txtLen = p.names.map(t=>t.length).reduce((a,b)=>a+b,0)
  //const percent2 = p.names[active].length/txtLen
  const bar = (
    <View style={{
      position:'absolute', left: percent*win.width, bottom: 0,
      width: win.width/N, height:3, backgroundColor:'blue'
    }}/>
  )
  return(
    <View style={css.f1}>
      <View style={[css.row2, css.card0, {
        justifyContent:'space-around',
      }]}>
        {p.names.map((name, idx)=>(
          <Btn key={idx} style={css.f1}
            color={active===idx?'blue' : 'gray'}
            on={()=>{
              scroll.current?.scrollTo({x: idx*win.width})
            }}
          >{name}</Btn>
        ))}
        {bar}
      </View>
      <ScrollView pagingEnabled horizontal ref={scroll}
        onScroll={({nativeEvent})=>{
          const x = nativeEvent.contentOffset.x
          const L = nativeEvent.contentSize.width
          setPercent(x/L)
        }} scrollEventThrottle={6}
      >
        {p.names.map((name, idx)=>(
          <View key={idx} style={{width: win.width, height:'100%'}}>
            {p.children[idx]}
          </View>
        ))}
    </ScrollView>
    </View>
  )
}

type TagType = {
  icon: string, children: ReactNode, 
  on?:()=>void, color?: string,
}
function Tag(p: TagType){
  return(
    <View style={[css.row2, {
      paddingHorizontal: 10
    }]}>
      <Ionicons name={p.icon}/>
      {box()}
      <Text style={css.t1}>{p.children}</Text>
    </View>
  )
}

type IdeaType = { _id: string }
function Idea(){
  const nav = useNavigation()
  const route: any = useRoute()
  const p: IdeaType = route.params
  const d1 = getDataById(p._id)
  function onReply(){
    nav.navigate('add', {
      replyToID: d1._id, title: `Re: ${d1.title}`
    })
  }
  const head = <>
    <View style={css.row2}>
      <Back/>
      {flex()}
      <Btn on={onReply}>advise / reply</Btn>
    </View>
    <Data0Card {...d1}/>
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
  const route: any = useRoute()
  const p: AddType = route.params
  const [imgs, setImgs] = useState<pickWebType[]>([])
  const txts1 = [
    'share', 'Title: summarize your startup idea', 
    'Detail: elaborate this idea'
  ]
  const txts2 = [
    'reply', p?.title||'' , 
    'Reply: make an advice or offer a cooperation'
  ]
  const txts = p?.title ? txts2 : txts1 
  return(
    <View style={css.screen}>
      <View style={css.row2}>
        <Back/>
        {flex()}
        <Btn>{txts[0]}</Btn>
      </View>
      <View style={css.row}>
        <Icon uri={data1.avatar} size={40}/>
        <View style={css.f1}>
          <TextInput style={css.in1} placeholder={txts[1]} 
            autoFocus value={p?.title}
          />
          <TextInput style={css.in2} placeholder={txts[2]} 
            multiline numberOfLines={6}/>
          <Imgs imgs={imgs.map(i=>i.uri)} 
            style={{height:200}} mode='contain'/>
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
  const head = (
    <View style={[css.card0, css.row2]}>
      <Icon name='idea' size={30}/>
      <View>
        <Text style={css.t2}>Startup Ideas</Text>
        <Text style={css.t1}>share idea, get advice, find team</Text>
      </View>
      {flex()}
      <IconButton icon='magnify' onPress={on0}/>
      <Icon uri={data1.avatar} size={30} on={()=>{
        nav.navigate('user')
      }}/>
    </View>
  )
  return(
    <View style={css.screen}>
      <Data0List head={head}/>
      <FAB style={css.abs2} icon='feather' onPress={()=>{
        nav.navigate('add')
      }}/>
    </View>
  )
}

const data0 = {
  // ids
  _id: '0',
  _openid: 'rick',
  // user
  username: 'Elon Musk',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg',
  // content
  title: 'Neuralink',
  body: 'Neuralink Corporation is a neurotechnology company founded by Elon Musk and others, developing implantable brain–machine interfaces (BMIs).',
  imgs: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Neuralink_logo.svg/330px-Neuralink_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pioneer_Building%2C_San_Francisco_%282019%29_-1.jpg/330px-Pioneer_Building%2C_San_Francisco_%282019%29_-1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Elon_Musk_and_the_Neuralink_Future.jpg/330px-Elon_Musk_and_the_Neuralink_Future.jpg',
  ],
  time: new Date().getTime(),
  // stats
  numComment: 10,
  numLike: 10,
  numHate: 10,
  numJoin: 10,
}
type data0Type = typeof data0

const Data0Card = memo((p: typeof data0)=>{
  const nav = useNavigation()
  return(
    <TouchableRipple onPress={()=>{
      nav.navigate('idea',{_id: p._id})
    }}>
      <View style={[css.card0, css.row]}>
        <View style={css.aictr}>
          <Icon uri={p.avatar} size={40} on={()=>{
            nav.navigate('user',{_openid: p._openid})
          }}/>
          <IconButton icon='arrow-up-bold' onPress={on0}/>
          <Text style={css.t4}>{p.numLike-p.numHate}</Text>
          <IconButton icon='arrow-down-bold' onPress={on0}/>
        </View>
        <View style={css.f1}>
          <Text style={css.t1}>
            {p.username} · {timeDiff(p.time)}
          </Text>
          <Text style={css.t2}>{p.title}</Text>
          <Text style={[css.t3, css.tbody]}>{p.body}</Text>
          {box()}
          <Imgs imgs={p.imgs} style={{height:200, 
            borderRadius: 20}}/>
          <View style={css.row2}>
            <Button icon='comment-outline' onPress={on0}>
              {p.numComment}</Button>
            <Button icon='hand' onPress={on0}>
              {p.numJoin}</Button>
          </View>
        </View>
        <IconButton style={css.abs1} icon='chevron-down' 
          onPress={on0}/>
      </View>
    </TouchableRipple>
  )
})

type DataListType = {
  style?: StyleProp<ViewStyle>,
  head?: ReactNode, onShow?: (show: boolean)=>void,
}
function Data0List(p: DataListType){
  const [show, setShow] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [data, setData] = useState(getData())
  function set(sh: boolean){
    if(p.head) setShow(sh)
    if(p.onShow) p.onShow(sh)
  }
  return <>
    <View style={{display:show?'flex':'none'}}>
      {p.head}
    </View>
    <FlatList 
      data={data} style={p.style} 
      renderItem={({item})=>(<Data0Card {...item}/>)} 
      keyExtractor={(item, idx)=>idx+''}
      onScroll={e=>{
        const curY = e.nativeEvent.contentOffset.y
        const diff = curY - lastY
        if(diff > 10) set(false) 
        if(diff < -10) set(true) 
        setLastY(curY)
      }}
    />
  </>
}

type BackType = {
  style?: StyleProp<ViewStyle>,
}
function Back(p: BackType){
  const nav = useNavigation()
  return(
    <IconButton icon='arrow-left' onPress={()=>{
      if(nav.canGoBack()) nav.goBack()
      else nav.navigate('tabs',{screen:'home'})
    }} style={p.style}/>
  )
}

type IconType = {
  name?: string, size: number, on?: ()=>void
  uri?: string
}
function Icon(p: IconType){
  const uri = p.uri || require(`./imgs/${p.name}.svg`)
  return(
    <TouchableRipple onPress={p.on || on0} 
      style={css.iconBody}>
      <Image source={{uri}} style={{
        height: p.size, width: p.size, borderRadius: 1e3
      }}/>
    </TouchableRipple>
  )
}

type BtnType = {
  children: ReactNode, on?:()=>void, color?: string,
  style?: StyleProp<ViewStyle>,
}
function Btn1(p: BtnType){
  return(
    <TouchableRipple style={[css.btnBody,{
      backgroundColor:p.color
    }]} onPress={p.on || on0} >
      <Text style={[css.t4, {
        color: p.color?'white':'blue'
      }]}>{p.children}</Text>
    </TouchableRipple>
  )
}

function Btn(p: BtnType){
  return(
    <TouchableRipple style={[css.btnBody,p.style]} 
      onPress={p.on || on0} >
      <Text style={[css.t4, { 
        color: p.color || 'blue'
      }]}>{p.children}</Text>
    </TouchableRipple>
  )
}

function FullImg(p: {uri: string}){
  const [size, setSize] = useState<number[]|null>(null)
  useEffect(()=>{
    Image.getSize(p.uri, (w, h)=> setSize([w,h]) )
  },[])
  if(!size) return null
  const w = win.width
  const h = size[1] / size[0] * w 
  return(
    <Image style={{
      width: w, height: h, marginVertical:3
    }} source={{uri: p.uri}}/>
  )
}

type ImgsType = {
  imgs: string[], 
  style: StyleProp<ImageStyle>,
  mode?: "center" | "stretch" | "contain" | "cover" | "repeat" | undefined
}
function Imgs(p: ImgsType){
  if(!p.imgs.length) return null
  const [show, setShow] = useState(false)
  const toggle = ()=>setShow(!show)
  const badge = p.imgs.length>1 ? (
    <Badge visible style={[css.abs1, css.gray]}>
      {`1 / ${p.imgs.length}`}
    </Badge>
  ) : null
  const img1 = (
    <TouchableRipple style={p.style} onPress={toggle}>
      <Image style={p.style} source={{uri:p.imgs[0]}} 
      resizeMode={p.mode}/>
    </TouchableRipple>
  )
  const imgs = (
    <ScrollView>
      {p.imgs.map((img, idx)=>(
        <TouchableRipple key={idx} onPress={toggle}>
          <FullImg uri={img}/>
        </TouchableRipple>
      ))}
    </ScrollView>
  )
  return(
    <View>
      {img1}{badge}
      <Modal visible={show}>{imgs}</Modal>
    </View>
  )
}

function on0(){}
function flex(f=1){return <View style={{flex: f}}/>}
function box(w=6,h=6){return <View style={{height:h, width:w}}/>}
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
  screen:{ height:'100%', backgroundColor:'white' },
  row:{ flexDirection:'row' },
  row2:{ flexDirection:'row', alignItems:'center' },
  wrap:{ flexWrap:'wrap' },
  aictr:{ alignItems:'center' },
  abs1:{ position:'absolute', top:    3, right: 3 },
  abs2:{ position:'absolute', bottom: 3, right: 3 },
  abs3:{ position:'absolute', top:    3, left:  3 },
  abs4:{ position:'absolute', bottom: 3, left:  3 },
  f1:{ flex:1 },
  ph6:{ paddingHorizontal: 6 },
  card0:{
    borderBottomWidth:1, borderColor:'lightgray',
    padding: 3,
  },
  replyList:{
    borderLeftWidth: 6, borderColor:'blue',
  },
  avatar:{
    height: 60, width: 60, borderRadius: 1e3, margin: 3,
  },
  iconBody:{
    borderRadius: 1e3, padding: 3, margin: 3,
  },
  btnBody:{
    borderRadius: 30, 
    paddingHorizontal: 10, paddingVertical: 3, 
    margin: 3, alignItems:'center',
  },
  gray:{
    backgroundColor:'lightgray', color:'white'
  },
  tbody:{
    maxHeight: 100, overflow:'scroll',
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
  },
  base1:{
    height: win.height, width:'100vw', 
    backgroundColor:'black',
  },
  base2:{
    height: win.height, width: win.width,
    alignSelf:'center',
  },
})