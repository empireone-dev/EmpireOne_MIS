import{r as x,b as C,j as e,y as p}from"./app-9f33efc9.js";import"./main-1bc2ad6c.js";import F from"./add-employee-button-section-b81b01b1.js";import N from"./employee-menu-section-eee97b64.js";import A from"./employee-search-section-d6715a3c.js";import{T as R,P as I,S as h}from"./Table-22fde7aa.js";import{T as L}from"./index-c90f03bf.js";import"./add-new-employee-section-7d939dbc.js";import"./employee-section-thunk-c2c18d3f.js";import"./employee-service-4adda4f7.js";import"./applicant-final-service-912b1e89.js";import"./index-7e3e9310.js";import"./index-f209aef9.js";import"./presets-9016d8c1.js";import"./render-df19e14a.js";import"./AntdIcon-df3d5d9a.js";import"./asyncToGenerator-58dc0849.js";import"./CheckCircleFilled-6ff47d43.js";import"./CloseCircleFilled-3cc945f7.js";import"./InfoCircleFilled-1d84c44c.js";import"./useZIndex-842edc34.js";import"./useId-4c8264f6.js";import"./button-02023954.js";import"./Compact-59bba936.js";import"./useSize-131cb1e1.js";import"./CloseOutlined-883ad826.js";import"./index-80874a1a.js";import"./KeyCode-ab35bf0c.js";import"./pickAttrs-c9513ad0.js";import"./fade-ec6a1f02.js";import"./ContextIsolator-806fd2ef.js";import"./useClosable-d4fd10ba.js";import"./useLocale-996ea218.js";import"./PurePanel-b854e6ca.js";import"./index-fcd12960.js";import"./UsergroupAddOutlined-02bf2702.js";import"./add-existing-employee-section-b9170bbd.js";import"./barangay-94589600.js";import"./moment-a9aaa855.js";import"./upload-resume-section-d755f499.js";import"./FilePdfOutlined-2fb5aaee.js";import"./XMarkIcon-a3af57e8.js";import"./working-experience-section-ef6f9e46.js";import"./input-2b5528c4.js";import"./PlusOutlined-c9739d7a.js";import"./applicant-thunk-b1653576.js";import"./applicant-record-service-97d4189f.js";import"./select-7bc291c2.js";import"./job-title-thunk-f91678d6.js";import"./department-thunk-794d296d.js";import"./erf-record-service-a3a3b2cc.js";import"./UserAddOutlined-f64901c9.js";import"./update-employee-component-8db81251.js";import"./index-265b3ce3.js";import"./index-5c4735b9.js";import"./LeftOutlined-8ea79cc2.js";import"./collapse-97de76d4.js";import"./file-201-component-836c39e4.js";import"./employment-status-component-859747a1.js";import"./print-coe-component-77b3b107.js";import"./generate-qr-component-623b89eb.js";import"./index-851cd320.js";import"./index-2de49e1a.js";import"./EditOutlined-d1d98f42.js";import"./QrcodeOutlined-228a4e77.js";import"./DownOutlined-19f243a4.js";import"./FolderOpenOutlined-f3658b1c.js";import"./addEventListener-fe1d22c9.js";import"./useBreakpoint-95547406.js";import"./useForceUpdate-4b585886.js";import"./CheckOutlined-45370998.js";import"./FileOutlined-57005106.js";import"./HolderOutlined-e217c8a7.js";import"./EyeOutlined-e147c9b4.js";function ee(){x.useState(""),x.useState(""),x.useRef(null);const{employees:s}=C(i=>i.employees),y=window.location.pathname+window.location.search,b=[{label:"JTV",value:"JTV"},{label:"Service Market",value:"Service Market"},{label:"Curtis",value:"Curtis"},{label:"Aifi",value:"Aifi"},{label:"Latham Pool (Designer) ",value:"Latham Pool (Designer)"},{label:"Latham Pool (Order Entry) ",value:"Latham Pool (Order Entry)"},{label:"Weby",value:"Weby"},{label:"N/A",value:"N/A"}],j=new URL(window.location.href),n=new URLSearchParams(j.search),c=n.get("page"),r=n.get("account"),l=n.get("status"),m=n.get("site");function w(i){p.visit("?page="+c+"&account="+(i||"null")+"&status="+l+"&site="+m)}function P(i){p.visit("?page="+c+"&account="+r+"&status="+(i||"null")+"&site="+m)}function S(i){p.visit("?page="+c+"&account="+r+"&status="+l+"&site="+(i||"null"))}const E=[{title:"Employee #",dataIndex:"emp_id",key:"emp_id"},{title:"Fullname",dataIndex:"fullname",key:"fullname",render:(i,t,a)=>{var o,v,f;return console.log("record",t),e.jsxs("div",{children:[(o=t==null?void 0:t.applicant)==null?void 0:o.fname," ",(v=t==null?void 0:t.applicant)==null?void 0:v.mname," ",(f=t==null?void 0:t.applicant)==null?void 0:f.lname]},a)}},{title:"Position",dataIndex:"position",key:"position"},{title:"Department",dataIndex:"dept",key:"dept"},{title:e.jsx("div",{className:"flex gap-3 items-center justify-center",children:e.jsx(h,{allowClear:!0,className:"w-28",showSearch:!0,placeholder:"Account",optionFilterProp:"label",value:r=="null"?null:r,onChange:w,options:b})}),dataIndex:"account",key:"dept",render:i=>i||"N/A"},{title:"Email Address",dataIndex:"eogs",key:"eogs"},{title:"Contact",dataIndex:"contact",key:"contact",render:(i,t,a)=>{var o;return console.log("record",t),e.jsx("div",{children:(o=t==null?void 0:t.applicant)==null?void 0:o.phone},a)}},{title:e.jsx("div",{className:"flex gap-3 items-center justify-center",children:e.jsx(h,{allowClear:!0,className:"w-28",showSearch:!0,placeholder:"Site",optionFilterProp:"label",value:m=="null"?null:m,onChange:S,options:[{text:"San Carlos",value:"San Carlos"},{text:"Carcar",value:"Carcar"}]})}),dataIndex:"site",key:"site",render:(i,t,a)=>{var o;return console.log("record",t),e.jsx("div",{children:(o=t==null?void 0:t.applicant)==null?void 0:o.site},a)}},{title:e.jsx("div",{className:"flex gap-3 items-center justify-center",children:e.jsx(h,{allowClear:!0,className:"w-28",showSearch:!0,placeholder:"Status",optionFilterProp:"label",value:l=="null"?null:l,onChange:P,options:[{text:"Probationary",value:"Probationary"},{text:"Regular",value:"Regular"},{text:"Extended Probationary",value:"Extended Probationary"},{text:"EOPE",value:"EOPE"},{text:"End of Contract",value:"End of Contract"},{text:"Terminated",value:"Terminated"},{text:"Dismissal",value:"Dismissed"},{text:"AWOL",value:"AWOL"},{text:"Resigned",value:"Resigned"}]})}),dataIndex:"status",key:"status",render:(i,t)=>{let a="";switch(t.status){case"Probationary":a="#52D017";break;case"Extended Probationary":a="#52D017";break;case"EOPE":a="#FF0000";break;case"Regular":a="#43BFC7";break;case"Terminated":a="#FF0000";break;case"Dismissed":a="#FF0000";break;case"AWOL":a="#FF0000";break;case"End of Contract":a="#FF0000";break;case"Resigned":a="#FF0000";break}return e.jsx(L,{color:a,children:t.status},t.key)}},{title:"Action",dataIndex:"action",render:(i,t)=>e.jsx(N,{data:t})}],g=((i,t)=>new URLSearchParams(i.split("?")[1]).get(t))(y,"page"),u=g?parseInt(g,10):1,k=i=>{const t=new URLSearchParams(window.location.search);t.set("page",i);const a=window.location.pathname+"?"+t.toString();p.visit(a)},d=10;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center gap-x-3",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Employee Section"})})}),e.jsx("div",{className:"flex items-center justify-between",children:e.jsx(F,{})})]}),e.jsx(A,{}),e.jsx(R,{pagination:!1,columns:E,dataSource:s.data}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"w-full mt-3.5",children:s.total>0?`Showing ${(u-1)*d+1} to ${Math.min(u*d,s.total)} of ${s.total} entries`:"No entries available"}),e.jsx("div",{className:"flex w-full items-center justify-end mt-2",children:e.jsx(I,{onChange:k,defaultCurrent:u,total:s.total,pageSize:d,showSizeChanger:!1})})]})]})}export{ee as default};