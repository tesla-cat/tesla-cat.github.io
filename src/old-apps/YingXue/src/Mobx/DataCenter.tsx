
import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainerRef } from '@react-navigation/native'

import { Obj } from '../Type/Type'

export { center, alert }

class DataCenter{
  postData: string[]
  data: Obj = {}
  nav: NavigationContainerRef | null = null
  constructor(){
    makeAutoObservable(this)
    this.postData = Array(9).fill(1).map((item, idx)=> `quill${idx}`)
    this.load()
  }
  load(){
    return AsyncStorage.getItem('YingXueData').then((text)=>{ 
      if(text) this.setData(JSON.parse(text))
      else this.save()
    })
  }
  save(){
    AsyncStorage.setItem('YingXueData', JSON.stringify(this.data))
  }
  set(key: string, obj: object){
    if(! this.data[key] ) this.data[key] = obj
    else this.data[key] = Object.assign( this.data[key], obj )
    this.save()
  }
  setData(data: Obj){
    this.data = data
  }
}

const center = new DataCenter()

function alert(text: string){
  center.set('system', { alert: text })
  setTimeout(()=>{
    center.set('system', { alert: null })
  }, text.length * 100)
}