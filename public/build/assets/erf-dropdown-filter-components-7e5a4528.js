import{r as i,j as e}from"./app-a38c20d9.js";import{D as g}from"./index-1f832939.js";import{B as x}from"./button-17307643.js";import"./LeftOutlined-3156f812.js";import"./presets-490ebc63.js";import"./AntdIcon-13630a05.js";import"./index-0b3a26a0.js";import"./useId-cb27096a.js";import"./index-227a9330.js";import"./useZIndex-e5bae908.js";import"./useSize-b76cc852.js";import"./Compact-784794a1.js";import"./ContextIsolator-4898b4fd.js";import"./asyncToGenerator-0b1de8dc.js";import"./KeyCode-aaf7665e.js";import"./PurePanel-5ba12f79.js";import"./index-d6006951.js";import"./collapse-97de76d4.js";import"./render-85b81fbb.js";function z({filterData:c}){const[s,l]=i.useState(!1),[r,n]=i.useState([]),a=()=>{l(!s)},t=p=>{const{value:o,checked:m}=p.target;n(m?[...r,o]:r.filter(u=>u!==o))},d=[{key:"1",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Pending",type:"checkbox",value:"Pending",checked:r.includes("Pending"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Pending",class:"ml-2 text-sm font-medium text-gray-900",children:"Pending ERF"})]})},{key:"2",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"In Review",type:"checkbox",value:"In Review",checked:r.includes("In Review"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"In Review",class:"ml-2 text-sm font-medium text-gray-900",children:"In Review ERF"})]})},{key:"3",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Approved",type:"checkbox",value:"Approved",checked:r.includes("Approved"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Approved",class:"ml-2 text-sm font-medium text-gray-900",children:"Approved ERF"})]})},{key:"4",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Declined",type:"checkbox",value:"Declined",checked:r.includes("Declined"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"}),e.jsx("label",{for:"Declined",class:"ml-2 text-sm font-medium text-gray-900",children:"Declined ERF"})]})}];return i.useEffect(()=>{c(r)},[r]),e.jsx("div",{children:e.jsx(g,{menu:{items:d},autoFocus:!0,open:s,onOpenChange:a,placement:"bottomLeft",arrow:!0,trigger:["click"],children:e.jsx(x,{type:"primary",size:"large",children:"Filter by category"})})})}export{z as default};