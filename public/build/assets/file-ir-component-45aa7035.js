import{b as g,r as s,j as e,c as h}from"./app-a38c20d9.js";import{c as j}from"./employee-section-thunk-a9780fc0.js";import y from"./upload-file-ir-section-cf080228.js";import{M as w}from"./index-d6006951.js";import{M as k}from"./index-9d513160.js";import"./employee-service-b10bede7.js";import"./applicant-final-service-912b1e89.js";import"./moment-a9aaa855.js";import"./index-3066bc1f.js";import"./presets-490ebc63.js";import"./AntdIcon-13630a05.js";import"./index-227a9330.js";import"./asyncToGenerator-0b1de8dc.js";import"./pickAttrs-9206db1b.js";import"./useId-cb27096a.js";import"./useZIndex-e5bae908.js";import"./collapse-97de76d4.js";import"./fade-de3a406c.js";import"./render-85b81fbb.js";import"./Compact-784794a1.js";import"./useSize-b76cc852.js";import"./useForceUpdate-b47cc207.js";import"./button-17307643.js";import"./DeleteOutlined-4ac8cdad.js";import"./EyeOutlined-d8762945.js";import"./CheckCircleFilled-ab80464f.js";import"./CheckOutlined-a928eb33.js";import"./CloseCircleFilled-f6bebab3.js";import"./CloseOutlined-f995126c.js";import"./index-0b3a26a0.js";import"./ContextIsolator-4898b4fd.js";import"./useLocale-07fc7437.js";import"./KeyCode-aaf7665e.js";import"./LeftOutlined-3156f812.js";import"./InfoCircleFilled-59d04494.js";import"./index-6d9fa839.js";import"./useClosable-89a8d2ae.js";import"./PurePanel-5ba12f79.js";function ce({data:r,item:i}){var p,a,d;const{user:o}=g(l=>l.app),[n,m]=s.useState({}),[x,c]=s.useState(!1),[u,t]=s.useState(!1);function f(l){c(!0)}async function b(l){t(!0);try{await h.dispatch(j({...n,...r==null?void 0:r.applicant,emp_id:r==null?void 0:r.applicant.app_id,filedby:o.id})),t(!1)}catch{t(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(w.Item,{onClick:()=>f(),icon:i.icon,children:i.label}),e.jsx(k,{title:"",confirmLoading:u,visible:x,onOk:()=>b(),onCancel:()=>c(!1),width:1e3,okText:"GENERATE INCIDENT REPORT",cancelText:"CANCEL",children:e.jsx("form",{class:"w-full h-full",children:e.jsxs("div",{class:"flex flex-col -mx-3",children:[e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("h1",{className:"text-xl",children:e.jsx("b",{children:"INCIDENT REPORT"})})}),e.jsx("hr",{}),e.jsxs("div",{className:"flex flex-1 mt-2",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Date of Incident"}),e.jsx("input",{onChange:l=>m({...n,doi:l.target.value}),class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"date",placeholder:""})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Time of Incident"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"time",placeholder:""})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Employee Involved"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${(p=r==null?void 0:r.applicant)==null?void 0:p.fname} ${(a=r==null?void 0:r.applicant)==null?void 0:a.mname} ${(d=r==null?void 0:r.applicant)==null?void 0:d.lname}`,readOnly:!0})]})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Incident Subject"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",placeholder:"",readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Incident Summary"}),e.jsx("textarea",{class:"appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",placeholder:""})]}),e.jsxs("div",{className:"flex flex-1 w-full mb-1 ",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-2 mt-2",for:"grid-text",children:"Attachment"}),e.jsx(y,{})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Filed By"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-2 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${o.employee_fname} ${o.employee_lname}`,readOnly:!0})]})]})]})})})]})}export{ce as default};