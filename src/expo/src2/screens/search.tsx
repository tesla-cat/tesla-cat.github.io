// lib import
import React, {useState} from 'react'
import { View } from "react-native"
import {
  IconButton as IconB, 
} from 'react-native-paper'
// local import
import { Input, MyLink } from '../components/basic'
import { icons } from '../components/icons'
import { cssView, cssText, IdeaList, ideaType } from './home'
import { search } from '../data/movies/movies2'

export default function SearchPage(){
  const [ideas, setIdeas] = useState<ideaType[]>([])
  const [query, setQuery] = useState('')
  function onSearch(){
    search(query.trim()).then(setIdeas)
  }
  return(
    <View style={cssView.screen}>
      <View style={cssView.row}>
        <MyLink to='home' icon={icons.left}/>
        <Input style={cssText.search} placeholder={'search'} autoFocus onChangeText={setQuery}/>
        <IconB icon={icons.magnify} onPress={onSearch}/>
      </View>
      <IdeaList ideas={ideas}/>
    </View>
  )
}
