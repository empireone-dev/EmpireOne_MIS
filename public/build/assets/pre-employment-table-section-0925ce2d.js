import{r as a,b as k,j as e}from"./app-73b46094.js";import{H as C}from"./main-fc4355e8.js";import v from"./add-pre-employment-section-4bab20f6.js";import{h as w}from"./moment-a9aaa855.js";import{T as b,I as q,a as u}from"./Table-efe7d79c.js";import{S as E}from"./index-99c58214.js";import{B as s}from"./button-4029560c.js";import"./pre-employment-thunk-becb1ac7.js";import"./presets-73c987c9.js";import"./AntdIcon-d3507f1a.js";import"./index-60e8455b.js";import"./index-d93f8a93.js";import"./render-4c9a3ffe.js";import"./asyncToGenerator-bb14fadb.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./useZIndex-e8c3093a.js";import"./useId-9ba4889a.js";import"./CloseOutlined-b9197a42.js";import"./index-626462f0.js";import"./KeyCode-1cd0ccde.js";import"./pickAttrs-7a971b97.js";import"./fade-967bd62f.js";import"./ContextIsolator-e4aba7cb.js";import"./useSize-d7f92a55.js";import"./Compact-0fc6e86e.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";import"./index-7f86f1b9.js";import"./addEventListener-3ffc3e2d.js";import"./DownOutlined-aaec21c3.js";import"./useBreakpoint-78e92e53.js";import"./useForceUpdate-31e51b9e.js";import"./LeftOutlined-151109f3.js";import"./index-2a08f1d0.js";import"./collapse-97de76d4.js";import"./CheckOutlined-400e2945.js";import"./index-658a912c.js";import"./FileOutlined-15ca4fb4.js";import"./FolderOpenOutlined-3591f585.js";import"./HolderOutlined-26d68567.js";import"./EyeOutlined-d14b83e6.js";function je(){const[x,m]=a.useState(""),[g,p]=a.useState(""),c=a.useRef(null),{checklists:f}=k(r=>r.checklists),d=(r,t,o)=>{t(),m(r[0]),p(o)},j=r=>{r(),m("")},l=r=>({filterDropdown:({setSelectedKeys:t,selectedKeys:o,confirm:n,clearFilters:h,close:y})=>e.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[e.jsx(q,{ref:c,placeholder:`Search ${r}`,value:o[0],onChange:i=>t(i.target.value?[i.target.value]:[]),onPressEnter:()=>d(o,n,r),style:{marginBottom:8,display:"block"}}),e.jsxs(E,{children:[e.jsx(s,{type:"primary",onClick:()=>d(o,n,r),icon:e.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(s,{onClick:()=>h&&j(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{n({closeDropdown:!1}),m(o[0]),p(r)},children:"Filter"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{y()},children:"close"})]})]}),filterIcon:t=>e.jsx(u,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,o)=>o[r].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var o;return(o=c.current)==null?void 0:o.select()},100)},render:t=>g===r?e.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),S=[{title:"Requirement Name",dataIndex:"reqs",key:"reqname",...l("reqname")},{title:"Required",dataIndex:"remarks",key:"req",...l("req")},{title:"Date Created",dataIndex:"created",key:"created",...l("created"),render:(r,t)=>e.jsx("div",{className:"gap-1.5 flex",children:w(t.created).format("LLL")})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Pre-Employment Section"})})})}),e.jsx(v,{}),e.jsx(b,{columns:S,dataSource:f}),";"]})}export{je as default};