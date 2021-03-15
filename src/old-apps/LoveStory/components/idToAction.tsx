
import { Obj, state } from '../mobx/main'
import { signUp, signIn, signOut, resetPass } from '../firebase/auth'
import { addPost, getUserPosts, likePost, hidePost, delPost } from '../firebase/post'

export { idToAction }

function idToAction(id: string, args: any){
    const func = idToActionMap[id]
    if(func) func(args)
}

const idToActionMap : Obj = {
    'Sign Up': signUp,
    'Sign In': signIn,
    'Sign Out': signOut,
    'Forgot Password': resetPass,
    'addPost': addPost,
    'GetUserPosts': getUserPosts,
    'like':(args: any)=>likePost({ val: 1, ...args}),
    'hate':(args: any)=>likePost({ val: -1, ...args}),
    'hide':hidePost,
    'delete':delPost,
    'back': (args: any)=> args.nav.goBack(),
    'Mine': (args: any)=> args.nav.navigate('User', {uid: args.uid}),
    'ToUser': (args: any)=> args.nav.navigate('User', {uid: args.uid}),
    'ToPost': (args: any)=> args.nav.navigate('Post', {id: args.id}),
    'ToHome': (args: any)=> args.nav.navigate('Home'),
    'ToSignIn': (args: any)=> args.nav.navigate('SignIn'),
    'ToSignUp': (args: any)=> args.nav.navigate('SignUp'),
    'ToAddPost': (args: any)=> args.nav.navigate('AddPost'),
    'ToSettings': (args: any)=> args.nav.navigate('Settings'),
    'Reset App': ()=> state.reset(),
}
