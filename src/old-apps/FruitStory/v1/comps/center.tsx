
import Taro from '@tarojs/taro'
export { center }

const cloud = Taro.cloud
cloud.init({env: 'fruit-story-1-0g1i8702f629f5eb'})
const db = cloud.database()
const postDB = db.collection('post')
const userDB = db.collection('user')

type docType = Taro.DB.Document.IDocumentData

type centerType = { myId: string, myInfo: Taro.UserInfo, myDoc: docType }
class Center{
  data: centerType = { myId: null, myInfo: null, myDoc: null }
  set(obj: Partial<centerType>){
    Object.assign(this.data, obj)
  }
}

const center = new Center()
login()

function login(){ 
  cloud.callFunction({name:'login'}).then(res=>{
    const r: any = res.result
    center.set({ myId: r.openid })
    userDB.doc(r.openid).get({}).then(res2=>{
      center.set({ myDoc: res2.data })
    })
  })
  Taro.getUserInfo().then(res=>{
    center.set({ myInfo: res.userInfo })
  })
}

