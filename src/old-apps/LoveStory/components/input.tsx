
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Surface, TouchableRipple } from 'react-native-paper'

import { idToLabel } from './idToLabel'

import { action } from 'mobx'
import { observer } from 'mobx-react'
import { state } from '../mobx/main'

export { Input, Editor }

const Input = observer(({id} : {id:string})=>{
    const value = state.data.Input[id] || ''
    const set = action((text:string)=>{ state.data.Input[id] = text; state.save() })
    return(
        <Surface style={styles.card}>
            <TouchableRipple onPress={()=>{}}>
                <TextInput style={[styles.text, {outline:'none'}]} 
                    placeholder={idToLabel(id)} value={value} onChangeText={set}
                />
            </TouchableRipple>
        </Surface>
    )
})

declare global{
    interface Window { initQuill: (options: any)=>any, quill: any }
}
const Editor = observer(({id, val} : {id:string, val?:any })=>{
    const value = val || state.data.Input[id] || []
    const set = action((text:any)=>{ state.data.Input[id] = text; state.save() })
    const options = { 
        placeholder: idToLabel(id), theme: 'snow',
        modules: { formula: true, syntax: true, toolbar: val?null: '#tools' }, 
        readOnly: val?true:false,
    }
    return(
        <Surface style={styles.cardEditor}>
            <iframe srcDoc={require(val?'./quillView.html':'./quill.html')} 
                style={{flex:1, border:0}} ref={web=>{
                if(web?.contentWindow) web.contentWindow.onload = ()=>{
                    if(web?.contentWindow){
                        web.contentWindow.initQuill(options)
                        const {quill} = web.contentWindow
                        quill.setContents(value)
                        quill.on('text-change',()=> set( quill.getContents() ) )
                    }
                }
            }}/>
        </Surface>
    )
})

const styles = StyleSheet.create({
    card:{
        margin:10,
        borderRadius:30,
        overflow:'hidden',
    },
    cardEditor:{
        flex:1,
        elevation:0,
    },
    text:{
        fontSize:20, 
        fontWeight:'bold', 
        paddingHorizontal:30,
        paddingVertical:10,
        color:'blue',
    },
})