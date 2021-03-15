
import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Icon } from '../components/button'
import { Body, Flex1, Row } from '../components/view'
import { state } from '../mobx/main'
import { observer } from 'mobx-react'

export { Settings }

const Settings = observer(()=>{
    const {uid} = state.data.Text
    return(
        <Body>
            <Row>
                <Icon id='back'/>
                {Flex1}
            </Row>
            <ScrollView>
                <Button id={uid?'Sign Out':'ToSignIn'} bg='red'/>
                <Button id='Reset App'/>
            </ScrollView>
        </Body>
    )
})