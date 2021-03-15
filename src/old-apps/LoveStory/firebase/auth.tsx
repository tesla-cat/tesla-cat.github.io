
import { auth, error, success, alert } from './main'

import { action } from 'mobx'
import { state } from '../mobx/main'

export { signUp, signIn, signOut, resetPass }

const set = action((user: firebase.User|null)=>{ state.data.Text.uid = user?.uid })
auth().onAuthStateChanged(set)

function signUp(args: any){
    const {email, password} = state.data.Input
    auth().createUserWithEmailAndPassword(email || '', password || '')
    .then(success).then(()=> args.nav.navigate('AddPost') )
    .catch(error)
}

function signIn(args: any){
    const {email, password} = state.data.Input
    auth().signInWithEmailAndPassword(email || '', password || '')
    .then(success).then(()=> args.nav.navigate('AddPost') )
    .catch(error)
}

function signOut(){
    auth().signOut()
    .then(success)
    .catch(error)
}

function resetPass(){
    const {email} = state.data.Input
    auth().sendPasswordResetEmail(email || '')
    .then(()=> alert('Password reset email sent !') )
    .catch(error)
}