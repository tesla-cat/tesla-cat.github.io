// lib import
import React, { useEffect, useState } from 'react'
import { 
  View, Text, FlatList, StyleSheet,
} from "react-native"
import {
  IconButton as IconB, Button, FAB, 
} from 'react-native-paper'
// local import
import { movies } from '../data/movies/movies'
import { search } from '../data/movies/movies2'
import { Flex, Img } from '../components/basic'
import { icon, icons } from '../components/icons'
export { cssView, cssImg, cssText, ideaType }

export default function HomePage(){
  return(
    <View style={cssView.screen}>
      <Head/>
      <IdeaList/>
      <FAB style={cssView.fab} icon={icons.pen}/>
    </View>
  )
}

function Head(){
  const p: ideaType = movies[0]
  return(
    <View style={cssView.head}>
      <Img style={cssImg.logo} uri={icon('kitty-watch')} resizeMode='contain'/>
      <Text style={cssText.title}>影迷小猫</Text>
      {Flex()}
      <IconB icon={icons.magnify}/>
      <Img style={cssImg.logo} uri={p.avatar}/>
    </View>
  )
}

function IdeaList(){
  const [data, setData] = useState<ideaType[]>([])
  useEffect(()=>{
    search('柯南').then(setData)
  })
  if(!data.length) return null
  return(
    <FlatList
      data={data}
      keyExtractor={(item, index)=>index.toString()}
      renderItem={({item})=>IdeaCard(item)}
    />
  )
}

type ideaType = {
  avatar: string,
  vote: number,
  title: string,
  info: string,
  body: string,
  tags: string[],
  images: string[],
  numComment: number,
  numRetweet: number,
  numHand: number,
}
function IdeaCard(p: ideaType){
  return(
    <View style={cssView.row}>
      <View style={cssView.center}>
        <Img style={cssImg.avatar} uri={p.avatar}/>
        <IconB icon={icons.up}/>
        <Text style={cssText.vote}>{p.vote}</Text>
        <IconB icon={icons.down}/>
      </View>
      <View style={cssView.main}>
        <Text style={cssText.title}>{p.title}</Text>
        <Text style={cssText.info}>{p.info}</Text>
        <Text style={cssText.body}>{p.body}</Text>
        <Text style={cssText.tags}>{p.tags.join(', ')}</Text>
        <Img style={cssImg.image} uri={p.images[0]}/>
        <View style={cssView.rowC}>
          <Button icon={icons.comment}>{p.numComment}</Button>
          <Button icon={icons.retweet}>{p.numRetweet}</Button>
          <Button icon={icons.hand}>{p.numHand}</Button>
          <Button icon={icons.share}> </Button>
          <Button icon={icons.dots}> </Button>
        </View>
      </View>
    </View>
  )
}

const cssView = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  main: {flex: 1, padding: 6},
  row: { flexDirection: 'row' },
  rowC: { flexDirection: 'row', alignItems:'center' },
  center: { alignItems: 'center' },
  fab: { position:'absolute', right:6, bottom:6, backgroundColor:'white' },
  head: { flexDirection:'row', alignItems:'center', borderBottomWidth: 3 },
})

const cssImg = StyleSheet.create({
  avatar: { height: 50, width: 50, borderRadius: 1e3, margin: 6, },
  logo: { height: 30, width: 30, borderRadius: 1e3, margin: 6, },
  image: { height: 150, width: '100%', borderRadius: 20, padding: 6, marginVertical: 3 },
})

const cssText = StyleSheet.create({
  title: { fontWeight: 'bold' },
  search: { fontWeight: 'bold', flex: 1 },
  info: { color: 'gray' },
  body: { maxHeight: 100, overflow:'scroll' },
  tags: { color: 'blue' },
  vote: { fontWeight: 'bold' },
})

const cssTest = StyleSheet.create({
  blue: { backgroundColor: 'blue' },
  red: { backgroundColor: 'red' },
})
