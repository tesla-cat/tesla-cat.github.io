
import Taro from '@tarojs/taro'
export { navTo, pageType, info }

type pageType = 'Home' | 'AddPost' | 'SetProfile'
function navTo(page: pageType, param = ''){
  Taro.navigateTo({url: `/v1/pages/${page}/${page}?${param}` })
}

function info(text: string, success = false){
  Taro.showToast({ title: text, icon: success?'success':'none' })
}