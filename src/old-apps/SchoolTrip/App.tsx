
// react
import React from 'react'
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { IconButton, Surface, TouchableRipple } from 'react-native-paper'
// nav
import { NavigationContainer, NavigationContainerRef, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// image
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
// mobx
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// db
import firebase from "firebase/app"
import "firebase/firestore"
// css
import './app.css'

// nav
const Stack = createStackNavigator()

// image

// mobx
class DataCenter{
  data: any = {}
  nav: NavigationContainerRef | null = null
  constructor(){
    makeAutoObservable(this)
    this.load()
  }
  set(key1: string, key2: string, val: any){
    if(!this.data[key1]) this.data[key1] = {}
    this.data[key1][key2] = val
    this.save()
  }
  set2(key1: string, val:any){
    this.data[key1] = val
    this.save()
  }
  set3(val:any){
    this.data = val
  }
  save(){
    AsyncStorage.setItem('SchoolTrip', JSON.stringify(this.data))
  }
  load(){
    AsyncStorage.getItem('SchoolTrip').then((text)=>{
      if(text) this.set3(JSON.parse(text))
      else this.save()
    })
  }
}
const center = new DataCenter()
const alert = (msg:string)=>{
  center.set('App', 'alert', msg)
  setTimeout(()=>{
    center.set('App', 'alert', undefined)
  }, msg.length * 200 )
}

// db
firebase.initializeApp({
  apiKey: "AIzaSyDJsj0-x76LVCD_PYT9h_-35nhrdIiKgiI",
  authDomain: "snow-firefly.firebaseapp.com",
  projectId: "snow-firefly",
  storageBucket: "snow-firefly.appspot.com",
  messagingSenderId: "518375779805",
  appId: "1:518375779805:web:aefa2604fed6edf34ada34",
  measurementId: "G-09R62K449G"
})
const postDB = firebase.firestore().collection('SchoolTripPost')

// react
const win = Dimensions.get('window')
const isPhone = win.height > win.width
const Flex1 = <View style={{flex:1}}></View>
type IconArg = { icon: string, on?: ()=>any, nav?: { to: string, arg?: any } }

const Icon = (arg: IconArg)=>{
  const nav = useNavigation()
  return(
    <IconButton icon={arg.icon} size={30} style={{backgroundColor:'black'}} color='white' onPress={()=>{
      if(arg.on) arg.on()
      if(arg.nav) nav.navigate(arg.nav.to, arg.nav.arg)
    }}/>
  )
}

// screens
const App = observer(()=>{
  const msg = center.data.App?.alert
  return(
    <View style={{flex:1, flexDirection:'row'}}>
      { isPhone? null : Flex1}
      <View style={{flex:1}}>
        <NavigationContainer ref={ref => center.nav = ref } linking={{prefixes:[]}}>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Add' component={Add}/>
            <Stack.Screen name='Home' component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
        <View style={{position:'absolute', left:0, right:0, bottom:0, margin:10, display: msg?'flex':'none', 
        backgroundColor: 'black', padding:20, borderRadius:20 }}>
          <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>{msg}</Text>
        </View>
      </View>
      { isPhone? null : Flex1}
    </View>
  )
})
export default App

const Home = ()=>{
  return(
    <View style={{flex:1}}>
      <Text>hi</Text>
      <View style={{position:'absolute', right:0, bottom:0, margin:5, alignItems:'flex-end'}}>
        <Icon icon='plus' nav={{to:'Add'}}/>
        <Text>添加校园活动</Text>
      </View>
    </View>
  )
}

const imgs0 = [
  'https://steamuserimages-a.akamaihd.net/ugc/360651810458562262/B0F16DE7F1C79716C5BBFDBECFAACA2F801E2049/',
  'https://pcdn.sharethis.com/wp-content/uploads/2018/08/wechat-1024x1024.png',
]
const form0 :any = {
  cover: { text: '为活动配图(点击下方图片):', image: imgs0[0], error: '请为活动配图' },
  school: { text: '我的学校' },
  time: { text: '日期与时间' },
  meetPoint: { text: '集合地点', rows: 3 },
  title: { text: '活动标题' },
  body: { text: '详情', rows: 3 },
  type: { text: '类型', options: ['线下', '线上'], error: '请选择类型' },
  wechat: { text: '发起人/群聊微信二维码:', image: imgs0[1], mode: 'contain', error: '请添加发起人/群聊微信二维码' },
}

const addPost = ()=>{
  for(var key of Object.keys(form0)){
    if(! (center.data.Add || {})[key] ){
      alert( form0[key].error || `请填写${form0[key].text}`)
      return
    }
  }
  postDB.add(center.data.Add).then(()=>{
    alert('发布成功')
    center.set2('Add', {})
    center.nav?.navigate('Home')
  })
}

const Add = observer(()=>{
  const data = center.data.Add || {}
  return(
    <View style={{flex:1, backgroundColor:'white'}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Icon icon='arrow-left' nav={{to:'Home'}}/>
        <Text style={{fontSize:20, fontWeight:'bold', marginHorizontal:10}}>发起校友活动</Text>
        {Flex1}
        <Icon icon='check' on={addPost}/>
      </View>
      <View style={{flex:1, overflow: 'scroll', paddingBottom: 100}}>
        { Object.entries(form0).map(([key, obj]: any)=>{
          if( obj.options ){
            return(
              <View key={key} style={{flexDirection:'row', margin: 10, paddingHorizontal: 20, alignItems:'center', }}>
                <Text style={{fontSize:20, color:'grey'}}>{obj.text}</Text>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', flex:1}}>
                  {obj.options.map((opt:any)=>(
                    <Surface key={opt} style={{margin:10, borderRadius: 30, overflow:'hidden', 
                      backgroundColor:data[key]==opt?'blue': 'white'}}>
                      <TouchableRipple onPress={()=> center.set('Add', key, opt) }>
                        <Text style={{paddingHorizontal:10, paddingVertical:5, color: data[key]==opt? 'white':'blue', 
                        fontWeight:'bold'}}>{opt}</Text>
                      </TouchableRipple>
                    </Surface>
                  ))}
                </View>
              </View>
            )
          }
          else if( obj.image ){
            return(
              <View key={key}>
                <Text style={{fontSize:20, color:'grey', margin:10}}>{obj.text}</Text>
                <TouchableRipple onPress={()=>{ ImagePicker.launchImageLibraryAsync().then((res:any)=>{
                  const {cancelled, height, width, uri} = res
                  if(!cancelled){
                    const compress = Math.min( 200/height, 400/width )
                    ImageManipulator.manipulateAsync(res.uri, undefined, { 
                      compress, format: ImageManipulator.SaveFormat.JPEG 
                    }).then((res2)=>{
                      console.log( compress )
                      console.log( res.uri.length, res2.uri.length )
                      center.set('Add', key, res2.uri)
                    })
                  }
                }) }}>
                  <Image style={{height:200, flex:1}} source={{uri: data[key] || obj.image}} resizeMode={obj.mode}/>
                </TouchableRipple>
              </View>
            )
          }
          else return(
            <Surface key={key} style={ obj.rows? inputCSS.two : inputCSS.one }>
              <TouchableRipple onPress={()=>{}}>
                <TextInput placeholder={obj.text} style={{paddingHorizontal:20, paddingVertical:5, fontSize: 20, 
                  outline:'none'}} multiline={obj.rows>1} numberOfLines={obj.rows} 
                  onChangeText={(text)=> center.set('Add', key, text) } value={data[key] || ''}/>
              </TouchableRipple>
            </Surface>  
          )
        }) }
      </View>
    </View>
  )
})

// css
const inputCSS = StyleSheet.create({
  one: {
    margin: 10, overflow: 'hidden', elevation: 0, backgroundColor: undefined, 
    borderColor:'aqua', borderBottomWidth: 4,
  },
  two: {
    margin: 10, overflow: 'hidden',
  },
})