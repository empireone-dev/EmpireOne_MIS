import{j as t}from"./app-5903bcdc.js";import m from"./applicant-proceed-inital-phase-component-9d229e48.js";import p from"./applicant-initial-rating-scale-1bdc3dae.js";import l from"./applicant-final-rating-scale-component-d476d7bb.js";import a from"./applicant-results-component-db2c1c49.js";import c from"./applicant-job-offer-component-b3d0bcdd.js";import u from"./applicant-detaills-component-452a5548.js";import o from"./applicant-set-schedule-component-dcaf5498.js";import{B as x}from"./BriefcaseIcon-c8310631.js";import{D as f,S as j}from"./index-8f1aafcd.js";import{M as h}from"./index-ab6764a2.js";import{B as P}from"./button-d3ea38b4.js";import{A,R as y,D as e,I as s,C as R}from"./RiseOutlined-a8b7b816.js";import{D as b}from"./DownOutlined-a3db3c88.js";import"./presets-ac6d2c0f.js";import"./index-a2a66e96.js";import"./index-0f76888d.js";import"./useId-6966ca54.js";import"./useZIndex-79d8cff9.js";import"./useSize-d214a582.js";import"./AntdIcon-567c410e.js";import"./Compact-1e3d859e.js";import"./ContextIsolator-7d8b47d5.js";import"./asyncToGenerator-71d13e75.js";import"./KeyCode-8bfe2c69.js";import"./LeftOutlined-d60bca4f.js";import"./collapse-97de76d4.js";import"./hiring-thunk-602b7dfd.js";import"./job-offer-service-70b794db.js";import"./applicant-thunk-33914611.js";import"./applicant-record-service-655b693d.js";import"./index-e44f7e7f.js";import"./render-4b6d5da1.js";import"./CheckCircleFilled-f83f15df.js";import"./CloseCircleFilled-697206b5.js";import"./InfoCircleFilled-e5724796.js";import"./CloseOutlined-e89cbee7.js";import"./index-fc78c6ec.js";import"./pickAttrs-436cebda.js";import"./fade-8c83fca4.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";import"./index-ea69266b.js";import"./applicant-choose-interview-component-bbff7658.js";import"./applicant-virtual-schedule-component-ca504d47.js";import"./applicant-f2f-schedule-component-07ce6055.js";function Pi({data:i,interviewer:S}){const n=[{component:t.jsx(u,{item:{label:"Application Details",key:"1",icon:t.jsx(A,{})},data:i})},...i.status=="Pending"?[{component:t.jsx(o,{status:"Initial Phase",item:{label:"Proceed to Initial Phase",key:"2",icon:t.jsx(y,{})},data:i})}]:[],...i.status=="Initial Phase"?[{component:t.jsx(p,{item:{label:"Initial Rating Scale",key:"3",icon:t.jsx(e,{})},data:i})}]:[],...i.status=="Final Phase"?[{component:t.jsx(m,{item:{label:"Initial Phase Result",key:"4",icon:t.jsx(s,{})},data:i})}]:[],...i.status=="Final Phase"&&i.final?[{component:t.jsx(l,{item:{label:"Final Rating Scale",key:"5",icon:t.jsx(e,{})},data:i})}]:[],...i.status=="Final Phase"&&!i.final?[{component:t.jsx(o,{status:"Final Phase",item:{label:"Set Schedule Final Phase",key:"6",icon:t.jsx(R,{})},data:i})}]:[],...i.status=="Passed"||i.status=="Pooling"||i.status=="Failed"||i.status=="Dismissal"||i.status=="Resignation"||i.status=="EOPE"||i.status=="AWOL"||i.status=="Probationary"||i.status=="Regular"?[{component:t.jsx(a,{data:i,item:{label:"Application Results",key:"8",icon:t.jsx(s,{})}})}]:[],...i.status=="Passed"?[{component:t.jsx(c,{item:{label:"Job Offer",key:"9",icon:t.jsx(x,{className:"h-4 mr-0.5"})},data:i})}]:[]];return t.jsx("div",{children:t.jsx(f,{overlay:t.jsx(h,{children:n.map((r,g)=>r.component)}),trigger:["click"],children:t.jsx(P,{type:"primary",children:t.jsxs(j,{children:["Menu",t.jsx(b,{})]})})})})}export{Pi as default};