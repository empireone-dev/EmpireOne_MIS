import{r as d,b as u,j as e}from"./app-73b46094.js";import w from"./physical-contract-signing-ba88e997.js";import N from"./virtual-contract-signing-b1aa684d.js";import k from"./onboarding-acknowledge-section-b25f1c7a.js";import{C as x}from"./CheckSquareOutlined-49c7a31b.js";import{M as p}from"./index-60e8455b.js";import{F as S}from"./FormOutlined-0598669c.js";import"./applicant-thunk-83e0b221.js";import"./applicant-record-service-2c0554fb.js";import"./index-f1383bf4.js";import"./index-d93f8a93.js";import"./presets-73c987c9.js";import"./render-4c9a3ffe.js";import"./AntdIcon-d3507f1a.js";import"./asyncToGenerator-bb14fadb.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./KeyCode-1cd0ccde.js";import"./pickAttrs-7a971b97.js";import"./useZIndex-e8c3093a.js";import"./CloseOutlined-b9197a42.js";import"./send-upload-contract-section-f8213115.js";import"./XMarkIcon-da0a8050.js";import"./FilePdfOutlined-56242690.js";import"./onboarding-ack-service-6942498b.js";import"./SendOutlined-ce953510.js";import"./useId-9ba4889a.js";import"./button-4029560c.js";import"./Compact-0fc6e86e.js";import"./useSize-d7f92a55.js";import"./index-626462f0.js";import"./fade-967bd62f.js";import"./ContextIsolator-e4aba7cb.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";function ce({data:m}){var a;const[f,o]=d.useState(!1),[h,i]=d.useState(!1),{checklists:g}=u(s=>s.checklists),{applicant:t}=u(s=>s.final_rate),c=(a=t==null?void 0:t.requirements)==null?void 0:a.filter(s=>s.status==="Approved");console.log("applicant",t);async function j(){i(!0),o(!1)}const b=window.location.pathname+window.location.search;function C(s,r){const l=s.split("?")[1];return l?new URLSearchParams(l).get(r):null}const n=C(b,"status");return console.log("status",n),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{className:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),className:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1",children:[e.jsx(x,{className:"text-xl"}),"Pre Employment Checklist"]})}),e.jsxs(p,{title:e.jsxs("span",{className:"text-xl",children:[e.jsx(x,{})," Pre Employment Checklist of"," ",e.jsxs("b",{children:[(t==null?void 0:t.fname)??""," ",(t==null?void 0:t.lname)??""]})]}),centered:!0,open:f,onCancel:()=>o(!1),width:700,footer:null,children:[e.jsxs("form",{className:"w-full h-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-48",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex flex-col -mx-3 mb-2 px-2",children:e.jsx("div",{children:g.filter(s=>s.site==="San Carlos").map((s,r)=>e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:`checkbox-${r}`,type:"checkbox",value:s.reqs,checked:c==null?void 0:c.some(l=>l.reqs==s.reqs),className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"}),e.jsxs("label",{htmlFor:`checkbox-${r}`,className:"ms-2 text-lg font-medium ",children:[s.reqs," ",s.remarks==="Yes"&&e.jsx("span",{className:"text-red-500 text-xl",children:"*"})]})]},r))})})]}),e.jsxs("div",{className:"w-full",children:[n=="Accepted"&&e.jsx(k,{data:m,setOpen:o}),n=="Contract Signing"&&e.jsxs("button",{onClick:j,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(S,{}),e.jsx("div",{children:"Contract Signing"})]}),n=="Signed"&&e.jsx("div",{className:" text-slate-500 text-md",children:e.jsx("i",{children:"Contract signing completed."})})]})]}),e.jsx(p,{title:`Contract Signing for ${(t==null?void 0:t.fname)??""} ${(t==null?void 0:t.lname)??""}`,centered:!0,open:h,width:650,onCancel:()=>i(!1),footer:null,children:e.jsxs("div",{className:"flex flex-1 gap-4 w-full mt-4",children:[e.jsx(w,{setOpen:i,data:m}),e.jsx(N,{setOpen:i,data:m})]})})]})}export{ce as default};