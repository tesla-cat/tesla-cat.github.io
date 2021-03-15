
import { Obj } from '../mobx/main'
export { idToLabel }

function idToLabel(id: string){
    return idToLabelMapEn[id] || id
}

const slogan = `Love Story.
    Share your tears and joys.
        Anonymously.
`
const sloganZh = `爱情故事。
    分享你的眼泪和喜悦。
        匿名地。
`

const idToLabelMapEn : Obj = {
    'ToSignIn': 'Sign In',
    'ToSignUp': 'Sign Up',
    'postTitle': 'Title',
    'postBody': 'Share your love story',
    'slogan': slogan,
}

const idToLabelMapZh : Obj = {
    'Sign Up': '注册',
    'Sign In': '登录',
    'Sign Out': '退出',
    'Forgot Password': '忘记密码',
    'Mine': '我的',
    'Reset App': '重置应用',

    'ToSignIn': '登录',
    'ToSignUp': '注册',
    'postTitle': '题目',
    'postBody': '分享你的爱情故事',
    'slogan': sloganZh,
    'Filters': '过滤',
}
