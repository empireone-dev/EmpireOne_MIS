import{r as d,b as u,j as e}from"./app-63d290ed.js";import w from"./physical-contract-signing-8de83a39.js";import N from"./virtual-contract-signing-6fa790c4.js";import k from"./onboarding-acknowledge-section-bf131d16.js";import{C as x}from"./CheckSquareOutlined-c7bf9dc1.js";import{M as p}from"./index-ccb87f83.js";import{F as S}from"./FormOutlined-0a2c014f.js";import"./applicant-thunk-c293ec35.js";import"./applicant-record-service-5b999d79.js";import"./index-9d2c8c61.js";import"./index-d8b89dfe.js";import"./presets-9872d8f0.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./AntdIcon-d99b3c04.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./LoadingOutlined-8390b05c.js";import"./useZIndex-dc62b87b.js";import"./pickAttrs-8fbf8c8c.js";import"./CloseOutlined-a4ab623b.js";import"./send-upload-contract-section-cd88bfd3.js";import"./XMarkIcon-885b2a84.js";import"./FilePdfOutlined-ea75686b.js";import"./onboarding-ack-service-3ce2aaa8.js";import"./SendOutlined-19165915.js";import"./useId-ad7dc23b.js";import"./button-082e41af.js";import"./Compact-641d596c.js";import"./useSize-3c640658.js";import"./index-dee3d1b8.js";import"./ContextIsolator-63f8fbab.js";import"./useClosable-eb9686b6.js";import"./useLocale-29929ee3.js";import"./PurePanel-1f85830c.js";function ce({data:c}){var a;const[f,o]=d.useState(!1),[h,i]=d.useState(!1),{checklists:g}=u(s=>s.checklists),{applicant:t}=u(s=>s.final_rate),m=(a=t==null?void 0:t.requirements)==null?void 0:a.filter(s=>s.status==="Approved");console.log("applicant",t);async function j(){i(!0),o(!1)}const b=window.location.pathname+window.location.search;function C(s,r){const l=s.split("?")[1];return l?new URLSearchParams(l).get(r):null}const n=C(b,"status");return console.log("status",n),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{className:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),className:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1",children:[e.jsx(x,{className:"text-xl"}),"Pre Employment Checklist"]})}),e.jsxs(p,{title:e.jsxs("span",{className:"text-xl",children:[e.jsx(x,{})," Pre Employment Checklist of"," ",e.jsxs("b",{children:[(t==null?void 0:t.fname)??""," ",(t==null?void 0:t.lname)??""]})]}),centered:!0,open:f,onCancel:()=>o(!1),width:700,footer:null,children:[e.jsxs("form",{className:"w-full h-full",children:[e.jsx("div",{className:"flex items-center justify-center p-3",children:e.jsx("img",{className:"w-48",src:"/images/newlogo.png",alt:"logo"})}),e.jsx("div",{className:"flex flex-col -mx-3 mb-2 px-2",children:e.jsx("div",{children:g.filter(s=>s.site==="San Carlos").map((s,r)=>e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:`checkbox-${r}`,type:"checkbox",value:s.reqs,checked:m==null?void 0:m.some(l=>l.reqs==s.reqs),className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"}),e.jsxs("label",{htmlFor:`checkbox-${r}`,className:"ms-2 text-lg font-medium ",children:[s.reqs," ",s.remarks==="Yes"&&e.jsx("span",{className:"text-red-500 text-xl",children:"*"})]})]},r))})})]}),e.jsxs("div",{className:"w-full",children:[n=="Accepted"&&e.jsx(k,{data:c,setOpen:o}),n=="Contract Signing"&&e.jsxs("button",{onClick:j,className:"flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md",children:[e.jsx(S,{}),e.jsx("div",{children:"Contract Signing"})]}),n=="Signed"&&e.jsx("div",{className:" text-slate-500 text-md",children:e.jsx("i",{children:"Contract signing completed."})})]})]}),e.jsx(p,{title:`Contract Signing for ${(t==null?void 0:t.fname)??""} ${(t==null?void 0:t.lname)??""}`,centered:!0,open:h,width:650,onCancel:()=>i(!1),footer:null,children:e.jsxs("div",{className:"flex flex-1 gap-4 w-full mt-4",children:[e.jsx(w,{setOpen:i,data:c}),e.jsx(N,{setOpen:i,data:c})]})})]})}export{ce as default};