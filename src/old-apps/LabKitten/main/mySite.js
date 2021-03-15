
export {site}

// ========== Data ==========

const research = {
    title:'research (time order, 2018-2020)', 
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
            text:'Control of Trapped ion qubit with\n DE10-Nano FPGA', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/2-DE10-nano-FPGA.png?raw=true',
            link:'https://tesla-cat.github.io/My-Study-Notes/Experimental-Physics-SoC-FPGA-Design/Design-Plan.html',
        },   
        {   
            text:'Prof. Berge Englert group\n (postdoc for Julian Schwinger, Nobel laureate)\n National University of Singapore', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/3-Berge-Englert.jpg?raw=true',
            link:'https://scholar.google.com.sg/citations?user=ttUoRO4AAAAJ&hl=en',
        },
        {   
            text:'[Bachelor thesis]\n Density Potential Functional Theory\n (founded by Julian Schwinger)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/3-DFT.PNG?raw=true',
            link:'https://github.com/tesla-cat/PyDPFT',
        }, 
        {   
            text:'Prof. Yvonne Gao group\n (PhD for Robert Schoelkopf)\n National University of Singapore', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/4-Yvonne-Gao.png?raw=true',
            link:'https://scholar.google.com/citations?user=A3AtqowAAAAJ&hl=en',
        },
        {   
            text:'Control of Transmon superconducting qubit with\n Reinforcement learning\n and others', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/1-research/4-Transmon-superconducting-qubit.PNG?raw=true',
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
            text:'React (APP design framework)\n developed by Facebook', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/2-React.png?raw=true',
            link:'https://en.wikipedia.org/wiki/React_(web_framework)',
        }, 
        {   
            text:'C++ (programming language)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/3-C++.png?raw=true',
            link:'https://en.wikipedia.org/wiki/C%2B%2B',
        },  
        {   
            text:'Arduino (microcontrollers)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/3-Arduino.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Arduino',
        }, 
        {   
            text:'Verilog (programming language)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/4-verilog.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Verilog',
        },  
        {   
            text:'Quartus (FPGA design software)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/4-Quartus.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Intel_Quartus_Prime',
        }, 
        {   
            text:'Altium (PCB design software)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/5-Altium.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Altium',
        },  
        {   
            text:'Blender (3D computer graphics software)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/2-skills/6-blender.png?raw=true',
            link:'https://en.wikipedia.org/wiki/Blender_(software)',
        }, 
    ]
}

const education = {
    title:'education (2016-2020)', 
    height: 140, 
    images: [
        {   
            text:'National University of Singapore\n QS Global World Ranking: # 11', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/2-NUS.png?raw=true',
            link:'https://www.topuniversities.com/universities/national-university-singapore-nus',
        },  
        {   
            text:'BSc Hons (Highest Distinction)\n in Physics (NUS)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/2-NUS-Degree.PNG?raw=true',
            link:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/2-NUS-Degree.pdf',
        },
        {   
            text:'Transcript (NUS) [4.52 / 5]', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/2-NUS-Transcript.PNG?raw=true',
            link:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/2-NUS-Transcript.pdf',
        },
        {   
            text:'University of Göttingen\n 45 Nobel Prize winners', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/3-uni-goettingen.png?raw=true',
            link:'https://en.wikipedia.org/wiki/University_of_G%C3%B6ttingen',
        },  
        {   
            text:'Transcript (Göttingen) [1.4 / 1]\n bachelor exchange program\n but I took master modules', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/3-uni-goettingen-grades.PNG?raw=true',
            link:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/3-education/3-uni-goettingen-grades.pdf',
        },
    ]
}

