
import React from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native'
import {Button} from 'react-native-paper'

export {Flex1, Row1, Text1, Input1, Buttons1, styles1}

const Flex1=(props: any)=>(<View style={[props.style, styles1.flex1]} {...props}>{props.children}</View>)
const Row1=(props: any)=>(<View style={[styles1.row1, props.style]} {...props}>{props.children}</View>)
const Text1=(props: any)=>(<Text style={[styles1.text1, props.style]} {...props}>{props.children}</Text>)
const Input1=(props: any)=>(
    <TextInput style={[styles1.input1, props.style, {outline: 'none'}]} {...props}></TextInput>
)
const Buttons1=(props:{children: string[], onPress: (key:string)=>void, active:string})=>(
    <Row1>    
        {props.children.map(child=>(
            <Button key={child} {...props} onPress={()=>props.onPress(child)} 
            color={child===props.active?'red':undefined}>
                {child}
            </Button>
        ))}
    </Row1>
)

const styles1 = StyleSheet.create({
    null: {},
    viewTest: {
        backgroundColor:'aqua',
    },
    flex1:{
        flex:1,
    },
    row1:{
        flexDirection:'row', 
        alignItems:'center'
    },
    text1:{
        color:'grey', 
        fontSize:16,
        marginHorizontal:6, marginVertical:3,
        textAlign:'center',
    },
    input1:{
        color:'blue',
        fontSize:20,
        textAlign:'center',
        borderWidth:3,
        borderColor:'skyblue',
        borderRadius: 30,
        flex:1,
    },
    body1:{
        flex:1,
        backgroundColor:'lavenderblush',
        width:600,
        margin:'auto',
    },
    card1:{
        margin: 10,
        elevation: 10,
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingVertical:6,
        borderRadius:30, 
    }
})