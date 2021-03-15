
import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {Button} from 'react-native-paper'
import Slider from '@react-native-community/slider'

import {Flex1, Row1, Text1, Input1, Buttons1, styles1} from './Components1'
import {ReqMaker} from './api'

export {LabControlApp}

function LabControlApp(){
    return(
        <Flex1 style={styles1.body1}>
            <DeviceManagers/>
        </Flex1>
    )
}

const reqMaker = new ReqMaker('http://localhost:5000/')

interface MyObject { [key: string]: any; }
function DeviceManagers(){
    const initData: MyObject = {}
    const [data, setData] = useState(initData)
    const [active, setActive] = useState('')
    useEffect(getManagers, [])
    function getManagers(){
        reqMaker.get().then(res=> setData(res))
    }
    var managerIds = Object.keys(data)
    return(
        <Flex1>
            <Row1>
                <Text1>manager Ids</Text1>
                <Buttons1 onPress={setActive} active={active}>{managerIds}</Buttons1>
            </Row1>
            <Flex1>
                {managerIds.map(managerId=>(
                    <DeviceManager key={managerId} managerId={managerId} initData={data[managerId]}/>
                ))}
            </Flex1>
        </Flex1>
    )
}

function DeviceManager({initData, managerId}: {initData:any, managerId:string} ){
    const [data, setData] = useState(initData)
    const [active, setActive] = useState('')

    function resetManager(){
        reqMaker.post({managerId, type:'resetManager',args: 0}).then(res=>{
            if(res.status==='success'){
                alert(res.status)
                console.log(res.result)
                setData(res.result)
            }
        })
    }
    
    var deviceIds = Object.keys(data)
    const reset = <Button onPress={resetManager}>resetManager</Button>
    if(!deviceIds.length) return reset
    return(
        <Flex1>
            {reset}
            <Row1>
                <Text1>device Ids</Text1>
                <Buttons1 onPress={setActive} active={active}>{deviceIds}</Buttons1>
            </Row1>
            <Flex1>
                {deviceIds.map(deviceId=>(
                    <Device key={deviceId} {...{managerId, deviceId}} initData={data[deviceId]}/>
                ))}
            </Flex1>
        </Flex1>
    )
}

function Device({initData, managerId, deviceId}: {initData:any, managerId:string, deviceId:string} ){
    const [data, setData] = useState(initData)
    var valueIds = Object.keys(data)
    return(
        <Flex1>
            <Text1>value Ids</Text1>
            <ScrollView>
                {valueIds.map(valueId=>(
                    <Value key={valueId} {...{managerId, deviceId, valueId}} initData={data[valueId]}/>
                ))}
            </ScrollView>
        </Flex1>
    )
}

function Value({initData, managerId, deviceId, valueId}
    : {initData:any, managerId:string, deviceId:string, valueId:string} 
){
    const [data, setData] = useState(initData)
    const [text, setText] = useState('')
    const [slider, setSlider] = useState(0)

    function setDeviceValue(value:number|null){
        if(value === null) return
        var body = {managerId, type:'setDeviceValue',args: { key: valueId, value, i: parseInt(deviceId)} }
        console.log(body)
        reqMaker.post(body)
        .then(({status, result})=>{
            console.log(status, result)
            if(status === 'success'){
                alert('success')
                var newData = {...data}
                newData.value = result[valueId]
                setData(newData)
            }
        })
    }
    function convertText(textValue:string){
        if(!textValue) return null
        var float = parseFloat(textValue) 
        if(! ( float >= data.range[0] && float <= data.range[1] ) ){
            alert('value out of range')
            return null
        }
        return float
    }
    function convertSlider(sliderValue:number){
        var val = (data.range[1]-data.range[0]) * sliderValue + data.range[0]
        return Math.round((val + Number.EPSILON) * 100) / 100
    }
    return(
        <Flex1 style={styles1.card1}>
            <Button>{valueId}</Button>
            <Text1>{data.value} {data.unit}</Text1>
            <Text1>Range: {data.range.join(', ')}</Text1>
            <Row1>
                <Flex1>
                    <Slider onValueChange={setSlider}/>
                    <Text1>{convertSlider(slider)}</Text1>
                </Flex1>
                <Button onPress={()=>setDeviceValue(convertSlider(slider))}>set</Button>
            </Row1>
            <Row1>
                <Input1 value={text} onChangeText={setText}/>
                <Button onPress={()=>setDeviceValue(convertText(text))}>set</Button>
            </Row1>
        </Flex1>
    )
}