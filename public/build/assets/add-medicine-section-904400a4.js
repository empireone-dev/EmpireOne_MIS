import{r as p,b as m,u,j as e,A as d,e as x}from"./app-7d68ca85.js";import{s as f}from"./medicine-record-thunk-6022aa18.js";import{M as b}from"./index-c093f7be.js";import{P as g}from"./PlusSquareTwoTone-99fae580.js";import{M as h}from"./MedicineBoxOutlined-b75cdfe7.js";import"./index-2eb55d07.js";import"./presets-a105bbc6.js";import"./render-1607753e.js";import"./AntdIcon-9cfc0218.js";import"./asyncToGenerator-ddb06381.js";import"./CheckCircleFilled-e7ef87be.js";import"./CloseCircleFilled-f459e844.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";function Q(){const[l,t]=p.useState(!1),{medicine_recordForm:r}=m(o=>o.medicine_records);console.log("medicine_record",r);const n=u(),a=()=>{t(!1)};function i(o){const s=o.target.name;s=="image"?n(d({...r,[s]:o.target.files})):n(d({...r,[s]:o.target.value}))}function c(o){o.preventDefault(),x.dispatch(f(r)),t(!1),a()}return e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>t(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(g,{className:"text-xl"}),"Add New Medicine"]})}),e.jsx(b,{title:e.jsxs(e.Fragment,{children:[e.jsx(h,{})," New Medicine"]}),centered:!0,open:l,onOk:o=>c(o),onCancel:()=>t(!1),width:1e3,okText:"Save",cancelText:"Cancel",children:e.jsx("form",{class:"w-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"meds",children:"Medicine"}),e.jsx("input",{name:"medicine",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"meds",type:"text",placeholder:"Name of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_type",children:"Medicine Type"}),e.jsx("input",{name:"med_type",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_type",type:"text",placeholder:"Type of Medicine",onChange:i})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"med_desc",children:"Medicine Description"}),e.jsx("textarea",{name:"med_desc",class:"appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"med_desc",type:"text",placeholder:"Add Description",onChange:i})]})]})})})]})}export{Q as default};