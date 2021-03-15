
import React, {ReactNode} from 'react'
import { View, StyleSheet } from 'react-native'
export { Row, Body, Box, Flex1 }

function Row({children, bg} : {children: ReactNode, bg?:string}){
    return(
        <View style={[styles.row, {backgroundColor:bg}]}>{children}</View>
    )
}

function Body({children} : {children: ReactNode}){
    return(
        <View style={styles.body}>{children}</View>
    )
}

function Box({height, width} : {height?:number, width?:number}){
    return <View style={{height, width}}></View>
}

const Flex1 = <View style={{flex:1}}/>

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    body:{
        flex:1,
    },
})