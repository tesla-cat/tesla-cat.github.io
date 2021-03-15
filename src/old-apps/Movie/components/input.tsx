
import React from 'react'

export {Quill}

const Quill = ()=>{
    const uri = 'https://tesla-cat.github.io/JianYa/quill/examples/full.html'
    return(
        <iframe src={uri} style={{height: 600, border:'none'}} allowFullScreen></iframe>
    )
}