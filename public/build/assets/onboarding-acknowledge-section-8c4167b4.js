import{r as i,j as e,c}from"./app-5903bcdc.js";import{g as f}from"./applicant-thunk-33914611.js";import{c as g}from"./onboarding-ack-service-18b3c594.js";import{S as x}from"./SendOutlined-a5cac60b.js";import{M as b}from"./index-e44f7e7f.js";import{m as d}from"./index-ea69266b.js";import{L as h}from"./render-4b6d5da1.js";import"./applicant-record-service-655b693d.js";import"./presets-ac6d2c0f.js";import"./AntdIcon-567c410e.js";import"./index-a2a66e96.js";import"./CheckCircleFilled-f83f15df.js";import"./CloseCircleFilled-697206b5.js";import"./InfoCircleFilled-e5724796.js";import"./useZIndex-79d8cff9.js";import"./useId-6966ca54.js";import"./button-d3ea38b4.js";import"./Compact-1e3d859e.js";import"./useSize-d214a582.js";import"./CloseOutlined-e89cbee7.js";import"./index-fc78c6ec.js";import"./KeyCode-8bfe2c69.js";import"./pickAttrs-436cebda.js";import"./fade-8c83fca4.js";import"./ContextIsolator-7d8b47d5.js";import"./asyncToGenerator-71d13e75.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";function y(n){return async function(l,s){await g(n),console.log("result",n)}}function Y({data:n,setOpen:l}){const[s,r]=i.useState(!1),[p,j]=i.useState({allowance:0}),[o,t]=i.useState(!1);console.log("data",n);async function a(m){m.preventDefault(),t(!0);try{await c.dispatch(y({...p,...n})),await c.dispatch(f()),d.success("Onboarding Acknowledgment already sent!"),r(!1),t(!1)}catch{d.success("Failed to sent Onboarding Acknowledgment!"),t(!1)}}async function u(){r(!0),l(!1)}return e.jsxs("div",{children:[e.jsxs("button",{onClick:u,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(x,{}),e.jsx("div",{children:"Send Onboarding Acknowledgement"})]}),e.jsx(b,{title:"Are you sure you want to send Onboarding Acknowledgment email?",centered:!0,open:s,width:800,onCancel:()=>r(!1),okText:"Ok, Send",footer:null,children:e.jsxs("form",{onSubmit:a,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",value:n.app_id,readOnly:!0})}),e.jsxs("div",{className:"flex flex-1",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{value:(n==null?void 0:n.fname)??"",className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",value:(n==null?void 0:n.mname)??"",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",value:(n==null?void 0:n.lname)??"",type:"hidden",placeholder:"",readOnly:!0})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center justify-end",children:[e.jsx("button",{className:"hover:text-black py-1.5 px-2 rounded-lg",children:"Cancel"}),e.jsx("button",{onClick:a,type:"submit",disabled:o,className:"bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 rounded-lg",children:e.jsxs("div",{className:"flex flex-1 items-center justify-center",children:[o?e.jsx(h,{spin:!0}):e.jsx(e.Fragment,{}),o?" SENDING...":"Ok, Send"]})})]})]})})]})}export{Y as default};