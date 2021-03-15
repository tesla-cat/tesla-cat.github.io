
import React from 'react'
import { Input, Editor } from '../components/input'
import { Icon } from '../components/button'
import { Body, Flex1, Row } from '../components/view'

export { AddPost }

function AddPost(){
    return(
        <Body>
            <Row>
                <Icon id='back'/>
                {Flex1}
                <Icon id='addPost'/>
            </Row>
            <Input id='postTitle'/>
            <Editor id='postBody'/>
        </Body>
    )
}
