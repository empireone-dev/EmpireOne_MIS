import{r as d,b as u,j as e}from"./app-a38c20d9.js";import w from"./physical-contract-signing-f36cd14c.js";import N from"./virtual-contract-signing-ae31b9f4.js";import k from"./onboarding-acknowledge-section-c5aefeab.js";import{C as x}from"./CheckSquareOutlined-c3207bb8.js";import{M as p}from"./index-9d513160.js";import{F as S}from"./FormOutlined-c3f89b85.js";import"./applicant-thunk-f49e810b.js";import"./applicant-record-service-b22d0a78.js";import"./index-cec043e3.js";import"./index-227a9330.js";import"./presets-490ebc63.js";import"./render-85b81fbb.js";import"./AntdIcon-13630a05.js";import"./asyncToGenerator-0b1de8dc.js";import"./CheckCircleFilled-ab80464f.js";import"./CloseCircleFilled-f6bebab3.js";import"./InfoCircleFilled-59d04494.js";import"./KeyCode-aaf7665e.js";import"./pickAttrs-9206db1b.js";import"./useZIndex-e5bae908.js";import"./CloseOutlined-f995126c.js";import"./send-upload-contract-section-ff16bc22.js";import"./XMarkIcon-30e597a6.js";import"./FilePdfOutlined-d17faaca.js";import"./onboarding-ack-service-97fd328b.js";import"./SendOutlined-d838bf12.js";import"./useId-cb27096a.js";import"./button-17307643.js";import"./Compact-784794a1.js";import"./useSize-b76cc852.js";import"./index-6d9fa839.js";import"./fade-de3a406c.js";import"./ContextIsolator-4898b4fd.js";import"./useClosable-89a8d2ae.js";import"./useLocale-07fc7437.js";import"./PurePanel-5ba12f79.js";function ce({data:m}){var a;const[f,o]=d.useState(!1),[h,i]=d.useState(!1),{checklists:g}=u(s=>s.checklists),{applicant:t}=u(s=>s.final_rate),c=(a=t==null?void 0:t.requirements)==null?void 0:a.filter(s=>s.status==="Approved");console.log("applicant",t);async function j(){i(!0),o(!1)}const b=window.location.pathname+window.location.search;function C(s,r){const l=s.split("?")[1];return l?new URLSearchParams(l).get(r):null}const n=C(b,"status");return console.log("status",n),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{className:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),className:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1",children:[e.jsx(x,{className:"text-xl"}),"Pre Employment Checklist"]})}),e.jsxs(p,{title:e.jsxs("span",{className:"text-xl",children:[e.jsx(x,{})," Pre Employment Checklist of"," ",e.jsxs("b",{children:[(t==null?void 0:t.fname)??""," ",(t==null?void 0:t.lname)??""]})]}),centered:!0,open:f,onCancel:()=>o(!1),width:700,footer:null,children:[e.jsxs("form",{className:"w-full h-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-48",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex flex-col -mx-3 mb-2 px-2",children:e.jsx("div",{children:g.filter(s=>s.site==="San Carlos").map((s,r)=>e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:`checkbox-${r}`,type:"checkbox",value:s.reqs,checked:c==null?void 0:c.some(l=>l.reqs==s.reqs),className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"}),e.jsxs("label",{htmlFor:`checkbox-${r}`,className:"ms-2 text-lg font-medium ",children:[s.reqs," ",s.remarks==="Yes"&&e.jsx("span",{className:"text-red-500 text-xl",children:"*"})]})]},r))})})]}),e.jsxs("div",{className:"w-full",children:[n=="Accepted"&&e.jsx(k,{data:m,setOpen:o}),n=="Contract Signing"&&e.jsxs("button",{onClick:j,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(S,{}),e.jsx("div",{children:"Contract Signing"})]}),n=="Signed"&&e.jsx("div",{className:" text-slate-500 text-md",children:e.jsx("i",{children:"Contract signing completed."})})]})]}),e.jsx(p,{title:`Contract Signing for ${(t==null?void 0:t.fname)??""} ${(t==null?void 0:t.lname)??""}`,centered:!0,open:h,width:650,onCancel:()=>i(!1),footer:null,children:e.jsxs("div",{className:"flex flex-1 gap-4 w-full mt-4",children:[e.jsx(w,{setOpen:i,data:m}),e.jsx(N,{setOpen:i,data:m})]})})]})}export{ce as default};