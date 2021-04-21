
import React from 'react'
import { Provider } from 'react-native-paper'
import { MaterialCommunityIcons as McIcon } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Linking from 'expo-linking'
import './app.css'
import './test'

import Home from './screens/home'
import Add from './screens/add'
import Search from './screens/search'
import Idea from './screens/idea'
import Doge from './screens/doge'

export default Doge

/*
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App(){
  return(
    <Provider>
      <NavigationContainer linking={{prefixes:[
        Linking.createURL('/')
      ]}}>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='home' component={Home}/>
          <Stack.Screen name='add' component={Add}/>
          <Stack.Screen name='search' component={Search}/>
          <Stack.Screen name='idea' component={Idea} options={({route})=>({title: route?.params?.title })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

function Tabs(){
  return(
    <Tab.Navigator screenOptions={({route:{name}})=>({
      tabBarIcon: ({ size, color })=>{
        if(name==='home') return <McIcon name='home' size={size} color={color}/>
      }
    })}>
      <Tab.Screen name='home' component={Home}/>
      <Tab.Screen name='add' component={Add}/>
      
    </Tab.Navigator>
  )
}
*/