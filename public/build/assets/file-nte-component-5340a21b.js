import{r as b,b as f,j as e}from"./app-12dd3627.js";import{M as h}from"./index-734ac57e.js";import{M as g}from"./index-d368cae6.js";import"./presets-2db74b6f.js";import"./index-4e0ea6ca.js";import"./index-1f34c205.js";import"./useId-befc3d2c.js";import"./useZIndex-4dd54a5e.js";import"./useSize-ccd2c154.js";import"./AntdIcon-8b25e930.js";import"./Compact-9e968cf1.js";import"./ContextIsolator-dcadb18f.js";import"./asyncToGenerator-318e6964.js";import"./KeyCode-3ea1579b.js";import"./LeftOutlined-2fa34ff8.js";import"./collapse-97de76d4.js";import"./render-a458bafb.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./button-aae57988.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";function J({data:l,item:r}){var a,n,c;const[i,s]=b.useState(!1),{user:o}=f(t=>t.app),d=(()=>{const t=new Date,m=t.getFullYear(),x=String(t.getMonth()+1).padStart(2,"0"),p=String(t.getDate()).padStart(2,"0");return`${m}-${x}-${p}`})();function u(){s(!0)}return e.jsxs(e.Fragment,{children:[e.jsx(h.Item,{onClick:u,icon:r.icon,children:r.label}),e.jsx(g,{title:"Notice to Explain",visible:i,onOk:()=>s(!1),onCancel:()=>s(!1),width:1e3,okText:"Update",cancelText:"Cancel",footer:null,children:e.jsx("form",{className:"w-full h-full",children:e.jsxs("div",{className:"flex flex-col -mx-3",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Employee"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"employee-name",type:"text",value:`${(a=l==null?void 0:l.applicant)==null?void 0:a.fname} ${(n=l==null?void 0:l.applicant)==null?void 0:n.mname} ${(c=l==null?void 0:l.applicant)==null?void 0:c.lname}`,readOnly:!0})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Date"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"date-input",type:"text",value:d,readOnly:!0})]})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Department"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"department-input",type:"text",value:l==null?void 0:l.dept,readOnly:!0})]}),e.jsx("hr",{className:"border-t border-black px-4 mt-2"}),e.jsxs("div",{className:"mt-2 px-3",children:[e.jsx("h1",{children:e.jsx("b",{children:"Type of Violation"})}),e.jsxs("div",{className:"flex flex-1 gap-3 w-full mt-2",children:[e.jsxs("div",{class:"flex items-center mb-1 w-full",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),e.jsx("label",{for:"default-checkbox",class:"ms-2 text-sm font-medium text-gray-900 ",children:"Attendance"})]}),e.jsxs("div",{class:"flex items-center mb-1 w-full",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),e.jsx("label",{for:"default-checkbox",class:"ms-2 text-sm font-medium text-gray-900 ",children:"Conduct and Etiquette"})]}),e.jsxs("div",{class:"flex items-center mb-1 w-full",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),e.jsx("label",{for:"default-checkbox",class:"ms-2 text-sm font-medium text-gray-900 ",children:"Company’s Productivity"})]})]}),e.jsxs("div",{className:"flex flex-1 gap-3 w-full mt-2 mb-3",children:[e.jsxs("div",{class:"flex items-center mb-1 w-full",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),e.jsx("label",{for:"default-checkbox",class:"ms-2 text-sm font-medium text-gray-900 ",children:"Health and Security"})]}),e.jsxs("div",{class:"flex items-center mb-1 w-full",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",value:"",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),e.jsx("label",{for:"default-checkbox",class:"ms-2 text-sm font-medium text-gray-900 ",children:"Company’s Facilities and Properties"})]}),e.jsx("div",{class:"flex items-center mb-1 w-full"})]})]}),e.jsx("hr",{className:"border-t border-black mb-2"}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Date of Violation"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"violation-date-input",type:"date",placeholder:""})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Place of Violation"}),e.jsxs("select",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",onChange:t=>handleStatusChange(t.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Site"}),e.jsx("option",{value:"San Carlos Site",children:"San Carlos Site"}),e.jsx("option",{value:"Carcar Site",children:"Carcar Site"})]})]})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Employer Statement"}),e.jsx("textarea",{className:"appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"employer-statement-input",placeholder:""})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Filed By"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"filed-by-input",type:"text",value:`${o.employee_fname} ${o.employee_lname}`,readOnly:!0})]}),e.jsx("div",{className:"flex items-center justify-center p-1.5 px-2 mt-1",children:e.jsx("button",{className:"bg-blue-500 hover:bg-blue-600 text-white w-full p-1.5 rounded-md",children:"GENERATE INCIDENT REPORT"})})]})})})]})}export{J as default};