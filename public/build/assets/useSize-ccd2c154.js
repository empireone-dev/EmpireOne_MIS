import{U as o}from"./app-12dd3627.js";import{N as a,S as u}from"./index-4e0ea6ca.js";function s(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=[];return o.Children.forEach(r,function(n){n==null&&!e.keepEmpty||(Array.isArray(n)?t=t.concat(s(n)):a.isFragment(n)&&n.props?t=t.concat(s(n.props.children,e)):t.push(n))}),t}const f=r=>{const e=o.useContext(u);return o.useMemo(()=>r?typeof r=="string"?r??e:r instanceof Function?r(e):e:e,[r,e])},g=f;export{s as t,g as u};