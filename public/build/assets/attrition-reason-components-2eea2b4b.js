import{r as p,j as e}from"./app-482355be.js";import{M as u}from"./index-3d0ae574.js";import{M as b}from"./index-a58b322c.js";import"./presets-3fad3b18.js";import"./index-44babc8d.js";import"./index-5c96ec32.js";import"./useId-2195e329.js";import"./useZIndex-87e47ffd.js";import"./useSize-df0f8805.js";import"./AntdIcon-b997608a.js";import"./Compact-8ea0c993.js";import"./ContextIsolator-a3a66f8f.js";import"./asyncToGenerator-be697f7b.js";import"./LeftOutlined-d4f7e3bf.js";import"./collapse-97de76d4.js";import"./render-a51f93ee.js";import"./CheckCircleFilled-53fcacf0.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./button-120bbd6a.js";import"./LoadingOutlined-a370997b.js";import"./CloseOutlined-22e36e3d.js";import"./index-252e5d81.js";import"./pickAttrs-ce94d08f.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";function q({data:l,item:o}){var s,n,i;const[c,r]=p.useState(!1);function t(x){r(!0)}return e.jsxs(e.Fragment,{children:[e.jsx(u.Item,{onClick:()=>t(),icon:o.icon,children:o.label}),e.jsx(b,{title:" Employee Separation",centered:!0,visible:c,onOk:()=>r(!1),onCancel:()=>r(!1),width:1e3,footer:null,children:e.jsx("form",{class:"w-full h-full",children:e.jsxs("div",{class:"flex flex-col -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee No."}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.emp_id,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employee's Name"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:`${(s=l==null?void 0:l.applicant)==null?void 0:s.fname} ${(n=l==null?void 0:l.applicant)==null?void 0:n.mname} ${(i=l==null?void 0:l.applicant)==null?void 0:i.lname}`,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-1 ",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"job Position"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.position,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Department"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.dept,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"EOGS Email"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"email",value:l==null?void 0:l.eogs,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Employment Status"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"email",value:l==null?void 0:l.status,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Hired Date"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.hired,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Separation Date"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.separation,readOnly:!0})]})]}),e.jsxs("div",{className:"flex flex-1",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Reason for Separation"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.reas,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Reason for End of Contract"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.reas,readOnly:!0})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-1 mt-2",children:"Exit Interview & Clearance Status"}),e.jsx("input",{class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text",value:l==null?void 0:l.estatus,readOnly:!0})]})]})]})})})]})}export{q as default};