
import React, { useEffect, useState } from 'react'
import {View, ActivityIndicator, ScrollView, Image} from 'react-native'
import { Body, Row, Avatar, Txt, Link, Box, Frame, Dummy, Btn, } from '../../components/main'
import { httpGetAsync } from '../../functionalities/jsonAPI'
import {winSize} from '../../components/constants'
import { useNavigation } from '@react-navigation/native'

export {SupplicantInfo}

const siteJson = 'https://raw.githubusercontent.com/tesla-cat/tesla-cat.github.io/master/2-json/mySite.json'

function SupplicantInfo(){
    const nav = useNavigation()
    const [data, setData] = useState()
    useEffect(()=>{
        httpGetAsync(siteJson).then(res=>JSON.parse(res)).then(res=>setData(res))
    },[])
    if(!data) return <Body><ActivityIndicator/></Body>
    const goodWid = Math.min(500, winSize.w)
    const goodHei = Math.min(300, winSize.h*0.5)
    return(
        <Body>
            <Row style={{padding:10, }}>
                <Avatar s={60} r={100}>{data.photo}</Avatar>
                <View style={{alignItems:'center', }}>
                    <Txt>{data.title}</Txt>
                    <Txt c='red'>Verified at cqtdr@nus.edu.sg</Txt>
                    <Row>{data.sections.map(({name,uri}, idx)=>(
                        <Link key={idx} h={uri||'#'+name}><Txt c={'blue'}>{name}</Txt></Link>
                    ))}</Row>
                </View>
                <Dummy></Dummy>
            </Row>
            <ScrollView>
                <View style={{alignItems:'center'}}>
                    <Frame w={goodWid} h={goodHei}>{data.videos[0]}</Frame>
                </View>
                <View style={{width:goodWid * 0.9, alignSelf:'center', margin:10, paddingTop:10, paddingHorizontal:10, backgroundColor:'skyblue', }}>
                    <Txt c='white'>My Dream:</Txt>
                    <Box h={6}/>
                    <Txt c='white' s={20}>{data.dream}</Txt>
                    <Row><Btn bg='black' on={()=> nav.navigate('Helping') }>help me with my dream</Btn></Row>
                </View>
                <View style={{padding:10}}>
                    {data.sections.map(({name, children, uri}, idx1)=>(
                        children?<View key={idx1} nativeID={name}>
                            <Link h={'#'+name}><Txt s={20} c={'blue'}>{name}</Txt></Link>
                            {children.map(({title, height, images}, idx2)=>(
                                <View key={idx2} style={{paddingLeft:10}}>
                                    <Txt>{title}</Txt>
                                    <Row style={{paddingLeft:10}}>
                                        {images.map((im,idx3)=> <ImageCard key={idx3} id={im.text} data={{...im, height}} index={idx3}/> )}
                                    </Row>
                                </View>
                            ))}
                        </View>:undefined
                    ))}
                </View>
            </ScrollView>
        </Body>
    )
}


const colors = ['red','blue','grey']
function ImageCard({id, data, index}){
    const {text, image, link, height} = data
    const [size, setSize] = useState({})
    useEffect(()=>{
        Image.getSize(image,(w,h)=>setSize({ h:height, w: w/h*height }) )
    },[])
    return(
        <View style={{alignItems:'center', margin:10, padding:10, maxWidth:winSize.w}}>
            <Link h={link || image}>
                <Image source={image} style={{height:size.h, width:Math.min(size.w, winSize.w*0.9)}} resizeMode='contain'></Image>
            </Link>
            {text.split('\n').map((t,idx)=><Txt key={idx} c={colors[idx]}>{t}</Txt>)}
        </View>
    )
}
