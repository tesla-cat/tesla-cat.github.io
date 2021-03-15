
import { Obj } from '../mobx/main'
export { idToIcon }

function idToIcon(id: string){
    return idToIconMap[id] || id
}

const idToIconMap : Obj = {
    'back': 'arrow-left-thick',
    'ToAddPost': 'pencil',
    'ToSettings': 'hexagon',
    'ToUser': 'account',
    'ToPost': 'arrow-expand',
    'ToHome': 'home',
    'addPost': 'check-bold',
    'GetUserPosts': 'chevron-down',
    'like':'thumb-up',
    'hate':'thumb-down',
    'more':'dots-vertical',
    'hide':'eye-off',
}
