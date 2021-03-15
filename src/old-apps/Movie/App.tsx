
// react
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
// navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// tabs
import { Tabs } from './Tabs'
// screens
import { MovieDetailMobx } from './dataDetails/MovieDetail'
// typescript
import { Obj } from './typescript/interfaces'
// constants
import { newWidth, winHeight, isWeb } from './constants/dim'

export default Stacks

type RootStackParamList = {
    Tabs: undefined;
    MovieDetailMobx: { id: string, title: string };
}
const Stack = createStackNavigator<RootStackParamList>()

function Stacks(){
    return(
        <View style={styles.body2}>
            <View style={isWeb ? styles.bodyWeb1 : styles.body1}>
                <NavigationContainer>
                    <Stack.Navigator headerMode='none'>
                        <Stack.Screen name='Tabs' component={Tabs}></Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body1:{
        flex:1,
    },
    bodyWeb1:{
        flex:1,
        width: newWidth,
        alignSelf:'center',
    },
    body2:{
        flex:1,
        backgroundColor:'black',
    },
})