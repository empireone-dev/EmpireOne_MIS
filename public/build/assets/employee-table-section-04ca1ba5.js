import{r as p,b as h,j as e,y as f}from"./app-482355be.js";import"./main-f4af2f0d.js";import g from"./add-employee-button-section-69d71517.js";import y from"./employee-menu-section-f91fe2a6.js";import j from"./employee-search-section-72cb477f.js";import S from"./search-branch-section-82388380.js";import{T as w,P}from"./Table-f8ad0c93.js";import{T as v}from"./index-a9b333ab.js";import"./add-new-employee-section-4365c18c.js";import"./employee-section-thunk-b6597a81.js";import"./employee-service-199301d4.js";import"./applicant-final-service-912b1e89.js";import"./index-a58b322c.js";import"./index-44babc8d.js";import"./presets-3fad3b18.js";import"./render-a51f93ee.js";import"./asyncToGenerator-be697f7b.js";import"./CheckCircleFilled-53fcacf0.js";import"./AntdIcon-b997608a.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./useZIndex-87e47ffd.js";import"./useId-2195e329.js";import"./button-120bbd6a.js";import"./Compact-8ea0c993.js";import"./useSize-df0f8805.js";import"./LoadingOutlined-a370997b.js";import"./CloseOutlined-22e36e3d.js";import"./index-252e5d81.js";import"./pickAttrs-ce94d08f.js";import"./ContextIsolator-a3a66f8f.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";import"./index-d7120351.js";import"./UsergroupAddOutlined-d7d7fd07.js";import"./add-existing-employee-section-73870f02.js";import"./barangay-94589600.js";import"./moment-a9aaa855.js";import"./upload-resume-section-5f7d3e10.js";import"./FilePdfOutlined-c2a030f2.js";import"./XMarkIcon-ba89897b.js";import"./working-experience-section-f3c6a8d9.js";import"./input-3906cfa7.js";import"./PlusOutlined-c437f347.js";import"./applicant-thunk-41ea0333.js";import"./applicant-record-service-e8bf8c30.js";import"./select-796cdfbe.js";import"./job-title-thunk-4799b20c.js";import"./department-thunk-6bfbf50d.js";import"./erf-record-service-01a2937a.js";import"./UserAddOutlined-bc447831.js";import"./update-employee-component-aa19ff55.js";import"./index-3d0ae574.js";import"./index-5c96ec32.js";import"./LeftOutlined-d4f7e3bf.js";import"./collapse-97de76d4.js";import"./file-201-component-c2f67caf.js";import"./employment-status-component-ee35cc32.js";import"./print-coe-component-9226e912.js";import"./generate-qr-component-1cddc553.js";import"./index-6af998c0.js";import"./file-ir-component-51b228cd.js";import"./file-nte-component-e74b2196.js";import"./index-74f67030.js";import"./EditOutlined-f0dbf5fa.js";import"./QrcodeOutlined-05f7e155.js";import"./DownOutlined-4600ab35.js";import"./FolderOpenOutlined-bf557445.js";import"./addEventListener-9a59321b.js";import"./useBreakpoint-0c354441.js";import"./useForceUpdate-740fd9fe.js";import"./CheckOutlined-cef1fdd2.js";import"./FileOutlined-6754d4db.js";import"./HolderOutlined-e924f284.js";import"./EyeOutlined-9e39db2b.js";function Kt(){p.useState(""),p.useState(""),p.useRef(null);const{employees:a}=h(o=>o.employees),d=[{title:"Employee #",dataIndex:"emp_id",key:"emp_id"},{title:"Fullname",dataIndex:"fullname",key:"fullname",render:(o,t,i)=>{var m,l,c;return console.log("record",t),e.jsxs("div",{children:[(m=t==null?void 0:t.applicant)==null?void 0:m.fname," ",(l=t==null?void 0:t.applicant)==null?void 0:l.mname," ",(c=t==null?void 0:t.applicant)==null?void 0:c.lname]},i)}},{title:"Position",dataIndex:"position",key:"position"},{title:"Department",dataIndex:"dept",key:"dept"},{title:"Email Address",dataIndex:"eogs",key:"eogs"},{title:"Contact",dataIndex:"contact",key:"contact",render:(o,t,i)=>{var m;return console.log("record",t),e.jsx("div",{children:(m=t==null?void 0:t.applicant)==null?void 0:m.phone},i)}},{title:"Status",dataIndex:"status",key:"status",render:(o,t)=>{let i="";switch(t.status){case"Probationary":i="#52D017";break;case"Regular":i="#43BFC7";break}return e.jsx(v,{color:i,children:t.status},t.key)}},{title:"Action",dataIndex:"action",render:(o,t)=>e.jsx(y,{data:t})}],u=window.location.pathname+window.location.search,s=((o,t)=>new URLSearchParams(o.split("?")[1]).get(t))(u,"page"),r=s?parseInt(s,10):1,x=o=>{const t=new URLSearchParams(window.location.search);t.set("page",o);const i=window.location.pathname+"?"+t.toString();f.visit(i)},n=10;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center gap-x-3",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Employee Section"})})}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(g,{}),e.jsx(S,{})]})]}),e.jsx(j,{}),e.jsx(w,{pagination:!1,columns:d,dataSource:a.data}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"w-full mt-3.5",children:a.total>0?`Showing ${(r-1)*n+1} to ${Math.min(r*n,a.total)} of ${a.total} entries`:"No entries available"}),e.jsx("div",{className:"flex w-full items-center justify-end mt-2",children:e.jsx(P,{onChange:x,defaultCurrent:r,total:a.total,pageSize:n,showSizeChanger:!1})})]})]})}export{Kt as default};