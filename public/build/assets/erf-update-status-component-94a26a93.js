import{r as l,j as e,e as c}from"./app-12dd3627.js";import{u as f,g as x}from"./erf-record-thunk-390e5a21.js";import{M as b}from"./index-734ac57e.js";import{M as g}from"./index-d368cae6.js";import{m as i}from"./index-8ae8737d.js";import"./erf-record-service-dd61ca1f.js";import"./presets-2db74b6f.js";import"./index-4e0ea6ca.js";import"./index-1f34c205.js";import"./useId-befc3d2c.js";import"./useZIndex-4dd54a5e.js";import"./useSize-ccd2c154.js";import"./AntdIcon-8b25e930.js";import"./Compact-9e968cf1.js";import"./ContextIsolator-dcadb18f.js";import"./asyncToGenerator-318e6964.js";import"./KeyCode-3ea1579b.js";import"./LeftOutlined-2fa34ff8.js";import"./collapse-97de76d4.js";import"./render-a458bafb.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./button-aae57988.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";function W({data:r,item:n}){const[u,t]=l.useState(!1),[s,a]=l.useState({});l.useEffect(()=>{r&&a(r)},[r]);function p(){t(!0)}async function d(o){if(o.preventDefault(),!s.status){i.error("Please select a valid status.");return}try{await c.dispatch(f(s)),await c.dispatch(x()),i.success("Updated Successfully"),t(!1)}catch(m){i.error("Error updating status. Please try again."),console.error(m)}}return e.jsxs(e.Fragment,{children:[e.jsx(b.Item,{onClick:p,icon:n.icon,children:n.label}),e.jsx(g,{title:"Update Request Status",centered:!0,visible:u,onCancel:()=>t(!1),width:1200,footer:null,children:e.jsx("form",{className:"w-full pb-4",onSubmit:d,children:e.jsxs("div",{className:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Reference No."}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:(r==null?void 0:r.ref_id)||"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Job Title"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:(r==null?void 0:r.jobTitle)||"",readOnly:!0})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Job Type"}),e.jsx("input",{className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:(r==null?void 0:r.jobType)||"",readOnly:!0})]})]}),e.jsxs("div",{className:"w-full px-3",children:[e.jsx("label",{className:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",children:"Request Status"}),e.jsxs("select",{onChange:o=>a({...s,status:o.target.value}),className:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",defaultValue:(r==null?void 0:r.status)||"",children:[e.jsx("option",{value:"",disabled:!0,children:"Select status"}),e.jsx("option",{value:"Pending",disabled:!0,children:"Pending"}),e.jsx("option",{value:"In Review",children:"In Review"}),e.jsx("option",{value:"Approved",children:"Approved"}),e.jsx("option",{value:"Declined",children:"Declined"})]})]}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>t(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",type:"submit",children:"Save Changes"})]})]})})})]})}export{W as default};