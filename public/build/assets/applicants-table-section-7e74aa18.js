import{r as s,b as y,y as c,j as t}from"./app-7d68ca85.js";import"./main-070e6b79.js";import{h as k}from"./moment-a9aaa855.js";import I from"./add-applicants-section-d4fe320d.js";import C from"./applicant-menu-section-6d653c39.js";import N from"./applicant-search-section-b89ccce1.js";import{T as A,S as h}from"./Table-086c58eb.js";import{T as F}from"./index-8f77a29b.js";import"./working-experience-section-4daff9ba.js";import"./input-85689239.js";import"./CloseOutlined-2578f623.js";import"./presets-a105bbc6.js";import"./AntdIcon-9cfc0218.js";import"./PlusOutlined-40252bf8.js";import"./applicant-thunk-f9d6d8dd.js";import"./applicant-record-service-0b284e04.js";import"./select-4e44d4ea.js";import"./barangay-94589600.js";import"./upload-resume-section-93fb5b51.js";import"./FilePdfOutlined-5386e6fe.js";import"./XMarkIcon-9b4ca90e.js";import"./UserPlusIcon-54a8cebd.js";import"./index-c093f7be.js";import"./index-2eb55d07.js";import"./render-1607753e.js";import"./asyncToGenerator-ddb06381.js";import"./CheckCircleFilled-e7ef87be.js";import"./CloseCircleFilled-f459e844.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";import"./index-ef610335.js";import"./applicant-proceed-inital-phase-component-4b23120f.js";import"./index-97491272.js";import"./index-1d086a91.js";import"./LeftOutlined-72133fab.js";import"./collapse-97de76d4.js";import"./applicant-initial-rating-scale-2aae8d9a.js";import"./applicant-final-rating-scale-component-c19785fd.js";import"./applicant-results-component-3abfb7e9.js";import"./applicant-job-offer-component-64265691.js";import"./hiring-thunk-80911222.js";import"./job-offer-service-471b567c.js";import"./BriefcaseIcon-8b660372.js";import"./applicant-detaills-component-a19639fe.js";import"./applicant-set-schedule-component-ce6e136b.js";import"./applicant-choose-interview-component-c2181f2b.js";import"./applicant-virtual-schedule-component-d5983e63.js";import"./applicant-f2f-schedule-component-825543bc.js";import"./applicant-pooling-component-ef10e329.js";import"./index-15749420.js";import"./RiseOutlined-13c4f237.js";import"./DownOutlined-f97462df.js";import"./addEventListener-a6a70504.js";import"./useBreakpoint-de48abe7.js";import"./useForceUpdate-8cc2e619.js";import"./CheckOutlined-b87cb42c.js";import"./index-e969da80.js";import"./FileOutlined-72f169c5.js";import"./FolderOpenOutlined-e8860472.js";import"./HolderOutlined-650172be.js";import"./EyeOutlined-e2edfe6e.js";function Xt(){s.useState(""),s.useState("");const[R,g]=s.useState(1),[o,f]=s.useState(10),{applicants:r,interviewer:v}=y(a=>a.applicants),j=new URL(window.location.href),m=new URLSearchParams(j.search);m.get("page");const n=m.get("status"),l=m.get("site"),d=r.data;console.log("filteredDatas",d),s.useRef(null);function P(a){c.visit("?page=1&status="+(a||"null")+"&site="+l)}function b(a){c.visit("?page=1&status="+n+"&site="+(a||"null"))}const S=[{title:"Application #",dataIndex:"app_id",key:"emp_id"},{title:"Fullname",dataIndex:"fullname",key:"fullname",render:(a,e,i)=>(console.log("record",e),t.jsxs("div",{children:[e.lname,", ",e.fname]},i))},{title:"Date of Birth",dataIndex:"dob",key:"dob",render:(a,e)=>t.jsx("div",{className:"gap-1.5 flex",children:k(e.dob).format("LL")})},{title:"Gender",dataIndex:"gender",key:"gender"},{title:"Marital Status",dataIndex:"marital",key:"mstatus"},{title:"Email Address",dataIndex:"email",key:"eogs"},{title:"Contact",dataIndex:"phone",key:"contact"},{title:"Date Submitted",dataIndex:"submitted",key:"submitted"},{title:t.jsx("div",{children:t.jsx(h,{allowClear:!0,className:"w-28",showSearch:!0,placeholder:"Status",optionFilterProp:"label",value:n=="null"?null:n,onChange:P,options:[{text:"Pending",value:"Pending"},{text:"Initial Phase",value:"Initial Phase"},{text:"Final Phase",value:"Final Phase"},{text:"Passed",value:"Passed"},{text:"Pooling",value:"Pooling"},{text:"Failed",value:"Failed"},{text:"Hired",value:"Hired"},{text:"Regular",value:"Regular"},{text:"Probationary",value:"Probationary"}]})}),dataIndex:"status",key:"status",render:(a,e)=>{let i="";switch(e.status){case"Failed":case"Dismissal":case"Resignation":case"EOPE":case"AWOL":i="red";break;case"Passed":case"Hired":case"Probationary":i="green";break;case"Final Phase":case"Regular":i="blue";break;case"Pending":i="yellow";break;case"Initial Phase":i="orange";break;case"Pooling":i="purple";break}return t.jsx(F,{color:i,children:e.status},e.key)}},{title:t.jsx("div",{className:"flex gap-3 items-center justify-center",children:t.jsx(h,{allowClear:!0,className:"w-28",showSearch:!0,placeholder:"Site",optionFilterProp:"label",value:l=="null"?null:l,onChange:b,options:[{text:"San Carlos",value:"San Carlos"},{text:"Carcar",value:"Carcar"}]})}),dataIndex:"site",key:"site",render:(a,e,i)=>(console.log("record",e),t.jsx("div",{children:e==null?void 0:e.site},i))},{title:"Action",dataIndex:"action",render:(a,e)=>t.jsx(t.Fragment,{children:t.jsx(C,{interviewer:v,data:e})})}],u=window.location.pathname+window.location.search,x=(a,e)=>new URLSearchParams(a.split("?")[1]).get(e),p=x(u,"page");x(u,"categories");const w={current:p,pageSize:o,total:r.last_page*o,onChange:(a,e)=>{c.visit(window.location.pathname+`?page=${a}&status=${n}&site=${l}`),g(a),f(e)}};return t.jsxs("div",{children:[t.jsx("div",{className:"flex justify-between items-center ",children:t.jsx("div",{className:"flex items-center gap-x-3 mb-3",children:t.jsx("h2",{className:"text-lg font-medium text-gray-800",children:t.jsx("b",{children:"Applicant(s) Records"})})})}),t.jsxs("div",{className:"flex flex-1 justify-between w-full items-start",children:[t.jsx("div",{children:t.jsx(N,{})}),t.jsx("div",{className:"flex justify-end items-center mr-5",children:t.jsx(I,{})})]}),t.jsx(A,{pagination:w,columns:S,dataSource:d,className:"mt-1"}),t.jsx("div",{className:"w-full",children:r.total>0?`Showing ${(p-1)*o+1} to ${Math.min(p*o,r.total)} of ${r.total} entries`:"No entries available"})]})}export{Xt as default};