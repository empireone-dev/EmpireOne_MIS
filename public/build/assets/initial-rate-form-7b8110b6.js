import{H as f,b as p,u as h,r as m,I as u,j as e,c as j,y as b}from"./app-a38c20d9.js";import _ from"./teamwork-section-2ee5f96a.js";import v from"./problem-solving-section-4dab8b89.js";import y from"./customer-service-section-a958d69b.js";import g from"./guide-question-section-38e3d016.js";import{b as w}from"./applicant-record-service-b22d0a78.js";import{m as N}from"./index-cec043e3.js";import{L as S}from"./render-85b81fbb.js";import{C as I}from"./CheckCircleFilled-ab80464f.js";async function E(s){return(await axios.post("/api/initial_rate",s)).data}function D(s){return async function(t,r){const n=await w(s);t(f.actions.setApplicant(n.status))}}function O(s){return async function(t,r){await E(s)}}function L({data:s}){const{initialRate:t,applicant:r}=p(l=>l.initial_rate),n=window.location.pathname.split("/")[3],{user:a}=p(l=>l.app),o=h(),[i,c]=m.useState(!1);m.useEffect(()=>{o(u({...t,interviewer:(a==null?void 0:a.employee_fname)+" "+(a==null?void 0:a.employee_lname),int_id:a.id,app_id:n,oavg:(parseInt(t.tscore??0)+parseInt(t.pscore??0)+parseInt(t.cscore??0))/3}))},[t==null?void 0:t.tscore,t==null?void 0:t.pscore,t==null?void 0:t.cscore,a==null?void 0:a.employee_fname]);function x(l){o(u({...t,[l.target.name]:l.target.value}))}async function d(l){l.preventDefault(),c(!0),await j.dispatch(O(t)),await N.success("Applicant successfully rated"),b.visit("/admin/recruitment/applicant_records?searching="+n),c(!1)}return e.jsxs("div",{className:"font-sans",children:[e.jsx("div",{className:"flex text-xl items-center justify-center mb-1",children:e.jsx("h1",{children:e.jsx("b",{children:"Initial Rating Scale"})})}),e.jsxs("form",{onSubmit:d,className:"border rounded-lg p-3.5",children:[e.jsxs("div",{className:"flex flex-1 gap-3.5",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Application No."})}),e.jsx("input",{type:"number",value:r.app_id??"",placeholder:"",className:"border p-2 rounded w-full",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Applicant's Name"})}),e.jsx("input",{type:"text",value:r.fname+" "+r.lname,placeholder:"",className:"border p-2 rounded w-full",readOnly:!0})]})]}),e.jsx(_,{}),e.jsx(v,{}),e.jsx(y,{}),e.jsx(g,{}),e.jsxs("div",{className:"flex flex-col w-full mt-3",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"OVERALL RESULT"})}),e.jsx("input",{type:"number",value:t.oavg??0,name:"ini_overall_r",placeholder:"",className:"border p-2 rounded w-full mt-1",readOnly:!0})]}),e.jsxs("div",{className:"flex flex-col w-full mt-5",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"INITIAL PHASE INTERVIEWER"})}),e.jsx("input",{type:"text",value:(t==null?void 0:t.interviewer)??"",placeholder:"",className:"border p-2 rounded w-full mt-1",readOnly:!0})]}),e.jsxs("div",{className:"mt-5",children:[e.jsx("label",{children:e.jsx("b",{children:"OVERALL COMMENT"})}),e.jsx("textarea",{placeholder:"",name:"ocomment",onChange:x,className:"border p-2 rounded w-full mt-1 h-40"})]}),e.jsx("div",{className:"flex justify-end mt-3.5",children:e.jsxs("button",{type:"submit",className:`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${i?"cursor-not-allowed opacity-75":""}`,onClick:d,disabled:i,children:[i?e.jsx(S,{spin:!0}):e.jsx(I,{}),i?" Loading...":" CONFIRM"]})})]})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));export{L as I,D as g,H as i};