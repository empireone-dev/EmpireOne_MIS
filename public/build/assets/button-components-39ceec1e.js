import{r as c,j as e,y as o}from"./app-73b46094.js";import{S as i,D as d}from"./index-99c58214.js";import{M as s}from"./index-2a08f1d0.js";import{B as p}from"./button-4029560c.js";import{M as u}from"./index-60e8455b.js";import{F as x}from"./FileOutlined-15ca4fb4.js";import{F as m}from"./FileTextOutlined-56504f35.js";import{D as f}from"./DownOutlined-aaec21c3.js";import{E as b}from"./EditOutlined-f79c4601.js";import"./LeftOutlined-151109f3.js";import"./presets-73c987c9.js";import"./AntdIcon-d3507f1a.js";import"./index-7f86f1b9.js";import"./useId-9ba4889a.js";import"./index-d93f8a93.js";import"./useZIndex-e8c3093a.js";import"./useSize-d7f92a55.js";import"./Compact-0fc6e86e.js";import"./ContextIsolator-e4aba7cb.js";import"./asyncToGenerator-bb14fadb.js";import"./KeyCode-1cd0ccde.js";import"./PurePanel-a779799e.js";import"./collapse-97de76d4.js";import"./render-4c9a3ffe.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./CloseOutlined-b9197a42.js";import"./index-626462f0.js";import"./pickAttrs-7a971b97.js";import"./fade-967bd62f.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";const W=()=>{const[l,t]=c.useState(!1),n=r=>{r.onClick&&r.onClick(),r.key==="1"&&t(!0),r.key==="2"&&o.visit("/router.visit(`/admin/sourcing/job_title_section/job_analysis/${record?.ref_id}`)}"),r.key==="3"&&o.visit("/admin/sourcing/resource_requests/erf_record/erf_job_description")},a=[{label:"Update Status",key:"1",icon:e.jsx(b,{})},{label:"Job Analysis",key:"2",icon:e.jsx(x,{}),onClick:()=>o.visit("/admin/sourcing/resource_requests/erf_record/erf_job_analysis")},{label:"Job Description",key:"3",icon:e.jsx(m,{}),onClick:()=>o.visit("/admin/sourcing/resource_requests/erf_record/erf_job_description")}];return e.jsxs(i,{wrap:!0,children:[e.jsx(d,{overlay:e.jsx(s,{onClick:n,children:a.map(r=>e.jsx(s.Item,{icon:r.icon,children:r.label},r.key))}),trigger:["click"],children:e.jsx(p,{type:"primary",children:e.jsxs(i,{children:["Menu",e.jsx(f,{})]})})}),e.jsx(u,{title:"Update Request Status",centered:!0,visible:l,onOk:()=>t(!1),onCancel:()=>t(!1),width:1200,okText:"Save Changes",cancelText:"Cancel",children:e.jsx("form",{className:"w-full pb-4",children:e.jsxs("div",{className:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Reference No."}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Title"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Type"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Request Status"}),e.jsxs("select",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",name:"",id:"",children:[e.jsx("option",{value:""}),e.jsx("option",{value:"",children:"In Review"}),e.jsx("option",{value:"",children:"Approved"}),e.jsx("option",{value:"",children:"Declined"})]})]})]})})})]})};export{W as default};