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
<script src="https://cdnjs.cloudflare.com/ajax/libs/ngl/2.0.0-dev.38/ngl.js" integrity="sha512-dtJBBIiDMMOIqN5LMhR9ePTUhalThGLyHvOz+n069obXkNgOLUHGP628fb7kv4YYh2znk/5gU/s+Jvr6djLTPw==" crossorigin="anonymous"></script>
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