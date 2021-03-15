
import { fire, firestore, error, success, alert } from './main'

import { action } from 'mobx'
import { state } from '../mobx/main'

export { addPost, getUserPosts, likePost, hidePost, delPost }

const db = fire.collection('post')
const likeDB = fire.collection('postLike')
const set = action((id: any, data: any)=>{ state.temp.posts[id] = data })
const setLast = action((uid: any, doc: any)=>{ state.temp.lastUserPost[uid] = doc })
const setEnded = action((uid: any)=>{ state.temp.userPostEnded[uid] = true })
const del = action((id: any)=>{ delete state.temp.posts[id] })
const update = action((id: any, data: any)=>{ state.temp.posts[id] = Object.assign(state.temp.posts[id], data) })
const setLoading = action((loading: any)=>{ state.temp.loading = loading })

const hidePost = action(({id}: any)=>{ 
    if(! state.data.savedPosts[id]) state.data.savedPosts[id] = {}
    state.data.savedPosts[id].hide = ! state.data.savedPosts[id].hide
    state.save()
})

const post0 = {score: 0}
function addPost(args: any){
    const {postTitle, postBody} = state.data.Input
    const {uid} = state.data.Text
    if(! (postTitle && postBody)) return
    if(! (postTitle.length > 6)){ alert('Title is too short !'); return }
    if(! (postBody.ops[0].insert.length > 6)){ alert('Story is too short !'); return }
    if(! (uid)){ args.nav.navigate('SignIn'); return }
    const post = { uid, postTitle, postBody: JSON.stringify(postBody), ...post0 }
    db.add(post)
    .then((doc)=>{ args.nav.navigate('User', {uid}) })
    .then(success)
    .catch(error)
}

function getUserPosts({uid}:any){
    setLoading(true)
    var res
    if(uid == 'Home') res = db.orderBy('score', 'desc')
    else res = db.where('uid', '==', uid).orderBy('score', 'desc')
    const lastDoc = state.temp.lastUserPost[uid]
    if(lastDoc) res = res.startAfter(lastDoc)
    res.limit(1).get()
    .then(({docs})=>{
        setLoading(false)
        if(!docs.length){ alert('All stories loaded'); setEnded(uid); return }
        docs.map( doc =>{ set(doc.id, doc.data()); getMyLike(doc) })
        setLast(uid, docs[docs.length-1])
    })
}

function getMyLike({id}:any){
    const {uid} = state.data.Text
    if(! (uid)){ return }
    likeDB.doc(`${id}-${uid}`).get().then((doc)=>{ update(id, {myLike: doc.data()?.val}) })
}

function likePost({id, val, nav}:any){
    const {uid} = state.data.Text
    if(! (uid)){ nav.navigate('SignIn'); return }
    var {myLike, score} = state.temp.posts[id]
    if(myLike == undefined) myLike = 0
    const delta = val - myLike
    likeDB.doc(`${id}-${uid}`).set({val, id, uid}).then(()=>{
        return db.doc(id).update({ score: firestore.FieldValue.increment(delta) })
    })
    .then(()=> update(id, {myLike: val, score: score + delta }) )
}

function delPost({id, route, nav}:any){
    db.doc(id).delete().then(()=>{
        if(route.name=='Post') nav.goBack()
        del(id)
    })
}