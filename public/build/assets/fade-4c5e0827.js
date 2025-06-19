import"./genStyleUtils-3dccd2d6.js";import"./app-93e9e69b.js";import"./presets-f6c40391.js";import{K as e}from"./useZIndex-e197c724.js";import{b as r}from"./useId-8d023bcb.js";const m=new e("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),s=new e("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),d=function(i){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=i,n=`${o}-fade`,t=a?"&":"";return[r(n,m,s,i.motionDurationMid,a),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{d as i};
