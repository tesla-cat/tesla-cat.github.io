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
  dcdFile = '/site/md/ASAP3.dcd'

  stage.loadFile(pdbFile).then(structure=>{
    structure.addRepresentation("cartoon")
    NGL.autoLoad(dcdFile).then((frames)=>{
      structure.addTrajectory(frames)
      console.log(structure)
      structure.trajList[0].trajectory.player.play()
    })
  })
}

</script>
{{< /rawhtml >}}