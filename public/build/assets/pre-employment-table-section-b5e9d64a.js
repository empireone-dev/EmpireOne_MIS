import{r as a,b as k,j as e}from"./app-3fef3a63.js";import{H as C}from"./main-8e9ec849.js";import v from"./add-pre-employment-section-11de8373.js";import{h as w}from"./moment-a9aaa855.js";import{T as b,I as q,S as u}from"./Table-f2fc72fd.js";import{S as E}from"./index-1fe63da4.js";import{B as s}from"./button-7a476b2b.js";import"./pre-employment-thunk-5d41e9f5.js";import"./presets-ca4e9e1b.js";import"./AntdIcon-f6a6858b.js";import"./index-b28d3991.js";import"./index-aee74163.js";import"./render-06651440.js";import"./asyncToGenerator-d91032a9.js";import"./CheckCircleFilled-ae4c12ba.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./useZIndex-0bbceadc.js";import"./useId-486ac681.js";import"./CloseOutlined-cc20978d.js";import"./index-067d7e3e.js";import"./KeyCode-dba4fb16.js";import"./pickAttrs-0272306c.js";import"./fade-fce3c8f0.js";import"./ContextIsolator-7f0f291f.js";import"./useSize-d7041e64.js";import"./Compact-7f0d1344.js";import"./useClosable-e3f3eb25.js";import"./useLocale-d278345a.js";import"./PurePanel-06125fb1.js";import"./index-8215846e.js";import"./addEventListener-875d1d97.js";import"./DownOutlined-bf46ca9d.js";import"./useBreakpoint-d9271dc9.js";import"./useForceUpdate-55a4b7f9.js";import"./LeftOutlined-697ba1d8.js";import"./index-1bbc017a.js";import"./collapse-97de76d4.js";import"./CheckOutlined-04d0f69a.js";import"./LoadingOutlined-285e92e4.js";import"./index-93408efd.js";import"./FileOutlined-01a0cb0c.js";import"./FolderOpenOutlined-98b27a39.js";import"./HolderOutlined-42b4aafe.js";import"./EyeOutlined-41dc8854.js";function Se(){const[x,m]=a.useState(""),[g,p]=a.useState(""),c=a.useRef(null),{checklists:f}=k(r=>r.checklists),d=(r,t,o)=>{t(),m(r[0]),p(o)},j=r=>{r(),m("")},l=r=>({filterDropdown:({setSelectedKeys:t,selectedKeys:o,confirm:n,clearFilters:h,close:y})=>e.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[e.jsx(q,{ref:c,placeholder:`Search ${r}`,value:o[0],onChange:i=>t(i.target.value?[i.target.value]:[]),onPressEnter:()=>d(o,n,r),style:{marginBottom:8,display:"block"}}),e.jsxs(E,{children:[e.jsx(s,{type:"primary",onClick:()=>d(o,n,r),icon:e.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(s,{onClick:()=>h&&j(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{n({closeDropdown:!1}),m(o[0]),p(r)},children:"Filter"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{y()},children:"close"})]})]}),filterIcon:t=>e.jsx(u,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,o)=>o[r].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var o;return(o=c.current)==null?void 0:o.select()},100)},render:t=>g===r?e.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),S=[{title:"Requirement Name",dataIndex:"reqs",key:"reqname",...l("reqname")},{title:"Required",dataIndex:"remarks",key:"req",...l("req")},{title:"Date Created",dataIndex:"created",key:"created",...l("created"),render:(r,t)=>e.jsx("div",{className:"gap-1.5 flex",children:w(t.created).format("LLL")})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Pre-Employment Section"})})})}),e.jsx(v,{}),e.jsx(b,{columns:S,dataSource:f}),";"]})}export{Se as default};