
import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
export { Form }

type formType = { imgs: string[], txts: object }
type FormType = { temp: string[][], title: string, imgTitle?: string, onSubmit: (form: formType)=> void }
function Form(p: FormType){
  const [imgs, setImgs] = useState([])
  const [txts, setTxts] = useState<any>({})
  function set(key: string, val: string){ const obj = {...txts}; obj[key]=val; setTxts(obj) }
  useEffect(()=>{
    Taro.setNavigationBarTitle({ title: p.title })
  }, [])
  function pickImgs(){
    Taro.chooseImage({}).then(res=>{
      setImgs(res.tempFilePaths)
    })
  }
  const check = imgs.length && ( p.temp.every(field=> txts[field[0]]?.length ) )
  return(
    <View>
      {p.temp.map(field=>(
        <AtInput name={field[0]} title={field[1]} placeholder={field[2]} 
          value={txts[field[0]]} onChange={t=> set(field[0], t.toString()) }
        />
      ))}
      <View style={{display: check?'flex':'none'}}>
        <AtButton type='primary' onClick={()=> p.onSubmit({ imgs, txts }) }>提交</AtButton>
      </View>
      <AtButton type='primary' onClick={pickImgs}>{p.imgTitle || '上传图片'}</AtButton>
      {imgs.map(img=>(
        <Image mode='aspectFit' src={img}/>
      ))}
    </View>
  )
}
