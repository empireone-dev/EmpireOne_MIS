import{r as l,j as t}from"./app-73b46094.js";import c from"./applicant-virtual-schedule-component-4c25339e.js";import f from"./applicant-f2f-schedule-component-6a30b315.js";import{M as u}from"./index-60e8455b.js";import{B as n}from"./button-4029560c.js";import"./applicant-thunk-83e0b221.js";import"./applicant-record-service-2c0554fb.js";import"./index-f1383bf4.js";import"./index-d93f8a93.js";import"./presets-73c987c9.js";import"./render-4c9a3ffe.js";import"./AntdIcon-d3507f1a.js";import"./asyncToGenerator-bb14fadb.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./KeyCode-1cd0ccde.js";import"./pickAttrs-7a971b97.js";import"./useZIndex-e8c3093a.js";import"./CloseOutlined-b9197a42.js";import"./useId-9ba4889a.js";import"./index-626462f0.js";import"./fade-967bd62f.js";import"./ContextIsolator-e4aba7cb.js";import"./useSize-d7f92a55.js";import"./Compact-0fc6e86e.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";function K({open:r,setOpen:o,data:e,status:i}){const[a,p]=l.useState(!1),[s,m]=l.useState(!1);return t.jsxs("div",{children:[t.jsx(u,{title:`${i} Interview`,centered:!0,visible:r,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:t.jsxs("div",{className:"flex flex-1 gap-2 w-full",children:[t.jsx(n,{type:"primary",className:"w-full",onClick:()=>p(!0),children:"Face to face Interview"}),t.jsx(n,{type:"primary",className:"w-full",onClick:()=>m(!0),children:"Virtual Interview"})]})}),t.jsx(c,{setOpenDialog:o,openDialog:r,status:i,data:e,open:s,setOpen:m}),t.jsx(f,{status:i,setOpenDialog:o,openDialog:r,data:e,open:a,setOpen:p})]})}export{K as default};