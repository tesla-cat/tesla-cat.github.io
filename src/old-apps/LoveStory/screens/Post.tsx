
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Card } from '../components/card'
import { Row, Body, Flex1 } from '../components/view'
import { Icon } from '../components/button'

export { Post }

const Post = ()=>{
    const { id } = useRoute<any>().params
    return(
        <Body>
            <Row>
                <Icon id='ToHome'/>
                <Icon id='back'/>
                {Flex1}
            </Row>
            <Card id={id}/>
        </Body>
    )
}