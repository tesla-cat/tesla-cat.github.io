
<div id="ngl" style="width:100%; height:500px;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ngl/2.0.0-dev.38/ngl.js"></script>
<script>
  var pdbFile = '/files/md/ASAP3.pdb'
  var xtcFile = '/files/md/ASAP3.xtc'
  var atomPair = [
    [ "15.CA", "365.CA" ]
  ]
</script>
<script>
  var stage = new NGL.Stage("ngl")
  window.addEventListener("resize",e=>{stage.handleResize()},false)
  stage.loadFile(pdbFile).then((o)=>{    
    o.addRepresentation('cartoon', { sele: 'protein' })
    o.addRepresentation('distance', { atomPair })
    o.autoView()
    NGL.autoLoad(xtcFile).then((frames)=>{
      o.addTrajectory(frames)
      o.trajList[0].trajectory.player.play()
    })
  })
</script>
