import{r as i,j as e}from"./app-7d68ca85.js";import{D as g}from"./index-15749420.js";import{B as x}from"./button-30820779.js";import"./LeftOutlined-72133fab.js";import"./presets-a105bbc6.js";import"./AntdIcon-9cfc0218.js";import"./index-1d086a91.js";import"./useId-ccfb42d5.js";import"./index-2eb55d07.js";import"./useZIndex-2e09f723.js";import"./useSize-69609da4.js";import"./Compact-b3700746.js";import"./ContextIsolator-b1720554.js";import"./asyncToGenerator-ddb06381.js";import"./KeyCode-7f5cb5e5.js";import"./PurePanel-077df24c.js";import"./index-97491272.js";import"./collapse-97de76d4.js";import"./render-1607753e.js";function z({filterData:c}){const[s,l]=i.useState(!1),[r,n]=i.useState([]),a=()=>{l(!s)},t=p=>{const{value:o,checked:m}=p.target;n(m?[...r,o]:r.filter(u=>u!==o))},d=[{key:"1",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Pending",type:"checkbox",value:"Pending",checked:r.includes("Pending"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Pending",class:"ml-2 text-sm font-medium text-gray-900",children:"Pending ERF"})]})},{key:"2",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"In Review",type:"checkbox",value:"In Review",checked:r.includes("In Review"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"In Review",class:"ml-2 text-sm font-medium text-gray-900",children:"In Review ERF"})]})},{key:"3",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Approved",type:"checkbox",value:"Approved",checked:r.includes("Approved"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Approved",class:"ml-2 text-sm font-medium text-gray-900",children:"Approved ERF"})]})},{key:"4",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Declined",type:"checkbox",value:"Declined",checked:r.includes("Declined"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Declined",class:"ml-2 text-sm font-medium text-gray-900",children:"Declined ERF"})]})}];return i.useEffect(()=>{c(r)},[r]),e.jsx("div",{children:e.jsx(g,{menu:{items:d},autoFocus:!0,open:s,onOpenChange:a,placement:"bottomLeft",arrow:!0,trigger:["click"],children:e.jsx(x,{type:"primary",size:"large",children:"Filter by category"})})})}export{z as default};