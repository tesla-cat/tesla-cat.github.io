
import { makeAutoObservable, action } from 'mobx'
import Store from '@react-native-community/async-storage'

export { state, Obj, obj0 }

interface Obj { [key: string] : any }
const obj0 : Obj = {}

const data0 = { savedPosts: obj0, Input: obj0, Text: obj0 }
const temp0 = { posts: obj0, lastUserPost: obj0, userPostEnded: obj0 }

class State{
    data : Obj = data0
    temp : Obj = temp0
    constructor(){
        makeAutoObservable(this)
        this.load()
    }
    save(){
        Store.setItem('@data', JSON.stringify(this.data))
    }
    load(){
        Store.getItem('@data').then(action((res:any)=>{ if(res) Object.assign(this.data, JSON.parse(res)) }))
    }
    reset(){
        this.data = data0
        this.save()
    }
}

const state = new State()
