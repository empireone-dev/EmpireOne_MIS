import{r as n,j as e,e as x}from"./app-7d68ca85.js";import{s as b}from"./applicant-thunk-f9d6d8dd.js";import{M as h}from"./index-c093f7be.js";import{m as f}from"./index-ef610335.js";import{L as y}from"./render-1607753e.js";import{C as j}from"./CheckCircleFilled-e7ef87be.js";import"./applicant-record-service-0b284e04.js";import"./index-2eb55d07.js";import"./presets-a105bbc6.js";import"./CloseCircleFilled-f459e844.js";import"./AntdIcon-9cfc0218.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./asyncToGenerator-ddb06381.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";function V({data:r,setOpen:c}){var p;const[m,i]=n.useState(!1),[s,a]=n.useState(!1),[o,d]=n.useState({ifftime:"",iffdate:""});r.joboffer.find(l=>l.status=="Accepted");const t=(p=r==null?void 0:r.joboffer)==null?void 0:p.find(l=>l.status=="Contract Signing");async function u(l){l.preventDefault(),a(!0);try{await x.dispatch(b({...r,...t,ifftime:o.ifftime,iffdate:o.iffdate,phase_status:"physical_contract_signing"})),await f.success("Email sent successfully"),a(!1),c(!1),i(!1)}catch(g){console.log("error",g),f.error("There was an error sending the email!"),a(!1)}}return e.jsxs("div",{className:"flex w-full items-center justify-center",children:[e.jsx("button",{onClick:()=>{i(!0),c(!1)},className:"bg-blue-500 w-full rounded-md text-white hover:bg-blue-600 p-1.5",children:"Physical Contract Signing"}),e.jsxs(h,{title:"Contract Signing (Physical Contract Signing)",centered:!0,visible:m,width:900,onOk:()=>{i(!1)},onCancel:()=>i(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5 mb-3"}),e.jsxs("form",{onSubmit:u,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{value:r==null?void 0:r.app_id,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",readOnly:!0})]}),e.jsx("div",{className:"flex flex-1",children:e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Applicant's Name"}),e.jsx("input",{value:`${r.fname} ${r.mname} ${r.lname}`,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Email Address"}),e.jsx("input",{value:r==null?void 0:r.email,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"email",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Position"}),e.jsx("input",{value:t==null?void 0:t.jobPos,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Salary"}),e.jsx("input",{value:t==null?void 0:t.salary,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{className:" flex",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Schedule date for Contract Signing"}),e.jsx("input",{onChange:l=>d({...o,iffdate:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"date",placeholder:"",required:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Schedule time for Contract Signing"}),e.jsx("input",{onChange:l=>d({...o,ifftime:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"time",placeholder:"",required:!0})]})]})]}),e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${s?"cursor-not-allowed opacity-75":""}`,onClick:u,disabled:s,children:[s?e.jsx(y,{spin:!0}):e.jsx(j,{}),s?" SENDING...":" CONFIRM"]})]})]})]})}export{V as default};