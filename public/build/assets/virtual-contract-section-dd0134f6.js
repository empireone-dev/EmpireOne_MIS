import{b as p,r as i,j as e,c as h}from"./app-63d290ed.js";import j from"./upload-contract-section-2b7bf20d.js";import{a as b}from"./applicant-thunk-c293ec35.js";import{m as c}from"./index-9d2c8c61.js";import{L as N}from"./LoadingOutlined-8390b05c.js";import{F as v}from"./FileJpgOutlined-396db8cd.js";import"./XMarkIcon-885b2a84.js";import"./FilePdfOutlined-ea75686b.js";import"./presets-9872d8f0.js";import"./AntdIcon-d99b3c04.js";import"./applicant-record-service-5b999d79.js";import"./index-d8b89dfe.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./useZIndex-dc62b87b.js";import"./pickAttrs-8fbf8c8c.js";import"./CloseOutlined-a4ab623b.js";function $(){var m;const{applicant:l}=p(a=>a.final_rate),[o,t]=i.useState(!1),[u,x]=i.useState(null),[d,f]=i.useState(null),s=(m=l==null?void 0:l.joboffer)==null?void 0:m.find(a=>a.status=="Contract Signing");console.log("file",d);async function n(a){a.preventDefault(),t(!0);const r=new FormData;r.append("file",d),r.append("phase_status","upload_contract"),r.append("jobPos",s==null?void 0:s.jobPos),r.append("salary",s==null?void 0:s.salary),r.append("app_id",l==null?void 0:l.app_id),r.append("fname",l==null?void 0:l.fname),r.append("lname",l==null?void 0:l.lname),r.append("email",l==null?void 0:l.email);try{await h.dispatch(b(r)),t(!1),c.success("File Uploaded")}catch{c.error("There was an error uploading the file!"),t(!1)}}return console.log("jo",s),e.jsx("div",{children:e.jsx("div",{className:"h-screen overflow-hidden",children:e.jsx("div",{className:"bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll",children:e.jsx("div",{className:"container mx-auto flex justify-center",children:e.jsxs("div",{className:"bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-60",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex text-2xl items-center justify-center",children:e.jsx("h1",{children:e.jsx("b",{children:"VIRTUAL CONTRACT SIGNING"})})}),e.jsxs("form",{className:"border rounded-lg p-3.5",onSubmit:n,children:[e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("div",{className:"flex flex-1 gap-3",children:e.jsx("input",{value:l==null?void 0:l.app_id,type:"text",placeholder:"Application No",className:"border p-2 rounded w-full"})})]}),e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Full Name"})}),e.jsxs("div",{className:"flex flex-1 gap-3",children:[e.jsx("input",{type:"text",value:l==null?void 0:l.fname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.mname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.lname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.suffix,className:"border p-2 rounded w-1/5"})]})]})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Email"})}),e.jsx("input",{type:"email",value:l==null?void 0:l.email,className:"border p-2 rounded w-full"})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Job Position"})}),e.jsx("input",{type:"text",value:s==null?void 0:s.jobPos,className:"border p-2 rounded w-full"})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Salary"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",value:s==null?void 0:s.salary,className:"border pl-5 p-2 rounded w-full",readOnly:!0})]})]})]}),e.jsx(j,{uploadedFile:u,setFile:f,setUploadedFile:x}),e.jsx("div",{className:"flex mt-4",children:e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${o?"cursor-not-allowed opacity-75":""}`,onClick:n,disabled:o,children:[o?e.jsx(N,{spin:!0}):e.jsx(v,{}),o?" SENDING...":" UPLOAD CONTRACT"]})})]})]})})})})})}export{$ as default};