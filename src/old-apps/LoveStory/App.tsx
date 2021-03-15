
import React from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Snackbar } from 'react-native-paper'

import { Home } from './screens/Home'
import { Post } from './screens/Post'
import { User } from './screens/User'
import { Settings } from './screens/Settings'
import { SignIn } from './screens/SignIn'
import { SignUp } from './screens/SignUp'
import { AddPost } from './screens/AddPost'

export { alert }

const Stack = createStackNavigator()

const alertBody = observable([null])
const alert = action((body: any)=>{
    alertBody[0] = body
})

var { width, height } = Dimensions.get('window')
if(width > height) width = height

export default observer(function App(){
    return(
        <View style={{flex:1, width, alignSelf:'center'}}>
            <NavigationContainer>
                <Stack.Navigator headerMode='none'>
                    
                    <Stack.Screen name='Home' component={Home}/>
                    <Stack.Screen name='Post' component={Post}/>
                    <Stack.Screen name='User' component={User}/>
                    <Stack.Screen name='Settings' component={Settings}/>
                    <Stack.Screen name='AddPost' component={AddPost}/>
                    <Stack.Screen name='SignIn' component={SignIn}/>
                    <Stack.Screen name='SignUp' component={SignUp}/>
                </Stack.Navigator>
            </NavigationContainer>
            <Snackbar visible={alertBody[0] ? true:false} onDismiss={()=>alert(null)} 
                duration={ (alertBody[0]||'').length * 50}>
                {alertBody[0]}
            </Snackbar>
        </View>
    )
})

alert('Welcome to Love Story !')