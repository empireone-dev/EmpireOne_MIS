import{j as t}from"./app-482355be.js";import r from"./applicant-proceed-inital-phase-component-6698892c.js";import p from"./applicant-initial-rating-scale-bb089283.js";import l from"./applicant-final-rating-scale-component-e51528a9.js";import c from"./applicant-check-schedule-component-8e55f9b8.js";import a from"./applicant-results-component-c40aa7e6.js";import u from"./applicant-job-offer-component-6e12aa40.js";import f from"./applicant-detaills-component-f3f65774.js";import o from"./applicant-set-schedule-component-8fc6b201.js";import{B as x}from"./BriefcaseIcon-16302691.js";import{D as j,S as h}from"./index-74f67030.js";import{M as P}from"./index-3d0ae574.js";import{B as S}from"./button-120bbd6a.js";import{A,R as y,D as e,I as n,C,S as b}from"./ScheduleOutlined-1bd9697c.js";import{D as k}from"./DownOutlined-4600ab35.js";import"./presets-3fad3b18.js";import"./index-44babc8d.js";import"./index-5c96ec32.js";import"./useId-2195e329.js";import"./useZIndex-87e47ffd.js";import"./useSize-df0f8805.js";import"./AntdIcon-b997608a.js";import"./Compact-8ea0c993.js";import"./ContextIsolator-a3a66f8f.js";import"./asyncToGenerator-be697f7b.js";import"./LeftOutlined-d4f7e3bf.js";import"./collapse-97de76d4.js";import"./hiring-thunk-fcebea56.js";import"./job-offer-service-7ebb5d61.js";import"./applicant-thunk-41ea0333.js";import"./applicant-record-service-e8bf8c30.js";import"./index-a58b322c.js";import"./render-a51f93ee.js";import"./CheckCircleFilled-53fcacf0.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./CloseOutlined-22e36e3d.js";import"./index-252e5d81.js";import"./pickAttrs-ce94d08f.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";import"./index-d7120351.js";import"./LoadingOutlined-a370997b.js";import"./applicant-choose-interview-component-71e9bede.js";import"./applicant-virtual-schedule-component-c9547815.js";import"./applicant-f2f-schedule-component-b6774072.js";function Ai({data:i,interviewer:R}){const s=[{component:t.jsx(f,{item:{label:"Application Details",key:"1",icon:t.jsx(A,{})},data:i})},...i.status=="Pending"?[{component:t.jsx(o,{status:"Initial Phase",item:{label:"Proceed to Initial Phase",key:"2",icon:t.jsx(y,{})},data:i})}]:[],...i.status=="Initial Phase"?[{component:t.jsx(p,{item:{label:"Initial Rating Scale",key:"3",icon:t.jsx(e,{})},data:i})}]:[],...i.status=="Final Phase"?[{component:t.jsx(r,{item:{label:"Initial Phase Result",key:"4",icon:t.jsx(n,{})},data:i})}]:[],...i.status=="Final Phase"&&i.final?[{component:t.jsx(l,{item:{label:"Final Rating Scale",key:"5",icon:t.jsx(e,{})},data:i})}]:[],...i.status=="Final Phase"&&!i.final?[{component:t.jsx(o,{status:"Final Phase",item:{label:"Set Schedule Final Phase",key:"6",icon:t.jsx(C,{})},data:i})}]:[],...i.status=="Final Phase"&&!i.final?[{component:t.jsx(c,{data:i,item:{label:"Check Schedule of Interviewer",key:"7",icon:t.jsx(b,{})}})}]:[],...i.status=="Passed"||i.status=="Pooling"||i.status=="Failed"||i.status=="Dismissal"||i.status=="Resignation"||i.status=="EOPE"||i.status=="AWOL"||i.status=="Probationary"||i.status=="Regular"?[{component:t.jsx(a,{data:i,item:{label:"Application Results",key:"8",icon:t.jsx(n,{})}})}]:[],...i.status=="Passed"?[{component:t.jsx(u,{item:{label:"Job Offer",key:"9",icon:t.jsx(x,{className:"h-4 mr-0.5"})},data:i})}]:[]];return t.jsx("div",{children:t.jsx(j,{overlay:t.jsx(P,{children:s.map((m,I)=>m.component)}),trigger:["click"],children:t.jsx(S,{type:"primary",children:t.jsxs(h,{children:["Menu",t.jsx(k,{})]})})})})}export{Ai as default};