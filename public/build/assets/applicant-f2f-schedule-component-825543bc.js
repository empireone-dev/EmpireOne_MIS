import{r as d,b as x,j as e,e as p}from"./app-7d68ca85.js";import{s as b,g}from"./applicant-thunk-f9d6d8dd.js";import{M as h}from"./index-c093f7be.js";import{m}from"./index-ef610335.js";import{L as y}from"./render-1607753e.js";import{C as j}from"./CheckCircleFilled-e7ef87be.js";import"./applicant-record-service-0b284e04.js";import"./index-2eb55d07.js";import"./presets-a105bbc6.js";import"./CloseCircleFilled-f459e844.js";import"./AntdIcon-9cfc0218.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./asyncToGenerator-ddb06381.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";function V({open:u,setOpen:o,data:r,status:t,setOpenDialog:f}){const[i,a]=d.useState(!1),[s,n]=d.useState({ifftime:"",iffdate:""});x(l=>l.applicants);async function c(l){l.preventDefault(),a(!0);try{await p.dispatch(b({...r,ifftime:s.ifftime,iffdate:s.iffdate,phase_status:t})),p.dispatch(g()),a(!1),o(!1),f(!1),m.success("Email sent successfully")}catch{m.error("There was an error sending the email!"),a(!1)}}return e.jsx("div",{children:e.jsxs(h,{title:`Schedule for ${t} Interview (Face to face Interview)`,centered:!0,visible:u,width:900,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5"}),e.jsx("div",{className:"flex justify-end mt-1.5",children:e.jsxs("h1",{children:[e.jsx("b",{children:"Status:"})," (",t,")"]})}),e.jsxs("form",{onSubmit:c,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{value:r==null?void 0:r.app_id,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Applicant's Name"}),e.jsx("input",{value:`${r.fname} ${r.mname} ${r.lname}`,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Email Address"}),e.jsx("input",{value:r==null?void 0:r.email,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"email",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Contact No."}),e.jsx("input",{value:r==null?void 0:r.phone,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsxs("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:["Schedule date for ",t]}),e.jsx("input",{onChange:l=>n({...s,iffdate:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"date",placeholder:"",required:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsxs("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:["Schedule time for ",t]}),e.jsx("input",{onChange:l=>n({...s,ifftime:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"time",placeholder:"",required:!0})]})]})]}),e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${i?"cursor-not-allowed opacity-75":""}`,onClick:c,disabled:i,children:[i?e.jsx(y,{spin:!0}):e.jsx(j,{}),i?" SENDING...":" CONFIRM"]})]})]})})}export{V as default};