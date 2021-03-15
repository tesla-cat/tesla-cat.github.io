
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { form0, form1 } from "../Const/Forms"
import { center, alert } from "../Mobx/DataCenter"

export { signUp, signIn, signOut, resetPass }

firebase.initializeApp({
  apiKey: "AIzaSyDJsj0-x76LVCD_PYT9h_-35nhrdIiKgiI",
  authDomain: "snow-firefly.firebaseapp.com",
  projectId: "snow-firefly",
  storageBucket: "snow-firefly.appspot.com",
  messagingSenderId: "518375779805",
  appId: "1:518375779805:web:aefa2604fed6edf34ada34",
  measurementId: "G-09R62K449G"
})

const { auth, firestore } = firebase
const fire = firestore()
const userDB = fire.collection('user')

const error = (e:any)=>alert(e.message)
const check = (form: any, keys?: any, )=>{
  const Inp = center.data.Input
  if(!Inp) return
  if(!keys) keys = Object.keys(form)
  for(var key of keys){
    if(! Inp[key] ){
      alert(`请输入 ${ form[key].text }`)
    }
  }
  return Inp
}

auth().onAuthStateChanged((user)=>{
  center.set('system', { uid: user?.uid })
})

const signUp = ()=>{
  const Inp = check(form1)
  if(!Inp) return
  const {username, jobPlace, jobTitle, email, password} = Inp
  auth().createUserWithEmailAndPassword(email, password).then(({user})=>{
    if(user) userDB.doc(user.uid).set({ username, jobPlace, jobTitle, userLikeCount: 0 }).then(()=>{
      alert('注册成功')
    })
  }).catch(error)
}

const signIn = ()=>{
  const Inp = check(form0)
  if(!Inp) return
  const {email, password} = Inp
  auth().signInWithEmailAndPassword(email, password).catch(error)
}

const signOut = ()=>{
  auth().signOut().catch(error)
}

const resetPass = ()=>{
  const Inp = check(form1, ['email'])
  if(!Inp) return
  const {email} = Inp
  auth().sendPasswordResetEmail(email).then(()=>{
    alert('重置密码的邮件已发送')
  }).catch(error)
}