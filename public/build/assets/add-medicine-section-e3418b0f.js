import{r as p,b as m,u,j as e,A as d,c as x}from"./app-0df8c9ad.js";import{s as f}from"./medicine-record-thunk-eebf7afb.js";import{M as b}from"./index-4064e24c.js";import{P as g}from"./PlusSquareTwoTone-d87be52b.js";import{M as h}from"./MedicineBoxOutlined-9afc2be2.js";import"./index-bbe26f5d.js";import"./presets-202283c5.js";import"./render-76e9977e.js";import"./asyncToGenerator-14626b52.js";import"./CheckCircleFilled-da7a6620.js";import"./AntdIcon-3caab9bf.js";import"./CloseCircleFilled-8f4259b9.js";import"./InfoCircleFilled-30ad0a9d.js";import"./useZIndex-09e90104.js";import"./useId-e875338e.js";import"./button-e3556dc3.js";import"./Compact-7026a57c.js";import"./useSize-b5e2027d.js";import"./LoadingOutlined-db5d11d4.js";import"./CloseOutlined-2aaac7f6.js";import"./index-6e69c1c8.js";import"./pickAttrs-13cf7b6a.js";import"./ContextIsolator-7afaf7d8.js";import"./useClosable-7f0266ef.js";import"./useLocale-9c0b4cf8.js";import"./PurePanel-5247e641.js";function L(){const[l,t]=p.useState(!1),{medicine_recordForm:r}=m(o=>o.medicine_records);console.log("medicine_record",r);const n=u(),a=()=>{t(!1)};function i(o){const s=o.target.name;s=="image"?n(d({...r,[s]:o.target.files})):n(d({...r,[s]:o.target.value}))}function c(o){o.preventDefault(),x.dispatch(f(r)),t(!1),a()}return e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>t(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(g,{className:"text-xl"}),"Add New Medicine"]})}),e.jsx(b,{title:e.jsxs(e.Fragment,{children:[e.jsx(h,{})," New Medicine"]}),centered:!0,open:l,onOk:o=>c(o),onCancel:()=>t(!1),width:1e3,okText:"Save",cancelText:"Cancel",children:e.jsx("form",{class:"w-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"meds",children:"Medicine"}),e.jsx("input",{name:"medicine",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"meds",type:"text",placeholder:"Name of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_type",children:"Medicine Type"}),e.jsx("input",{name:"med_type",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_type",type:"text",placeholder:"Type of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_desc",children:"Medicine Description"}),e.jsx("textarea",{name:"med_desc",class:"appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_desc",type:"text",placeholder:"Add Description",onChange:i})]})]})})})]})}export{L as default};