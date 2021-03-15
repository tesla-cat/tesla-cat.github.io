
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

import { Body, Btn, Row, List, Txt } from '../../components/main'
import { DocCard } from '../../components/cards'
import { auth, getDocs } from '../../functionalities/firebase'

export {Docs}

function Docs(){
    const nav = useNavigation()
    const [docs, setDocs] = useState({})
	useEffect(()=>{
		auth().onAuthStateChanged(()=>{
			if(auth().currentUser){
                getDocs(d=>setDocs(d))
            }
            else nav.navigate('SignUp')
		})
    },[])

    return(
        <Body>
            <Row><Btn on={()=>{
                if(auth().currentUser){
                    const initForm = {
                        title: '', 
                        collaborators: [auth().currentUser.email],
                        uid: auth().currentUser.uid,
                    }
                    nav.navigate('DocSettings', {data: initForm})
                }
                else nav.navigate('SignUp')
            }}>add new documentation</Btn></Row>
            <List Card={DocCard}>{docs}</List>

        </Body>
    )
}


