
import {data0Type} from './App'
export {data0Arr, getData, getDataById}

const mv0 = {
  "id":"287947",
  "title":"Shazam!",
  "poster":"https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg",
  "overview":"A boy is given the ability to become an adult superhero in times of need with a single magic word.",
  "release_date":1553299200,
  "genres":["Action","Comedy","Fantasy"]
}
type mvType = typeof mv0

const mvs: mvType[] = require('./movies.json')

const data0Arr = mvs.map((mv, idx)=>{
  const data0: data0Type = {
    // ids
    _id: mv.id,
    _openid: 'rick',
    // user
    username: 'Elon Musk',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg',
    // content
    title: mv.title,
    body: mv.overview,
    imgs: [
      mv.poster,
      mvs[idx+1]?.poster,
      mvs[idx+2]?.poster,
      mvs[idx+3]?.poster,
    ],
    time: mv.release_date,
    // stats
    numComment: mv.id.length,
    numLike: mv.overview.length,
    numHate: mv.poster.length,
    numJoin: mv.title.length,
  }
  return data0
})

function rand(n: number, N: number){
  return Array(n).fill(1).map(i=>(
    Math.floor(Math.random() * Math.floor(N))
  ))
}

function getData(){
  return rand(30, data0Arr.length).map(i=>data0Arr[i])
}

function getDataById(id: string){
  return data0Arr.filter(mv=>mv._id===id)[0]
}