
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { CardList } from '../components/card'

export { User }

const User = ()=>{
    const { uid } = useRoute<any>().params
    return <CardList uid={uid}/>
}