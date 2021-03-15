
import React,{useEffect, useState} from 'react'
import { Body } from '../../components/main'
import {MyCanvas, Ball, BallWithPath} from '../../components/threeMain'

export {Game}

function Game(){
    const [x, setX] = useState(0)
    useEffect(()=>{
        setTimeout(()=>{
            setX(x+0.2)
        },50)
    },[x])
    return(
        <Body>
            <MyCanvas>
                <Ball opa={0.2}/>
                <BallWithPath p={[Math.cos(x),Math.sin(x),0]} r={0.05}/>
                <Ball p={[Math.sin(x),0,Math.cos(x)]} r={0.05}/>
                <Ball p={[0,Math.cos(x),Math.sin(x)]} r={0.05}/>
            </MyCanvas>
        </Body>
    )
}


// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});