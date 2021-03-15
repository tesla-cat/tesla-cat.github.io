
import React from 'react'
import { View } from 'react-native'

import './src/app.css'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from './src/Screen/Home'
import { Post } from './src/Screen/Post'
import { Ask } from './src/Screen/Ask'
import { Message } from './src/Screen/Message'
import { User } from './src/Screen/User'
import { Auth } from './src/Screen/Auth'
import { center } from './src/Mobx/DataCenter'
import { Alert } from './src/Component/Basic'

export default App

const Stack = createStackNavigator()

function App(){
  return(
    <View style={{flex:1}}>
      <NavigationContainer ref={ref => center.nav = ref } linking={{prefixes:[]}}>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Post' component={Post}/>
          <Stack.Screen name='Ask' component={Ask}/>
          <Stack.Screen name='Message' component={Message}/>
          <Stack.Screen name='User' component={User}/>
          <Stack.Screen name='Auth' component={Auth}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Alert/>
    </View>
  )
}
