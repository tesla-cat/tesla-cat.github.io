
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Body, Btn, Row, Txt, } from '../../components/main'
import { getDocTree } from '../../functionalities/firebase'
import { Parent } from '../../components/functional'



export {DocTree}

function DocTree(){
    const p = useRoute().params
    const nav = useNavigation()
    const [docTree, setDocTree] = useState({})
    useEffect(()=>{
        if(p){
            getDocTree(p, (tree)=>{
                setDocTree(tree)
            })
        }
    },[p])
    if(!p) return <Body><Row><Txt>please select a doc</Txt></Row></Body>
    
    return(
        <Body>
            <Row><Btn on={()=>nav.navigate('DocPage', p)}>add new page to {p.data.title}</Btn></Row>  
            <Parent obj={docTree} ></Parent>
        </Body>
    )
}

