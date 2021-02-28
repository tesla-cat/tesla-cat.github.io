
import React, { useEffect, useState } from 'react'

import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import ReactPlayer from 'react-player'

import {makeAutoObservable} from 'mobx'
import {observer} from 'mobx-react'

import { hist1Type, res1Type, vid1Type } from './types'

export { Search, Hists, ViewOne, isPC }

type CenterType = {
  hists: {[key: number]: hist1Type }
}
class Center{
  data: CenterType = { hists:{} } 
  constructor(){
    makeAutoObservable(this)
    this.load()
  }
  set(obj: Partial<CenterType>){
    Object.assign(this.data, obj)
  }
  setHist(hist: hist1Type){
    if(!this.data.hists[ hist.vidID ]) this.data.hists[ hist.vidID ] = {}
    Object.assign(this.data.hists[ hist.vidID ], hist) 
    this.save()
  }
  delHist(hist: hist1Type){
    delete this.data.hists[ hist.vidID ]
    this.save()
  }
  save(){
    Taro.setStorage({key: 'data', data: this.data})
  }
  load(){
    Taro.getStorage({key: 'data'}).then((res)=>{
      this.set(res.data)
    })
  }
}
const center = new Center()

const {windowWidth, windowHeight} = Taro.getSystemInfoSync()
const isPC = windowWidth > windowHeight

function Search(){
  const [res1, setRes1] = useState<res1Type>(null)
  const {hists} = center.data
  useEffect(()=>{
    const ids = Object.keys(hists)
    if(ids.length) get(ids.join(',')).then(setRes1)
  },[])
  return(
    <View className='col'>
      <AtInput className='in1' name='inp1' onChange={(val)=>{
        search(val.toString()).then(setRes1)
      }} placeholder='搜索'/>
      {res1 && res1.list.map(vid=>(
        <Vid key={vid.vod_id} vid={vid}/>
      ))}
    </View>
  )
}

function ViewOne(){
  const [res1, setRes1] = useState<res1Type>(null)
  useEffect(()=>{
    const p = Taro.getCurrentInstance().router.params
    get(p.vidID).then((res: res1Type)=>{
      if(p.eps && p.prog){
        const src = p.src? parseInt(p.src) : 0
        const eps = parseInt(p.eps)
        const prog = parseInt(p.prog)
        const vid = res.list[0]
        center.setHist(makeHist(vid, [src, eps], prog))
      }
      setRes1(res)
    })
  },[])
  return(
    <View className='col'>
      <AtButton onClick={()=>{
        Taro.redirectTo({
          url: '/pages/MV-home/index'
        })
      }}>首页</AtButton>
      {res1 && <Vid vid={res1.list[0]}/>}
    </View>
  )
}

function Vid({vid}: { vid: vid1Type }){ 
  const hist = center.data.hists[vid.vod_id]
  const [ij, setIj] = useState(hist?.ij)
  const urls = parse(vid)
  const latest = urls[0].eps.length
  if(hist) center.setHist({...hist, latest })
  var player, prog, info
  if(ij){
    const src = ij[0], eps = ij[1]
    const url = urls[src].eps[eps]
    if(hist && eps == hist.ij[1]) prog = hist.prog 
    info = <Text className='t3'>正在播放 {urls[src].src} {url[0]}</Text>
    player = <Player url={url[1]} onProg={onProg} prog={prog}/>
  }
  function onProg(pro: number){
    if(pro>6) center.setHist(makeHist(vid, ij, pro, latest))
  }
  return(
    <View className='col card1'>
      <View className='row h30v'>
        <Image className='img1 f1' mode='aspectFit' src={vid.vod_pic}/>
        <View className='col f2 scr'>
          <Text className='t1'>{vid.vod_name}</Text>
          {info}
          {urls.map((src, i)=>(
            <View className='row wrap aictr jcctr' key={src.src}>
              {src.eps.map((ep, j)=>(
                <AtButton key={ep[0]} onClick={()=>{
                  setIj([i, j])
                }}>{ep[0]}</AtButton>
              ))}
            </View>
          ))}
        </View>
      </View>
      {player}
    </View>
  )
}

