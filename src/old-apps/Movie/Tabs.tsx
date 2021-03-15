
// react
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
// navigation
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
// components
import { MovieListMobx, MovieHistListMobx, MovieSearchListMobx } from './dataLists/MovieListMobx'
import { MovieDetailMobx } from './dataDetails/MovieDetail'
import { Quill } from './components/input'

// typescript
import { Obj } from './typescript/interfaces'

export {Tabs}

const Tab = createBottomTabNavigator()
const TabMat = createMaterialBottomTabNavigator()

function Tabs(){
    const nav = useNavigation()
    const [active, setActive] = useState('Home')
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={MovieListMobx}/>
            <Tab.Screen name='Search' component={MovieSearchListMobx}/>
            <Tab.Screen name='Play' component={MovieDetailMobx}/>
            <Tab.Screen name='Hist' component={MovieHistListMobx}/>
        </Tab.Navigator>
    )
}

/**
 * ({ route: {name} })=>({
            tabBarButton: ({})=>(
                <IconButton icon={screenToIcon[name]} style={styles.IconButton1} onPress={()=>{
                    setActive(name)
                    nav.navigate(name)
                }} color={active===name?'blue':'grey'}/>
            )
        })
 */

/**
 * <Tab.Screen name='Search' component={MovieDetailMobx}></Tab.Screen>
            <Tab.Screen name='Notification' component={MovieListMobx}></Tab.Screen>
            <Tab.Screen name='Message' component={MovieListMobx}></Tab.Screen>
            <Tab.Screen name='Account' component={MovieListMobx}></Tab.Screen>
 */

const screenToIcon : Obj = {
    Home: 'home',
    Play: 'youtube-tv',
    Hist: 'history',
    Search: 'magnify',
    Notification: 'bell',
    Message: 'email',
    Account: 'account',
}

const styles = StyleSheet.create({
    IconButton1:{
        flex:1,
    },
})