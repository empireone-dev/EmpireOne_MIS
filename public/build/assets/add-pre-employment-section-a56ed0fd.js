import{r as o,b as p,u,j as e,H as x,e as f}from"./app-7d68ca85.js";import{s as h}from"./pre-employment-thunk-a132d31a.js";import{e as b}from"./presets-a105bbc6.js";import{A as g}from"./AntdIcon-9cfc0218.js";import{M as v}from"./index-c093f7be.js";import"./index-2eb55d07.js";import"./render-1607753e.js";import"./asyncToGenerator-ddb06381.js";import"./CheckCircleFilled-e7ef87be.js";import"./CloseCircleFilled-f459e844.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";var k={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M484 443.1V528h-84.5c-4.1 0-7.5 3.1-7.5 7v42c0 3.8 3.4 7 7.5 7H484v84.9c0 3.9 3.2 7.1 7 7.1h42c3.9 0 7-3.2 7-7.1V584h84.5c4.1 0 7.5-3.2 7.5-7v-42c0-3.9-3.4-7-7.5-7H540v-84.9c0-3.9-3.1-7.1-7-7.1h-42c-3.8 0-7 3.2-7 7.1zm396-144.7H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"}}]},name:"folder-add",theme:"outlined"};const j=k;var w=function(s,t){return o.createElement(g,b({},s,{ref:t,icon:j}))},y=o.forwardRef(w);const A=y;function U(){const[i,s]=o.useState(!1),{checklistForm:t}=p(r=>r.checklists),n=u(),a=()=>{s(!1)};function l(r){const{name:d,value:m}=r.target;n(x({...t,[d]:m}))}function c(r){r.preventDefault(),f.dispatch(h(t)),a()}return e.jsxs("div",{className:"my-2",children:[e.jsxs("button",{type:"button",onClick:()=>s(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white gap-1",children:[e.jsx(A,{className:"text-xl"}),"Add Pre-Employment Requirements"]}),e.jsx(v,{title:"New Pre Employment Requirements",centered:!0,open:i,onOk:c,onCancel:a,width:1e3,okText:"Save",cancelText:"Cancel",children:e.jsx("form",{class:"w-full",onSubmit:c,children:e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Requirement's Name"}),e.jsx("input",{name:"reqs",class:"appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",onChange:l})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Is this Required?"}),e.jsxs("div",{className:"flex flex-1 mt-2.5 ml-3 space-x-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{name:"remarks",id:"required-radio",type:"radio",class:"w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2",value:"Yes",checked:t.remarks==="Yes",onChange:l}),e.jsx("label",{class:"ml-2 text-xs font-bold",for:"required-radio",children:"Required"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{name:"remarks",id:"applicable-radio",type:"radio",class:"w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2",value:"No",checked:t.remarks==="No",onChange:l}),e.jsx("label",{class:"ml-2 text-xs font-bold",for:"applicable-radio",children:"Only if Applicable"})]})]})]})]})})})]})}export{U as default};