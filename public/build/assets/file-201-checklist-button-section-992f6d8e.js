import{r as d,b as u,j as e}from"./app-482355be.js";import w from"./physical-contract-signing-fd03c6b2.js";import N from"./virtual-contract-signing-b0300c9e.js";import k from"./onboarding-acknowledge-section-db7ef5a2.js";import{C as x}from"./CheckSquareOutlined-6ca61abb.js";import{M as p}from"./index-a58b322c.js";import{F as S}from"./FormOutlined-62c43acd.js";import"./applicant-thunk-41ea0333.js";import"./applicant-record-service-e8bf8c30.js";import"./index-d7120351.js";import"./index-44babc8d.js";import"./presets-3fad3b18.js";import"./render-a51f93ee.js";import"./asyncToGenerator-be697f7b.js";import"./CheckCircleFilled-53fcacf0.js";import"./AntdIcon-b997608a.js";import"./CloseCircleFilled-32e48dce.js";import"./InfoCircleFilled-ce73be4f.js";import"./LoadingOutlined-a370997b.js";import"./useZIndex-87e47ffd.js";import"./pickAttrs-ce94d08f.js";import"./CloseOutlined-22e36e3d.js";import"./send-upload-contract-section-600c2380.js";import"./XMarkIcon-ba89897b.js";import"./FilePdfOutlined-c2a030f2.js";import"./onboarding-ack-service-634bd3c0.js";import"./SendOutlined-5fea1b37.js";import"./useId-2195e329.js";import"./button-120bbd6a.js";import"./Compact-8ea0c993.js";import"./useSize-df0f8805.js";import"./index-252e5d81.js";import"./ContextIsolator-a3a66f8f.js";import"./useClosable-f2e15ff7.js";import"./useLocale-8c66faae.js";import"./PurePanel-16bebe29.js";function ce({data:c}){var a;const[f,o]=d.useState(!1),[h,i]=d.useState(!1),{checklists:g}=u(s=>s.checklists),{applicant:t}=u(s=>s.final_rate),m=(a=t==null?void 0:t.requirements)==null?void 0:a.filter(s=>s.status==="Approved");console.log("applicant",t);async function j(){i(!0),o(!1)}const b=window.location.pathname+window.location.search;function C(s,r){const l=s.split("?")[1];return l?new URLSearchParams(l).get(r):null}const n=C(b,"status");return console.log("status",n),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{className:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),className:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1",children:[e.jsx(x,{className:"text-xl"}),"Pre Employment Checklist"]})}),e.jsxs(p,{title:e.jsxs("span",{className:"text-xl",children:[e.jsx(x,{})," Pre Employment Checklist of"," ",e.jsxs("b",{children:[(t==null?void 0:t.fname)??""," ",(t==null?void 0:t.lname)??""]})]}),centered:!0,open:f,onCancel:()=>o(!1),width:700,footer:null,children:[e.jsxs("form",{className:"w-full h-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-48",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex flex-col -mx-3 mb-2 px-2",children:e.jsx("div",{children:g.filter(s=>s.site==="San Carlos").map((s,r)=>e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:`checkbox-${r}`,type:"checkbox",value:s.reqs,checked:m==null?void 0:m.some(l=>l.reqs==s.reqs),className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"}),e.jsxs("label",{htmlFor:`checkbox-${r}`,className:"ms-2 text-lg font-medium ",children:[s.reqs," ",s.remarks==="Yes"&&e.jsx("span",{className:"text-red-500 text-xl",children:"*"})]})]},r))})})]}),e.jsxs("div",{className:"w-full",children:[n=="Accepted"&&e.jsx(k,{data:c,setOpen:o}),n=="Contract Signing"&&e.jsxs("button",{onClick:j,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(S,{}),e.jsx("div",{children:"Contract Signing"})]}),n=="Signed"&&e.jsx("div",{className:" text-slate-500 text-md",children:e.jsx("i",{children:"Contract signing completed."})})]})]}),e.jsx(p,{title:`Contract Signing for ${(t==null?void 0:t.fname)??""} ${(t==null?void 0:t.lname)??""}`,centered:!0,open:h,width:650,onCancel:()=>i(!1),footer:null,children:e.jsxs("div",{className:"flex flex-1 gap-4 w-full mt-4",children:[e.jsx(w,{setOpen:i,data:c}),e.jsx(N,{setOpen:i,data:c})]})})]})}export{ce as default};