import{r as o,b as f,y as g,j as t}from"./app-63d290ed.js";import"./main-0d3f75e1.js";import{h as j}from"./moment-a9aaa855.js";import b from"./add-applicants-section-33c093e1.js";import S from"./applicant-menu-section-8bdd4171.js";import y from"./applicant-search-section-17fa8e34.js";import{T as k}from"./Table-6799eac9.js";import{T as w}from"./index-6d4e50c4.js";import"./working-experience-section-63e441c7.js";import"./input-cc11eb34.js";import"./CloseOutlined-a4ab623b.js";import"./presets-9872d8f0.js";import"./AntdIcon-d99b3c04.js";import"./PlusOutlined-22969600.js";import"./applicant-thunk-c293ec35.js";import"./applicant-record-service-5b999d79.js";import"./select-8622ebe8.js";import"./barangay-94589600.js";import"./upload-resume-section-3056b165.js";import"./FilePdfOutlined-ea75686b.js";import"./XMarkIcon-885b2a84.js";import"./UserPlusIcon-4f1d06d9.js";import"./index-ccb87f83.js";import"./index-d8b89dfe.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./useZIndex-dc62b87b.js";import"./useId-ad7dc23b.js";import"./button-082e41af.js";import"./Compact-641d596c.js";import"./useSize-3c640658.js";import"./LoadingOutlined-8390b05c.js";import"./index-dee3d1b8.js";import"./pickAttrs-8fbf8c8c.js";import"./ContextIsolator-63f8fbab.js";import"./useClosable-eb9686b6.js";import"./useLocale-29929ee3.js";import"./PurePanel-1f85830c.js";import"./index-9d2c8c61.js";import"./applicant-proceed-inital-phase-component-baf7712c.js";import"./index-67c61ede.js";import"./index-2cdf993a.js";import"./LeftOutlined-a441e7f6.js";import"./collapse-97de76d4.js";import"./applicant-initial-rating-scale-3970fe20.js";import"./applicant-final-rating-scale-component-1b4bfb8f.js";import"./applicant-check-schedule-component-b558f454.js";import"./applicant-results-component-599ecc02.js";import"./applicant-job-offer-component-da6f697c.js";import"./hiring-thunk-115c0b3a.js";import"./job-offer-service-cd52f7e0.js";import"./BriefcaseIcon-48a76236.js";import"./applicant-detaills-component-91921245.js";import"./applicant-set-schedule-component-53f716c9.js";import"./applicant-choose-interview-component-7bda5b1a.js";import"./applicant-virtual-schedule-component-3bb29e65.js";import"./applicant-f2f-schedule-component-7133ec1a.js";import"./index-b87bb9fb.js";import"./ScheduleOutlined-ff0215ef.js";import"./DownOutlined-05d60d42.js";import"./addEventListener-48dab54c.js";import"./useBreakpoint-aa9cb1f3.js";import"./useForceUpdate-e52db8bf.js";import"./CheckOutlined-cd2f64e6.js";import"./index-5d4b7932.js";import"./FileOutlined-b997520e.js";import"./FolderOpenOutlined-faa2a7c5.js";import"./HolderOutlined-35c89a22.js";import"./EyeOutlined-ac49cf56.js";function Ht(){o.useState(""),o.useState("");const[v,c]=o.useState(1),[s,d]=o.useState(10),{applicants:r,interviewer:u}=f(i=>i.applicants),n=r.data;console.log("filteredDatas",n),o.useRef(null);const x=[{title:"Application #",dataIndex:"app_id",key:"emp_id"},{title:"Fullname",dataIndex:"fullname",key:"fullname",render:(i,e,a)=>(console.log("record",e),t.jsxs("div",{children:[e.lname,", ",e.fname]},a))},{title:"Date of Birth",dataIndex:"dob",key:"dob",render:(i,e)=>t.jsx("div",{className:"gap-1.5 flex",children:j(e.dob).format("LL")})},{title:"Gender",dataIndex:"gender",key:"gender"},{title:"Marital Status",dataIndex:"marital",key:"mstatus"},{title:"Email Address",dataIndex:"email",key:"eogs"},{title:"Contact",dataIndex:"phone",key:"contact"},{title:"Date Submitted",dataIndex:"submitted",key:"submitted"},{title:"Status",dataIndex:"status",key:"status",render:(i,e)=>{let a="";switch(e.status){case"Failed":case"Dismissal":case"Resignation":case"EOPE":case"AWOL":a="red";break;case"Passed":case"Hired":case"Regular":a="green";break;case"Pending":a="yellow";break;case"Initial Phase":a="orange";break;case"Final Phase":a="blue";break;case"Pooling":a="purple";break}return t.jsx(w,{color:a,children:e.status},e.key)}},{title:"Site",dataIndex:"site",render:(i,e)=>t.jsx(t.Fragment,{children:e.site})},{title:"Action",dataIndex:"action",render:(i,e)=>t.jsx(t.Fragment,{children:t.jsx(S,{interviewer:u,data:e})})}],p=window.location.pathname+window.location.search,l=(i,e)=>new URLSearchParams(i.split("?")[1]).get(e),m=l(p,"page");l(p,"categories");const h={current:m,pageSize:s,total:r.last_page*s,onChange:(i,e)=>{g.visit(window.location.pathname+`?page=${i}`),c(i),d(e)}};return t.jsxs("div",{children:[t.jsx("div",{className:"flex justify-between items-center ",children:t.jsx("div",{className:"flex items-center gap-x-3 mb-3",children:t.jsx("h2",{className:"text-lg font-medium text-gray-800",children:t.jsx("b",{children:"Applicant(s) Records"})})})}),t.jsxs("div",{className:"flex flex-1 justify-between w-full items-start",children:[t.jsx("div",{children:t.jsx(y,{})}),t.jsx("div",{className:"flex justify-end items-center mr-5",children:t.jsx(b,{})})]}),t.jsx(k,{pagination:h,columns:x,dataSource:n,className:"mt-1"}),t.jsx("div",{className:"w-full",children:r.total>0?`Showing ${(m-1)*s+1} to ${Math.min(m*s,r.total)} of ${r.total} entries`:"No entries available"})]})}export{Ht as default};