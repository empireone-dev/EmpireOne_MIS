import"./genStyleUtils-437fb4a2.js";import"./app-ac145980.js";import"./presets-96bf18cd.js";import{K as e}from"./useZIndex-1ad11ebd.js";import{b as r}from"./useId-f393a974.js";const m=new e("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),s=new e("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),d=function(i){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=i,n=`${o}-fade`,t=a?"&":"";return[r(n,m,s,i.motionDurationMid,a),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{d as i};
