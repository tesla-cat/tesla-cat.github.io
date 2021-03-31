
import React from 'react'
import { Provider } from 'react-native-paper'
import { MaterialCommunityIcons as MCicon } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Linking from 'expo-linking'
import './app.css'

import Home from './screens/home'
import Add from './screens/add'
import Search from './screens/search'
import MD from './screens/md'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App(){
  return(
    <Provider>
      <NavigationContainer linking={{prefixes:[
        Linking.createURL('/')
      ]}}>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='tabs' component={Tabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

function Tabs(){
  return(
    <Tab.Navigator screenOptions={({route:{name}})=>({
      tabBarIcon: ({ size, color })=>{
        if(name==='home') return <MCicon name='home' size={size} color={color}/>
      }
    })}>
      <Tab.Screen name='md' component={MD}/>
      <Tab.Screen name='home' component={Home}/>
      <Tab.Screen name='add' component={Add}/>
      <Tab.Screen name='search' component={Search}/>
    </Tab.Navigator>
  )
}
