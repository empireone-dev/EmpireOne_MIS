import{r as p,b as m,u,j as e,A as d,e as x}from"./app-3b84976d.js";import{s as f}from"./medicine-record-thunk-20b25cf0.js";import{M as b}from"./index-6c08e43b.js";import{P as g}from"./PlusSquareTwoTone-92716760.js";import{M as h}from"./MedicineBoxOutlined-598ee313.js";import"./index-fb46f770.js";import"./presets-848e2fba.js";import"./render-1396a843.js";import"./AntdIcon-71e46007.js";import"./asyncToGenerator-c437901c.js";import"./CheckCircleFilled-029da670.js";import"./CloseCircleFilled-8c07b52b.js";import"./InfoCircleFilled-31ffd59f.js";import"./useZIndex-37b4d1e8.js";import"./useId-3d30b7d5.js";import"./button-e56b0dd6.js";import"./Compact-1ade6323.js";import"./useSize-57d8ee82.js";import"./CloseOutlined-010645d0.js";import"./index-4b482e21.js";import"./KeyCode-01d15957.js";import"./pickAttrs-63d008c5.js";import"./fade-8ae6ceed.js";import"./ContextIsolator-7b71f2c7.js";import"./useClosable-6e22efdd.js";import"./useLocale-e9fef4a7.js";import"./PurePanel-46f1ca19.js";function Q(){const[l,t]=p.useState(!1),{medicine_recordForm:r}=m(o=>o.medicine_records);console.log("medicine_record",r);const n=u(),a=()=>{t(!1)};function i(o){const s=o.target.name;s=="image"?n(d({...r,[s]:o.target.files})):n(d({...r,[s]:o.target.value}))}function c(o){o.preventDefault(),x.dispatch(f(r)),t(!1),a()}return e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>t(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(g,{className:"text-xl"}),"Add New Medicine"]})}),e.jsx(b,{title:e.jsxs(e.Fragment,{children:[e.jsx(h,{})," New Medicine"]}),centered:!0,open:l,onOk:o=>c(o),onCancel:()=>t(!1),width:1e3,okText:"Save",cancelText:"Cancel",children:e.jsx("form",{class:"w-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"meds",children:"Medicine"}),e.jsx("input",{name:"medicine",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"meds",type:"text",placeholder:"Name of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_type",children:"Medicine Type"}),e.jsx("input",{name:"med_type",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_type",type:"text",placeholder:"Type of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_desc",children:"Medicine Description"}),e.jsx("textarea",{name:"med_desc",class:"appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_desc",type:"text",placeholder:"Add Description",onChange:i})]})]})})})]})}export{Q as default};