
export { latexHelpers0 }

const math = [
  'x_i^2', '\\log_2 x', '10^{10}', '{x^y}^z', 
  '\\{ x \\}', '\\Vert x \\Vert', '\\langle x \\rangle', '\\lceil x \\rceil', '\\lfloor x \\rfloor', '\\left( {x \\over y} \\right)', 
  '\\sum', '\\int', '\\iint', '\\iiint', '\\prod', '\\bigcup', '\\bigcap', '\\sum\\limits_{i=0}^\\infty i^2',  
  '\\Bbb{A}', '\\mathcal{A}', '\\mathscr{A}', 
  '\\sqrt{x}', 
  '\\sin x', '\\lim\\limits_{x \\to 0}', '{N \\choose k}',
  'a \\equiv b \\pmod n',
  '\\ldots', '\\cdots', '\\ddots', '\\vdots',
  'a \\, b \\; c \\quad d \\qquad e',
  '\\text{text}',
  '\\hat{x}', '\\widehat{xy}', '\\bar{x}', '\\overline{xy}', '\\vec{x}', '\\overrightarrow{xy}', '\\overleftrightarrow{xy}', '\\dot{x}', '\\ddot{x}',
  `\\left[
  \\begin{array}{cc|c}
    1&2&3\\\\
    4&5&6
  \\end{array}
  \\right]
  `,
  `\\begin{pmatrix}
  a & b\\\\
  \\hline
  c & d\\\\
  \\end{pmatrix}
  `,
  ...(['small','', 'p', 'b', 'B', 'v', 'V', ].map(type=>(
  `\\begin{${type}matrix}
  1 & 2 \\\\
  3 & 4 \\\\
  \\end{${type}matrix}
  `
  ))),
  `f(n) = \\begin{cases}
  1,  & \\text{if $n$ is even} \\\\
  0, & \\text{if $n$ is odd}
  \\end{cases}
  `,
  ...('\\alpha \\beta \\omega \\epsilon \\varepsilon \\phi \\varphi \\Gamma \\Delta \\Omega'.split(' ')),
  ...('\\lt \\not\\lt \\gt \\le \\ge \\ne'.split(' ')),
  ...('\\times \\div \\pm \\mp'.split(' ')),
  ...('\\infty \\aleph_0 \\nabla \\partial \\Im \\Re'.split(' ')),
  ...('\\approx \\sim \\simeq \\cong \\equiv \\prec \\lhd \\because \\therefore'.split(' ')),
  ...('\\cup \\cap \\setminus \\subset \\subseteq \\subsetneq \\supset \\in \\notin \\emptyset \\varnothing'.split(' ')),
  ...('\\to \\leftarrow \\Rightarrow \\Leftarrow \\mapsto'.split(' ')),
  ...('\\land \\lor \\lnot \\forall \\exists \\top \\bot \\vdash \\vDash'.split(' ')),
  ...('\\star \\ast \\oplus \\circ \\bullet'.split(' ')),
]

