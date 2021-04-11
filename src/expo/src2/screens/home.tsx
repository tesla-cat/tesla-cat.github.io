// lib import
import React, { useEffect, useState } from 'react'
import { 
  View, Text, FlatList, StyleSheet, 
} from "react-native"
import {
  IconButton as IconB, Button, FAB, 
} from 'react-native-paper'
// local import
import { search } from '../data/movies/movies2'
import { Flex, Img, MyLink } from '../components/basic'
import { icon, icons } from '../components/icons'
export { cssView, cssImg, cssText, ideaType, IdeaList, IdeaCard, HomeHead }

export default function HomePage(){
  const [ideas, setIdeas] = useState<ideaType[]>([])
  useEffect(()=>{
    search('柯南').then(setIdeas)
  })
  return(
    <View style={cssView.screen}>
      <HomeHead/>
      <IdeaList ideas={ideas}/>
      <FAB style={cssView.fab} icon={icons.pen}/>
    </View>
  )
}

function HomeHead(){
  return(
    <View style={cssView.head}>
      <MyLink to='home'><Img style={cssImg.logo} uri={icon('kitty-watch')} resizeMode='contain'/></MyLink>
      <Text style={cssText.title}>KittyTube</Text>
      {Flex()}
      <MyLink to='search' icon={icons.magnify}/>
    </View>
  )
}

type IdeaListType = { ideas: ideaType[] }
function IdeaList(p: IdeaListType){
  if(!p.ideas.length) return null
  return(
    <FlatList
      data={p.ideas}
      keyExtractor={(item, index)=>index.toString()}
      renderItem={({item})=><IdeaCard {...item}/>}
    />
  )
}

type ideaType = {
  id: string,
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
  //====================
  uris: string[],
}
function IdeaCard(p: ideaType){
  const card = (
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
        <View style={cssView.rowCenter}>
          <Button icon={icons.comment}>{p.numComment}</Button>
          <Button icon={icons.retweet}>{p.numRetweet}</Button>
          <Button icon={icons.hand}>{p.numHand}</Button>
          <Button icon={icons.share}> </Button>
          <Button icon={icons.dots}> </Button>
        </View>
      </View>
    </View>
  )
  return <MyLink to='idea' params={{id: p.id, title: p.title}}>{card}</MyLink>
}

const cssView = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  main: {flex: 1, padding: 6},
  row: { flexDirection: 'row', },
  rowCenter: { flexDirection: 'row', alignItems:'center' },
  rowGrid: { flexDirection: 'row', flexWrap:'wrap', justifyContent:'center' },
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
