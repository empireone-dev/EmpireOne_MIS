import{r as n,j as e,c as d}from"./app-3fef3a63.js";import{u as y,g as j}from"./employee-section-thunk-fc46d25f.js";import{M as w}from"./index-1bbc017a.js";import{M as v}from"./index-b28d3991.js";import{m as x}from"./index-17ede4fa.js";import"./employee-service-85c26b68.js";import"./applicant-final-service-912b1e89.js";import"./presets-ca4e9e1b.js";import"./index-aee74163.js";import"./index-8215846e.js";import"./useId-486ac681.js";import"./useZIndex-0bbceadc.js";import"./useSize-d7041e64.js";import"./AntdIcon-f6a6858b.js";import"./Compact-7f0d1344.js";import"./ContextIsolator-7f0f291f.js";import"./asyncToGenerator-d91032a9.js";import"./KeyCode-dba4fb16.js";import"./LeftOutlined-697ba1d8.js";import"./collapse-97de76d4.js";import"./render-06651440.js";import"./CheckCircleFilled-ae4c12ba.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./button-7a476b2b.js";import"./LoadingOutlined-285e92e4.js";import"./CloseOutlined-cc20978d.js";import"./index-067d7e3e.js";import"./pickAttrs-0272306c.js";import"./fade-fce3c8f0.js";import"./useClosable-e3f3eb25.js";import"./useLocale-d278345a.js";import"./PurePanel-06125fb1.js";function re({data:l,item:i}){var p,u,a;const[b,o]=n.useState(!1),[r,m]=n.useState({id:l==null?void 0:l.id,status:l==null?void 0:l.status}),[f,t]=n.useState(!1);function g(s){o(!0)}async function c(s){s.preventDefault(),t(!0);try{await d.dispatch(y(r)),await d.dispatch(j()),x.success("Updated Successfully"),o(!1)}catch(h){x.error(h.message||"Error updating changes")}finally{t(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(w.Item,{onClick:()=>g(),icon:i.icon,children:i.label}),e.jsx(v,{title:"Employee Status",centered:!0,visible:b,onOk:c,onCancel:()=>o(!1),confirmLoading:f,width:1e3,okText:"Update",cancelText:"Cancel",children:e.jsx("form",{class:"w-full h-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-col -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee's Name"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${(p=l==null?void 0:l.applicant)==null?void 0:p.fname} ${(u=l==null?void 0:l.applicant)==null?void 0:u.mname} ${(a=l==null?void 0:l.applicant)==null?void 0:a.lname}`,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee No."}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.emp_id,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"job Position"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.position,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Department"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.dept,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsxs("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:["Account ",e.jsx("i",{children:"(If Applicable)"})]}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.account,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Supervisor"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.sup_id,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"EOGS Email"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"email",value:l==null?void 0:l.eogs,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Status"}),e.jsxs("select",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:r==null?void 0:r.status,name:"employmentStatus",onChange:s=>m({...r,status:s.target.value}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select status"}),e.jsx("option",{value:"Probationary",children:"Probationary"}),e.jsx("option",{value:"Extended Probationary",children:"Extended Probationary"}),e.jsx("option",{value:"EOPE",children:"End of Probationary Employment"}),e.jsx("option",{value:"Regular",children:"Regular"}),e.jsx("option",{value:"Terminated",children:"Terminated"}),e.jsx("option",{value:"Dismissed",children:"Dismissed"}),e.jsx("option",{value:"AWOL",children:"AWOL"}),e.jsx("option",{value:"Resigned",children:"Resigned"})]})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Hired Date"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.hired,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Date of Regularization"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:(l==null?void 0:l.due)??"",readOnly:!0})]})]})]})})})]})}export{re as default};