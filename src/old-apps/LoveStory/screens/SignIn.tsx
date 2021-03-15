
import React from 'react'
import { Input } from '../components/input'
import { Button, Icon } from '../components/button'
import { Body, Box, Flex1, Row } from '../components/view'

export { SignIn }

function SignIn(){
    return(
        <Body>
            <Row>
                <Icon id='ToHome'/>
                <Icon id='back'/>
                {Flex1}
                <Button id='ToSignUp' bg='red'/>
            </Row>
            {Flex1}
            <Input id='email'/>
            <Input id='password'/>
            <Box height={60}/>
            <Row>
                <Button id='Forgot Password'/>
                <Button id='Sign In'/>
            </Row>
            {Flex1}
        </Body>
    )
}
