
import React from 'react'
import { View } from 'react-native'

import { TopBar } from '../Component/TopBar'
import { Picker } from '../Component/Picker'
import { Card1List } from '../CardList/Card1List'
import { options0, options1 } from '../Const/Options'
import { Card1 } from '../Card/Card1'
import { Card1B } from '../Card/Card1B'
import { ActBar } from '../Component/ActBar'
import { cardAct1 } from '../Const/CardAct'

export { Home }

const Home = ()=>{
  const elms = [
    <Card1List Card={Card1B} cols={1} ph={40} pv={20} name='Home'/>,
    <Card1List Card={Card1} cols={3} ph={40} pv={20} name='Home'/>,
  ]
  return(
    <View style={{flex:1, height:'100vh', width:'100vw', backgroundColor:'white'}}>
      <TopBar/>
      <View style={{flexDirection:'row', flex:1}}>
        <Picker val={options0}/>
        <View style={{flex:1}}>
          {elms[0]}
          <ActBar val={cardAct1}/>
        </View>
        <Picker val={options1}/>
      </View>
    </View>
  )
}