type PlayerType = { 
  url: string, prog?:number, onProg?:(prog: number)=>void 
}
function Player(p: PlayerType){
  const w = Math.min(windowWidth, 600)
  const h = w/4*3
  return(
    <ReactPlayer
      url={p.url} controls  progressInterval={1000}
      width={w} height={h} style={{alignSelf:'center', backgroundColor:'black'}}
      onProgress={prog=>{
        if(p.onProg) p.onProg(Math.floor(prog.playedSeconds))
      }}
      ref={player=>{
        if(player && p.prog) player.seekTo(p.prog)
      }}
    />
  )
}

const okzy = 'https://api.okzy.tv/api.php/provide/vod/at/json/?ac=detail'
function search(wd: string){
  wd = wd.trim()
  if(!wd) return Promise.reject()
  return fetch(`${okzy}&wd=${wd}`).then(res=>res.json())
}
function get(ids: string){
  return fetch(`${okzy}&ids=${ids}`).then(res=>res.json())
}

function parse(vid: vid1Type){
  // "第01集$https://youku.cdn11-okzy.com/share/ddc96fb7d590861ce4bbc4579f5fa848#第02集$https://youku.cdn11-okzy.com/share/7b647a7d88f4d6319bf0d600d168dbeb#第03集$https://youku.cdn11-okzy.com/share/b8a6550662b363eb34145965d64d0cfb#第04集$https://youku.cdn11-okzy.com/share/100d5d9191f185eeb98d6e291756954a#第05集$https://youku.cdn11-okzy.com/share/32bd403625078f55a266b487534aa95b#第06集$https://youku.cdn11-okzy.com/share/1b932eaf9f7c0cb84f471a560097ddb8#第07集$https://youku.cdn11-okzy.com/share/a952ddeda0b7e2c20744e52e728e5594$$$第01集$https://youku.cdn11-okzy.com/20191029/8716_602af9e7/index.m3u8#第02集$https://youku.cdn11-okzy.com/20191104/8981_e5400231/index.m3u8#第03集$https://youku.cdn11-okzy.com/20191111/9225_b63cb6c0/index.m3u8#第04集$https://youku.cdn11-okzy.com/20191118/9485_b73ea6e3/index.m3u8#第05集$https://youku.cdn11-okzy.com/20191125/9782_eebe9932/index.m3u8#第06集$https://youku.cdn11-okzy.com/20191202/9982_270a9b53/index.m3u8#第07集$https://youku.cdn11-okzy.com/20191209/10230_458b9804/index.m3u8"
  const srcs = vid.vod_play_from.split('$$$')
  const urls = vid.vod_play_url.split('$$$').map((src, idx)=>{
    if(src.endsWith('m3u8')) return {
      src: srcs[idx],
      eps: src.split('#').map(eps=>eps.split('$')),
    }
    return null
  })
  return urls.filter(v=>v)
}

function makeHist(vid: vid1Type, ij: number[], prog: number, latest?:number){
  const hist: hist1Type = {
    vidID: vid.vod_id, ij, prog, 
    info: `${vid.vod_name} 源${ij[0]+1} 第${ij[1]+1}集 ${fmtSec(prog)}`,
    latest
  }
  return hist
}

function fmtSec(sec: number){
  return `${Math.floor(sec/60)}分${sec % 60}秒`
}

//===================================

const Hists = observer(()=>{
  const {hists} = center.data
  return(
    <View className='col'>
      {Object.keys(hists).map((id)=>{
        const hist: hist1Type = hists[id]
        const {ij, prog, latest} = hist
        return(
          <View key={id} className='row aictr'>
            <AtButton onClick={()=>{
              center.delHist(hist)
            }}>删除</AtButton>
            <Text className={ij[1]+1==latest?'t3':'t2'}>{ij[1]+1} / {latest}</Text>
            <AtButton onClick={()=>{
              Taro.redirectTo({
                url: `/pages/MV-view/index?vidID=${id}&src=${ij[0]}&eps=${ij[1]}&prog=${prog}`, 
              })
            }}>{hist.info}</AtButton>
          </View>
        )
      })}
    </View>
  )
})