import{r as a,j as t,c as n}from"./app-a38c20d9.js";import{b as u,g as f}from"./applicant-thunk-f49e810b.js";import{M as h}from"./index-d6006951.js";import{M as g}from"./index-9d513160.js";import{m as l}from"./index-cec043e3.js";import{L as x}from"./render-85b81fbb.js";import"./applicant-record-service-b22d0a78.js";import"./presets-490ebc63.js";import"./index-227a9330.js";import"./index-0b3a26a0.js";import"./useId-cb27096a.js";import"./useZIndex-e5bae908.js";import"./useSize-b76cc852.js";import"./AntdIcon-13630a05.js";import"./Compact-784794a1.js";import"./ContextIsolator-4898b4fd.js";import"./asyncToGenerator-0b1de8dc.js";import"./KeyCode-aaf7665e.js";import"./LeftOutlined-3156f812.js";import"./collapse-97de76d4.js";import"./CheckCircleFilled-ab80464f.js";import"./CloseCircleFilled-f6bebab3.js";import"./InfoCircleFilled-59d04494.js";import"./button-17307643.js";import"./CloseOutlined-f995126c.js";import"./index-6d9fa839.js";import"./pickAttrs-9206db1b.js";import"./fade-de3a406c.js";import"./useClosable-89a8d2ae.js";import"./useLocale-07fc7437.js";import"./PurePanel-5ba12f79.js";function V({data:p,item:i}){const[e,r]=a.useState(!1),[m,o]=a.useState(!1);function c(s){o(!0)}async function d(s){s.preventDefault(),r(!0);try{await n.dispatch(u({...p,status:"Pooling"})),n.dispatch(f()),r(!1),o(!1),l.success("Applicant successfully added for Pooling")}catch{l.error("Failed to add applicant for Pooling!"),r(!1)}}return t.jsxs("div",{children:[t.jsx(h.Item,{onClick:()=>c(),icon:i.icon,children:i.label}),t.jsx(g,{title:"",centered:!0,visible:m,width:900,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:t.jsxs("form",{onSubmit:d,className:"w-full h-full",children:[t.jsx("div",{className:"mt-3 text-lg font-sans",children:t.jsx("b",{children:"Are you sure you want to add this applicant for Pooling?"})}),t.jsxs("div",{className:"flex gap-2 items-center justify-end",children:[t.jsx("button",{type:"button",className:"bg-slate-300 hover:bg-slate-200 px-4 py-1 rounded-md",onClick:()=>o(!1),children:"Cancel"}),t.jsx("button",{type:"submit",className:`px-5 py-1 rounded-md text-white ${e?"bg-blue-300 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}`,disabled:e,children:e?t.jsx(x,{}):"Yes"})]})]})})]})}export{V as default};