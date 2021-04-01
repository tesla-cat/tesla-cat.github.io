
/**
 * https://14ysdg.com/archives/82
 * 
 * 麻花资源采集站   http://www.mahuazy.net/     贼快、新站     11791+
 * http://www.mahuazy.net/api.html
 * 百度资源         http://help.apibdzy.com/
 */

import {fetchJSON} from '../cloudBase/cloudBase'
import {ideaType} from '../../screens/home'
export { search }

const movie0 = {
  "vod_time": "2019-11-15 21:28:39",
  "vod_id": "6",
  "vod_name": "超级英雄",
  "vod_enname": "chaojiyingxiong",
  "vod_subname": "义警复仇",
  "vod_letter": "C",
  "vod_color": "",
  "vod_tag": "印度,犯罪,印度电影,动作,剧情,2018,黑暗,电影,超级英雄,犀利，真实，学习的榜样",
  "type_id": "5",
  "type_name": "动作片",
  "vod_pic": "https://cdn1.mh-pic.com/upload/vod/2019-09-27/15695728090.jpg",
  "vod_lang": "其它",
  "vod_area": "印度",
  "vod_year": "2018",
  "vod_remark": "HD",
  "vod_actor": "Harshvardhan Kapoor,Priyanshu Painyuli,Ashish Verma",
  "vod_director": "维卡拉马迪亚·莫特文",
  "vod_serial": "0",
  "vod_lock": "0",
  "vod_level": "0",
  "vod_hits": "89",
  "vod_hits_day": "1",
  "vod_hits_week": "1",
  "vod_hits_month": "4",
  "vod_duration": "154",
  "vod_up": "0",
  "vod_down": "0",
  "vod_score": "7.1",
  "vod_score_all": "1100",
  "vod_score_num": "155",
  "vod_points_play": "0",
  "vod_points_down": "0",
  "vod_content": "这部电影讲述的是印度超级英雄巴维什·乔希的故事，好朋友因揭露腐败而被害，巴维什·乔希便戴上面具，以超级英雄的方式为朋友复仇.....",
  "vod_play_from": "mahua",
  "vod_play_note": "",
  "vod_play_server": "no",
  "vod_play_url": "HD$https://2.mhbobo.com/20190710/bCanFYQn/index.m3u8",
  "vod_down_from": "",
  "vod_down_note": "",
  "vod_down_server": "",
  "vod_down_url": ""
}
const movieList0 = {
  code: 1,
  limit: 20,
  list: [movie0],
  msg: "数据列表",
  page: 1,
  pagecount: 2719,
  total: 54361,
}
type movieType = typeof movie0
type movieListType = typeof movieList0

function moviesToIdeas(p: movieType[]){
  return p.map(movie=>{
    const idea: ideaType = {
      avatar: movie.vod_pic,
      vote: parseInt(movie.vod_score_all),
      title: `${movie.vod_director}: ${movie.vod_name}`,
      info: `${movie.vod_year} ${movie.vod_area} ${movie.type_name}`,
      body: movie.vod_content,
      tags: [],
      images: [movie.vod_pic],
      numComment: parseInt(movie.vod_score_num),
      numRetweet: parseInt(movie.vod_hits),
      numHand: movie.vod_name.length,
    }
    return idea
  })
}

//========================================

const baidu = 'https://api.apibdzy.com/api.php/provide/vod/?ac=detail'
const maHua = 'https://www.mhapi123.com/inc/api_mac10.php'

function getMoviesByIds(ids: string){
  return fetchJSON(`${maHua}?ac=detail&ids=${ids}`).then((r: movieListType)=>{
    return moviesToIdeas(r.list)
  }) 
}

function search(query: string){
  return fetchJSON(`${maHua}?ac=list&wd=${query}`).then((r: movieListType)=>{
    const ids = r.list.map(movie=>movie.vod_id).join(',')
    return getMoviesByIds(ids)
  })
}
