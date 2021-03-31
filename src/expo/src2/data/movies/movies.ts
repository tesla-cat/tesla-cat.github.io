
export { movies, movieType }

const movie0 = {"id":"287947","title":"Shazam!","poster":"https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg","overview":"A boy is given the ability to become an adult superhero in times of need with a single magic word.","release_date":1553299200,"genres":["Action","Comedy","Fantasy"]}
type movieType = typeof movie0
var movies: movieType[] = require('./movies.json')
movies = movies.slice(0, 20)