export default {
    getAtomInfo,setCamera,
    addSphere,addVec,
    addAtoms,addLatticeVec,
    parsePOSCAR,parseVec,
};

import periodicTable from './lib/periodicTable.js'
//===============================================
function getAtomInfo(species,info){
    return periodicTable[species][info]
}
function setCamera(camera,vec){
    var scale = 2
    var x = (vec[0][0]+vec[1][0]) * scale
    var y = (vec[0][1]+vec[1][1]) * scale
    var z = (vec[0][2]+vec[1][2]) * scale
    camera.position.set( x, y, z );
}
//===============================================
function addSphere(scene,position,radius,color){
    var geometry = new THREE.SphereGeometry( radius, 128, 128 );
    var material = new THREE.MeshBasicMaterial( {color: color} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere ); 
    sphere.position.set(position[0], position[1], position[2]); 
}

function addVec(scene,origin,vec,color){
    var vec = new THREE.Vector3( vec[0], vec[1], vec[2]);
    var length = vec.length()
    vec.normalize();
    var arrowHelper = new THREE.ArrowHelper( vec, origin, length, color );
    scene.add( arrowHelper );
}
//===============================================
function addAtoms(scene,atoms){
    atoms.forEach(atom => {
        var radius = getAtomInfo(atom.species,'Atomic radius')/10
        var mass = getAtomInfo(atom.species,'Atomic mass')
        var color = parseInt(mass/300*16777215)
        addSphere(scene,atom.position,radius,color)
    });
}

function addLatticeVec(scene,vecs){
    var origin = new THREE.Vector3( 0, 0, 0 );
    var color = 0x00ff00;
    vecs.forEach(vec => {addVec(scene,origin,vec,color)})
}
//===============================================
function parsePOSCAR(text,cb){
    return new Promise((cb)=>{
        var lines = text.split("\n");
        var result = {}
        result.system = lines[0]
        result.scaling = lines[1]
        result.latticeVec = [2,3,4].map(i=>parseVec(lines[i]))
        var symbols = parseVec(lines[5],false)
        var numAtoms = parseVec(lines[6])
        result.coord = lines[7]
        result.atoms = []
        var line=8,symbol,atom
        for(symbol=0;symbol<symbols.length;symbol++){
            for(atom=0;atom<numAtoms[symbol];atom++){
                result.atoms.push({
                    species:symbols[symbol],
                    position:parseVec(lines[line]).slice(0,3)
                })
                line++;
            }
        }
        console.log(result)
        cb(result)
    })
}

function parseVec(vec,toNum=true){
    var newString = vec.replace(/\s+/g,' ').trim();
    return newString.split` `.map(x=>toNum?+x:x)
}

