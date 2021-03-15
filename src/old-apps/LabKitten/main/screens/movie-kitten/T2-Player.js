
import React, { useState, useEffect } from 'react'
import {ScrollView} from 'react-native'
import { useRoute } from '@react-navigation/native'
import ReactPlayer from 'react-player'

import {saveHistory} from '../../functionalities/storage'
import {Body, Row, Btn, Txt} from '../../components/main'
import { styles } from '../../styles/main'

export {Player}

function Player(){
    const p = useRoute().params
    const [url, setUrl] = useState('')
    const [info, setInfo] = useState('')
    useEffect(()=>{
        if(p) {
            var url_ = p.url || p.sources[0][0][1]
            var info_ = p.info || [p.vod_name, p.sources[0][0][0]].join(' ')
            setUrl(url_)
            setInfo(info_)
            saveHistory(p, url_, info_)
        }
    },[p])

    if(!p) return <Body><Row><Txt>未选择影视</Txt></Row></Body>
    const {
        type_name, vod_actor, vod_content, vod_director, vod_id, vod_lang, 
        vod_name, vod_pic, sources, vod_remarks, vod_year,
    } = p
    const colors = ['gray', 'skyblue']
    return(
        <Body>
            <Row>
                {url.endsWith('m3u8')?
                    <ReactPlayer url={url} controls width='100%' height={360}/>
                :
                    <iframe 
                        src={url} frameborder="0" width='100%' height={360}
                        allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                    ></iframe>
                }
            </Row>
            <Row style={styles.card}><Txt>{info}</Txt></Row>
            <ScrollView>
                {sources.map((source, index1)=>(
                    <Row key={index1}>
                        {source.map(episode=>(
                            <Btn bg={colors[index1]} on={()=>{
                                var url_ = episode[1]
                                var info_ = [vod_name,episode[0]].join(' ')
                                setUrl(url_)
                                setInfo(info_)
                                saveHistory(p, url_, info_)
                            }}>{episode[0]}</Btn>
                        ))}
                    </Row>
                ))}
            </ScrollView>
        </Body>
    )
}







