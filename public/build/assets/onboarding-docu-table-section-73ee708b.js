import{r as p,b as y,j as t}from"./app-12dd3627.js";import{H as C}from"./main-7aa7af08.js";import{h as k}from"./moment-a9aaa855.js";import D from"./add-onboarding-docu-section-db6d9514.js";import v from"./onboarding-menu-button-sections-22c3f125.js";import{T as _,I as w,a as u}from"./Table-117bf68c.js";import{S as T}from"./index-b3f92c81.js";import{B as n}from"./button-aae57988.js";import"./summernote-235331b2.js";import"./UnorderedListOutlined-8c4c2129.js";import"./presets-2db74b6f.js";import"./AntdIcon-8b25e930.js";import"./onboarding-docu-thunk-22d26b1e.js";import"./onboading-doc-service-3310c2a8.js";import"./index-d368cae6.js";import"./index-4e0ea6ca.js";import"./render-a458bafb.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useSize-ccd2c154.js";import"./Compact-9e968cf1.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./index-8ae8737d.js";import"./FileAddOutlined-1648459d.js";import"./edit-onboarding-document-component-f0ba786d.js";import"./index-734ac57e.js";import"./index-1f34c205.js";import"./LeftOutlined-2fa34ff8.js";import"./collapse-97de76d4.js";import"./view-onboarding-document-be6a09c2.js";import"./DownOutlined-5adaded5.js";import"./EditOutlined-2c3b6cf2.js";import"./EyeOutlined-2bad6abe.js";import"./addEventListener-4ceeba21.js";import"./useBreakpoint-769c2c69.js";import"./useForceUpdate-018cd649.js";import"./CheckOutlined-05cd87ef.js";import"./index-a5fbad9e.js";import"./FileOutlined-390f3a30.js";import"./FolderOpenOutlined-c2659d31.js";import"./HolderOutlined-14030367.js";function Tt(){const[g,s]=p.useState(""),[x,l]=p.useState(""),{onboarding_docs:f}=y(r=>r.onboarding_docs),c=p.useRef(null),d=(r,o,e)=>{o(),s(r[0]),l(e)},j=r=>{r(),s("")},m=r=>({filterDropdown:({setSelectedKeys:o,selectedKeys:e,confirm:a,clearFilters:h,close:b})=>t.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[t.jsx(w,{ref:c,placeholder:`Search ${r}`,value:e[0],onChange:i=>o(i.target.value?[i.target.value]:[]),onPressEnter:()=>d(e,a,r),style:{marginBottom:8,display:"block"}}),t.jsxs(T,{children:[t.jsx(n,{type:"primary",onClick:()=>d(e,a,r),icon:t.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(n,{onClick:()=>h&&j(h),size:"small",style:{width:90},children:"Reset"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{a({closeDropdown:!1}),s(e[0]),l(r)},children:"Filter"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{b()},children:"close"})]})]}),filterIcon:o=>t.jsx(u,{style:{color:o?"#1677ff":void 0}}),onFilter:(o,e)=>e[r].toString().toLowerCase().includes(o.toLowerCase()),onFilterDropdownOpenChange:o=>{o&&setTimeout(()=>{var e;return(e=c.current)==null?void 0:e.select()},100)},render:o=>x===r?t.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[g],autoEscape:!0,textToHighlight:o?o.toString():""}):o}),S=[{title:"ID #",dataIndex:"id",key:"emp_id",...m("emp_id")},{title:"Document Name",dataIndex:"doc_name",key:"doc_name",...m("doc_name")},{title:"Date Created",dataIndex:"created",key:"created",...m("created"),render:(r,o)=>t.jsx("div",{className:"gap-1.5 flex",children:k(o.created).format("LLL")})},{title:"Action",dataIndex:"action",render:(r,o)=>t.jsx(v,{data:o})}];return t.jsxs("div",{children:[t.jsx("div",{children:t.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:t.jsxs("h2",{className:"text-lg font-medium text-gray-800",children:[t.jsx("b",{children:"Onboarding Documents"}),t.jsx(D,{})]})})}),t.jsx(_,{columns:S,dataSource:f}),";"]})}export{Tt as default};