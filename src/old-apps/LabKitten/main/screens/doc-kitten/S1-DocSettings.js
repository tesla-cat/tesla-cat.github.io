
import React, {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { Body, Btn, Row, Input, Txt, Box } from '../../components/main'
import { saveSettings} from '../../functionalities/firebase'

export {DocSettings}

function DocSettings(){
    var p = useRoute().params
    var {title, collaborators, uid} = p.data
    collaborators = collaborators.join('\n')
    const [form, setForm] = useState( {title, collaborators, uid} )
    const [id, setId] = useState(p.id)
    function set(object){setForm(Object.assign({...form}, object))}
    
    return(
        <Body>
            <Input p='title' on={title=>set({title})}>{form.title}</Input>
            <Box h={30}></Box><Row><Txt>collaborators (one per line):</Txt></Row>
            <Input n={10} p='collaborators' on={collaborators=>set({collaborators})}>{form.collaborators}</Input>
            <Row>
				<Btn bg='red' on={()=>{alert('TODO: delete')}}>delete</Btn>
				<Btn on={()=> setId( saveSettings(id, form) ) }>save</Btn>
			</Row>
        </Body>
    )
}
