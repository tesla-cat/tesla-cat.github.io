// react
import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
// mobx
import { observer } from "mobx-react"
import { dataCenter } from '../DataCenter'
import { useNavigation } from '@react-navigation/native'

export { LikeButtonMobx, BackButton }

const LikeButton = ({id} : any) => {
    const state = dataCenter.movieLikes[id]
    var icon = 'heart-outline', color = 'grey'
    if(state === 1){ icon = 'heart'; color = 'red' }
    else if(state === -1){ icon = 'thumb-down'; color = 'black' }
    return(
        <IconButton icon={icon} color={color} onPress={()=>{
            dataCenter.like(id)
        }}/>
    )
}
const LikeButtonMobx = observer(LikeButton)

const BackButton = ()=>{
    const nav = useNavigation()
    return(
        <IconButton icon={'arrow-left'} onPress={()=>{
            nav.goBack()
        }}/>
    )
}
