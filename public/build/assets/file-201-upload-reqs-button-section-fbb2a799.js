import{r as o,b as h,j as e,e as _}from"./app-12dd3627.js";import{s as C}from"./pre-employment-file-service-0bba09c2.js";import{h as k}from"./moment-a9aaa855.js";import{g as U}from"./final-rate-thunk-0b31a9c0.js";import{M as R}from"./index-d368cae6.js";import{a as x,U as S}from"./index-2894dd06.js";import{B as E}from"./button-aae57988.js";import{m as O}from"./index-8ae8737d.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-bc53da68.js";import"./index-4e0ea6ca.js";import"./presets-2db74b6f.js";import"./render-a458bafb.js";import"./AntdIcon-8b25e930.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useSize-ccd2c154.js";import"./Compact-9e968cf1.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./collapse-97de76d4.js";import"./useForceUpdate-018cd649.js";import"./DeleteOutlined-cdbd1357.js";import"./EyeOutlined-2bad6abe.js";import"./CheckOutlined-05cd87ef.js";import"./index-1f34c205.js";function fe(){var p,c;const[f,r]=o.useState(!1),[b,i]=o.useState(!1),{applicant:s}=h(t=>t.final_rate),{checklists:j}=h(t=>t.checklists),[a,n]=o.useState([]),[l,m]=o.useState(""),d=window.location.pathname.split("/")[3],g=async()=>{i(!0);const t=new FormData;t.append("file",a[0].originFileObj),t.append("status","Uploaded"),t.append("reqs",l),t.append("created",k().format("YYYY-MM-DD HH:mm:ss")),t.append("app_id",window.location.pathname.split("/")[3]);try{a[0].status=="done"&&(await C(t),await _.dispatch(U(d)),O.success("Uploaded Successfully!"),r(!1),m(""),n([]),i(!1))}catch{i(!1)}},q=()=>{r(!1)};async function v({file:t}){n([t])}const w=((p=s==null?void 0:s.requirements)==null?void 0:p.map(t=>t.reqs))??[],y=j.filter(t=>!w.includes(t.reqs)),N=(c=s==null?void 0:s.requirements)==null?void 0:c.find(t=>t.reqs=="Contract");return e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>r(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(x,{className:"text-xl"}),"Upload New Requirements"]})}),e.jsx(R,{confirmLoading:b,title:"Add Requirements",centered:!0,open:f,onOk:g,onCancel:q,width:800,okText:"Upload",cancelText:"Cancel",children:e.jsxs("form",{className:"rounded-lg p-2",children:[e.jsx("h1",{className:"text-lg font-medium leading-6 mb-3 ",children:"UPLOAD REQUIREMENTS"}),e.jsx("div",{className:"mt-3 text-center sm:mt-0  sm:text-left",children:e.jsxs("div",{className:"mt-2",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application ID"})}),e.jsx("input",{name:"",type:"text",value:d??"",className:"border p-2 rounded  w-full",readOnly:!0})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Requirement's Name"})}),e.jsxs("select",{className:"border p-2 rounded  w-full",onChange:t=>m(t.target.value),children:[!l&&e.jsx("option",{selected:!0,disabled:!0,children:" "}),!N&&e.jsx("option",{value:"Contract",children:"Contract Document"}),y.filter(t=>t.site==="San Carlos").map((t,u)=>e.jsx("option",{value:t.reqs,children:t.reqs},u))]})]}),e.jsx(S,{action:"https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",listType:"picture",method:"GET",maxCount:1,onChange:v,multiple:!1,fileList:a,children:e.jsx(E,{type:"primary",icon:e.jsx(x,{}),children:"Upload Scanned Image"})}),e.jsx("div",{className:"mt-3 text-zinc-400 text-sm",children:e.jsx("p",{children:e.jsx("i",{children:"Note: Requirements marked with an asterisk (*) are mandatory and must be submitted or uploaded to proceed to the next step of the application process."})})})]})})]})})]})}export{fe as default};