const awards = {
    title:'awards', 
    height: 120, 
    images: [
        {   
            text:'China nationwide\n middle school math competition\n second prize', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/4-awards/1-nationwide-middle-school-math-prize.jpg?raw=true',
        },  
        {   
            text:'China nationwide\n high school physics competition\n third prize', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/4-awards/2-nationwide-high-school-physics-prize.jpg?raw=true',
        },  
        {   
            text:'HUAWEI High School Science Fair\n best performance award', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/4-awards/3-high-school-science-fair-prize.jpg?raw=true',
        },
        {   
            text:'China-Singapore intergovernmental scholarship (SM2)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/4-awards/4-cn-sg-scholarship.PNG?raw=true',
            link:'https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%B0%E5%A5%96%E5%AD%A6%E9%87%91%E9%A1%B9%E7%9B%AE',
        },
        {   
            text:'Science & Technology Undergraduate Scholarship', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/1-CV/4-awards/4-ST-scholarship.PNG?raw=true',
            link:'http://www.nus.edu.sg/oam/scholarships/freshmen-sprs/science-technology-(s-t)-undergraduate-scholarship',
        },
    ]
}

//=================================================================================

const products = {
    title:' ', 
    height: 200, 
    images: [
        {   
            text:'lab kitten\n Real-time lab monitoring\n powered by WebRTC', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/2-Products/1-APPs/1-lab-kitten.jpg?raw=true',
            link:'https://github.com/lab-kitten/lab-kitten',
        },
        {   
            text:'Musical Tesla Coil Controller\n ESP32 IoT device and FPGA', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/2-Products/2-hardwares/1-musical-tesla-coil-controller-IOT-FPGA.jpg?raw=true',
            link:'https://github.com/tesla-cat/FPGA-ESP32-Tesla-Coil',
        },
        {   
            text:'Musical Tesla Coil (video)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/2-Products/2-hardwares/1-musical-tesla-coil.PNG?raw=true',
            link:'https://tesla-cat.github.io/1-mySite/2-Products/2-hardwares/1-musical-tesla-coil.mp4',
        },
    ]
}

//=================================================================================

const sports = {
    title:'sports', 
    height: 140, 
    images: [
        {   
            text:'parkour (video, not mine)', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/1-sports/1-parkour.jpg?raw=true',
            link:'https://www.youtube.com/watch?v=dHy9W9LpvlQ',
        },
        {   
            text:'inline skating', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/1-sports/2-inline-skating.jpg?raw=true',
        },
        {   
            text:'tennis', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/1-sports/3-tennis.jpg?raw=true',
        },
        {   
            text:'swimming', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/1-sports/4-swimming.jpg?raw=true',
        },
    ]
}

const shows = {
    title:'shows', 
    height: 140, 
    images: [
        {   
            text:'survivor', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/1-survivor.png?raw=true',
        },
        {   
            text:'yellow-stone', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/2-yellow-stone.png?raw=true',
        },
        {   
            text:'hunter x hunter', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/3-hunter-hunter.jpg?raw=true',
        },
        {   
            text:'rick and morty', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/4-rick-and-morty.png?raw=true',
        },
        {   
            text:'futurama', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/5-futurama.jpg?raw=true',
        },
        {   
            text:'legal high', 
            image:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/1-mySite/4-Interests/2-shows/6-legal-high.jpg?raw=true',
        },
    ]
}

const sections = [
    {name:'CV', children:[research, skills, education, awards]}, 
    {name:'Products', children:[products, ]}, 
    //{name:'Thesis', children:[]}, 
    {name:'Interests', children:[sports, shows ]}, 
    {name:'Notes', uri:'https://tesla-cat.github.io/My-Study-Notes'},
    {name:'GitHub', uri:'https://github.com/tesla-cat'},
]

const site = {
    photo:'https://avatars0.githubusercontent.com/u/28215638?s=460&u=600f30b1c7ccc1bc23f891225946bddaa4102d26&v=4', 
    title:'Ding Ruiqi (22)', 
    motto:'you only live once',
    dream:'To understand the physics and mathematics of consciousness and intelligence',
    videos:[
        "//player.bilibili.com/player.html?aid=17337657&bvid=BV1RW411b7eq&cid=28325804&page=1",
        "//player.bilibili.com/player.html?aid=39019971&bvid=BV15t411C7ZS&cid=68627266&page=1",
    ] ,
    sections, 
    tools:[
        {name:'edit this page', uri:'https://github.com/tesla-cat/tesla-cat.github.io/blob/master/2-json/mySite.json'},
    ], 
}

var fs = require('fs')
//fs.writeFile('mySite.json', JSON.stringify(site, null, 4), ()=>{})