import{r as i,j as o,e as g}from"./app-12dd3627.js";import{u as y}from"./pre-employment-file-service-0bba09c2.js";import{g as j}from"./final-rate-thunk-0b31a9c0.js";import{M as w}from"./index-d368cae6.js";import{a as l,U as _}from"./index-2894dd06.js";import{B as k}from"./button-aae57988.js";import{m as R}from"./index-8ae8737d.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-bc53da68.js";import"./index-4e0ea6ca.js";import"./presets-2db74b6f.js";import"./render-a458bafb.js";import"./AntdIcon-8b25e930.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useSize-ccd2c154.js";import"./Compact-9e968cf1.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./collapse-97de76d4.js";import"./useForceUpdate-018cd649.js";import"./DeleteOutlined-cdbd1357.js";import"./EyeOutlined-2bad6abe.js";import"./CheckOutlined-05cd87ef.js";import"./index-1f34c205.js";function ne({data:e}){const[m,s]=i.useState(!1),[n,a]=i.useState(""),[r,c]=i.useState([]),[d,p]=i.useState(!1);i.useEffect(()=>{e!=null&&e.reqs&&a(e==null?void 0:e.reqs)},[e]);const u=()=>{s(!0)},f=async()=>{const t=new FormData;p(!0),t.append("file",r.originFileObj),t.append("status","Uploaded"),t.append("reqs",n),t.append("id",e==null?void 0:e.id),t.append("app_id",window.location.pathname.split("/")[2]);try{if(r.status=="done"){const b=await y(t);await g.dispatch(j(window.location.pathname.split("/")[2])),await R.success("Reuploaded successfully!"),s(!1),p(!1)}}catch{p(!1)}},x=()=>{s(!1)};async function h({file:t}){c(t)}return console.log("data",e),o.jsxs("div",{children:[o.jsx("button",{type:"button",onClick:u,className:"text-2xl ml-2.5 text-red-500",children:o.jsx(l,{})}),o.jsxs(w,{confirmLoading:d,title:"REUPLOAD REQUIREMENTS",open:m,onOk:f,okText:"Submit",onCancel:x,children:[o.jsxs("div",{className:"w-full",children:[o.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Name of Requirement"}),o.jsx("input",{onChange:t=>a(t.target.value),value:n,type:"text",name:"reqs",className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",readOnly:!0})]}),o.jsx(_,{action:"https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",listType:"picture",method:"GET",maxCount:1,onChange:h,multiple:!1,defaultFileList:r,children:o.jsx(k,{type:"primary",icon:o.jsx(l,{}),children:"Upload Scanned Image"})})]})]})}export{ne as default};