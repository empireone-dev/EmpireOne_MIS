import{H as f,b as p,u as h,r as m,I as u,j as e,c as j}from"./app-63d290ed.js";import b from"./teamwork-section-caa21429.js";import _ from"./problem-solving-section-0c7a8f31.js";import v from"./customer-service-section-d01f4cdb.js";import y from"./guide-question-section-8fce3ba3.js";import{a as g}from"./applicant-record-service-5b999d79.js";import{L as N}from"./LoadingOutlined-8390b05c.js";import{C as w}from"./CheckCircleFilled-a9217836.js";async function S(s){return(await axios.post("/api/initial_rate",s)).data}function M(s){return async function(t,r){const i=await g(s);t(f.actions.setApplicant(i.status))}}function I(s){return async function(t,r){await S(s)}}function E({data:s}){const{initialRate:t,applicant:r}=p(a=>a.initial_rate),i=window.location.pathname.split("/")[3],{user:l}=p(a=>a.app),o=h(),[n,c]=m.useState(!1);m.useEffect(()=>{o(u({...t,interviewer:(l==null?void 0:l.employee_fname)+" "+(l==null?void 0:l.employee_lname),int_id:l.id,app_id:i,oavg:(parseInt(t.tscore??0)+parseInt(t.pscore??0)+parseInt(t.cscore??0))/3}))},[t==null?void 0:t.tscore,t==null?void 0:t.pscore,t==null?void 0:t.cscore,l==null?void 0:l.employee_fname]);function x(a){o(u({...t,[a.target.name]:a.target.value}))}async function d(a){a.preventDefault(),c(!0),await j.dispatch(I(t)),c(!1)}return e.jsxs("div",{className:"font-sans",children:[e.jsx("div",{className:"flex text-xl items-center justify-center mb-1",children:e.jsx("h1",{children:e.jsx("b",{children:"Initial Rating Scale"})})}),e.jsxs("form",{onSubmit:d,className:"border rounded-lg p-3.5",children:[e.jsxs("div",{className:"flex flex-1 gap-3.5",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("input",{type:"number",value:r.app_id??"",placeholder:"",className:"border p-2 rounded w-full",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Applicant's Name"})}),e.jsx("input",{type:"text",value:r.fname+" "+r.lname,placeholder:"",className:"border p-2 rounded w-full",readOnly:!0})]})]}),e.jsx(b,{}),e.jsx(_,{}),e.jsx(v,{}),e.jsx(y,{}),e.jsxs("div",{className:"flex flex-col w-full mt-3",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"OVERALL RESULT"})}),e.jsx("input",{type:"number",value:t.oavg??0,name:"ini_overall_r",placeholder:"",className:"border p-2 rounded w-full mt-1",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full mt-5",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"INITIAL PHASE INTERVIEWER"})}),e.jsx("input",{type:"text",value:(t==null?void 0:t.interviewer)??"",placeholder:"",className:"border p-2 rounded w-full mt-1",readOnly:!0})]}),e.jsxs("div",{className:"mt-5",children:[e.jsx("label",{children:e.jsx("b",{children:"OVERALL COMMENT"})}),e.jsx("textarea",{placeholder:"",name:"ocomment",onChange:x,className:"border p-2 rounded w-full mt-1 h-40"})]}),e.jsx("div",{className:"flex justify-end mt-3.5",children:e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${n?"cursor-not-allowed opacity-75":""}`,onClick:d,disabled:n,children:[n?e.jsx(N,{spin:!0}):e.jsx(w,{}),n?" Loading...":" CONFIRM"]})})]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));export{E as I,M as g,P as i};