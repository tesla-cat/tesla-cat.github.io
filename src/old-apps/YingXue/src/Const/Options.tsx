
import { Obj } from '../Type/Type'
export { options0, options1, options1B, options2, options3 }

const options0 : Obj = {
  别人的创作:[
    { icon: 'good', text: '推荐' },
    { icon: 'trending', text: '热门' },
    { icon: 'new', text: '最新' },
    { icon: 'history', text: '历史' },
    { icon: 'like', text: '我赞同的' },
    { icon: 'dislike', text: '我反对的' },
    { icon: 'todo', text: '稍后作答' },
  ],
  我的创作:[
    { icon: 'notes', text: '我的笔记' },
    { icon: 'question', text: '我的提问' },
    { icon: 'idea', text: '我的回答' },
  ],
  用户:[
    { icon: 'heart', text: '关注' },
    { icon: 'classmates', text: '同学' },
    { icon: 'teacher', text: '导师' },
  ],
  萤雪:[
    { icon: 'settings', text: '设置' },
    { icon: 'help', text: '反馈' },
  ]
}

const forms = [
  { icon: 'notes', text: '笔记' },
  { icon: 'question', text: '提问' },
  { icon: 'idea', text: '回答' },
]

const levels = [
  { icon: 'seeds', text: '小学' },
  { icon: 'sprout', text: '初中' },
  { icon: 'tree', text: '高中' },
  { icon: 'tree-fruit', text: '大学' },
]

const subjects = [
  { icon: 'china', text: '语文' },
  { icon: 'english', text: '英语' },
  { icon: 'math', text: '数学' },
  { icon: 'code', text: '编程' },
  { icon: 'atom', text: '物理' },
  { icon: 'chemistry', text: '化学' },
  { icon: 'dna', text: '生物' },
  { icon: 'financial', text: '经济' },
  { icon: 'history-book', text: '历史' },
  { icon: 'earth', text: '地理' },
]

const all = { icon: 'cat', text: '全部' }

const options1 : Obj = {
  形式:[ all, ...forms ],
  级别:[ all, ...levels ],
  科目:[ all, ...subjects ],
  赞同数:[
    { icon: 'cat', text: '全部' },
    { icon: 'kitty-sleep', text: '个' },
    { icon: 'kitty-fish', text: '十' },
    { icon: 'kitty-like', text: '百' },
    { icon: 'kitty-cool', text: '千' },
  ],
}

const options1B : Obj = {
  形式: forms,
  级别: levels ,
  科目: subjects,
}

const options2 : Obj = {
  我的账户:[
    { icon: 'cv', text: '简历', nav: {to:'User'} },
    { icon: 'verified-user', text: '身份认证', nav: {to:'Auth'} },
  ],
}

const options3 : Obj = {
  消息:[
    { icon: 'chat', text: '对话' },
    { icon: 'contacts', text: '联系人' },
  ],
}