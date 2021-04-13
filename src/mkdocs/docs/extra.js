var script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ngl/2.0.0-dev.38/ngl.js'
document.head.appendChild(script)

function loadMD(pdbFile, xtcFile, atomPair){
  var stage = new NGL.Stage("ngl")
  const root = 0 ? '': '/site'
  window.addEventListener("resize", e=>stage.handleResize(), false)
  stage.loadFile(`${root}/files/md/${pdbFile}`).then((o)=>{    
    o.addRepresentation('cartoon', { sele: 'protein' })
    o.addRepresentation('distance', { atomPair })
    o.autoView()
    NGL.autoLoad(`${root}/files/md/${xtcFile}`).then((frames)=>{
      o.addTrajectory(frames)
      o.trajList[0].trajectory.player.play()
    })
  })
}
