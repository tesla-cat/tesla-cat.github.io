
import React from 'react'
import { Input } from '../components/input'
import { Button, Icon } from '../components/button'
import { Body, Box, Flex1, Row } from '../components/view'

export { SignUp }

function SignUp(){
    return(
        <Body>
            <Row>
                <Icon id='ToHome'/>
                <Icon id='back'/>
                {Flex1}
            </Row>
            {Flex1}
            <Input id='email'/>
            <Input id='password'/>
            <Box height={60}/>
            <Button id='Sign Up'/>
            {Flex1}
        </Body>
    )
}
