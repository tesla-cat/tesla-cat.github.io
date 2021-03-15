
import { MyData2 } from '../Type/Type'
import { cardAct0 } from './CardAct'
export { cardVal1 }

const basic : MyData2 = {
  icon: 'account', 
  title: '姓名',
  subtitle: '目前的职业与机构 / 头衔',
  links: [
    { icon: 'github', text: 'GitHub' },
    { icon: 'homepage', text: '个人主页' },
    { icon: 'email', text: '公开邮箱' },
    { icon: 'telephone', text: '工作电话' },
    { icon: 'work-address', text: '工作地址' },
  ],
  body: '目标 / 梦想',
}

const edu : MyData2 = {
  icon: 'edu',
  title: '学位与专业',
  subtitle: '学校名称',
  links: [
    { icon: 'date', text: '入学 - 毕业日期' },
  ],
  body: '详细介绍: 成绩与成就',
  actions: cardAct0,
}

const job : MyData2 = {
  icon: 'launch',
  title: '职位和项目名称',
  subtitle: '公司 / 组织 / 小组',
  links: [
    { icon: 'date', text: '开始 - 结束日期' },
    { icon: 'url', text: '项目链接' },
  ],
  body: '详细介绍: 成就与收获',
  actions: cardAct0,
}

const award : MyData2 = {
  title: '奖项名称',
  subtitle: '奖项简介',
  links: [
    { icon: 'date', text: '获奖日期' },
  ],
  body: '详细介绍: 收获与感触',
  actions: cardAct0,
}

const cardVal1 = [basic, edu, job, award]