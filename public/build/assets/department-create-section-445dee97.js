import{r as i,b as l,j as a,c as m}from"./app-5903bcdc.js";import g from"./input-7c0311a4.js";import{c as b,g as v}from"./department-thunk-b9c5d92e.js";import{M as y}from"./index-e44f7e7f.js";import{m as d}from"./index-ea69266b.js";import{P as j}from"./PlusSquareTwoTone-8d2cf943.js";import"./erf-record-service-f2b2a4cb.js";import"./index-a2a66e96.js";import"./presets-ac6d2c0f.js";import"./render-4b6d5da1.js";import"./AntdIcon-567c410e.js";import"./asyncToGenerator-71d13e75.js";import"./CheckCircleFilled-f83f15df.js";import"./CloseCircleFilled-697206b5.js";import"./InfoCircleFilled-e5724796.js";import"./useZIndex-79d8cff9.js";import"./useId-6966ca54.js";import"./button-d3ea38b4.js";import"./Compact-1e3d859e.js";import"./useSize-d214a582.js";import"./CloseOutlined-e89cbee7.js";import"./index-fc78c6ec.js";import"./KeyCode-8bfe2c69.js";import"./pickAttrs-436cebda.js";import"./fade-8c83fca4.js";import"./ContextIsolator-7d8b47d5.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";const C=()=>{const[c,s]=i.useState(!1),{user:t}=l(e=>e.app),{users:n}=l(e=>e.app),[u,p]=i.useState(!1),[o,r]=i.useState({dept:"",depthead:"",site:(t==null?void 0:t.site)||""});console.log("site",t==null?void 0:t.site);const f=()=>{r(e=>({...e,site:(t==null?void 0:t.site)||""})),s(!0)};console.log("users",n);const h=async()=>{p(!0);try{await m.dispatch(b({...o})),await m.dispatch(v()),d.success("Successfully Added!"),s(!1)}catch{d.error("Failed to add department. Please try again.")}finally{p(!1)}},x=()=>{s(!1)};return a.jsxs(a.Fragment,{children:[a.jsxs("button",{type:"button",onClick:f,class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white gap-1",children:[a.jsx(j,{className:"text-xl"}),"Create Department"]}),a.jsx(y,{title:"Create Department",open:c,onOk:h,onCancel:x,confirmLoading:u,okText:"Save",children:a.jsxs("div",{className:"flex flex-col gap-4",children:[a.jsx("input",{onChange:e=>r({...o,site:e.target.value}),value:(t==null?void 0:t.site)??"",type:"hidden",className:"border p-2 rounded w-full"}),a.jsx(g,{onChange:e=>r({...o,dept:e.target.value}),required:!1,name:"dept",label:"Department Name",type:"text",value:o.dept}),a.jsxs("select",{className:"border p-2 rounded-md w-full",onChange:e=>r({...o,depthead:e.target.value}),value:o.depthead,children:[a.jsx("option",{value:"",children:"Select Department Head"}),Array.isArray(n)&&n.filter(e=>["Manager","Account Manager","Supervisor","Operations Manager","Director","CEO"].includes(e.position)).map(e=>a.jsx("option",{value:e.id,children:`${e.employee_fname} ${e.employee_lname}`},e.id))]})]})})]})},Y=C;export{Y as default};