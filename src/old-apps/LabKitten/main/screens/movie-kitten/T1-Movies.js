
import React, { useState, useEffect } from 'react'

import {List, Body, Input, Row, Btn} from '../../components/main'
import {MovieCard} from '../../components/cards'
import {getMovies} from '../../functionalities/jsonAPI'
import {loadHistory} from '../../functionalities/storage'

export {Movies}

function Movies(){
    const [form, setForm] = useState({
		keyword: '', 
    })
    const [movies, setMovies] = useState({})
    useEffect(()=>{ setMovies(loadHistory()) },[])
    function set(object){setForm(Object.assign({...form}, object))}
    return(
        <Body>
            <List Card={MovieCard}>{movies}</List>
            <Row>
                <Input p='搜索影片名' on={keyword=>set({keyword})}>{form.keyword}</Input>
                <Btn on={()=>getMovies(form.keyword).then(m=>setMovies(m))}>搜索</Btn>
            </Row>
        </Body>
    )
}

