import{b as p,r as i,j as e,c as h}from"./app-3fef3a63.js";import j from"./upload-contract-section-fe828bc2.js";import{a as b}from"./applicant-thunk-a417e30b.js";import{m as c}from"./index-17ede4fa.js";import{L as N}from"./LoadingOutlined-285e92e4.js";import{F as v}from"./FileJpgOutlined-5d52b4f1.js";import"./XMarkIcon-aa32d8ac.js";import"./FilePdfOutlined-627fb646.js";import"./presets-ca4e9e1b.js";import"./AntdIcon-f6a6858b.js";import"./applicant-record-service-1b34d276.js";import"./index-aee74163.js";import"./render-06651440.js";import"./asyncToGenerator-d91032a9.js";import"./CheckCircleFilled-ae4c12ba.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./KeyCode-dba4fb16.js";import"./pickAttrs-0272306c.js";import"./useZIndex-0bbceadc.js";import"./CloseOutlined-cc20978d.js";function q(){var m;const{applicant:l}=p(o=>o.final_rate),[a,t]=i.useState(!1),[u,x]=i.useState(null),[d,f]=i.useState(null),s=(m=l==null?void 0:l.joboffer)==null?void 0:m.find(o=>o.status=="Contract Signing");console.log("file",d);async function n(o){o.preventDefault(),t(!0);const r=new FormData;r.append("file",d),r.append("phase_status","upload_contract"),r.append("jobPos",s==null?void 0:s.jobPos),r.append("salary",s==null?void 0:s.salary),r.append("app_id",l==null?void 0:l.app_id),r.append("fname",l==null?void 0:l.fname),r.append("lname",l==null?void 0:l.lname),r.append("email",l==null?void 0:l.email);try{await h.dispatch(b(r)),t(!1),c.success("File Uploaded")}catch{c.error("There was an error uploading the file!"),t(!1)}}return console.log("jo",s),e.jsx("div",{children:e.jsx("div",{className:"h-screen overflow-hidden",children:e.jsx("div",{className:"bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll",children:e.jsx("div",{className:"container mx-auto flex justify-center",children:e.jsxs("div",{className:"bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-60",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex text-2xl items-center justify-center",children:e.jsx("h1",{children:e.jsx("b",{children:"VIRTUAL CONTRACT SIGNING"})})}),e.jsxs("form",{className:"border rounded-lg p-3.5",onSubmit:n,children:[e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("div",{className:"flex flex-1 gap-3",children:e.jsx("input",{value:l==null?void 0:l.app_id,type:"text",placeholder:"Application No",className:"border p-2 rounded w-full"})})]}),e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsxs("div",{className:"flex flex-col w-full mb-4",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Full Name"})}),e.jsxs("div",{className:"flex flex-1 gap-3",children:[e.jsx("input",{type:"text",value:l==null?void 0:l.fname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.mname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.lname,className:"border p-2 rounded w-full"}),e.jsx("input",{type:"text",value:l==null?void 0:l.suffix,className:"border p-2 rounded w-1/5"})]})]})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Email"})}),e.jsx("input",{type:"email",value:l==null?void 0:l.email,className:"border p-2 rounded w-full"})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Job Position"})}),e.jsx("input",{type:"text",value:s==null?void 0:s.jobPos,className:"border p-2 rounded w-full"})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Salary"})}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2",children:"₱"}),e.jsx("input",{type:"number",value:s==null?void 0:s.salary,className:"border pl-5 p-2 rounded w-full",readOnly:!0})]})]})]}),e.jsx(j,{uploadedFile:u,setFile:f,setUploadedFile:x}),e.jsx("div",{className:"flex mt-4",children:e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${a?"cursor-not-allowed opacity-75":""}`,onClick:n,disabled:a,children:[a?e.jsx(N,{spin:!0}):e.jsx(v,{}),a?" SENDING...":" UPLOAD CONTRACT"]})})]})]})})})})})}export{q as default};