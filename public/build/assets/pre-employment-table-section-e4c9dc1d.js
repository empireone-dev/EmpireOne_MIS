import{r as a,b as k,j as e}from"./app-482355be.js";import{H as C}from"./main-f4af2f0d.js";import v from"./add-pre-employment-section-e187d9cd.js";import{h as w}from"./moment-a9aaa855.js";import{T as b,I as q,S as u}from"./Table-f8ad0c93.js";import{S as E}from"./index-74f67030.js";import{B as s}from"./button-120bbd6a.js";import"./pre-employment-thunk-383d0553.js";import"./presets-3fad3b18.js";import"./AntdIcon-b997608a.js";import"./index-a58b322c.js";import"./index-44babc8d.js";import"./render-a51f93ee.js";import"./asyncToGenerator-be697f7b.js";import"./CheckCircleFilled-53fcacf0.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./useZIndex-87e47ffd.js";import"./useId-2195e329.js";import"./CloseOutlined-22e36e3d.js";import"./index-252e5d81.js";import"./pickAttrs-ce94d08f.js";import"./ContextIsolator-a3a66f8f.js";import"./useSize-df0f8805.js";import"./Compact-8ea0c993.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";import"./index-5c96ec32.js";import"./addEventListener-9a59321b.js";import"./DownOutlined-4600ab35.js";import"./useBreakpoint-0c354441.js";import"./useForceUpdate-740fd9fe.js";import"./LeftOutlined-d4f7e3bf.js";import"./index-3d0ae574.js";import"./collapse-97de76d4.js";import"./CheckOutlined-cef1fdd2.js";import"./LoadingOutlined-a370997b.js";import"./index-6af998c0.js";import"./FileOutlined-6754d4db.js";import"./FolderOpenOutlined-bf557445.js";import"./HolderOutlined-e924f284.js";import"./EyeOutlined-9e39db2b.js";function fe(){const[x,m]=a.useState(""),[g,p]=a.useState(""),c=a.useRef(null),{checklists:f}=k(r=>r.checklists),d=(r,t,o)=>{t(),m(r[0]),p(o)},j=r=>{r(),m("")},l=r=>({filterDropdown:({setSelectedKeys:t,selectedKeys:o,confirm:n,clearFilters:h,close:y})=>e.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[e.jsx(q,{ref:c,placeholder:`Search ${r}`,value:o[0],onChange:i=>t(i.target.value?[i.target.value]:[]),onPressEnter:()=>d(o,n,r),style:{marginBottom:8,display:"block"}}),e.jsxs(E,{children:[e.jsx(s,{type:"primary",onClick:()=>d(o,n,r),icon:e.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(s,{onClick:()=>h&&j(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{n({closeDropdown:!1}),m(o[0]),p(r)},children:"Filter"}),e.jsx(s,{type:"link",size:"small",onClick:()=>{y()},children:"close"})]})]}),filterIcon:t=>e.jsx(u,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,o)=>o[r].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var o;return(o=c.current)==null?void 0:o.select()},100)},render:t=>g===r?e.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),S=[{title:"Requirement Name",dataIndex:"reqs",key:"reqname",...l("reqname")},{title:"Required",dataIndex:"remarks",key:"req",...l("req")},{title:"Date Created",dataIndex:"created",key:"created",...l("created"),render:(r,t)=>e.jsx("div",{className:"gap-1.5 flex",children:w(t.created).format("LLL")})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Pre-Employment Section"})})})}),e.jsx(v,{}),e.jsx(b,{columns:S,dataSource:f}),";"]})}export{fe as default};