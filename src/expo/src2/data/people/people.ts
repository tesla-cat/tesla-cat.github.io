import { ideaType } from "../../screens/home"

export { allIdeas, search, getIdeasByIds }

type experienceType = {
    title: string,
    place: string,
    years: [string, string],
}

type personType = {
    avatar: string,
    name: string,
    experiences: experienceType[], 
    linkedIn: string
}

function peopleToIdeas(p: personType[]){
  return p.map(person=>{
    const idea: ideaType = {
      id: person.name,
      avatar: person.avatar,
      vote: 0,
      title: person.name,
      info: person.linkedIn,
      body: person.experiences.map(e=> `${e.years.join('-')}\t ${e.place}    ${e.title}` ).join('\n'),
      tags: [],
      images: [],
      numComment: 0,
      numRetweet: 0,
      numHand: 0,
      uris: ['']
    }
    return idea
  })
}

const people: personType[] = [
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQG6aDhRUu6Hhw/profile-displayphoto-shrink_400_400/0/1610930775549?e=1624492800&v=beta&t=DJW5DdSUIKUXGHqI2Q5N1EUFuoFwl93wKqvLH1-IXcI',
        name: 'Yuxi Sun',
        experiences: [
            { title: '本科', place: '北京邮电大学', years: ['2014', '2018'] },
            { title: '研究生', place: '康奈尔大学', years: ['2018', '2020'] },
            { title: '软件工程师', place: '谷歌', years: ['2020', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/yuxi-sun/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFVBSNufupDDA/profile-displayphoto-shrink_400_400/0/1563171217940?e=1624492800&v=beta&t=TZ_2mwTryn5SN7R_1Y8QH2mOx9yFA-2DlgSKE1uXcX0',
        name: 'Mu Xu',
        experiences: [
            { title: '本科', place: '厦门大学', years: ['2013', '2017'] },
            { title: '研究生', place: '加州大学Santa Barbara分校', years: ['2017', '2019'] },
            { title: '软件工程师', place: '脸书', years: ['2019', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/muxu-moon/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQF1gGo4rPZVwQ/profile-displayphoto-shrink_400_400/0/1597601245663?e=1624492800&v=beta&t=vGsbFD-bwEX213edkRu6CeQXzBUeq2WNpK3i8HJ80Ow',
        name: 'Yutong Li',
        experiences: [
            { title: '本科', place: '西电大学', years: ['2015', '2019'] },
            { title: '研究生', place: '南加州大学', years: ['2019', '2021'] },
            { title: '软件工程师', place: '谷歌', years: ['2021', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/raintonli/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C4E03AQHohlLjnF7Zhw/profile-displayphoto-shrink_400_400/0/1582063344494?e=1624492800&v=beta&t=TRy_hvsfGRyxcvay6Y02GiZZ9aYizGadQwor9PYebNU',
        name: 'Yunmeng Xie',
        experiences: [
            { title: '本科', place: '华南理工大学', years: ['2014', '2018'] },
            { title: '研究生', place: '卡内基梅隆大学', years: ['2018', '2019'] },
            { title: '软件工程师', place: '谷歌', years: ['2020', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/yunmeng-xie-37908216b/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQHkdUQ-OU5BCA/profile-displayphoto-shrink_400_400/0/1517514347718?e=1624492800&v=beta&t=vtPgtqIjqk3m4MCDj7-RBrYKvSC6jMZ95F_Ii_KB1JQ',
        name: 'Qingqing Wang',
        experiences: [
            { title: '本科', place: '重庆邮电大学', years: ['2012', '2016'] },
            { title: '研究生', place: 'Stevens Institute of Technology', years: ['2016', '2017'] },
            { title: '软件工程师', place: '微软', years: ['2018', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/qingqing-wang-6b4585138/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQEPGZn6MgVwnw/profile-displayphoto-shrink_400_400/0/1539276868965?e=1624492800&v=beta&t=_UgX7iYHHBIpq_Xda-HVbo5FJUOXeJq17gYmxtuEV-0',
        name: 'Jiaxin Guo',
        experiences: [
            { title: '本科', place: '北京邮电大学', years: ['2014', '2018'] },
            { title: '研究生', place: '康奈尔大学', years: ['2018', '2020'] },
            { title: '软件工程师', place: '谷歌', years: ['2020', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/jiaxin-guo-6141b416b/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C4E03AQFPKuvBGhZDHw/profile-displayphoto-shrink_400_400/0/1547209256334?e=1624492800&v=beta&t=u--VQujieCYl0SDJDa_k8yfoaamUEL3u-3hcGGCUjVY',
        name: 'LUE LI',
        experiences: [
            { title: '本科', place: '电子科技大学', years: ['2014', '2018'] },
            { title: '研究生', place: '卡内基梅隆大学', years: ['2018', '2019'] },
            { title: '软件工程师', place: '苹果', years: ['2020', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/lue-li-cmu/',
    },
    { 
        avatar: 'https://media-exp1.licdn.com/dms/image/C4E03AQHtqRmmRKSzgw/profile-displayphoto-shrink_400_400/0/1610662952408?e=1624492800&v=beta&t=22velnucgvlWTIViXicnFJFhxlsW_wpd9EtN3CCeCqQ',
        name: 'Yihang Ding',
        experiences: [
            { title: '本科', place: '华中科技大学', years: ['2012', '2016'] },
            { title: '研究生', place: '卡内基梅隆大学', years: ['2018', '2019'] },
            { title: '软件工程师', place: '苹果', years: ['2020', '现在'] },
        ],
        linkedIn: 'https://www.linkedin.com/in/yihangding/',
    },
]

type allIdeasType = {[id: string]: ideaType}
const allIdeas: allIdeasType = {}
peopleToIdeas(people).map(idea=> allIdeas[idea.id] = idea )
const result = new Promise<ideaType[]>((res, rej)=>{
  res(Object.values(allIdeas))
})
function search(query: string){ return result }
function getIdeasByIds(ids: string){ return result }