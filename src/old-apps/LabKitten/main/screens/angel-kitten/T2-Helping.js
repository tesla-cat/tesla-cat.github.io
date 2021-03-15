
import React, { useEffect, useState } from 'react'
import {View, ActivityIndicator, ScrollView, Image} from 'react-native'
import { Body, Row, Avatar, Txt, Link, Box, Frame, Dummy, Btn, Input, } from '../../components/main'
import {winSize} from '../../components/constants'
import {getHelps, fire} from '../../functionalities/firebase'
import {useNavigation, useRoute} from '@react-navigation/native'

export {Helping, Helpers}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Helping(){
    const nav = useNavigation()
    const [form, setForm] = useState({
        name: '', relation: '', lendAmount:'', contact:'',  
    })
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    useEffect(()=>{
        getHelps('Ding Ruiqi', d=>setData(d))
    },[])
    
    function set(k,v){var o={...form}; o[k]=v; setForm(o)}
    const fields = [
        'My name is',  'I am your', 'I want to lend you (SGD)', 'contact me by', 
    ]
    
    var ents = Object.entries(data)
    var len = ents.length
    var sum = ents.map(([k,v])=> v.lendAmount ).reduce((a, b) => a + b, 0)
    var money = {
        unit: 'k SGD',
        details: [
            {text:'i have', amount: 80},
            {text:len +' people want to lend me', amount: sum/1000},
            {text:'i need', amount: 200},
        ],
        reasons: [
            {q:'what do you need the money for?', a:'I want to do a PhD in Germany, for that I need to pay the Singapore scholarship bond deposit'},
            {q:'what is your financial situation?', a:'I am a freshly graduated student from a single mother family, my mom does not have a stable job, we have 20k in total'},
            {q:'what other approaches have you tried?', a:'I am currently applying for student loan, it will be 60k'},
            {q:'how much can you repay per month?', a:'The PhD salary will be 6k SGD per month, I will use 5k to repay the debt'},
        ]
    }
    return(
        <Body>
            <View style={{flexDirection:'row', justifyContent:'space-evenly', padding:10, }}>
                {money.details.map((d,idx)=>(
                    <View key={idx} style={{alignItems:'center', maxWidth: winSize.w / money.details.length, }}>
                        <Txt>{d.text}</Txt>
                        <Dummy></Dummy>
                        <Txt s={30} c='grey'>{d.amount}</Txt>
                    </View>
                ))}
            </View>
            <Row><Txt>unit: {money.unit}</Txt></Row>
            <Row><Btn on={()=>nav.navigate('Helpers', data)}>view all helpers</Btn></Row>
            <ScrollView>
                {money.reasons.map((res,idx)=>(
                    <View key={idx} style={{padding:10, }}>
                        <Txt s={20} c='skyblue'>{res.q}</Txt>
                        <View style={{paddingLeft:20, padding:10}}>
                            <Txt c='grey'>{res.a}</Txt>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{alignItems:'center', }}>
                {open && Object.keys(form).map((k,idx)=>(
                    <Row key={idx}>
                        <Txt>{fields[idx]}</Txt>
                        <Input on={t=>set(k,t)} w={160}>{form[k]}</Input>
                    </Row>
                ))}
                <Row>
                    {!open && <Btn on={()=>setOpen(true)} bg='black'>i am willing to lend you money</Btn>}
                    {open && <Btn on={()=>setOpen(false)} bg='black'>close</Btn>}
                    {open && <Btn bg='black' on={()=>{
                        var check = Object.keys(form).every(k => form[k])
                        if(!check) return 
                        form.lendAmount = parseFloat(form.lendAmount)
                        if(!form.lendAmount) return 
                        fire().collection('helps').doc(form.name).set({...form, targetId: 'Ding Ruiqi' }).then(()=>{
                            alert('success !')
                            setOpen(false)
                        })                      
                    }}>send</Btn>}
                </Row>
            </View>
        </Body>
    )
}

function Helpers(){
    const p = useRoute().params
    return(
        <Body>
            <ScrollView>
                {Object.values(p).map(form=>(
                    <Row style={{padding:10, margin:10, }}>
                        <Txt>{form.name} ({form.relation})</Txt>
                        <Txt>{form.lendAmount}</Txt>
                    </Row>
                ))}
            </ScrollView>
        </Body>
    )
}