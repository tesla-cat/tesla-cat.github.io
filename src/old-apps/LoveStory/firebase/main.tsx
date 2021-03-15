
import firebase from 'firebase'
import { alert } from '../App'
export { auth, fire, firestore, success, error, alert }

const success = ()=>{ alert('success') }
const error = (e:any)=>{ alert(e.message) }

firebase.initializeApp({
    apiKey: "AIzaSyDbQjoEpL1XmPCb25vR3VOPB31guB7nzE4",
    authDomain: "tesla-cat.firebaseapp.com",
    databaseURL: "https://tesla-cat.firebaseio.com",
    projectId: "tesla-cat",
    storageBucket: "tesla-cat.appspot.com",
    messagingSenderId: "736038948544",
    appId: "1:736038948544:web:8b3ed548b884c97e712725",
    measurementId: "G-NHCY1H60MV"
})
const { auth, firestore } = firebase
const fire = firestore()
