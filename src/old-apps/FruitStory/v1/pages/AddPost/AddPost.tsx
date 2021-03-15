
import React, { useEffect } from 'react'
import { Form } from '../../comps/Form'
import { center } from '../../comps/center'
import { navTo, info } from '../../comps/funcs'

const formTemp1 = [
  ['title', '标题', '品牌 品名'],
]

export default function AddPost(){
  useEffect(()=>{
    if(! center.data.myDoc){ navTo('SetProfile'); info('请先完善个人信息') }
  },[])
  return(
    <Form title='发布商品' temp={formTemp1} onSubmit={()=>{}}/>
  )
}
