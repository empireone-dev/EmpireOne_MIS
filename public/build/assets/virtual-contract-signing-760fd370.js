import{r as o,j as e,c as h}from"./app-5903bcdc.js";import y from"./send-upload-contract-section-a8b1e7ff.js";import{a as w}from"./applicant-thunk-33914611.js";import{M as N}from"./index-e44f7e7f.js";import{m}from"./index-ea69266b.js";import{L as j}from"./render-4b6d5da1.js";import{C as v}from"./CheckCircleFilled-f83f15df.js";import"./XMarkIcon-da14ba07.js";import"./FilePdfOutlined-c6591833.js";import"./presets-ac6d2c0f.js";import"./AntdIcon-567c410e.js";import"./applicant-record-service-655b693d.js";import"./index-a2a66e96.js";import"./CloseCircleFilled-697206b5.js";import"./InfoCircleFilled-e5724796.js";import"./useZIndex-79d8cff9.js";import"./useId-6966ca54.js";import"./button-d3ea38b4.js";import"./Compact-1e3d859e.js";import"./useSize-d214a582.js";import"./CloseOutlined-e89cbee7.js";import"./index-fc78c6ec.js";import"./KeyCode-8bfe2c69.js";import"./pickAttrs-436cebda.js";import"./fade-8c83fca4.js";import"./ContextIsolator-7d8b47d5.js";import"./asyncToGenerator-71d13e75.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";function le({data:l,setOpen:c}){var u;const[d,t]=o.useState(!1),[s,n]=o.useState(!1),[f,x]=o.useState(null),[b,g]=o.useState(null),r=(u=l==null?void 0:l.joboffer)==null?void 0:u.find(a=>a.status=="Contract Signing");async function p(a){a.preventDefault(),n(!0);const i=new FormData;i.append("file",b),i.append("phase_status","virtual_contract_signing"),i.append("jobPos",r==null?void 0:r.jobPos),i.append("salary",r==null?void 0:r.salary),i.append("app_id",l==null?void 0:l.app_id),i.append("fname",l==null?void 0:l.fname),i.append("lname",l==null?void 0:l.lname),i.append("email",l==null?void 0:l.email);try{await h.dispatch(w(i)),n(!1),c(!1),m.success("Email sent successfully")}catch{m.error("There was an error sending the email!"),n(!1)}}return e.jsxs("div",{className:"flex w-full items-center justify-center",children:[e.jsx("button",{onClick:()=>{t(!0),c(!1)},className:"bg-blue-500 w-full rounded-md text-white hover:bg-blue-600 p-1.5",children:"Virtual Contract Signing"}),e.jsxs(N,{title:"Contract Signing (Virtual Contract Signing)",centered:!0,visible:d,width:900,onOk:()=>{t(!1)},onCancel:()=>t(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5 mb-3"}),e.jsxs("form",{onSubmit:p,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{value:l==null?void 0:l.app_id,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",readOnly:!0})]}),e.jsx("div",{className:"flex flex-1",children:e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Applicant's Name"}),e.jsx("input",{value:`${l.fname} ${l.mname} ${l.lname}`,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Email Address"}),e.jsx("input",{value:l==null?void 0:l.email,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"email",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Position"}),e.jsx("input",{value:r==null?void 0:r.jobPos,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Salary"}),e.jsx("input",{value:r==null?void 0:r.salary,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})]})]}),e.jsx(y,{setFile:g,uploadedFile:f,setUploadedFile:x}),e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${s?"cursor-not-allowed opacity-75":""}`,onClick:p,disabled:s,children:[s?e.jsx(j,{spin:!0}):e.jsx(v,{}),s?" SENDING...":" CONFIRM"]})]})]})]})}export{le as default};