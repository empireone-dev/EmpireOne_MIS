import{r as m,j as t}from"./app-482355be.js";import c from"./applicant-virtual-schedule-component-c9547815.js";import f from"./applicant-f2f-schedule-component-b6774072.js";import{M as u}from"./index-a58b322c.js";import{B as n}from"./button-120bbd6a.js";import"./applicant-thunk-41ea0333.js";import"./applicant-record-service-e8bf8c30.js";import"./LoadingOutlined-a370997b.js";import"./presets-3fad3b18.js";import"./AntdIcon-b997608a.js";import"./index-d7120351.js";import"./index-44babc8d.js";import"./render-a51f93ee.js";import"./asyncToGenerator-be697f7b.js";import"./CheckCircleFilled-53fcacf0.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./useZIndex-87e47ffd.js";import"./pickAttrs-ce94d08f.js";import"./CloseOutlined-22e36e3d.js";import"./useId-2195e329.js";import"./index-252e5d81.js";import"./ContextIsolator-a3a66f8f.js";import"./useSize-df0f8805.js";import"./Compact-8ea0c993.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";function J({open:r,setOpen:o,data:i,status:e}){const[a,p]=m.useState(!1),[s,l]=m.useState(!1);return t.jsxs("div",{children:[t.jsx(u,{title:`${e} Interview`,centered:!0,visible:r,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:t.jsxs("div",{className:"flex flex-1 gap-2 w-full",children:[t.jsx(n,{type:"primary",className:"w-full",onClick:()=>p(!0),children:"Face to face Interview"}),t.jsx(n,{type:"primary",className:"w-full",onClick:()=>l(!0),children:"Virtual Interview"})]})}),t.jsx(c,{setOpenDialog:o,openDialog:r,status:e,data:i,open:s,setOpen:l}),t.jsx(f,{status:e,setOpenDialog:o,openDialog:r,data:i,open:a,setOpen:p})]})}export{J as default};