import{r as i,j as e,e as c}from"./app-753af2e0.js";import{g as f}from"./applicant-thunk-2bc4248f.js";import{c as g}from"./onboarding-ack-service-9348bb7d.js";import{S as x}from"./SendOutlined-3ae5ab16.js";import{M as b}from"./index-466f17d2.js";import{m as d}from"./index-adb8e5ea.js";import{L as h}from"./render-3a896346.js";import"./applicant-record-service-592ef5c3.js";import"./presets-d249989d.js";import"./AntdIcon-b9d997e7.js";import"./index-4bceb124.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./useZIndex-a79cfede.js";import"./useId-6f6c842e.js";import"./button-873ff8d7.js";import"./Compact-9246895f.js";import"./useSize-27c5a9ae.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./KeyCode-bde7e4ef.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./ContextIsolator-765e5922.js";import"./asyncToGenerator-abcd90ca.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./PurePanel-def41e9a.js";function y(n){return async function(l,s){await g(n),console.log("result",n)}}function Y({data:n,setOpen:l}){const[s,r]=i.useState(!1),[p,j]=i.useState({allowance:0}),[o,t]=i.useState(!1);console.log("data",n);async function a(m){m.preventDefault(),t(!0);try{await c.dispatch(y({...p,...n})),await c.dispatch(f()),d.success("Onboarding Acknowledgment already sent!"),r(!1),t(!1)}catch{d.success("Failed to sent Onboarding Acknowledgment!"),t(!1)}}async function u(){r(!0),l(!1)}return e.jsxs("div",{children:[e.jsxs("button",{onClick:u,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(x,{}),e.jsx("div",{children:"Send Onboarding Acknowledgement"})]}),e.jsx(b,{title:"Are you sure you want to send Onboarding Acknowledgment email?",centered:!0,open:s,width:800,onCancel:()=>r(!1),okText:"Ok, Send",footer:null,children:e.jsxs("form",{onSubmit:a,className:"w-full h-full",children:[e.jsxs("div",{className:"flex flex-col -mx-3",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",value:n.app_id,readOnly:!0})}),e.jsxs("div",{className:"flex flex-1",children:[e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{value:(n==null?void 0:n.fname)??"",className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"hidden",value:(n==null?void 0:n.mname)??"",placeholder:"",readOnly:!0})}),e.jsx("div",{className:"w-full px-2.5",children:e.jsx("input",{className:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",value:(n==null?void 0:n.lname)??"",type:"hidden",placeholder:"",readOnly:!0})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center justify-end",children:[e.jsx("button",{className:"hover:text-black py-1.5 px-2 rounded-lg",children:"Cancel"}),e.jsx("button",{onClick:a,type:"submit",disabled:o,className:"bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 rounded-lg",children:e.jsxs("div",{className:"flex flex-1 items-center justify-center",children:[o?e.jsx(h,{spin:!0}):e.jsx(e.Fragment,{}),o?" SENDING...":"Ok, Send"]})})]})]})})]})}export{Y as default};