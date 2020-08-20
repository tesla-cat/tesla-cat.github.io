
// ========== Data ==========

const research = {
    title:'research (time order)', 
    height: 140, 
    images: [
        {   
            text:'Prof. Reiner Kree group\n University of Göttingen', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/1-Reiner-Kree.jpg?raw=true',
            link:'https://www.uni-goettingen.de/en/prof.+dr.+reiner+kree/47074.html',
        },
        {   
            text:'Control of nanorobots with\n Reinforcement learning (DQN)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/1-nanobot-complex-fluid.jpg?raw=true',
            link:'https://github.com/tesla-cat/Nanobot-in-Complex-Flow',
        },
        {   
            text:'Prof. Dzmitry Matsukevich group\n (postdoc for Christopher Monroe)\n National University of Singapore', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/2-Dzmitry-Matsukevich.jpg?raw=true',
            link:'https://scholar.google.com.sg/citations?user=B4X3nCMAAAAJ&hl=en',
        },
        {   
            text:'Control of Trapped ion quantum computer with\n DE10-Nano FPGA', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/2-DE10-nano-FPGA.png?raw=true',
            link:'https://tesla-cat.github.io/My-Study-Notes/Experimental-Physics-SoC-FPGA-Design/Design-Plan.html',
        },   
        {   
            text:'Prof. Berge Englert group\n (postdoc for Julian Schwinger, Nobel laureate)\n National University of Singapore', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/3-Berge-Englert.jpg?raw=true',
            link:'https://scholar.google.com.sg/citations?user=ttUoRO4AAAAJ&hl=en',
        },
        {   
            text:'Density Potential Functional Theory\n (founded by Julian Schwinger)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/3-DFT.PNG?raw=true',
            link:'https://github.com/tesla-cat/PyDPFT',
        }, 
        {   
            text:'Prof. Yvonne Gao group\n (PhD for Robert Schoelkopf)\n National University of Singapore', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/4-Yvonne-Gao.png?raw=true',
            link:'https://scholar.google.com/citations?user=A3AtqowAAAAJ&hl=en',
        },
        {   
            text:'Control of Superconducting quantum computer with\n Reinforcement learning\n and others', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/3-DFT.PNG?raw=true',
            link:'https://github.com/Qcrew/Reinforcement-Learning-Quantum-Control',
        },       
    ]
}

const skills = {
    title:'skills', 
    height: 100, 
    images: [
        {   
            text:'Python (programming language)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/1-Python.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Python_(programming_language)',
        },  
        {   
            text:'PyTorch (machine learning library)\n developed by Facebook', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/1-PyTorch.jpg?raw=true',
            link:'https://en.wikipedia.org/wiki/PyTorch',
        }, 
        {   
            text:'JavaScript (programming language)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/2-JavaScript.png?raw=true',
            link:'https://en.wikipedia.org/wiki/JavaScript',
        },  
        {   
            text:'React (web/native App design framework)\n developed by Facebook', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/2-React.png?raw=true',
            link:'https://en.wikipedia.org/wiki/React_(web_framework)',
        }, 
    ]
}

const sections = [
    {name:'CV', children:[research]}, 
    {name:'Products', children:[]}, 
    {name:'Thesis', children:[]}, 
    {name:'Notes', uri:'https://tesla-cat.github.io/My-Study-Notes'},
    {name:'GitHub', uri:'https://github.com/tesla-cat'},
]

const mySite = {
    photo:'https://avatars0.githubusercontent.com/u/28215638?s=460&u=600f30b1c7ccc1bc23f891225946bddaa4102d26&v=4', 
    title:'Ding Ruiqi', 
    motto:'you only live once',
    videos:[
        "//player.bilibili.com/player.html?aid=17337657&bvid=BV1RW411b7eq&cid=28325804&page=1",
        "//player.bilibili.com/player.html?aid=39019971&bvid=BV15t411C7ZS&cid=68627266&page=1",
    ] ,
    sections, 
    tools:[
        {name:'edit this page', uri:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/2-json/mySite.json'},
    ], 
}


//var fs = require('fs')
//fs.writeFile('mySite.json', JSON.stringify(mySite, null, 4), ()=>{})