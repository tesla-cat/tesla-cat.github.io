
// react
import React from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { IconButton, Button } from 'react-native-paper'
import { Video } from 'expo-av'
// constants
import { vidHeight } from '../constants/dim'

export {MyVideo1}

const MyVideo1 = ({uri} : {uri:string})=>{
    if(uri.endsWith('m3u8')) return(
        <video style={{height: vidHeight}} controls autoPlay>
            <source src={uri} type="application/x-mpegURL"/>
        </video>
    )
    else return <iframe src={uri} style={{height: vidHeight, border:'none'}} allowFullScreen></iframe>
}

const styles = StyleSheet.create({
    video1:{
        height: vidHeight,
    },
})