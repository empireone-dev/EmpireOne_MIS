import{b as p,u,j as e,p as d}from"./app-7d68ca85.js";import a from"./input-85689239.js";import{C as g}from"./CloseOutlined-2578f623.js";import{P as b}from"./PlusOutlined-40252bf8.js";import"./presets-a105bbc6.js";import"./AntdIcon-9cfc0218.js";function k(){const{applicantForm:t}=p(n=>n.applicants),i=u(),c=()=>{const n={id:Date.now(),company:"",position:"",started_at:"",end_at:""},s=[...t==null?void 0:t.work_experience,n];i(d({...t,work_experience:s}))},x=n=>{const s=t==null?void 0:t.work_experience.filter(r=>r.id!==n);i(d({...t,work_experience:s}))},o=(n,s)=>{const{name:r,value:m}=s.target,l=[...t==null?void 0:t.work_experience];l[n]={...l[n],[r]:m},i(d({...t,work_experience:l}))};return e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900  mt-6",children:"Working Experience"}),t==null?void 0:t.work_experience.map((n,s)=>e.jsxs("div",{className:"mb-6 border-2 border-gray-500 rounded-lg p-7 pb-1 relative",children:[e.jsx("div",{className:"mb-4 w-full",children:e.jsx(a,{onChange:r=>o(s,r),value:n.company??"",name:"company",label:"Company",type:"text"})}),e.jsx("div",{className:"mb-4 w-full",children:e.jsx(a,{onChange:r=>o(s,r),value:n.position??"",name:"position",label:"Position",type:"text"})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"w-full",children:e.jsx(a,{onChange:r=>o(s,r),value:n.started_at??"",name:"started_at",label:"Started At",type:"date"})}),e.jsx("div",{className:"w-full",children:e.jsx(a,{onChange:r=>o(s,r),value:n.end_at??"",name:"end_at",label:"End At",type:"date"})})]}),e.jsx("div",{className:"flex flex-1 gap-4 mb-4",children:e.jsx("button",{type:"button",onClick:()=>x(n.id),className:"absolute -top-1 right-2 mt-2 text-md text-red-500 hover:text-red-700",children:e.jsx(g,{})})})]},s)),e.jsxs("button",{type:"button",onClick:()=>c(),className:"text-gray-900 bg-white hover:bg-gray-300 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center me-2 mb-2 w-full",children:[e.jsx(b,{}),"  Add Another Working Experience"]})]})}export{k as default};