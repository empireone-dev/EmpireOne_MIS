import{r as i,j as e,c}from"./app-0df8c9ad.js";import{g as f}from"./applicant-thunk-25aed4ee.js";import{c as g}from"./onboarding-ack-service-c91d6ec0.js";import{S as x}from"./SendOutlined-ac064e5f.js";import{M as b}from"./index-4064e24c.js";import{m as d}from"./index-d9a9b981.js";import{L as h}from"./LoadingOutlined-db5d11d4.js";import"./applicant-record-service-adbaa099.js";import"./presets-202283c5.js";import"./AntdIcon-3caab9bf.js";import"./index-bbe26f5d.js";import"./render-76e9977e.js";import"./asyncToGenerator-14626b52.js";import"./CheckCircleFilled-da7a6620.js";import"./CloseCircleFilled-8f4259b9.js";import"./InfoCircleFilled-30ad0a9d.js";import"./useZIndex-09e90104.js";import"./useId-e875338e.js";import"./button-e3556dc3.js";import"./Compact-7026a57c.js";import"./useSize-b5e2027d.js";import"./CloseOutlined-2aaac7f6.js";import"./index-6e69c1c8.js";import"./pickAttrs-13cf7b6a.js";import"./ContextIsolator-7afaf7d8.js";import"./useClosable-7f0266ef.js";import"./useLocale-9c0b4cf8.js";import"./PurePanel-5247e641.js";function y(n){return async function(l,s){await g(n),console.log("result",n)}}function X({data:n,setOpen:l}){const[s,r]=i.useState(!1),[u,j]=i.useState({allowance:0}),[o,t]=i.useState(!1);console.log("data",n);async function a(m){m.preventDefault(),t(!0);try{await c.dispatch(y({...u,...n})),await c.dispatch(f()),d.success("Onboarding Acknowledgment already sent!"),r(!1),t(!1)}catch{d.success("Failed to sent Onboarding Acknowledgment!"),t(!1)}}async function p(){r(!0),l(!1)}return e.jsxs("div",{children:[e.jsxs("button",{onClick:p,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(x,{}),e.jsx("div",{children:"Send Onboarding Acknowledgement"})]}),e.jsx(b,{title:"Are you sure you want to send Onboarding Acknowledgment email?",centered:!0,open:s,width:800,onCancel:()=>r(!1),okText:"Ok, Send",footer:null,children:e.jsxs("form",{onSubmit:a,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",value:n.app_id,readOnly:!0})}),e.jsxs("div",{className:"flex flex-1",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{value:(n==null?void 0:n.fname)??"",className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",value:(n==null?void 0:n.mname)??"",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",value:(n==null?void 0:n.lname)??"",type:"hidden",placeholder:"",readOnly:!0})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center justify-end",children:[e.jsx("button",{className:"hover:text-black py-1.5 px-2 rounded-lg",children:"Cancel"}),e.jsx("button",{onClick:a,type:"submit",disabled:o,className:"bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 rounded-lg",children:e.jsxs("div",{className:"flex flex-1 items-center justify-center",children:[o?e.jsx(h,{spin:!0}):e.jsx(e.Fragment,{}),o?" SENDING...":"Ok, Send"]})})]})]})})]})}export{X as default};