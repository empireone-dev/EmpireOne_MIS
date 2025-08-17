import"./genStyleUtils-cb767b0a.js";import"./app-0b39dded.js";import"./presets-707d4a4e.js";import{K as e}from"./useZIndex-9c6b6c3d.js";import{b as r}from"./useId-def1c2b3.js";const m=new e("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),s=new e("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),d=function(i){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=i,n=`${o}-fade`,t=a?"&":"";return[r(n,m,s,i.motionDurationMid,a),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{d as i};
