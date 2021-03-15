
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Surface } from 'react-native-paper'

import { observer } from 'mobx-react'
import { state } from '../mobx/main'

import { Editor } from './input'
import { Row, Flex1, Body } from './view'
import { Txt, Icon, Loading } from './button'
import { getUserPosts } from '../firebase/post'

export { Card, CardList }

const Card = observer(({id} : {id:string})=>{
    const [show, setShow] = useState(false)
    const {uid, postTitle, postBody, score, myLike} = state.temp.posts[id]
    const {hide} = state.data.savedPosts[id] || {}
    const myuid = state.data.Text.uid
    return(
        <Surface style={styles.card}>
            <Txt val={postTitle} id='ToPost' args={{id}}/>
            <Editor val={JSON.parse(postBody)} id='null'/>
            <Row>
                <Icon id='like' args={{id}} bg={myLike==1 ? 'blue':'white'}/>
                <Txt val={score} id='null'/>
                <Icon id='hate' args={{id}} bg={myLike==-1 ? 'blue':'white'}/>
                {Flex1}
                <Icon id='hide' args={{id}} bg={hide ? 'blue':'white'}/>
                <Icon id='ToPost' args={{id}}/>
                <Icon id='more' on={()=> setShow(!show) }/>
            </Row>
            <View style={{display: show? undefined:'none'}}>
                <Row>
                    {myuid==uid?<Icon id='delete' args={{id}}/>:null}
                    {Flex1}
                    <Icon id='ToUser' args={{uid}}/>
                </Row>
            </View>
        </Surface>
    )
})

const CardList = observer(({uid} : {uid: string})=>{
    const [hideFilt, setHideFilt] = useState(false)
    const [likeFilt, setLikeFilt] = useState(0)
    useEffect(()=>{ getUserPosts({uid}) },[])
    const { posts, loading } = state.temp
    const { savedPosts } = state.data
    const ended = state.temp.userPostEnded[uid]

    const ids = Object.keys(posts).filter(pid =>{
        const hide = savedPosts[pid]?.hide || false
        var res = hide == hideFilt
        if(uid != 'Home') res = res && posts[pid].uid == uid
        if(likeFilt!=0) res = res && ( likeFilt == posts[pid].myLike )
        return res
    })
    return(
        <Body>
            <Row>
                {uid=='Home'? undefined : <Icon id='ToHome'/> }
                {uid=='Home'? undefined : <Icon id='back'/> }
                {Flex1}
                <Txt id='Filters'/>
                <Icon id='like' on={()=>{ setLikeFilt( (likeFilt==0)||(likeFilt==-1) ? 1 : 0) }} 
                    bg={likeFilt == 1 ? 'blue':'white'}/>
                <Icon id='hate' on={()=>{ setLikeFilt( (likeFilt==0)||(likeFilt==1) ? -1 : 0) }} 
                    bg={likeFilt == -1 ? 'blue':'white'}/>
                <Icon id='hide' on={()=>setHideFilt(!hideFilt)} bg={hideFilt ? 'blue':'white'}/>
            </Row>
            <FlatList data={['0', ...ids, '-1']} keyExtractor={(id)=>id} renderItem={({item})=>{
                if(item == '0'){
                    if(uid != 'Home') return null
                    else return <AppInfo/>
                }
                if(item == '-1'){
                    if(ended) return null
                    if(loading) return Loading
                    return <Icon id='GetUserPosts' args={{uid}}/>
                }
                return <Card id={item}/>
            }} onEndReached={()=>{
                if( (!loading) && (!ended) ) getUserPosts({uid})
            }}/>
        </Body>
    )
})

const AppInfo = ()=>{
    return(
        <Surface style={[styles.card, {backgroundColor:'black', padding:10}]}>
            <Txt id='slogan' color='white'/>
        </Surface>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:5,
        borderRadius:15,
        overflow:'hidden',
        flex:1,
    },
})