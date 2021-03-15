
import { Obj } from '../typescript/interfaces'
export {moviesCenter, cookUris}

const api = 'https://api.okzy.tv/api.php/provide/vod/at/json/?'

class MoviesCenter{
    movies : Obj = {}
    types : Obj = {}
    constructor(){
        this.fetchTypes()
    }
    init(){
        return this.fetchMovies(1)
    }
    getTypes(){
        if(Object.keys(this.types).length) return Promise.resolve()
        return this.fetchTypes()
    }
    fetchTypes(){
        return fetch(`${api}ac=list`).then(res=>res.json()).then(res=>{
            var newTypes : Obj = {}
            res.class.map(({ type_id, type_name } : any)=>{
                newTypes[type_id] = type_name
            })
            this.types = newTypes
        })
    }
    fetchMovies(pageId: number, query : string = ''){
        return fetch(`${api}ac=detail&pg=${pageId}&wd=${query}`).then(res=>res.json()).then(res=>{
            console.log(res)
            var ids = res.list.map((movieRaw : any)=>{
                movieRaw.pageId = pageId
                this.movies[movieRaw.vod_id] = cookMovie(movieRaw)
                return movieRaw.vod_id
            })
            return ids
        })
    }
}
const moviesCenter = new MoviesCenter()

const cookMovie = (movieRaw : any)=>{
    const {
        type_id, vod_actor, vod_area, vod_content, vod_director, vod_id, vod_play_from,
        vod_lang, vod_name, vod_pic, vod_play_url, vod_remarks, vod_time, vod_year, type_name,
    } = movieRaw
    var movie = {
        id: vod_id, typeID: type_id, 
        title: vod_name, text: vod_content, imgs: [vod_pic], 
        rawUris: vod_play_url, 
        area: vod_area, lang: vod_lang, year: vod_year, 
        info: vod_remarks, 
    }
    return movie
}

const cookUris = (rawUris : string)=>{
    return rawUris.split('$$$').map((source)=>{
        return source.split('#').map((episode)=>{
            return episode.split('$')
        })
    })
}

//"第01集$https://iqiyi.cdn9-okzy.com/share/83584fd991eed3055f7b446843f1200e#第02集$https://iqiyi.cdn9-okzy.com/share/d118d975f3cdf403187a078f3a06f866#第03集$https://iqiyi.cdn9-okzy.com/share/9aeadabd8172e574de598c611e410eed#第04集$https://iqiyi.cdn9-okzy.com/share/f9c8cde98a8d6dfda2273e26fedaeda8#第05集$https://iqiyi.cdn9-okzy.com/share/7e5c6adb4152e8d402e5dba26664fa32#第06集$https://iqiyi.cdn9-okzy.com/share/9b3bb5b0a98eab0be3348611b699e3a7#第07集$https://iqiyi.cdn9-okzy.com/share/77382415bbfc9bcb5b2f5b5f5724406c#第08集$https://iqiyi.cdn9-okzy.com/share/eadc317f2764a00bec1b729a56321cd3#第09集$https://iqiyi.cdn9-okzy.com/share/c9fa5a72863b86fe0c7dc5902e21fb17#第10集$https://iqiyi.cdn9-okzy.com/share/047120fa7417b3d37a0573e8a24c9e43#第11集$https://iqiyi.cdn9-okzy.com/share/2572bd363583b4c28b31fcbb15df5837#第12集$https://iqiyi.cdn9-okzy.com/share/3c8179de1979ed5f080f0871c7bd9bde#第13集$https://iqiyi.cdn9-okzy.com/share/2cb2cdcca9bdd55a897d897ac67f7e39#第14集$https://iqiyi.cdn9-okzy.com/share/37ed3938f2f5b399dfd0b62606f39d9b#第15集$https://iqiyi.cdn9-okzy.com/share/3da3e32030bd705ee69c42ee0ac833b1#第16集$https://iqiyi.cdn9-okzy.com/share/6222d5fd70abd4fe144a1df81fc2ea98$$$第01集$https://iqiyi.cdn9-okzy.com/20201022/17048_5f155bb8/index.m3u8#第02集$https://iqiyi.cdn9-okzy.com/20201022/17047_fb6067b6/index.m3u8#第03集$https://iqiyi.cdn9-okzy.com/20201022/17050_9b136721/index.m3u8#第04集$https://iqiyi.cdn9-okzy.com/20201022/17049_72efbd1c/index.m3u8#第05集$https://iqiyi.cdn9-okzy.com/20201023/17079_bc012bac/index.m3u8#第06集$https://iqiyi.cdn9-okzy.com/20201023/17078_85ec9a59/index.m3u8#第07集$https://iqiyi.cdn9-okzy.com/20201023/17077_290317f6/index.m3u8#第08集$https://iqiyi.cdn9-okzy.com/20201023/17076_f138d4a3/index.m3u8#第09集$https://iqiyi.cdn9-okzy.com/20201024/17157_0836ed7a/index.m3u8#第10集$https://iqiyi.cdn9-okzy.com/20201024/17156_1443c8d6/index.m3u8#第11集$https://iqiyi.cdn9-okzy.com/20201024/17155_cbdf44ec/index.m3u8#第12集$https://iqiyi.cdn9-okzy.com/20201024/17154_c839d5b4/index.m3u8#第13集$https://iqiyi.cdn9-okzy.com/20201025/17203_d2751e38/index.m3u8#第14集$https://iqiyi.cdn9-okzy.com/20201025/17202_d9e16c69/index.m3u8#第15集$https://iqiyi.cdn9-okzy.com/20201025/17201_d938cc49/index.m3u8#第16集$https://iqiyi.cdn9-okzy.com/20201025/17200_a4f32ec9/index.m3u8"