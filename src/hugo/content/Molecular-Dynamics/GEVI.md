---
author: Ruiqi Ding
title: GEVI
date: 2021-03-17
description: GEVI
math: true
---

### Step 1: testing voltage-dependent simulation code

- The following is a simple test to simulate ASAP3 under an time-dependent external electric field.

- The total simulation is 40 ps, the electric field is (the value 100 is randomly assigned with unknown unit just to test out the code)

$$
  E_x = \begin{cases} 
    0 & t \in (0, 20) \text{ ps} \newline
    100 & t \in (20, 40) \text{ ps} 
  \end{cases}
$$

- One can observe the protein being stretched along some direction (I will add an arrow in the animation in the future), proving the test successful. Note that the animation is interactive.

**the animation may take some time to load**

{{< ngl >}}
<script>
var pdbFile = '/site/md/ASAP3.pdb'
var xtcFile = '/site/md/ASAP3.xtc'
var atomPair = [
  [ "15.CA", "365.CA" ]
]
</script>
{{< /ngl >}}

- The following shows how the electric field affects the potential energy and kinetic energy of the system:

![](/site/images/ASAP3-1.PNG)

- The next steps are:
  - Change \\(E_x\\) to realistic values and unit
  - Add lipid membrane, currently there is only protein and water.

- Limitations:
  - The chromophore cannot be simulated at the moment since it is a nonstandard residue not defined in the force field. I consulted a postdoc from Prof. Vijay Pande's (Stanford) group on Github, [here is our conversation](https://github.com/openmm/openmm/issues/3062#issuecomment-799161915). I will ask Carl for help later (He seems busy so I don't want to bother him too often).