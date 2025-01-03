import"./index-d975a39f.js";import"./app-a2064f5b.js";import"./presets-53a923d4.js";import{K as e}from"./useZIndex-acb66fea.js";import{b as r}from"./useId-6909a6c6.js";const m=new e("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),s=new e("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),d=function(i){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=i,n=`${o}-fade`,t=a?"&":"";return[r(n,m,s,i.motionDurationMid,a),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{d as i};
