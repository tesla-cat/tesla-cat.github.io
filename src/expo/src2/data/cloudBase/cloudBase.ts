
/**
 * https://console.cloud.tencent.com/tcb/scf/detail?envId=rick-5g5jicykd55413f5&rid=1&id=main&tab=scfCode&NameSpace=rick-5g5jicykd55413f5
 * https://cloud.tencent.com/document/product/876/41762
 */

import cloudBase from '@cloudbase/js-sdk'
export {fetchJSON}

const app = cloudBase.init({
  env: 'rick-5g5jicykd55413f5',
  region: 'ap-guangzhou'
})

type callType = {
  function: "fetch",
  args: object,
}
function call(data: callType){
  return app.callFunction({ name: "main", data }).then(r=>r.result)
}
function fetchJSON(url: string){
  return call({function:'fetch', args: {url}}).then(r=>JSON.parse(r))
}