import{r as m,b as T,u as D,O as u,j as e}from"./app-753af2e0.js";import{H as w}from"./main-9636dc9e.js";import _ from"./erf-dropdown-filter-components-29089933.js";import I from"./add-position-button-section-ad777868.js";import E from"./erf-menu-button-section-270f5e89.js";import{T as R,I as N,a as x}from"./Table-4e6f0df9.js";import{T as B}from"./index-8c7e70f9.js";import{S as P}from"./index-45b52881.js";import{B as p}from"./button-873ff8d7.js";import"./LeftOutlined-cd9ffefc.js";import"./presets-d249989d.js";import"./AntdIcon-b9d997e7.js";import"./index-b31ab175.js";import"./useId-6f6c842e.js";import"./index-4bceb124.js";import"./useZIndex-a79cfede.js";import"./useSize-27c5a9ae.js";import"./Compact-9246895f.js";import"./ContextIsolator-765e5922.js";import"./asyncToGenerator-abcd90ca.js";import"./KeyCode-bde7e4ef.js";import"./PurePanel-def41e9a.js";import"./index-a5be535f.js";import"./collapse-97de76d4.js";import"./render-3a896346.js";import"./add-new-position-section-3c6c8691.js";import"./add-existing-position-section-568d26cc.js";import"./erf-ja-component-11d429f2.js";import"./erf-jd-component-3ad6305c.js";import"./erf-update-status-component-1ec00c3e.js";import"./erf-record-thunk-77408920.js";import"./erf-record-service-16385950.js";import"./index-466f17d2.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./index-adb8e5ea.js";import"./EditOutlined-648e86f0.js";import"./FileOutlined-e063f41c.js";import"./FileTextOutlined-a1c4f36e.js";import"./DownOutlined-d2001029.js";import"./addEventListener-e12acff0.js";import"./useBreakpoint-c17c223a.js";import"./useForceUpdate-68311461.js";import"./CheckOutlined-9fad5569.js";import"./index-7d483204.js";import"./FolderOpenOutlined-48b31105.js";import"./HolderOutlined-8450d39e.js";import"./EyeOutlined-d5f2209d.js";function Ft(){const[j,d]=m.useState(""),[y,h]=m.useState(""),{erf_records:n,filteredData:S}=T(o=>o.erf_records),c=D();console.log("erf_records",n);const k=o=>{if(o.length===0)c(u(n));else{const t=n.filter(i=>o.includes(i.status));c(u(t))}};m.useEffect(()=>{c(u(n))},[n]);const f=m.useRef(null),g=(o,t,i)=>{t(),d(o[0]),h(i)},b=o=>{o(),d("")},r=o=>({filterDropdown:({setSelectedKeys:t,selectedKeys:i,confirm:s,clearFilters:a,close:v})=>e.jsxs("div",{style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[e.jsx(N,{ref:f,placeholder:`Search ${o}`,value:i[0],onChange:l=>t(l.target.value?[l.target.value]:[]),onPressEnter:()=>g(i,s,o),style:{marginBottom:8,display:"block"}}),e.jsxs(P,{children:[e.jsx(p,{type:"primary",onClick:()=>g(i,s,o),icon:e.jsx(x,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(p,{onClick:()=>a&&b(a),size:"small",style:{width:90},children:"Reset"}),e.jsx(p,{type:"link",size:"small",onClick:()=>{s({closeDropdown:!1}),d(i[0]),h(o)},children:"Filter"}),e.jsx(p,{type:"link",size:"small",onClick:()=>{v()},children:"close"})]})]}),filterIcon:t=>e.jsx(x,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,i)=>i[o].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var i;return(i=f.current)==null?void 0:i.select()},100)},render:t=>y===o?e.jsx(w,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[j],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),C=[{title:"Ref #",dataIndex:"ref_id",key:"emp_id",...r("emp_id")},{title:"Requesting Manager",dataIndex:"fullname",key:"fullname",...r("fullname"),render:(o,t,i)=>{var s,a;return console.log("record",t),e.jsxs("div",{children:[(s=t.user)==null?void 0:s.employee_fname," ",(a=t.user)==null?void 0:a.employee_lname]},i)}},{title:"Job Title",dataIndex:"jobTitle",key:"position",...r("position")},{title:"Job Type",dataIndex:"jobType",key:"dept",...r("dept")},{title:"Position Status",dataIndex:"positionStatus",key:"eogs",...r("eogs")},{title:"Date Needed",dataIndex:"dateNeed",key:"contact",...r("contact")},{title:"Budget/Cost",dataIndex:"budgetCost",key:"eogs",...r("eogs")},{title:"Date Submitted",dataIndex:"submitted",key:"eogs",...r("eogs")},{title:"Status",dataIndex:"status",key:"status",render:(o,t,i)=>(console.log("record",t),e.jsx(B,{color:t.status=="Approved"?"green":t.status=="Pending"?"orange":t.status=="Declined"?"red":(t.status=="In Review","blue"),children:t.status},i))},{title:"Action",dataIndex:"action",render:(o,t)=>e.jsx(E,{data:t})}];return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center gap-x-3",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Employee Section"})})}),e.jsxs("div",{className:"flex flex-1 justify-between",children:[e.jsx(I,{}),e.jsx("div",{className:"mr-8",children:e.jsx(_,{filterData:k})})]})]}),e.jsx(R,{columns:C,dataSource:S,className:"mt-1"})]})}export{Ft as default};