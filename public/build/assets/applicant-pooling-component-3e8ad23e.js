import{r as a,j as t,e as n}from"./app-73b46094.js";import{b as u,g as f}from"./applicant-thunk-83e0b221.js";import{M as h}from"./index-2a08f1d0.js";import{M as g}from"./index-60e8455b.js";import{m as l}from"./index-f1383bf4.js";import{L as x}from"./render-4c9a3ffe.js";import"./applicant-record-service-2c0554fb.js";import"./presets-73c987c9.js";import"./index-d93f8a93.js";import"./index-7f86f1b9.js";import"./useId-9ba4889a.js";import"./useZIndex-e8c3093a.js";import"./useSize-d7f92a55.js";import"./AntdIcon-d3507f1a.js";import"./Compact-0fc6e86e.js";import"./ContextIsolator-e4aba7cb.js";import"./asyncToGenerator-bb14fadb.js";import"./KeyCode-1cd0ccde.js";import"./LeftOutlined-151109f3.js";import"./collapse-97de76d4.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./button-4029560c.js";import"./CloseOutlined-b9197a42.js";import"./index-626462f0.js";import"./pickAttrs-7a971b97.js";import"./fade-967bd62f.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";function V({data:p,item:i}){const[e,r]=a.useState(!1),[m,o]=a.useState(!1);function c(s){o(!0)}async function d(s){s.preventDefault(),r(!0);try{await n.dispatch(u({...p,status:"Pooling"})),n.dispatch(f()),r(!1),o(!1),l.success("Applicant successfully added for Pooling")}catch{l.error("Failed to add applicant for Pooling!"),r(!1)}}return t.jsxs("div",{children:[t.jsx(h.Item,{onClick:()=>c(),icon:i.icon,children:i.label}),t.jsx(g,{title:"",centered:!0,visible:m,width:900,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:t.jsxs("form",{onSubmit:d,className:"w-full h-full",children:[t.jsx("div",{className:"mt-3 text-lg font-sans",children:t.jsx("b",{children:"Are you sure you want to add this applicant for Pooling?"})}),t.jsxs("div",{className:"flex gap-2 items-center justify-end",children:[t.jsx("button",{type:"button",className:"bg-slate-300 hover:bg-slate-200 px-4 py-1 rounded-md",onClick:()=>o(!1),children:"Cancel"}),t.jsx("button",{type:"submit",className:`px-5 py-1 rounded-md text-white ${e?"bg-blue-300 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}`,disabled:e,children:e?t.jsx(x,{}):"Yes"})]})]})})]})}export{V as default};