
export {pickWeb, pickWebType}

type pickWebType = {
  uri: string, 
  name: string, 
  lastModified: number, 
  size: number, 
  type: string,
}
function pickWeb(){
  const id = 'pickWeb'
  let inpElm = document.getElementById(id)
  if (!inpElm){
    const obj = document.createElement('input')
    obj.setAttribute('type', 'file')
    obj.setAttribute('id', id)
    obj.setAttribute('multiple', 'multiple')
    obj.setAttribute('accept', 'image/*')
    obj.setAttribute('style', 'display: none;')
    document.body.appendChild(obj)
    inpElm = document.getElementById(id)
  }
  return new Promise<pickWebType[]>((res) => {
    if(!inpElm) return
    const events = document.createEvent('MouseEvents')
    events.initEvent('click', true, true)
    inpElm.dispatchEvent(events)
    inpElm.onchange = function(e: any){
      if(!e.target) return
      res([...e.target.files].map(item =>{
        const {name, lastModified, size, type} = item
        const uri = URL.createObjectURL(new Blob([item], {type}))
        return { uri, name, lastModified, size, type }
      }))
      e.target.value = ''
    }
  })
}
