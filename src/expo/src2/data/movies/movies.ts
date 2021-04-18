
import {ideaType} from '../../screens/home'
export { movies }

const movie0 = {"id":"287947","title":"Shazam!","poster":"https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg","overview":"A boy is given the ability to become an adult superhero in times of need with a single magic word.","release_date":1553299200,"genres":["Action","Comedy","Fantasy"]}
type movieType = typeof movie0
const rawMovies: movieType[] = require('./movies.json')
const movies: ideaType[] = moviesToIdeas(rawMovies.slice(0, 20))
const date = new Date().toString()

function moviesToIdeas(p: movieType[]){
  return p.map(movie=>{
    const idea: ideaType = {
      id: movie.id,
      avatar: movie.poster,
      vote: movie.title.length,
      title: movie.title,
      info: date,
      body: movie.overview,
      tags: movie.genres,
      images: [movie.poster],
      numComment: movie.overview.length,
      numRetweet: movie.genres.length,
      numHand: movie.id.length,
      uris: ['']
    }
    return idea
  })
}