import{r as n,j as e,e as x}from"./app-12dd3627.js";import{s as b}from"./applicant-thunk-b05f4ea7.js";import{M as h}from"./index-d368cae6.js";import{m as f}from"./index-8ae8737d.js";import{L as y}from"./render-a458bafb.js";import{C as j}from"./CheckCircleFilled-f633c792.js";import"./applicant-record-service-bc53da68.js";import"./index-4e0ea6ca.js";import"./presets-2db74b6f.js";import"./CloseCircleFilled-aa5e31c4.js";import"./AntdIcon-8b25e930.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./button-aae57988.js";import"./Compact-9e968cf1.js";import"./useSize-ccd2c154.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./asyncToGenerator-318e6964.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";function V({data:r,setOpen:c}){var p;const[m,i]=n.useState(!1),[s,a]=n.useState(!1),[o,d]=n.useState({ifftime:"",iffdate:""});r.joboffer.find(l=>l.status=="Accepted");const t=(p=r==null?void 0:r.joboffer)==null?void 0:p.find(l=>l.status=="Contract Signing");async function u(l){l.preventDefault(),a(!0);try{await x.dispatch(b({...r,...t,ifftime:o.ifftime,iffdate:o.iffdate,phase_status:"physical_contract_signing"})),await f.success("Email sent successfully"),a(!1),c(!1),i(!1)}catch(g){console.log("error",g),f.error("There was an error sending the email!"),a(!1)}}return e.jsxs("div",{className:"flex w-full items-center justify-center",children:[e.jsx("button",{onClick:()=>{i(!0),c(!1)},className:"bg-blue-500 w-full rounded-md text-white hover:bg-blue-600 p-1.5",children:"Physical Contract Signing"}),e.jsxs(h,{title:"Contract Signing (Physical Contract Signing)",centered:!0,visible:m,width:900,onOk:()=>{i(!1)},onCancel:()=>i(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5 mb-3"}),e.jsxs("form",{onSubmit:u,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{value:r==null?void 0:r.app_id,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",readOnly:!0})]}),e.jsx("div",{className:"flex flex-1",children:e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Applicant's Name"}),e.jsx("input",{value:`${r.fname} ${r.mname} ${r.lname}`,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Email Address"}),e.jsx("input",{value:r==null?void 0:r.email,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"email",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Position"}),e.jsx("input",{value:t==null?void 0:t.jobPos,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Salary"}),e.jsx("input",{value:t==null?void 0:t.salary,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{className:" flex",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Schedule date for Contract Signing"}),e.jsx("input",{onChange:l=>d({...o,iffdate:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"date",placeholder:"",required:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Schedule time for Contract Signing"}),e.jsx("input",{onChange:l=>d({...o,ifftime:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"time",placeholder:"",required:!0})]})]})]}),e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${s?"cursor-not-allowed opacity-75":""}`,onClick:u,disabled:s,children:[s?e.jsx(y,{spin:!0}):e.jsx(j,{}),s?" SENDING...":" CONFIRM"]})]})]})]})}export{V as default};