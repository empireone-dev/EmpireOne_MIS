import{b as j,r as d,j as e,c as f}from"./app-62b5ebaa.js";import{a as w}from"./hiring-thunk-cb59c41a.js";import{g as y}from"./applicant-thunk-8838bb69.js";import{M as N}from"./index-c27c4d05.js";import{M as v}from"./index-055ee658.js";import{B as k}from"./BriefcaseIcon-a2e16c89.js";import{m as A}from"./index-5562dec6.js";import{L as O}from"./LoadingOutlined-6e2cb589.js";import"./job-offer-service-e36a0fac.js";import"./applicant-record-service-b92bdd46.js";import"./presets-463863c6.js";import"./index-408febe5.js";import"./index-a8bad4b0.js";import"./useId-8a7e6d05.js";import"./useZIndex-23e93c6a.js";import"./useSize-35d6e2ee.js";import"./AntdIcon-d5231a29.js";import"./Compact-914b018d.js";import"./ContextIsolator-af1fcc42.js";import"./asyncToGenerator-b4664d6d.js";import"./LeftOutlined-cbb65ec1.js";import"./collapse-97de76d4.js";import"./render-c5e68dcb.js";import"./CheckCircleFilled-bd23b91f.js";import"./CloseCircleFilled-15fc6c63.js";import"./InfoCircleFilled-fb1cc4b6.js";import"./button-4ffb358a.js";import"./CloseOutlined-69cfb2a4.js";import"./index-0b644e77.js";import"./pickAttrs-c39b57d6.js";import"./useClosable-19de31a3.js";import"./useLocale-a93b4d95.js";import"./PurePanel-7c150b65.js";function ne({data:a,item:p}){var m;const{job_positions:n}=j(o=>o.job_positions),[r,s]=d.useState({allowance:0}),[b,t]=d.useState(!1),[i,c]=d.useState(!1);function g(o){t(!0)}async function u(o){o.preventDefault(),c(!0);try{await f.dispatch(w({...r,...a,status:"Pending"})),await f.dispatch(y()),A.success("Job Offer already sent!"),t(!1),c(!1)}catch{c(!1)}}return console.log("job_positions",n),e.jsxs(e.Fragment,{children:[e.jsx(N.Item,{onClick:()=>g(),icon:p.icon,children:p.label}),e.jsxs(v,{title:"Job Offer",centered:!0,visible:b,width:900,onOk:()=>{t(!1)},onCancel:()=>t(!1),footer:null,children:[e.jsx("li",{className:"bg-gray-300 h-0.5"}),e.jsxs("form",{onSubmit:u,className:"w-full h-full mt-3.5",children:[e.jsxs("div",{className:"flex flex-col -mx-3 mb-3",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1",for:"grid-text",children:"Application No."}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"number",placeholder:"",value:a.app_id,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Firstname"}),e.jsx("input",{value:a.fname,className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Middlename"}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",value:a.mname,placeholder:"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Lastname"}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",value:a.lname,type:"text",placeholder:"",readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Job Position"}),e.jsxs("select",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",name:"",id:"",onChange:o=>{var x;const l=n.find(h=>h.jPosition===o.target.value);s({...r,outsourcing_erf:{...r.outsourcing_erf,department:((x=l==null?void 0:l.outsourcing_erf)==null?void 0:x.department)||""},salary:(l==null?void 0:l.salary)||"",jobPos:(l==null?void 0:l.jPosition)||o.target.value})},children:[e.jsx("option",{selected:!0,disabled:!0}),n.map((o,l)=>e.jsx("option",{id:o.salary,value:o.jPosition,children:o.jPosition},l))]}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0,value:((m=r==null?void 0:r.outsourcing_erf)==null?void 0:m.department)??""})]}),e.jsxs("div",{className:"w-3/5 px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Salary Offer"}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",readOnly:!0,value:(r==null?void 0:r.salary)??""})]}),e.jsxs("div",{className:"w-3/5 px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Allowance"}),e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",name:"allowance",onChange:o=>s({...r,[o.target.name]:o.target.value})})]}),e.jsxs("div",{className:"w-full px-2.5",children:[e.jsx("label",{className:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Type of Allowance"}),e.jsxs("select",{onChange:o=>s({...r,[o.target.name]:o.target.value}),className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",name:"typea",id:"",children:[e.jsx("option",{}),e.jsx("option",{value:"Program Allowance",children:"Program Allowance"}),e.jsx("option",{value:"Rice and Meal Allowance",children:"Rice and Meal Allowance"}),e.jsx("option",{value:"Communication Allowance",children:"Communication Allowance"}),e.jsx("option",{value:"Skill Allowance",children:"Skill Allowance"}),e.jsx("option",{value:"Interim Allowance",children:"Interim Allowance"}),e.jsx("option",{value:"Transportation Allowance",children:"Transportation Allowance"}),e.jsx("option",{value:"Travel Allowance",children:"Travel Allowance"}),e.jsx("option",{value:"Clothing Allowance",children:"Clothing Allowance"})]})]})]})]}),e.jsx("button",{onClick:u,type:"submit",disabled:i,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full",children:e.jsxs("div",{className:"flex flex-1 items-center justify-center",children:[i?e.jsx(O,{spin:!0}):e.jsx(k,{className:"h-6 mr-1"}),"  ",i?" SENDING...":" SEND JOB OFFER"]})})]})]})]})}export{ne as default};