import{r as l,b as C,j as e}from"./app-12dd3627.js";import{H as T}from"./main-7aa7af08.js";import{h as _}from"./moment-a9aaa855.js";import{T as b,I as L,a as u}from"./Table-117bf68c.js";import{B as x}from"./index-53155f01.js";import{S as v}from"./index-b3f92c81.js";import{B as s}from"./button-aae57988.js";import"./presets-2db74b6f.js";import"./index-4e0ea6ca.js";import"./index-1f34c205.js";import"./useId-befc3d2c.js";import"./useZIndex-4dd54a5e.js";import"./useSize-ccd2c154.js";import"./AntdIcon-8b25e930.js";import"./Compact-9e968cf1.js";import"./ContextIsolator-dcadb18f.js";import"./asyncToGenerator-318e6964.js";import"./pickAttrs-43c39746.js";import"./addEventListener-4ceeba21.js";import"./DownOutlined-5adaded5.js";import"./KeyCode-3ea1579b.js";import"./useLocale-7d03fe10.js";import"./useBreakpoint-769c2c69.js";import"./useForceUpdate-018cd649.js";import"./LeftOutlined-2fa34ff8.js";import"./index-734ac57e.js";import"./collapse-97de76d4.js";import"./PurePanel-2c13f978.js";import"./CheckOutlined-05cd87ef.js";import"./CloseCircleFilled-aa5e31c4.js";import"./CloseOutlined-1663eb1a.js";import"./render-a458bafb.js";import"./index-a5fbad9e.js";import"./FileOutlined-390f3a30.js";import"./FolderOpenOutlined-c2659d31.js";import"./HolderOutlined-14030367.js";import"./EyeOutlined-2bad6abe.js";function de(){const[g,m]=l.useState(""),[f,n]=l.useState(""),c=l.useRef(null),{emp_memos:j}=C(o=>o.emp_memos);console.log("emp_memos",j);const p=(o,t,r)=>{t(),m(o[0]),n(r)},y=o=>{o(),m("")},d=o=>({filterDropdown:({setSelectedKeys:t,selectedKeys:r,confirm:a,clearFilters:h,close:w})=>e.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[e.jsx(L,{ref:c,placeholder:`Search ${o}`,value:r[0],onChange:i=>t(i.target.value?[i.target.value]:[]),onPressEnter:()=>p(r,a,o),style:{marginBottom:8,display:"block"}}),e.jsxs(v,{children:[e.jsx(s,{type:"primary",onClick:()=>p(r,a,o),icon:e.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(s,{onClick:()=>h&&y(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{a({closeDropdown:!1}),m(r[0]),n(o)},children:"Filter"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{w()},children:"close"})]})]}),filterIcon:t=>e.jsx(u,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,r)=>r[o].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var r;return(r=c.current)==null?void 0:r.select()},100)},render:t=>f===o?e.jsx(T,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[g],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),k=[{title:"Memo Title",dataIndex:"memo_title",key:"memo_title",...d("memo_title")},{title:"Date",dataIndex:"created",key:"created",...d("created"),render:(o,t)=>e.jsx("div",{className:"gap-1.5 flex",children:_(t.created).format("LLL")})},{title:"Action",dataIndex:"action",render:(o,t)=>e.jsx("button",{children:"View Memo"})}],S=[{key:"1",memo_title:"Q1 Financial Report",created:"2024-09-01T10:30:00Z",action:"View Memo"},{key:"2",memo_title:"Employee Benefits Update",created:"2024-08-25T14:00:00Z",action:"View Memo"},{key:"3",memo_title:e.jsxs(e.Fragment,{children:["New Office Guidelines",e.jsx(x,{count:"New",style:{backgroundColor:"#52c41a",marginLeft:"8px"}})]}),created:"2024-08-20T09:15:00Z",action:"View Memo"},{key:"4",memo_title:"Project X Launch",created:"2024-09-03T11:45:00Z",action:"View Memo"},{key:"5",memo_title:e.jsxs(e.Fragment,{children:["Holiday Schedule 2024 ",e.jsx(x,{count:"New",style:{backgroundColor:"#52c41a",marginLeft:"8px"}})]}),created:"2024-08-30T08:30:00Z",action:"View Memo"}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Memo Lists Table"})})})}),e.jsx(b,{columns:k,dataSource:S}),";"]})}export{de as default};