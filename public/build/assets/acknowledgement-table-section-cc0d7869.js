import{r as m,b as S,j as e,y as k}from"./app-bafafda5.js";import{T as w,I as v,S as g,H as C}from"./main-11802ff0.js";import{T as _}from"./index-c3e73ba4.js";import{E as T}from"./ExclamationCircleFilled-7d4c17ea.js";import{S as E}from"./index-85cae578.js";import{B as p}from"./button-53cc1c49.js";import{F}from"./FolderOpenFilled-ebab9109.js";import"./warning-3045d72d.js";import"./index-3489f972.js";import"./index-473fd553.js";import"./zoom-6001308e.js";import"./asyncToGenerator-b5e9f51a.js";import"./useSize-f4859fa4.js";import"./Compact-053f96f5.js";import"./useZIndex-2c590492.js";import"./AntdIcon-a6021e08.js";import"./pickAttrs-738cc4b0.js";import"./DownOutlined-6d772d00.js";import"./useLocale-2928605e.js";import"./useBreakpoint-ea62b540.js";import"./useForceUpdate-d12d4a04.js";import"./index-b1d9ec21.js";import"./PurePanel-e7c2c981.js";import"./CheckOutlined-1ee2010f.js";import"./CloseOutlined-82d8888b.js";import"./LoadingOutlined-89f0f2bf.js";import"./FileOutlined-402265b5.js";import"./FolderOpenOutlined-b11bf5e6.js";import"./HolderOutlined-2b18ed23.js";import"./EyeOutlined-f4ae2e02.js";import"./useClosable-e8a84018.js";import"./render-e2ad3102.js";function lt(){const[x,c]=m.useState(""),[f,d]=m.useState(""),u=m.useRef(null),{joboffers:y}=S(i=>i.joboffers),h=(i,t,o)=>{t(),c(i[0]),d(o)},j=i=>{i(),c("")},s=i=>({filterDropdown:({setSelectedKeys:t,selectedKeys:o,confirm:n,clearFilters:a,close:r})=>e.jsxs("div",{style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[e.jsx(v,{ref:u,placeholder:`Search ${i}`,value:o[0],onChange:l=>t(l.target.value?[l.target.value]:[]),onPressEnter:()=>h(o,n,i),style:{marginBottom:8,display:"block"}}),e.jsxs(E,{children:[e.jsx(p,{type:"primary",onClick:()=>h(o,n,i),icon:e.jsx(g,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(p,{onClick:()=>a&&j(a),size:"small",style:{width:90},children:"Reset"}),e.jsx(p,{type:"link",size:"small",onClick:()=>{n({closeDropdown:!1}),c(o[0]),d(i)},children:"Filter"}),e.jsx(p,{type:"link",size:"small",onClick:()=>{r()},children:"close"})]})]}),filterIcon:t=>e.jsx(g,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,o)=>o[i].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var o;return(o=u.current)==null?void 0:o.select()},100)},render:t=>f===i?e.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),b=[{title:"Applicant #",dataIndex:"app_id",key:"app_id",...s("app_id")},{title:"Applicant Name",dataIndex:"app_name",key:"app_name",...s("app_name"),render:(i,t,o)=>{var n,a,r;return console.log("record",t),e.jsxs("div",{children:[(n=t==null?void 0:t.applicant)==null?void 0:n.fname," ",(a=t==null?void 0:t.applicant)==null?void 0:a.mname," ",(r=t==null?void 0:t.applicant)==null?void 0:r.lname]},o)}},{title:"Position",dataIndex:"jobPos",key:"position",...s("position")},{title:"Salary",dataIndex:"salary",key:"salary",...s("salary")},{title:"Status",dataIndex:"status",key:"status",render:(i,t,o)=>{console.log("record",t);let n="";switch(t.status){case"Contract Signing":n="green";break;case"Accepted":n="blue";break;case"Declined":n="red";break;case"Pending":n="yellow";break}return e.jsx(_,{color:n,children:t.status},t.key)}},{title:"Action",dataIndex:"action",render:(i,t)=>e.jsxs("div",{className:"flex flex-1 gap-1",children:[e.jsx("button",{type:"button",onClick:()=>k.visit(`/admin/file_201/${t.app_id}`),className:"text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center",children:e.jsx(F,{})}),e.jsx("button",{type:"button",className:"text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  shadow-lg shadow-red-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center",children:e.jsx(T,{})})]})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Onboarding Section"})})})}),e.jsx(w,{columns:b,dataSource:y}),";"]})}export{lt as default};