
// react
import React from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { IconButton, Button } from 'react-native-paper'
// navigation
import { useRoute } from '@react-navigation/native'
// mobx
import { observer } from "mobx-react"
import { dataCenter } from '../DataCenter'
import { cookUris } from '../dataCenters/moviesCenter'
// components
import { MovieMobx } from '../dataLists/MovieListMobx'
import { MyVideo1 } from '../components/videos'
// constants
import { vidHeight } from '../constants/dim'

export {MovieDetailMobx}

const MovieDetail = () => {
    const {params} = useRoute()
    var id = Object.keys(dataCenter.movies)[0]
    if(params) id = params.id
    const {
        typeID, 
        title, text, imgs, 
        rawUris,
        area, lang, year, 
        info, 
    } = dataCenter.movies[id]
    const uris = cookUris(rawUris)
    var hist = dataCenter.movieHist[id] || [0, uris[0][0][0] ]

    const [histSourceID, histEpisodeID] = hist
    const curUri = uris[histSourceID].filter(([episodeID, episodeUri])=> episodeID==histEpisodeID )[0][1]
    
    return(
        <View style={styles.body1}>
            <MovieMobx id={id}/>
            <MyVideo1 uri={curUri}/>
            <Text style={styles.text2}>播放源 {histSourceID+1} {histEpisodeID}</Text>
            <ScrollView style={styles.scroll2}>
                {uris.map((source, sourceID)=>(
                    <View>
                        <Text style={styles.text1}>播放源 {sourceID+1}</Text>
                        <View style={styles.row1}>
                            {source.map(([episodeID, episodeUri])=>(
                                <Button color={ (histSourceID==sourceID && histEpisodeID==episodeID)?'red':'blue' }
                                onPress={()=>{
                                    const newHist = [sourceID, episodeID]
                                    dataCenter.setHist(id, newHist)
                                }}>
                                    {episodeID}
                                </Button>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
const MovieDetailMobx = observer(MovieDetail)

const styles = StyleSheet.create({
    body1:{
        flex:1,
    },
    scroll1:{
        flex:1,
    },
    scroll2:{
        flex:1,
    },
    row1:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
    },
    text1:{
        margin:6,
        fontSize:14,
        fontWeight:'bold',
    },
    text2:{
        margin:6,
        fontSize:14,
        fontWeight:'bold',
        color:'blue',
        alignSelf:'center',
    },
    video1:{
        height: vidHeight,
    },
})
