import{r as n,j as e,e as m}from"./app-7d68ca85.js";import{u as w,g as v}from"./employee-section-thunk-3c12617d.js";import{M as k}from"./index-97491272.js";import{M as O}from"./index-c093f7be.js";import{m as d}from"./index-ef610335.js";import"./employee-service-837a4628.js";import"./applicant-final-service-912b1e89.js";import"./presets-a105bbc6.js";import"./index-2eb55d07.js";import"./index-1d086a91.js";import"./useId-ccfb42d5.js";import"./useZIndex-2e09f723.js";import"./useSize-69609da4.js";import"./AntdIcon-9cfc0218.js";import"./Compact-b3700746.js";import"./ContextIsolator-b1720554.js";import"./asyncToGenerator-ddb06381.js";import"./KeyCode-7f5cb5e5.js";import"./LeftOutlined-72133fab.js";import"./collapse-97de76d4.js";import"./render-1607753e.js";import"./CheckCircleFilled-e7ef87be.js";import"./CloseCircleFilled-f459e844.js";import"./InfoCircleFilled-38415a9a.js";import"./button-30820779.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";function oe({data:l,item:i}){var p,u,a,x,b;const[f,s]=n.useState(!1),[r,g]=n.useState({id:l==null?void 0:l.id,status:l==null?void 0:l.status}),[h,t]=n.useState(!1);function y(o){s(!0)}async function c(o){o.preventDefault(),t(!0);try{await m.dispatch(w(r)),await m.dispatch(v()),d.success("Updated Successfully"),s(!1)}catch(j){d.error(j.message||"Error updating changes")}finally{t(!1)}}return console.log("data",l),e.jsxs(e.Fragment,{children:[e.jsx(k.Item,{onClick:()=>y(),icon:i.icon,children:i.label}),e.jsx(O,{title:"Employee Status",centered:!0,visible:f,onOk:c,onCancel:()=>s(!1),confirmLoading:h,width:1e3,okText:"Update",cancelText:"Cancel",children:e.jsx("form",{class:"w-full h-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-col -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee's Name"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${(p=l==null?void 0:l.applicant)==null?void 0:p.fname} ${(u=l==null?void 0:l.applicant)==null?void 0:u.mname} ${(a=l==null?void 0:l.applicant)==null?void 0:a.lname}`,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee No."}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.emp_id,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"job Position"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.position,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Department"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.dept,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsxs("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:["Account ",e.jsx("i",{children:"(If Applicable)"})]}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.account,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Supervisor"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${((x=l==null?void 0:l.user)==null?void 0:x.employee_fname)||""} ${((b=l==null?void 0:l.user)==null?void 0:b.employee_lname)||""}`,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"EOGS Email"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"email",value:l==null?void 0:l.eogs,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Status"}),e.jsxs("select",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:r==null?void 0:r.status,name:"employmentStatus",onChange:o=>g({...r,status:o.target.value}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select status"}),e.jsx("option",{value:"Probationary",children:"Probationary"}),e.jsx("option",{value:"Extended Probationary",children:"Extended Probationary"}),e.jsx("option",{value:"EOPE",children:"End of Probationary Employment"}),e.jsx("option",{value:"Regular",children:"Regular"}),e.jsx("option",{value:"Terminated",children:"Terminated"}),e.jsx("option",{value:"Dismissed",children:"Dismissed"}),e.jsx("option",{value:"AWOL",children:"AWOL"}),e.jsx("option",{value:"Resigned",children:"Resigned"})]})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Hired Date"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.hired,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Date of Regularization"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:(l==null?void 0:l.due)??"",readOnly:!0})]})]})]})})})]})}export{oe as default};