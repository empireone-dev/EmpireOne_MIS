import{r as o,b as m,j as e}from"./app-753af2e0.js";import a from"./pre-employment-table-section-bc895dfb.js";import d from"./upload-requirements-section-99a06266.js";import"./main-9636dc9e.js";import"./moment-a9aaa855.js";import"./re-upload-requirements-section-a642f9bb.js";import"./pre-employment-file-service-629d8857.js";import"./final-rate-thunk-91de09e4.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-592ef5c3.js";import"./index-466f17d2.js";import"./index-4bceb124.js";import"./presets-d249989d.js";import"./render-3a896346.js";import"./AntdIcon-b9d997e7.js";import"./asyncToGenerator-abcd90ca.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./useZIndex-a79cfede.js";import"./useId-6f6c842e.js";import"./button-873ff8d7.js";import"./Compact-9246895f.js";import"./useSize-27c5a9ae.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./KeyCode-bde7e4ef.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./ContextIsolator-765e5922.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./PurePanel-def41e9a.js";import"./index-32c81af0.js";import"./collapse-97de76d4.js";import"./useForceUpdate-68311461.js";import"./DeleteOutlined-4b8ff2f9.js";import"./EyeOutlined-d5f2209d.js";import"./CheckOutlined-9fad5569.js";import"./index-b31ab175.js";import"./index-adb8e5ea.js";import"./Table-4e6f0df9.js";import"./addEventListener-e12acff0.js";import"./DownOutlined-d2001029.js";import"./index-45b52881.js";import"./LeftOutlined-cd9ffefc.js";import"./index-a5be535f.js";import"./useBreakpoint-c17c223a.js";import"./index-7d483204.js";import"./FileOutlined-e063f41c.js";import"./FolderOpenOutlined-48b31105.js";import"./HolderOutlined-8450d39e.js";import"./index-8c7e70f9.js";import"./CheckSquareOutlined-66ab68c0.js";import"./FileJpgOutlined-4123fb83.js";function ce(){var i;o.useState(!1);const{applicant:l}=m(s=>s.final_rate),t=window.location.search.split("=")[1];window.location.pathname.split("/")[2];const r=(i=l==null?void 0:l.joboffer)==null?void 0:i.find(s=>s.id==t);return console.log("jo",r),e.jsx("div",{children:e.jsx("div",{className:"h-screen overflow-hidden",children:e.jsx("div",{className:"bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll",children:e.jsx("div",{className:"container mx-auto flex justify-center",children:e.jsxs("div",{className:"bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-60",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex text-2xl items-center justify-center",children:e.jsx("h1",{children:e.jsx("b",{children:"APPLICATION DETAILS"})})}),e.jsxs("form",{className:"border rounded-lg p-3.5",children:[e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("div",{className:"flex flex-1 gap-3",children:e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.app_id,readOnly:!0})})]}),e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Full Name"})}),e.jsxs("div",{className:"flex flex-1 gap-3",children:[e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.fname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.mname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:l==null?void 0:l.lname,readOnly:!0}),e.jsx("input",{type:"text",className:"border p-2 rounded w-1/5",value:l==null?void 0:l.suffix,readOnly:!0})]})]})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Email"})}),e.jsx("input",{type:"email",className:"border p-2 rounded w-full",value:l==null?void 0:l.email,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Job Position"})}),e.jsx("input",{type:"text",className:"border p-2 rounded w-full",value:r==null?void 0:r.jobPos,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Salary"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",className:"border pl-5 p-2 rounded w-full",value:r==null?void 0:r.salary,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Allowance"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",className:"border pl-5 p-2 rounded w-full",value:r==null?void 0:r.allowance,readOnly:!0})]})]})]}),e.jsx(d,{})]}),e.jsx(a,{})]})})})})})}export{ce as default};