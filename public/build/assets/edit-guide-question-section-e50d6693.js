import{r as o,j as e,c as d}from"./app-3fef3a63.js";import{u as f}from"./guide-question-thunk-5211e911.js";import{m as x}from"./index-17ede4fa.js";import{M as h}from"./index-1bbc017a.js";import{M as b}from"./index-b28d3991.js";import"./index-aee74163.js";import"./presets-ca4e9e1b.js";import"./render-06651440.js";import"./asyncToGenerator-d91032a9.js";import"./CheckCircleFilled-ae4c12ba.js";import"./AntdIcon-f6a6858b.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./LoadingOutlined-285e92e4.js";import"./KeyCode-dba4fb16.js";import"./pickAttrs-0272306c.js";import"./useZIndex-0bbceadc.js";import"./CloseOutlined-cc20978d.js";import"./index-8215846e.js";import"./useId-486ac681.js";import"./useSize-d7041e64.js";import"./Compact-7f0d1344.js";import"./ContextIsolator-7f0f291f.js";import"./LeftOutlined-697ba1d8.js";import"./collapse-97de76d4.js";import"./button-7a476b2b.js";import"./index-067d7e3e.js";import"./fade-fce3c8f0.js";import"./useClosable-e3f3eb25.js";import"./useLocale-d278345a.js";import"./PurePanel-06125fb1.js";function X({data:i,label:l,icon:p}){const[t,a]=o.useState({}),[n,u]=x.useMessage(),[c,s]=o.useState(!1);o.useEffect(()=>{a(i)},[]);function m(r){r.preventDefault();try{d.dispatch(f(t)),n.success("Updated Successfully"),s(!1)}catch{n.error("error")}}return e.jsxs("div",{children:[u,e.jsxs(h.Item,{icon:p,children:[e.jsx("button",{onClick:()=>s(!0),children:l}),e.jsx(b,{title:l,centered:!0,open:c,footer:null,onOk:()=>s(!1),onCancel:()=>s(!1),width:520,children:e.jsx("div",{className:"w-full",children:e.jsx("div",{className:"flex flex-wrap -mx-3",children:e.jsx("div",{className:"w-full px-3",children:e.jsxs("form",{onSubmit:m,className:"w-full",children:[e.jsx("div",{className:"flex flex-wrap -mx-3 mt-2",children:e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-2",children:"Guide Questionss"}),e.jsx("input",{defaultValue:t==null?void 0:t.guideqs,onChange:r=>a({...t,guideqs:r.target.value}),name:"guideqs",className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",placeholder:""})]})}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>s(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",onClick:m,type:"submit",children:"Save Changes"})]})]})})})})})]},i.key)]})}export{X as default};