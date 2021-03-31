// lib import
import React from 'react'
import { 
  View, Text, FlatList, StyleSheet,
} from "react-native"
import {
  IconButton as IconB, Button, FAB, 
} from 'react-native-paper'
// local import
import { movies, movieType } from '../data/movies/movies'
import { Flex, Img } from '../components/basic'
import { icon, icons } from '../components/icons'
export { cssView, cssImg, cssText }

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
  const p: movieType = movies[0]
  return(
    <View style={cssView.head}>
      <Img style={cssImg.logo} uri={icon('idea')} resizeMode='contain'/>
      <Text style={cssText.title}>IdeaBank</Text>
      {Flex()}
      <IconB icon={icons.magnify}/>
      <Img style={cssImg.logo} uri={p.poster}/>
    </View>
  )
}

function IdeaList(){
  return(
    <FlatList
      data={movies}
      keyExtractor={(item, index)=>index.toString()}
      renderItem={({item})=>IdeaCard(item)}
    />
  )
}

function IdeaCard(p: movieType){
  return(
    <View style={cssView.row}>
      <View style={cssView.center}>
        <Img style={cssImg.avatar} uri={p.poster}/>
        <IconB icon={icons.up}/>
        <Text style={cssText.vote}>{p.overview.length}</Text>
        <IconB icon={icons.down}/>
      </View>
      <View style={cssView.main}>
        <Text style={cssText.title}>{p.title}</Text>
        <Text style={cssText.info}>{p.release_date}</Text>
        <Text style={cssText.body}>{p.overview}</Text>
        <Text style={cssText.tags}>{p.genres.join(', ')}</Text>
        <Img style={cssImg.image} uri={p.poster}/>
        <View style={cssView.rowc}>
          <Button icon={icons.comment}>{p.title.length}</Button>
          <Button icon={icons.retweet}>{p.genres.length}</Button>
          <Button icon={icons.hand}>{p.poster.length}</Button>
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
  rowc: { flexDirection: 'row', alignItems:'center' },
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
