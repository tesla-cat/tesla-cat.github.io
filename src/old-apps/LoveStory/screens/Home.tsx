
import React from 'react'
import { Button, Icon } from '../components/button'
import { Body, Flex1, Row } from '../components/view'
import { state } from '../mobx/main'
import { observer } from 'mobx-react'
import { CardList } from '../components/card'

export { Home }

const Home = observer(()=>{
    const {uid} = state.data.Text
    return(
        <Body>
            <Row bg='black'>
                <Icon id='ToSettings'/>
                {Flex1}
                {uid?<Button id='Mine' args={{uid}}/>:null}
                <Icon id='ToAddPost'/>
            </Row>
            <CardList uid={'Home'}/>
        </Body>
    )
})