
export { fmtcnt }

function fmtcnt(cnt: number){
  var exp = 1e6, n
  const units = ['百万', '十万', '万', '千', '百', '十']
  for(var unit of units){
    n = Math.floor( cnt / exp ); if(n) return `${n} ${unit}`
    cnt -= n*exp; exp/=10   
  }
  return n
}