import{r as c,b as C,j as e}from"./app-73b46094.js";import{H as k}from"./main-fc4355e8.js";import w from"./add-medicine-section-7315d904.js";import _ from"./medicine-button-dropdown-section-44dc2d9b.js";import{T as v,I as T,a as u}from"./Table-efe7d79c.js";import{S as b}from"./index-99c58214.js";import{B as s}from"./button-4029560c.js";import"./medicine-record-thunk-94a094b7.js";import"./index-60e8455b.js";import"./index-d93f8a93.js";import"./presets-73c987c9.js";import"./render-4c9a3ffe.js";import"./AntdIcon-d3507f1a.js";import"./asyncToGenerator-bb14fadb.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./useZIndex-e8c3093a.js";import"./useId-9ba4889a.js";import"./CloseOutlined-b9197a42.js";import"./index-626462f0.js";import"./KeyCode-1cd0ccde.js";import"./pickAttrs-7a971b97.js";import"./fade-967bd62f.js";import"./ContextIsolator-e4aba7cb.js";import"./useSize-d7f92a55.js";import"./Compact-0fc6e86e.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";import"./PlusSquareTwoTone-6cf70a80.js";import"./MedicineBoxOutlined-a178970d.js";import"./edit-medicine-section-ab6ea2e0.js";import"./index-f1383bf4.js";import"./index-2a08f1d0.js";import"./index-7f86f1b9.js";import"./LeftOutlined-151109f3.js";import"./collapse-97de76d4.js";import"./delete-medicine-section-5befb504.js";import"./DownOutlined-aaec21c3.js";import"./EditOutlined-f79c4601.js";import"./DeleteOutlined-1ff540c7.js";import"./addEventListener-3ffc3e2d.js";import"./useBreakpoint-78e92e53.js";import"./useForceUpdate-31e51b9e.js";import"./CheckOutlined-400e2945.js";import"./index-658a912c.js";import"./FileOutlined-15ca4fb4.js";import"./FolderOpenOutlined-3591f585.js";import"./HolderOutlined-26d68567.js";import"./EyeOutlined-d14b83e6.js";function ve(){const[x,m]=c.useState(""),[g,l]=c.useState(""),a=c.useRef(null),{medicine_records:j}=C(i=>i.medicine_records),d=(i,t,o)=>{t(),m(i[0]),l(o)},f=i=>{i(),m("")},n=i=>({filterDropdown:({setSelectedKeys:t,selectedKeys:o,confirm:p,clearFilters:h,close:y})=>e.jsxs("div",{style:{padding:8},onKeyDown:r=>r.stopPropagation(),children:[e.jsx(T,{ref:a,placeholder:`Search ${i}`,value:o[0],onChange:r=>t(r.target.value?[r.target.value]:[]),onPressEnter:()=>d(o,p,i),style:{marginBottom:8,display:"block"}}),e.jsxs(b,{children:[e.jsx(s,{type:"primary",onClick:()=>d(o,p,i),icon:e.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(s,{onClick:()=>h&&f(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{p({closeDropdown:!1}),m(o[0]),l(i)},children:"Filter"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{y()},children:"close"})]})]}),filterIcon:t=>e.jsx(u,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,o)=>o[i].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var o;return(o=a.current)==null?void 0:o.select()},100)},render:t=>g===i?e.jsx(k,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),S=[{title:"Medicine",dataIndex:"medicine",key:"medicine",...n("medicine")},{title:"Medicine Type",dataIndex:"med_type",key:"med_type",...n("med_type")},{title:"Medicine Description",dataIndex:"med_desc",key:"med_desc",...n("med_desc")},{title:"Action",dataIndex:"action",render:(i,t)=>e.jsx(_,{data:t})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Medicine Records"})})})}),e.jsx(w,{}),e.jsx(v,{columns:S,dataSource:j}),";"]})}export{ve as default};