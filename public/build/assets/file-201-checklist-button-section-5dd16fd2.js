import{r as d,b as u,j as e}from"./app-5903bcdc.js";import w from"./physical-contract-signing-1270cdd7.js";import N from"./virtual-contract-signing-760fd370.js";import k from"./onboarding-acknowledge-section-8c4167b4.js";import{C as x}from"./CheckSquareOutlined-7b1fb6e1.js";import{M as p}from"./index-e44f7e7f.js";import{F as S}from"./FormOutlined-efa6a54f.js";import"./applicant-thunk-33914611.js";import"./applicant-record-service-655b693d.js";import"./index-ea69266b.js";import"./index-a2a66e96.js";import"./presets-ac6d2c0f.js";import"./render-4b6d5da1.js";import"./AntdIcon-567c410e.js";import"./asyncToGenerator-71d13e75.js";import"./CheckCircleFilled-f83f15df.js";import"./CloseCircleFilled-697206b5.js";import"./InfoCircleFilled-e5724796.js";import"./KeyCode-8bfe2c69.js";import"./pickAttrs-436cebda.js";import"./useZIndex-79d8cff9.js";import"./CloseOutlined-e89cbee7.js";import"./send-upload-contract-section-a8b1e7ff.js";import"./XMarkIcon-da14ba07.js";import"./FilePdfOutlined-c6591833.js";import"./onboarding-ack-service-18b3c594.js";import"./SendOutlined-a5cac60b.js";import"./useId-6966ca54.js";import"./button-d3ea38b4.js";import"./Compact-1e3d859e.js";import"./useSize-d214a582.js";import"./index-fc78c6ec.js";import"./fade-8c83fca4.js";import"./ContextIsolator-7d8b47d5.js";import"./useClosable-9caab00d.js";import"./useLocale-beb3b3ad.js";import"./PurePanel-521b647a.js";function ce({data:m}){var a;const[f,o]=d.useState(!1),[h,i]=d.useState(!1),{checklists:g}=u(s=>s.checklists),{applicant:t}=u(s=>s.final_rate),c=(a=t==null?void 0:t.requirements)==null?void 0:a.filter(s=>s.status==="Approved");console.log("applicant",t);async function j(){i(!0),o(!1)}const b=window.location.pathname+window.location.search;function C(s,r){const l=s.split("?")[1];return l?new URLSearchParams(l).get(r):null}const n=C(b,"status");return console.log("status",n),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{className:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),className:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1",children:[e.jsx(x,{className:"text-xl"}),"Pre Employment Checklist"]})}),e.jsxs(p,{title:e.jsxs("span",{className:"text-xl",children:[e.jsx(x,{})," Pre Employment Checklist of"," ",e.jsxs("b",{children:[(t==null?void 0:t.fname)??""," ",(t==null?void 0:t.lname)??""]})]}),centered:!0,open:f,onCancel:()=>o(!1),width:700,footer:null,children:[e.jsxs("form",{className:"w-full h-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-48",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex flex-col -mx-3 mb-2 px-2",children:e.jsx("div",{children:g.filter(s=>s.site==="San Carlos").map((s,r)=>e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:`checkbox-${r}`,type:"checkbox",value:s.reqs,checked:c==null?void 0:c.some(l=>l.reqs==s.reqs),className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"}),e.jsxs("label",{htmlFor:`checkbox-${r}`,className:"ms-2 text-lg font-medium ",children:[s.reqs," ",s.remarks==="Yes"&&e.jsx("span",{className:"text-red-500 text-xl",children:"*"})]})]},r))})})]}),e.jsxs("div",{className:"w-full",children:[n=="Accepted"&&e.jsx(k,{data:m,setOpen:o}),n=="Contract Signing"&&e.jsxs("button",{onClick:j,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(S,{}),e.jsx("div",{children:"Contract Signing"})]}),n=="Signed"&&e.jsx("div",{className:" text-slate-500 text-md",children:e.jsx("i",{children:"Contract signing completed."})})]})]}),e.jsx(p,{title:`Contract Signing for ${(t==null?void 0:t.fname)??""} ${(t==null?void 0:t.lname)??""}`,centered:!0,open:h,width:650,onCancel:()=>i(!1),footer:null,children:e.jsxs("div",{className:"flex flex-1 gap-4 w-full mt-4",children:[e.jsx(w,{setOpen:i,data:m}),e.jsx(N,{setOpen:i,data:m})]})})]})}export{ce as default};