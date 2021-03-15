
import React from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import { IconButton, Surface, TouchableRipple } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'

import { idToIcon } from './idToIcon'
import { idToLabel } from './idToLabel'
import { idToAction } from './idToAction'

export { Button, Txt, Icon, Loading }

const Button = ({id, args, bg='grey', flex} : {id:string, args?:any, bg?:string, flex?:number})=>{
    const value = idToLabel(id)
    const nav = useNavigation()
    const route = useRoute()
    return(
        <Surface style={[styles.card, {backgroundColor:bg, flex:flex}]}>
            <TouchableRipple onPress={()=> idToAction(id, {nav, route, ...args}) }>
                <Text style={styles.text}>{value}</Text>
            </TouchableRipple>
        </Surface>
    )
}

const Txt = ({id, args, val, color} : {id:string, args?:any, val?:string, color?:string})=>{
    const value = val!=undefined? val : idToLabel(id)
    const nav = useNavigation()
    const route = useRoute()
    return(
        <TouchableRipple onPress={()=> idToAction(id, {nav, route, ...args}) }>
            <Text style={[styles.text2, {color}]}>{value}</Text>
        </TouchableRipple>
    )
}

const Icon = ({id, args, bg='white', on} : {id:string, args?:any, bg?:string, on?:()=>any})=>{
    const value = idToIcon(id)
    const nav = useNavigation()
    const route = useRoute()
    const onPress = ()=>{
        if(on) on()
        else idToAction(id, {nav, route, ...args})
    }
    return(
        <Surface style={[styles.card, {backgroundColor:bg}]}>
            <IconButton onPress={onPress} style={styles.icon} icon={value} color={bg=='white'?'black':'white'}/>
        </Surface>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
        borderRadius:30,
        overflow:'hidden',
        alignSelf:'center',
    },
    text:{
        fontSize:16, 
        fontWeight:'bold', 
        paddingHorizontal:20,
        paddingVertical:5,
        color:'white',
    },
    text2:{
        fontSize:20, 
        fontWeight:'bold', 
        marginHorizontal:10,
        marginVertical:5,
    },
    icon:{
        margin:0,
    },
    loading:{
        margin:5,
        fontWeight:'bold',
    },
})

const Loading = (
    <Surface style={[styles.card, {backgroundColor:'white'}]}>
        <ActivityIndicator style={styles.loading}/>
    </Surface>
)