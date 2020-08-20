
// ========== Data ==========

const edu = [
    {   
        text:'🏆scholarship', 
        image:'https://raw.githubusercontent.com/tesla-cat/tesla-cat.github.io/master/1-images/education/1%20-%20High%20School.PNG',
        link:'https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E9%AB%98%E6%96%B0%E7%AC%AC%E4%B8%80%E4%B8%AD%E5%AD%A6',
    },
    {   
        text:'📘high school diploma', 
        image:'https://raw.githubusercontent.com/tesla-cat/tesla-cat.github.io/master/1-images/certificates/1%20-%20High%20School%20Certificate.PNG',
        link:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-images/certificates/1%20-%20High%20School%20Certificate.pdf',
    },
]

const eduWall = {title:'education', height: 140, images: edu}

const sections = [
    {name:'CV', children:[eduWall, eduWall]}, 
    {name:'Products', children:[]}, 
    {name:'Thesis', children:[]}, 
    {name:'Notes', uri:'https://tesla-cat.github.io/My-Study-Notes'},
    {name:'GitHub', uri:'https://github.com/tesla-cat'},
]

const tools = [
    {name:'edit this page', uri:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/2-json/mySite.json'},
]

const videos = [
    "//player.bilibili.com/player.html?aid=17337657&bvid=BV1RW411b7eq&cid=28325804&page=1",
    "//player.bilibili.com/player.html?aid=39019971&bvid=BV15t411C7ZS&cid=68627266&page=1",
]

const mySite = {
    photo:'https://avatars0.githubusercontent.com/u/28215638?s=460&u=600f30b1c7ccc1bc23f891225946bddaa4102d26&v=4', 
    title:'Ding Ruiqi', 
    motto:'you only live once',
    sections, tools, videos
}

var fs = require('fs')
fs.writeFile('mySite.json', JSON.stringify(mySite, null, 4), ()=>{})