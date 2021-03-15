
import { makeAutoObservable } from "mobx"
import {moviesCenter} from './dataCenters/moviesCenter'
import { Obj } from './typescript/interfaces'
export { dataCenter }

class DataCenter{
    time : number = 0
    movies : Obj = {}
    types : Obj = {}
    movieLikes : Obj = {}
    movieHist : Obj = {} 
    movieSearchQueries : Obj = {}
    movieSearchResultIDs : Obj = {}
    movieSearchLast : string = ''
    pages : Obj = {movies: 0}
    searchPages : Obj = {movies: 0}
    doneInit : boolean = false
    loading : boolean = false
    constructor(){
        makeAutoObservable(this)
        //setInterval(()=>{ this.time = this.time + 1 }, 1000)
        Promise.all([
            moviesCenter.init().then(()=>{ this.movies = moviesCenter.movies })
        ]).then(()=>this.doneInit = true)
        moviesCenter.getTypes().then(()=>{ this.types = moviesCenter.types })
    }
    fetch(){
        if(this.loading) return
        this.loading = true

        this.pages.movies += 1 
        moviesCenter.fetchMovies(this.pages.movies).then(()=>{ 
            this.movies = moviesCenter.movies 
            this.loading = false
        })
    }
    like(id : string){
        if(this.movieLikes[id] === undefined) this.movieLikes[id] = 1
        else if(this.movieLikes[id] === 1) this.movieLikes[id] = -1
        else if(this.movieLikes[id] === -1) this.movieLikes[id] = undefined
    }
    setHist(id : string, hist : any){
        this.movieHist[id] = hist
    }
    delHist(id : string){
        this.movieHist[id] = undefined
    }
    search(text : string){
        if(this.loading) return
        this.loading = true

        this.movieSearchQueries[text] = true
        if(text != this.movieSearchLast){
            this.movieSearchLast = text
            this.searchPages.movies = 0
            this.movieSearchResultIDs = {}
        }

        this.searchPages.movies += 1 
        moviesCenter.fetchMovies(this.searchPages.movies, text).then((ids:string[])=>{ 
            this.movies = moviesCenter.movies 
            this.loading = false
            ids.map( (id)=> this.movieSearchResultIDs[id] = true )
        })
    }
}

const dataCenter = new DataCenter()

