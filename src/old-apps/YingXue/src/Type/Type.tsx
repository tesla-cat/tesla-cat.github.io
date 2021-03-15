
import { MemoExoticComponent, ReactNode } from "react"

export { MyComponent, IconText, MyData, MyData2, Obj, obj0 }

type MyComponent = {
  val?: any, on?: (arg:any)=>any, nav?: { to: string, arg?: any },
  Card?: MemoExoticComponent<any>, children?: ReactNode,
  id?:string, name?: string, color?: string, bgc?: string,
  size?: number, rad?: number, elev?: number, flex?: number,
  marg?: number, mh?: number, mv?: number,
  pad?: number, ph?: number, pv?: number,
  lines?: number, cols?: number, 
  hori?: boolean, cov?: boolean, bold?:boolean, edit?: boolean, rev?: boolean, show?:boolean,
}

type IconText = Array<{ icon: string, text: string }>

type MyData = {
  body: string , avatar: string, title: string, username: string, time: string, 
  form?: string, level?: string, subject?: string, tags?: string, 
  viewCount: number, likeCount: number, commentCount: number, userLikeCount: number,
}

type MyData2 = {
  icon?: string, img?:string, title?: string, subtitle?: string,
  links?: IconText, body?: string, 
  actions?: IconText, action?: string,
}

type Obj = { [key: string] : any }
const obj0 : Obj = {}
