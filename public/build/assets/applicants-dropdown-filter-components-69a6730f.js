import{r as s,j as e}from"./app-a38c20d9.js";import{D as g}from"./index-1f832939.js";import{B as x}from"./button-17307643.js";import"./LeftOutlined-3156f812.js";import"./presets-490ebc63.js";import"./AntdIcon-13630a05.js";import"./index-0b3a26a0.js";import"./useId-cb27096a.js";import"./index-227a9330.js";import"./useZIndex-e5bae908.js";import"./useSize-b76cc852.js";import"./Compact-784794a1.js";import"./ContextIsolator-4898b4fd.js";import"./asyncToGenerator-0b1de8dc.js";import"./KeyCode-aaf7665e.js";import"./PurePanel-5ba12f79.js";import"./index-d6006951.js";import"./collapse-97de76d4.js";import"./render-85b81fbb.js";function L({filterData:l}){const[i,o]=s.useState(!1),[r,a]=s.useState([]),c=()=>{o(!i)},t=m=>{const{value:n,checked:p}=m.target;a(p?[...r,n]:r.filter(u=>u!==n))},d=[{key:"1",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Pending",type:"checkbox",value:"Pending",checked:r.includes("Pending"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Pending",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Pending"})]})},{key:"2",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Initial Phase",type:"checkbox",value:"Initial Phase",checked:r.includes("Initial Phase"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"fitbit",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Initial Phase"})]})},{key:"3",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Final Phase",type:"checkbox",value:"Final Phase",checked:r.includes("Final Phase"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Final Phase",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Final Phase"})]})},{key:"4",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Passed",type:"checkbox",value:"Passed",checked:r.includes("Passed"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Passed",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Passed"})]})},{key:"5",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Failed",type:"checkbox",value:"Failed",checked:r.includes("Failed"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Failed",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Failed"})]})},{key:"6",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Probationary",type:"checkbox",value:"Probationary",checked:r.includes("Probationary"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Probationary",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Probationary"})]})}];return s.useEffect(()=>{l(r)},[r]),e.jsx("div",{children:e.jsx(g,{menu:{items:d},autoFocus:!0,open:i,onOpenChange:c,placement:"bottomLeft",arrow:!0,trigger:["click"],children:e.jsx(x,{type:"primary",size:"large",children:"Filter by category"})})})}export{L as default};