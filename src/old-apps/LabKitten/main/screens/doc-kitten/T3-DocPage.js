
import React, { useState, useEffect } from 'react'
import {Body, Row, Btn, Txt, Input} from '../../components/main'
import { useRoute } from '@react-navigation/native'
import { saveDocPage, fire } from '../../functionalities/firebase'

export {DocPage}

const url = 'https://doc-kitten.github.io/editor'

function DocPage(){
    const p = useRoute().params
    const [form, setForm] = useState({
		path: '', 
    })
    const [edit, setEdit] = useState(false)
    function set(object){setForm(Object.assign({...form}, object))}

    var webView
    useEffect(()=>{
        if(webView && p && p.childId ){
            fire().collection('docPages').doc(p.childId).get().then(doc=>{
                var {delta, path} = doc.data()
                console.log(delta)
                webView.contentWindow.postMessage(delta, '*')
                setForm({path})
            })
        }
    },[webView,p])

    useEffect(()=>{
        if(webView){
            webView.contentWindow.postMessage({edit}, '*')
        }
    },[edit])
    
    if(!p) return <Body><Row><Txt>please select a doc</Txt></Row></Body>

    return(
        <Body>
            { edit ?
                <Input p='path' on={path=>set({path})}>{form.path}</Input>:
                <Row style={{padding:10}}><Txt>{form.path}</Txt></Row>
            }
            <iframe ref={r=> webView = r }
                src={url} frameborder="0" width='100%' height='100%' allowTransparency
                allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
            ></iframe>
            <Row>
				{edit?<Btn bg='red' on={()=>{alert('TODO: delete')}}>delete</Btn>:undefined}
				<Btn on={()=>{
                    if(edit) updateQuill(webView, p, form)
                    setEdit(!edit)
                }}>{edit?'save':'edit'}</Btn>
			</Row>
        </Body>
    )
}

function updateQuill(webView, p, form){
    if(webView){
        window.onmessage = function(e){
            if(e.data){
                var delta = JSON.parse(e.data)
                saveDocPage(p, form, delta)
            }
        }
        webView.contentWindow.postMessage(JSON.stringify({update:true}), '*')
    }
}


 
/**
<Btn on={()=>{
                if(webView){
                    var delta = [
                        { insert: 'Hi ' },
                        { insert: 'World!', attributes: { bold: true } },
                        { insert: '\n' }
                    ]
                    var message = {delta}
                    webView.contentWindow.postMessage(JSON.stringify(message), '*')
                }
            }} >hi</Btn>

*/

