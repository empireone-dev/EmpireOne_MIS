import{r as o,b as m,j as e}from"./app-12dd3627.js";import a from"./pre-employment-table-section-e8e3745d.js";import d from"./upload-requirements-section-16d2c420.js";import"./main-7aa7af08.js";import"./moment-a9aaa855.js";import"./re-upload-requirements-section-69eb81bd.js";import"./pre-employment-file-service-0bba09c2.js";import"./final-rate-thunk-0b31a9c0.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-bc53da68.js";import"./index-d368cae6.js";import"./index-4e0ea6ca.js";import"./presets-2db74b6f.js";import"./render-a458bafb.js";import"./AntdIcon-8b25e930.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./button-aae57988.js";import"./Compact-9e968cf1.js";import"./useSize-ccd2c154.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./index-2894dd06.js";import"./collapse-97de76d4.js";import"./useForceUpdate-018cd649.js";import"./DeleteOutlined-cdbd1357.js";import"./EyeOutlined-2bad6abe.js";import"./CheckOutlined-05cd87ef.js";import"./index-1f34c205.js";import"./index-8ae8737d.js";import"./Table-117bf68c.js";import"./addEventListener-4ceeba21.js";import"./DownOutlined-5adaded5.js";import"./index-b3f92c81.js";import"./LeftOutlined-2fa34ff8.js";import"./index-734ac57e.js";import"./useBreakpoint-769c2c69.js";import"./index-a5fbad9e.js";import"./FileOutlined-390f3a30.js";import"./FolderOpenOutlined-c2659d31.js";import"./HolderOutlined-14030367.js";import"./index-2322f4e5.js";import"./CheckSquareOutlined-17d8f895.js";import"./FileJpgOutlined-f5c71c42.js";function ce(){var i;o.useState(!1);const{applicant:l}=m(s=>s.final_rate),t=window.location.search.split("=")[1];window.location.pathname.split("/")[2];const r=(i=l==null?void 0:l.joboffer)==null?void 0:i.find(s=>s.id==t);return console.log("jo",r),e.jsx("div",{children:e.jsx("div",{className:"h-screen overflow-hidden",children:e.jsx("div",{className:"bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll",children:e.jsx("div",{className:"container mx-auto flex justify-center",children:e.jsxs("div",{className:"bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-60",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex text-2xl items-center justify-center",children:e.jsx("h1",{children:e.jsx("b",{children:"APPLICATION DETAILS"})})}),e.jsxs("form",{className:"border rounded-lg p-3.5",children:[e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("div",{className:"flex flex-1 gap-3",children:e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.app_id,readOnly:!0})})]}),e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Full Name"})}),e.jsxs("div",{className:"flex flex-1 gap-3",children:[e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.fname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.mname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.lname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-1/5",value:l==null?void 0:l.suffix,readOnly:!0})]})]})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Email"})}),e.jsx("input",{type:"email",className:"border p-2 rounded w-full",value:l==null?void 0:l.email,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Job Position"})}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:r==null?void 0:r.jobPos,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Salary"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",className:"border pl-5 p-2 rounded w-full",value:r==null?void 0:r.salary,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Allowance"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",className:"border pl-5 p-2 rounded w-full",value:r==null?void 0:r.allowance,readOnly:!0})]})]})]}),e.jsx(d,{})]}),e.jsx(a,{})]})})})})})}export{ce as default};