const chem = [
  '\\ce{CO2 + C -> 2 CO}',
  '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}',
  'C_p[\\ce{H2O(l)}] = \\pu{75.3 J // mol K}',
  '\\ce{H2O}', '\\ce{Sb2O3}', 
  '\\ce{H+}', '\\ce{CrO4^2-}', '\\ce{[AgCl2]-}', '\\ce{Y^99+}', 
  '\\ce{1/2 H2O}', '\\ce{$n$ H2O}',
  '\\ce{^227_90Th+}', '\\ce{^0_-1n-}',
  '\\ce{H^3HO}', 
  '\\ce{A -> B}', '\\ce{A <- B}', '\\ce{A <--> B}', '\\ce{A <=> B}', '\\ce{A <=>> B}', '\\ce{A <<=> B}', 
  '\\ce{A ->[H2O] B}', '\\ce{A ->[{text above}][{text below}] B}', '\\ce{A ->[$x$][$x_i$] B}', 
  '\\ce{(NH4)2S}', '\\ce{[\\{(X2)3\\}2]^3+}', '\\ce{CH4 + 2 $\\left( \\ce{O2 + 79/21 N2} \\right)$}',
  '\\ce{H2(aq)}', '\\ce{CO3^2-_{(aq)}}', '\\ce{NaOH(aq,$\\infty$)}',
  '\\ce{ZnS($c$)}',  '\\ce{ZnS(\\ca$c$)}',
  '\\ce{NO_x}', '\\ce{Fe^n+}', '\\ce{x Na(NH4)HPO4 ->[\\Delta] (NaPO3)_x + x NH3 ^ + x H2O}',
  '\\ce{\\mu-Cl}', '\\ce{[Pt(\\eta^2-C2H4)Cl3]-}', '\\ce{\\beta +}', '\\ce{^40_18Ar + \\gamma{} + \\nu_e}',
  '\\ce{NaOH(aq,$\\infty$)}', '\\ce{Fe(CN)_{$\\frac{6}{2}$}}', '\\ce{X_{$i$}^{$x$}}', '\\ce{X_$i$^$x$}',
  '\\ce{$cis${-}[PtCl2(NH3)2]}', '\\ce{CuS($hP12$)}', 
  '\\ce{{Gluconic Acid} + H2O2}', '\\ce{X_{{red}}}', '\\ce{{(+)}_589{-}[Co(en)3]Cl3}',
  '\\ce{C6H5-CHO}', '\\ce{A-B=C#D}', '\\ce{A\\bond{-}B\\bond{=}C\\bond{#}D}', '\\ce{A\\bond{1}B\\bond{2}C\\bond{3}D}',
  '\\ce{A\\bond{~}B\\bond{~-}C}', '\\ce{A\\bond{~--}B\\bond{~=}C\\bond{-~-}D}', '\\ce{A\\bond{...}B\\bond{....}C}',
  '\\ce{A\\bond{->}B\\bond{<-}C}', 
  '\\ce{KCr(SO4)2*12H2O}', '\\ce{KCr(SO4)2.12H2O}', '\\ce{KCr(SO4)2 * 12 H2O}', 
  '\\ce{Fe^{II}Fe^{III}2O4}', '\\ce{OCO^{.-}}', '\\ce{NO^{(2.)-}}',
  '\\ce{Li^x_{Li,1-2x}Mg^._{Li,x}$V$\'_{Li,x}Cl^x_{Cl}}', '\\ce{O\'\'_{i,x}}', '\\ce{M^{..}_i}',
  '\\ce{$V$^{4\'}_{Ti}}', '\\ce{V_{V,1}C_{C,0.8}$V$_{C,0.2}}', 
  '\\ce{SO4^2- + Ba^2+ -> BaSO4 v}', '\\ce{A v B (v) -> B ^ B (^)}', 
  '\\ce{NO^*}', '\\ce{1s^2-N}', '\\ce{n-Pr}', '\\ce{iPr}', '\\ce{\\ca Fe}', '\\ce{A, B, C; F}', 
  '\\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\\underset{\\text{amphoteres Hydroxid}}{\\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\\underset{\\text{Hydroxozikat}}{\\ce{[Zn(OH)4]^2-}}$}',
  '\\ce{$K = \\frac{[\\ce{Hg^2+}][\\ce{Hg}]}{[\\ce{Hg2^2+}]}$}',
  '\\ce{$K = \\ce{\\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}',
  '\\ce{Hg^2+ ->[I-]  $\\underset{\\mathrm{red}}{\\ce{HgI2}}$  ->[I-]  $\\underset{\\mathrm{red}}{\\ce{[Hg^{II}I4]^2-}}$}',
  '\\pu{123 kJ}', '\\pu{123 mm2}', '\\pu{123 J s}', '\\pu{123 J*s}', '\\pu{123 kJ/mol}', '\\pu{123 kJ//mol}',
  '\\pu{123 kJ mol-1}', '\\pu{123 kJ*mol-1}', '\\pu{1.2e3 kJ}', '\\pu{1,2e3 kJ}', '\\pu{1.2E3 kJ}', '\\pu{1,2E3 kJ}',
]

const latexHelpers0 = [
  { text: '数学', icon: 'math', vals: math },
  //{ text: '物理', icon: 'atom', vals: [] },
  { text: '化学', icon: 'chemistry', vals: chem },
  { text: '历史', icon: 'history', vals: [] },
]