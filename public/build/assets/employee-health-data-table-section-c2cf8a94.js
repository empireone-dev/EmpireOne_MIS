import{r as c,b as _,j as t,y as d}from"./app-9f33efc9.js";import{H as P}from"./main-1bc2ad6c.js";import{T,P as E,I,a as y}from"./Table-22fde7aa.js";import{T as N}from"./index-c90f03bf.js";import{F as R}from"./FileAddOutlined-bc72ef75.js";import{S as D}from"./index-2de49e1a.js";import{B as m}from"./button-02023954.js";import{M as z}from"./MedicineBoxOutlined-7dbedfa3.js";import"./presets-9016d8c1.js";import"./index-f209aef9.js";import"./index-5c4735b9.js";import"./useId-4c8264f6.js";import"./useZIndex-842edc34.js";import"./useSize-131cb1e1.js";import"./AntdIcon-df3d5d9a.js";import"./Compact-59bba936.js";import"./ContextIsolator-806fd2ef.js";import"./asyncToGenerator-58dc0849.js";import"./pickAttrs-c9513ad0.js";import"./addEventListener-fe1d22c9.js";import"./DownOutlined-19f243a4.js";import"./KeyCode-ab35bf0c.js";import"./useLocale-996ea218.js";import"./useBreakpoint-95547406.js";import"./useForceUpdate-4b585886.js";import"./LeftOutlined-8ea79cc2.js";import"./index-265b3ce3.js";import"./collapse-97de76d4.js";import"./PurePanel-b854e6ca.js";import"./CheckOutlined-45370998.js";import"./CloseCircleFilled-3cc945f7.js";import"./CloseOutlined-883ad826.js";import"./render-df19e14a.js";import"./index-851cd320.js";import"./FileOutlined-57005106.js";import"./FolderOpenOutlined-f3658b1c.js";import"./HolderOutlined-e217c8a7.js";import"./EyeOutlined-e147c9b4.js";import"./useClosable-d4fd10ba.js";function be(){const[j,p]=c.useState(""),[w,u]=c.useState(""),h=c.useRef(null),{employees:g}=_(o=>o.employees),x=(o,e,a)=>{e(),p(o[0]),u(a)},b=o=>{o(),p("")},i=o=>({filterDropdown:({setSelectedKeys:e,selectedKeys:a,confirm:n,clearFilters:s,close:l})=>t.jsxs("div",{style:{padding:8},onKeyDown:r=>r.stopPropagation(),children:[t.jsx(I,{ref:h,placeholder:`Search ${o}`,value:a[0],onChange:r=>e(r.target.value?[r.target.value]:[]),onPressEnter:()=>x(a,n,o),style:{marginBottom:8,display:"block"}}),t.jsxs(D,{children:[t.jsx(m,{type:"primary",onClick:()=>x(a,n,o),icon:t.jsx(y,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(m,{onClick:()=>s&&b(s),size:"small",style:{width:90},children:"Reset"}),t.jsx(m,{type:"link",size:"small",onClick:()=>{n({closeDropdown:!1}),p(a[0]),u(o)},children:"Filter"}),t.jsx(m,{type:"link",size:"small",onClick:()=>{l()},children:"close"})]})]}),filterIcon:e=>t.jsx(y,{style:{color:e?"#1677ff":void 0}}),onFilter:(e,a)=>a[o].toString().toLowerCase().includes(e.toLowerCase()),onFilterDropdownOpenChange:e=>{e&&setTimeout(()=>{var a;return(a=h.current)==null?void 0:a.select()},100)},render:e=>w===o?t.jsx(P,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[j],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),S=[{title:"Employee #",dataIndex:"emp_id",key:"emp_id",...i("emp_id")},{title:"Fullname",dataIndex:"fullname",key:"fullname",...i("fullname"),render:(o,e,a)=>{var n,s,l;return console.log("record",e),t.jsxs("div",{children:[(n=e==null?void 0:e.applicant)==null?void 0:n.fname," ",(s=e==null?void 0:e.applicant)==null?void 0:s.mname," ",(l=e==null?void 0:e.applicant)==null?void 0:l.lname]},a)}},{title:"Position",dataIndex:"position",key:"position",...i("position")},{title:"Department",dataIndex:"dept",key:"dept",...i("dept")},{title:"Email Address",dataIndex:"eogs",key:"eogs",...i("eogs")},{title:"Contact",dataIndex:"contact",key:"contact",...i("contact"),render:(o,e,a)=>{var n;return console.log("record",e),t.jsx("div",{children:(n=e==null?void 0:e.applicant)==null?void 0:n.phone},a)}},{title:"Status",dataIndex:"status",key:"status",render:(o,e,a)=>(console.log("record",e),t.jsx(N,{color:"orange",children:e.status},a))},{title:"Action",dataIndex:"action",render:(o,e)=>t.jsxs("div",{className:"gap-1.5 flex",children:[t.jsx("button",{type:"button",onClick:()=>d.visit("/admin/employee_wellness/employee_health_data/employee_med_form"),className:"text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center",children:t.jsx(R,{className:"text-lg"})}),t.jsx("button",{type:"button",onClick:()=>d.visit("/admin/employee_wellness/employee_health_data/employee_acquire_medicine"),className:"text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center",children:t.jsx(z,{className:"text-lg"})})]})}],v=window.location.pathname+window.location.search,f=((o,e)=>new URLSearchParams(o.split("?")[1]).get(e))(v,"page"),C=f?parseInt(f,10):1,k=o=>{const e=new URLSearchParams(window.location.search);e.set("page",o);const a=window.location.pathname+"?"+e.toString();d.visit(a)};return t.jsxs("div",{children:[t.jsx("div",{children:t.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:t.jsx("h2",{className:"text-lg font-medium text-gray-800",children:t.jsx("b",{children:"Employee Records"})})})}),t.jsx(T,{pagination:!1,columns:S,dataSource:g.data}),t.jsx("div",{className:"flex w-full items-center justify-end mt-2",children:t.jsx(E,{onChange:k,defaultCurrent:C,total:g.total,showSizeChanger:!1})})]})}export{be as default};