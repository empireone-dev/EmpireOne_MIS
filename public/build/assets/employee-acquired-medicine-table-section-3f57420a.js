import{r as n,j as t}from"./app-753af2e0.js";import{H as S}from"./main-9636dc9e.js";import C from"./add-employee-acquired-medicine-section-87885380.js";import{T as k,I as q,a as u}from"./Table-4e6f0df9.js";import{S as v}from"./index-45b52881.js";import{B as s}from"./button-873ff8d7.js";import"./PlusSquareTwoTone-6854eba9.js";import"./presets-d249989d.js";import"./AntdIcon-b9d997e7.js";import"./index-466f17d2.js";import"./index-4bceb124.js";import"./render-3a896346.js";import"./asyncToGenerator-abcd90ca.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./useZIndex-a79cfede.js";import"./useId-6f6c842e.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./KeyCode-bde7e4ef.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./ContextIsolator-765e5922.js";import"./useSize-27c5a9ae.js";import"./Compact-9246895f.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./PurePanel-def41e9a.js";import"./MedicineBoxOutlined-103525f5.js";import"./index-b31ab175.js";import"./addEventListener-e12acff0.js";import"./DownOutlined-d2001029.js";import"./useBreakpoint-c17c223a.js";import"./useForceUpdate-68311461.js";import"./LeftOutlined-cd9ffefc.js";import"./index-a5be535f.js";import"./collapse-97de76d4.js";import"./CheckOutlined-9fad5569.js";import"./index-7d483204.js";import"./FileOutlined-e063f41c.js";import"./FolderOpenOutlined-48b31105.js";import"./HolderOutlined-8450d39e.js";import"./EyeOutlined-d5f2209d.js";function xt(){const[x,m]=n.useState(""),[g,a]=n.useState(""),c=n.useRef(null),d=(o,e,i)=>{e(),m(o[0]),a(i)},y=o=>{o(),m("")},l=o=>({filterDropdown:({setSelectedKeys:e,selectedKeys:i,confirm:p,clearFilters:h,close:f})=>t.jsxs("div",{style:{padding:8},onKeyDown:r=>r.stopPropagation(),children:[t.jsx(q,{ref:c,placeholder:`Search ${o}`,value:i[0],onChange:r=>e(r.target.value?[r.target.value]:[]),onPressEnter:()=>d(i,p,o),style:{marginBottom:8,display:"block"}}),t.jsxs(v,{children:[t.jsx(s,{type:"primary",onClick:()=>d(i,p,o),icon:t.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(s,{onClick:()=>h&&y(h),size:"small",style:{width:90},children:"Reset"}),t.jsx(s,{type:"link",size:"small",onClick:()=>{p({closeDropdown:!1}),m(i[0]),a(o)},children:"Filter"}),t.jsx(s,{type:"link",size:"small",onClick:()=>{f()},children:"close"})]})]}),filterIcon:e=>t.jsx(u,{style:{color:e?"#1677ff":void 0}}),onFilter:(e,i)=>i[o].toString().toLowerCase().includes(e.toLowerCase()),onFilterDropdownOpenChange:e=>{e&&setTimeout(()=>{var i;return(i=c.current)==null?void 0:i.select()},100)},render:e=>g===o?t.jsx(S,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),j=[{title:"Medicine",dataIndex:"med",key:"med",...l("med")},{title:"Quantity",dataIndex:"qty",key:"qty",...l("qty")},{title:"Acquired Date",dataIndex:"acq_date",key:"acq_date",...l("acq_date")}];return t.jsxs("div",{children:[t.jsx("div",{children:t.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:t.jsx("h2",{className:"text-lg font-medium text-gray-800",children:t.jsx("b",{children:" Employee Acquired Medicine Records"})})})}),t.jsx(C,{}),t.jsx(k,{columns:j}),";"]})}export{xt as default};