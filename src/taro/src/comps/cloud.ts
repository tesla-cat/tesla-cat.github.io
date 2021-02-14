
import cloudbase from "@cloudbase/js-sdk"
export { ideaDB, auth }

const env = 'rick-5g5jicykd55413f5'
const cloud = cloudbase.init({ env })

const db = cloud.database()
const auth = cloud.auth({
  persistence:'local',
})

const ideaDB = db.collection("siidea")

auth.anonymousAuthProvider().signIn()
.then(()=>{
  console.log('登录成功')
  console.log(auth.currentUser)
})
.catch(e=>{
  console.log(e)
})

if(1){
  const email = '416640656@qq.com'
  const password = 'bomb4065'
  auth.signUpWithEmailAndPassword(email, password).then(()=>{
    console.log('注册成功')
    
  })
  .catch(e=>{
    console.log(e)
  })
}