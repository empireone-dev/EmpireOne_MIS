import{r as o,b as f,y as g,j as t}from"./app-3fef3a63.js";import"./main-8e9ec849.js";import{h as j}from"./moment-a9aaa855.js";import b from"./add-applicants-section-1d98013f.js";import S from"./applicant-menu-section-524b2652.js";import y from"./applicant-search-section-d5629369.js";import{T as k}from"./Table-f2fc72fd.js";import{T as w}from"./index-43702a1d.js";import"./working-experience-section-b5f86688.js";import"./input-842f381c.js";import"./CloseOutlined-cc20978d.js";import"./presets-ca4e9e1b.js";import"./AntdIcon-f6a6858b.js";import"./PlusOutlined-5d73529d.js";import"./applicant-thunk-a417e30b.js";import"./applicant-record-service-1b34d276.js";import"./select-b5e16b56.js";import"./barangay-94589600.js";import"./upload-resume-section-89dc1d75.js";import"./FilePdfOutlined-627fb646.js";import"./XMarkIcon-aa32d8ac.js";import"./UserPlusIcon-5f051e97.js";import"./index-b28d3991.js";import"./index-aee74163.js";import"./render-06651440.js";import"./asyncToGenerator-d91032a9.js";import"./CheckCircleFilled-ae4c12ba.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./useZIndex-0bbceadc.js";import"./useId-486ac681.js";import"./button-7a476b2b.js";import"./Compact-7f0d1344.js";import"./useSize-d7041e64.js";import"./LoadingOutlined-285e92e4.js";import"./index-067d7e3e.js";import"./KeyCode-dba4fb16.js";import"./pickAttrs-0272306c.js";import"./fade-fce3c8f0.js";import"./ContextIsolator-7f0f291f.js";import"./useClosable-e3f3eb25.js";import"./useLocale-d278345a.js";import"./PurePanel-06125fb1.js";import"./index-17ede4fa.js";import"./applicant-proceed-inital-phase-component-9bed9c0d.js";import"./index-1bbc017a.js";import"./index-8215846e.js";import"./LeftOutlined-697ba1d8.js";import"./collapse-97de76d4.js";import"./applicant-initial-rating-scale-229d71af.js";import"./applicant-final-rating-scale-component-6c2f5ada.js";import"./applicant-check-schedule-component-ce8acf4b.js";import"./applicant-results-component-9761ec4d.js";import"./applicant-job-offer-component-a29eb76a.js";import"./hiring-thunk-5fc059d3.js";import"./job-offer-service-0ff8874e.js";import"./BriefcaseIcon-7a645539.js";import"./applicant-detaills-component-147a9053.js";import"./applicant-set-schedule-component-a0c5ee22.js";import"./applicant-choose-interview-component-92dd2c58.js";import"./applicant-virtual-schedule-component-898eadf8.js";import"./applicant-f2f-schedule-component-966aa0e7.js";import"./index-1fe63da4.js";import"./ScheduleOutlined-96d6e183.js";import"./DownOutlined-bf46ca9d.js";import"./addEventListener-875d1d97.js";import"./useBreakpoint-d9271dc9.js";import"./useForceUpdate-55a4b7f9.js";import"./CheckOutlined-04d0f69a.js";import"./index-93408efd.js";import"./FileOutlined-01a0cb0c.js";import"./FolderOpenOutlined-98b27a39.js";import"./HolderOutlined-42b4aafe.js";import"./EyeOutlined-41dc8854.js";function Ut(){o.useState(""),o.useState("");const[v,c]=o.useState(1),[s,d]=o.useState(10),{applicants:r,interviewer:u}=f(i=>i.applicants),n=r.data;console.log("filteredDatas",n),o.useRef(null);const x=[{title:"Application #",dataIndex:"app_id",key:"emp_id"},{title:"Fullname",dataIndex:"fullname",key:"fullname",render:(i,e,a)=>(console.log("record",e),t.jsxs("div",{children:[e.lname,", ",e.fname]},a))},{title:"Date of Birth",dataIndex:"dob",key:"dob",render:(i,e)=>t.jsx("div",{className:"gap-1.5 flex",children:j(e.dob).format("LL")})},{title:"Gender",dataIndex:"gender",key:"gender"},{title:"Marital Status",dataIndex:"marital",key:"mstatus"},{title:"Email Address",dataIndex:"email",key:"eogs"},{title:"Contact",dataIndex:"phone",key:"contact"},{title:"Date Submitted",dataIndex:"submitted",key:"submitted"},{title:"Status",dataIndex:"status",key:"status",render:(i,e)=>{let a="";switch(e.status){case"Failed":case"Dismissal":case"Resignation":case"EOPE":case"AWOL":a="red";break;case"Passed":case"Hired":case"Regular":a="green";break;case"Pending":a="yellow";break;case"Initial Phase":a="orange";break;case"Final Phase":a="blue";break;case"Pooling":a="purple";break}return t.jsx(w,{color:a,children:e.status},e.key)}},{title:"Site",dataIndex:"site",render:(i,e)=>t.jsx(t.Fragment,{children:e.site})},{title:"Action",dataIndex:"action",render:(i,e)=>t.jsx(t.Fragment,{children:t.jsx(S,{interviewer:u,data:e})})}],p=window.location.pathname+window.location.search,l=(i,e)=>new URLSearchParams(i.split("?")[1]).get(e),m=l(p,"page");l(p,"categories");const h={current:m,pageSize:s,total:r.last_page*s,onChange:(i,e)=>{g.visit(window.location.pathname+`?page=${i}`),c(i),d(e)}};return t.jsxs("div",{children:[t.jsx("div",{className:"flex justify-between items-center ",children:t.jsx("div",{className:"flex items-center gap-x-3 mb-3",children:t.jsx("h2",{className:"text-lg font-medium text-gray-800",children:t.jsx("b",{children:"Applicant(s) Records"})})})}),t.jsxs("div",{className:"flex flex-1 justify-between w-full items-start",children:[t.jsx("div",{children:t.jsx(y,{})}),t.jsx("div",{className:"flex justify-end items-center mr-5",children:t.jsx(b,{})})]}),t.jsx(k,{pagination:h,columns:x,dataSource:n,className:"mt-1"}),t.jsx("div",{className:"w-full",children:r.total>0?`Showing ${(m-1)*s+1} to ${Math.min(m*s,r.total)} of ${r.total} entries`:"No entries available"})]})}export{Ut as default};