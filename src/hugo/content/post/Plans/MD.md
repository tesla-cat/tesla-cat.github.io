+++
author = "Ruiqi Ding"
title = "MD"
date = "2021-02-19"
description = "MD"
tags = []
categories = []
series = []
aliases = []
+++

{{< rawhtml >}}
<div id="viewport" style="width:100%; height:80vh;"></div>
<script src="/site/md/ngl.js"></script>
<script>

window.onload = ()=>{
  var stage = new NGL.Stage( "viewport" )
  window.addEventListener("resize",e=>{stage.handleResize()},false)

  pdbFile = '/site/md/ASAP3.pdb'
  dcdFile = '/site/md/ASAP3.dcd.gz'

  stage.loadFile(pdbFile).then(function (o) {
    var atomPair = [
      [ "15.CA", "365.CA" ]
    ]
    o.addRepresentation('cartoon', { sele: 'protein' })
    o.addRepresentation('distance', { atomPair })
    o.autoView()

    NGL.autoLoad(dcdFile).then(function (frames) {
      o.addTrajectory(frames)
      o.trajList[0].trajectory.player.play()
    })
  })
}

</script>
{{< /rawhtml >}}