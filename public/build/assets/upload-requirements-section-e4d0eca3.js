import{r,b as h,j as t}from"./app-63d290ed.js";import{s as x}from"./pre-employment-file-service-95f790c6.js";import{h as b}from"./moment-a9aaa855.js";import{F as g}from"./FileJpgOutlined-396db8cd.js";import{M as j}from"./index-ccb87f83.js";import{a as k,U as y}from"./index-dd944dc8.js";import{B as w}from"./button-082e41af.js";import"./presets-9872d8f0.js";import"./AntdIcon-d99b3c04.js";import"./index-d8b89dfe.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./useZIndex-dc62b87b.js";import"./useId-ad7dc23b.js";import"./CloseOutlined-a4ab623b.js";import"./index-dee3d1b8.js";import"./pickAttrs-8fbf8c8c.js";import"./ContextIsolator-63f8fbab.js";import"./useSize-3c640658.js";import"./Compact-641d596c.js";import"./useClosable-eb9686b6.js";import"./useLocale-29929ee3.js";import"./PurePanel-1f85830c.js";import"./collapse-97de76d4.js";import"./LoadingOutlined-8390b05c.js";import"./useForceUpdate-e52db8bf.js";import"./DeleteOutlined-8a636df7.js";import"./EyeOutlined-ac49cf56.js";import"./CheckOutlined-cd2f64e6.js";import"./index-2cdf993a.js";function oe(){const[a,s]=r.useState(!1),[n,l]=r.useState(""),{checklists:p}=h(e=>e.checklists),[o,m]=r.useState([]),d=()=>{s(!0)},c=async()=>{s(!1);const e=new FormData;if(console.log("fileList",o),e.append("file",o.originFileObj),e.append("status","Uploaded"),e.append("reqs",n),e.append("created",b().format("YYYY-MM-DD HH:mm:ss")),e.append("app_id",window.location.pathname.split("/")[2]),o.status=="done"){const i=await x(e);console.log("result",i)}},u=()=>{s(!1)};async function f({file:e}){m(e)}return t.jsxs("div",{children:[t.jsx("div",{className:"flex mt-2.5",children:t.jsxs("button",{type:"button",id:"theme-toggle",onClick:d,className:"px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors",children:[t.jsx(g,{})," UPLOAD REQUIREMENTS"]})}),t.jsxs(j,{title:"UPLOAD REQUIREMENTS",open:a,onOk:c,okText:"Submit",onCancel:u,children:[t.jsxs("div",{className:"w-full",children:[t.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Name of Requirements"}),t.jsxs("select",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",name:"",id:"",onChange:e=>l(e.target.value),children:[t.jsx("option",{value:""}),p.filter(e=>e.site==="San Carlos").map((e,i)=>t.jsxs("option",{value:e.reqs,children:[e.reqs," ",e.remarks==="Yes"?"*":""]},i))]})]}),t.jsx(k,{action:"https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",listType:"picture",method:"GET",maxCount:1,onChange:f,multiple:!1,defaultFileList:o,children:t.jsx(w,{type:"primary",icon:t.jsx(y,{}),children:"Upload Scanned Image"})}),t.jsx("div",{className:"mt-3 text-zinc-400 text-sm",children:t.jsx("p",{children:t.jsx("i",{children:"Note: Requirements marked with an asterisk (*) are mandatory and must be submitted or uploaded to proceed to the next step of the application process."})})})]})]})}export{oe as default};