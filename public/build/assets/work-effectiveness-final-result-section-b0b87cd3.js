import{j as s}from"./app-63d290ed.js";import r from"./final-rate-mark-component-bae43b86.js";import{B as x}from"./BriefcaseIcon-48a76236.js";function E({data:e}){var l,o,c,n,i,m;return s.jsxs("div",{children:[s.jsxs("div",{className:"flex items-center mt-6 mb-2",children:[s.jsx(x,{className:"h-6"}),s.jsx("h1",{className:"text-2xl ml-1 font-bold",children:"WORK EFFECTIVENESS"})]}),s.jsx("hr",{className:"mb-1.5"}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"",children:s.jsx("b",{children:"WORK EFFECTIVENESS SCORE"})}),s.jsxs("div",{className:"flex flex-1 w-full gap-8 mt-1",children:[s.jsx(r,{name:"wscore",value:"1",score:(l=e==null?void 0:e.final)==null?void 0:l.wscore,rate:"1 - Very Poor"}),s.jsx(r,{name:"wscore",value:"2",score:(o=e==null?void 0:e.final)==null?void 0:o.wscore,rate:"2 - Poor"}),s.jsx(r,{name:"wscore",value:"3",score:(c=e==null?void 0:e.final)==null?void 0:c.wscore,rate:"3 - Average"}),s.jsx(r,{name:"wscore",value:"4",score:(n=e==null?void 0:e.final)==null?void 0:n.wscore,rate:"4 - Good"}),s.jsx(r,{name:"wscore",value:"5",score:(i=e==null?void 0:e.final)==null?void 0:i.cscore,rate:"5 - Excellent"})]})]}),s.jsxs("div",{className:"mt-6",children:[s.jsx("label",{htmlFor:"",children:s.jsx("b",{children:"WORK EFFECTIVENESS NOTES"})}),s.jsx("textarea",{type:"text",placeholder:"",value:(m=e==null?void 0:e.final)==null?void 0:m.wnotes,className:"border p-2 rounded w-full mt-1 h-40",readOnly:!0})]})]})}export{E as default};