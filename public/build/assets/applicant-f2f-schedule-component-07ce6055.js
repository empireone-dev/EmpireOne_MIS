import{r as d,b as x,j as e,c as p}from"./app-5903bcdc.js";import{s as b,g}from"./applicant-thunk-33914611.js";import{M as h}from"./index-e44f7e7f.js";import{m}from"./index-ea69266b.js";import{L as y}from"./render-4b6d5da1.js";import{C as j}from"./CheckCircleFilled-f83f15df.js";import"./applicant-record-service-655b693d.js";import"./index-a2a66e96.js";import"./presets-ac6d2c0f.js";import"./CloseCircleFilled-697206b5.js";import"./AntdIcon-567c410e.js";import"./InfoCircleFilled-e5724796.js";import"./useZIndex-79d8cff9.js";import"./useId-6966ca54.js";import"./button-d3ea38b4.js";import"./Compact-1e3d859e.js";import"./useSize-d214a582.js";import"./CloseOutlined-e89cbee7.js";import"./index-fc78c6ec.js";import"./KeyCode-8bfe2c69.js";import"./pickAttrs-436cebda.js";import"./fade-8c83fca4.js";import"./ContextIsolator-7d8b47d5.js";import"./asyncToGenerator-71d13e75.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";function V({open:u,setOpen:o,data:r,status:t,setOpenDialog:f}){const[i,a]=d.useState(!1),[s,n]=d.useState({ifftime:"",iffdate:""});x(l=>l.applicants);async function c(l){l.preventDefault(),a(!0);try{await p.dispatch(b({...r,ifftime:s.ifftime,iffdate:s.iffdate,phase_status:t})),p.dispatch(g()),a(!1),o(!1),f(!1),m.success("Email sent successfully")}catch{m.error("There was an error sending the email!"),a(!1)}}return e.jsx("div",{children:e.jsxs(h,{title:`Schedule for ${t} Interview (Face to face Interview)`,centered:!0,visible:u,width:900,onOk:()=>{o(!1)},onCancel:()=>o(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5"}),e.jsx("div",{className:"flex justify-end mt-1.5",children:e.jsxs("h1",{children:[e.jsx("b",{children:"Status:"})," (",t,")"]})}),e.jsxs("form",{onSubmit:c,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{value:r==null?void 0:r.app_id,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Applicant's Name"}),e.jsx("input",{value:`${r.fname} ${r.mname} ${r.lname}`,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Email Address"}),e.jsx("input",{value:r==null?void 0:r.email,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"email",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Contact No."}),e.jsx("input",{value:r==null?void 0:r.phone,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsxs("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:["Schedule date for ",t]}),e.jsx("input",{onChange:l=>n({...s,iffdate:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"date",placeholder:"",required:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsxs("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:["Schedule time for ",t]}),e.jsx("input",{onChange:l=>n({...s,ifftime:l.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"time",placeholder:"",required:!0})]})]})]}),e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${i?"cursor-not-allowed opacity-75":""}`,onClick:c,disabled:i,children:[i?e.jsx(y,{spin:!0}):e.jsx(j,{}),i?" SENDING...":" CONFIRM"]})]})]})})}export{V as default};