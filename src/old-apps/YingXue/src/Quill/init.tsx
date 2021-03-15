
import katex from './katex.min'
import './mhchem.min'

import hljs from './highlight.min'

import './katex.min.css'
import './monokai-sublime.min.css'

export { latex }

declare global {
  interface Window { katex: any, hljs: any, Quill: any }
}

const latex = (text?: string)=> text && katex.renderToString(text, {throwOnError: false})

window.katex = katex
window.hljs = hljs
