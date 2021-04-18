import { ideaType } from "../../screens/home"
export { allIdeas, search, getIdeasByIds }

type allIdeasType = {[id: string]: ideaType}
const allIdeas: allIdeasType = {}
girlsToIdeas(require('./girls.json')).map(idea=> allIdeas[idea.id] = idea )
const result = new Promise<ideaType[]>((res, rej)=>{
  res(Object.values(allIdeas))
})
function search(query: string){ return result }
function getIdeasByIds(ids: string){ return result }

//================================

const girl0 = {"image": "https://javmodel.com/javdata/uploads/ai_asakura150.jpg", "name": "\u6d45\u5009\u611b - Ai Asakura", "info": ["\u751f\u5e74\u6708\u65e5 : 10/28/199310/28/1993", "\u8840\u6db2\u578b : OO", "\u80f8\u570d : 83 cm83 cm", "\u8170\u570d : 60 cm60 cm", "\u4e0b\u570d : 83 cm83 cm", "\u8eab\u9ad8 : 168 cm168 cm", "\u5f71\u7247\u985e\u5225 :  \u8584\u78bc\u00a0\n \u8584\u78bc\u00a0", "\u7ad9\u5167\u5f71\u7247 : 88"], "tags": ["\u5f15\u9000", "\u53ef\u611b", "\u9577\u817f"]}
type girlType = typeof girl0

function girlsToIdeas(p: girlType[]){
  return p.map(girl=>{
    const idea: ideaType = {
      id: girl.name,
      avatar: girl.image,
      vote: 0,
      title: girl.name,
      info: '',
      body: girl.info.join('\n'),
      tags: girl.tags,
      images: [girl.image],
      numComment: 0,
      numRetweet: 0,
      numHand: 0,
      uris: ['']
    }
    return idea
  })
}