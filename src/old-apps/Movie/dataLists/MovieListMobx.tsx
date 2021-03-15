
// react
import React, { useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import { Button, IconButton, TouchableRipple } from 'react-native-paper'
// mobx
import { observer } from "mobx-react"
import { dataCenter } from '../DataCenter'
// components
import { LikeButtonMobx } from '../components/buttons'
import { useNavigation } from '@react-navigation/native'

export { MovieListMobx, MovieHistListMobx, MovieMobx, MovieSearchListMobx }

const MovieList = () => {
    if(!dataCenter.doneInit) return <ActivityIndicator/>
    else {
        const movieIDs = Object.keys(dataCenter.movies)
        const loadMore = ()=>{
            if(movieIDs.length < 1000) dataCenter.fetch()
        }
        return(
            <View style={styles.body1}>
                <FlatList data={movieIDs} keyExtractor={(item)=>item} renderItem={({item, index})=>{
                    if(index == movieIDs.length-1) return(
                        <IconButton style={styles.IconButton1} icon={'chevron-down-circle'} onPress={loadMore}/>
                    )
                    return <MovieMobx id={item}/>
                }}/>
                <Text style={styles.text4}>{movieIDs.length}({dataCenter.pages.movies})</Text>
            </View>
        )
    }
}
const MovieListMobx = observer(MovieList)

const MovieHistList = () => {
    var movieIDs = Object.keys(dataCenter.movieHist)
    return(
        <View style={styles.body1}>
            <FlatList data={movieIDs} keyExtractor={(item)=>item} renderItem={({item, index})=>{
                console.log(dataCenter.movieHist[item])
                if(!dataCenter.movieHist[item]) return null
                return(
                    <View style={styles.row1}>
                        <MovieMobx id={item}/>
                        <IconButton icon='delete' onPress={()=>{
                            dataCenter.delHist(item)
                        }}/>
                    </View>
                )
            }}/>
            <Text style={styles.text4}>{movieIDs.length}</Text>
        </View>
    )
}
const MovieHistListMobx = observer(MovieHistList)

const MovieSearchList = () => {
    const [query, setQuery] = useState('')
    const movieIDs = Object.keys(dataCenter.movieSearchResultIDs)
    const queries = Object.keys(dataCenter.movieSearchQueries)
    const loadMore = (theQuery:string)=>{
        if(movieIDs.length < 1000 && query) dataCenter.search(theQuery)
    }
    return(
        <View style={styles.body1}>
            <FlatList data={movieIDs} keyExtractor={(item)=>item} renderItem={({item, index})=>{
                return <MovieMobx id={item}/>
            }}/>
            <View style={styles.scroll2}>
                <ScrollView>
                    <View style={styles.row4}>
                        {queries.map((oldQuery)=>(
                            <TouchableRipple onPress={()=>loadMore(oldQuery)}>
                                <Text style={styles.text5}>{oldQuery}</Text>
                            </TouchableRipple>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.row1}>
                <TextInput onChangeText={setQuery} value={query} style={[styles.input1, {outline:'none'}]}/>
                <Button onPress={()=>loadMore(query)}>搜索{movieIDs.length? '更多':''}</Button>
            </View>
            <Text style={styles.text4}>{movieIDs.length}({dataCenter.searchPages.movies})</Text>
        </View>
    )
}
const MovieSearchListMobx = observer(MovieSearchList)

const Movie = ({id} : any) => {
    const nav = useNavigation()
    const {
        typeID, 
        title, text, imgs, 
        rawUris,
        area, lang, year, 
        info, 
    } = dataCenter.movies[id]
    const type = dataCenter.types[typeID]
    return(
        <View style={styles.card1}>
            <View style={styles.row1}>
                <Image source={{uri: imgs[0]}} style={styles.image1}/>
                <View style={styles.body2}>
                    <TouchableRipple onPress={()=> nav.navigate('Play', {id, title}) }>
                        <View>
                            <Text style={styles.text1}>{title}</Text>
                            <View style={styles.row1}>
                                <Text style={styles.text3}>{area}</Text>
                                <Text style={styles.text3}>{lang}</Text>
                                <Text style={styles.text3}>{year}</Text>
                            </View>
                            <View style={styles.row1}>
                                <Text style={styles.text3}>{type}</Text>
                                <Text style={styles.text3}>{info}</Text>
                            </View>
                        </View>
                    </TouchableRipple>
                    <ScrollView style={styles.scroll1}>
                        <Text style={styles.text2}>{text}</Text>
                    </ScrollView>
                    <View style={styles.row3}>
                        <LikeButtonMobx id={id}/>
                    </View>
                </View>
            </View>
        </View>
    )
}
const MovieMobx = observer(Movie)

const styles = StyleSheet.create({
    body1:{
        flex:1,
    },
    body2:{
        flex:1,
        padding:10,
        height: 200,
    },
    scroll1:{
        flex:1,
    },
    scroll2:{
        height:60,
    },
    row1:{
        flexDirection:'row',
    },
    row2:{
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    row3:{
        flexDirection:'row',
        justifyContent:'flex-end',
        position:'absolute',
        right:0,
        bottom:0,
        zIndex:1,
    },
    row4:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap',
    },
    card1:{
        flex:1,
        marginVertical: 2,
        backgroundColor: 'white',
    },
    text1:{
        fontSize: 16,
        color:'blue',
        margin: 3,
        fontWeight:'bold',
    },
    text2:{
        fontSize: 14,
        color:'grey',
        margin: 3,
    },
    text3:{
        fontSize: 12,
        color:'red',
        margin: 3,
    },
    text4:{
        fontSize: 14,
        color:'blue',
        margin: 3,
        fontWeight:'bold',
        alignSelf:'center',
        position:'absolute',
        right:0,
        bottom:0,
        zIndex:1,
    },
    text5:{
        margin:3,
        borderRadius: 30,
        backgroundColor: 'aqua',
        fontSize:14,
        paddingHorizontal:10,
        paddingVertical:3,
        fontWeight:'bold',
        color:'gray',
    },
    input1:{
        margin:6,
        borderRadius: 30,
        backgroundColor: 'aqua',
        flex:1,
        fontSize:16,
        paddingHorizontal:20,
        paddingVertical:6,
        fontWeight:'bold',
        color:'gray',
    },
    image1:{
        height: 200,
        width: 130,
    },
    IconButton1:{
        alignSelf:'center',
    },
})
