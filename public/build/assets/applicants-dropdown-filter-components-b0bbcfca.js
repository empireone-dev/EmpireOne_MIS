import{r as s,j as e}from"./app-482355be.js";import{D as g}from"./index-74f67030.js";import{B as x}from"./button-120bbd6a.js";import"./LeftOutlined-d4f7e3bf.js";import"./presets-3fad3b18.js";import"./AntdIcon-b997608a.js";import"./index-5c96ec32.js";import"./useId-2195e329.js";import"./index-44babc8d.js";import"./useZIndex-87e47ffd.js";import"./useSize-df0f8805.js";import"./Compact-8ea0c993.js";import"./ContextIsolator-a3a66f8f.js";import"./asyncToGenerator-be697f7b.js";import"./PurePanel-16bebe29.js";import"./index-3d0ae574.js";import"./collapse-97de76d4.js";import"./render-a51f93ee.js";import"./LoadingOutlined-a370997b.js";function L({filterData:l}){const[i,o]=s.useState(!1),[r,a]=s.useState([]),c=()=>{o(!i)},t=m=>{const{value:n,checked:p}=m.target;a(p?[...r,n]:r.filter(u=>u!==n))},d=[{key:"1",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Pending",type:"checkbox",value:"Pending",checked:r.includes("Pending"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Pending",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Pending"})]})},{key:"2",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Initial Phase",type:"checkbox",value:"Initial Phase",checked:r.includes("Initial Phase"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"fitbit",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Initial Phase"})]})},{key:"3",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Final Phase",type:"checkbox",value:"Final Phase",checked:r.includes("Final Phase"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Final Phase",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Final Phase"})]})},{key:"4",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Passed",type:"checkbox",value:"Passed",checked:r.includes("Passed"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Passed",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Passed"})]})},{key:"5",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Failed",type:"checkbox",value:"Failed",checked:r.includes("Failed"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Failed",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Failed"})]})},{key:"6",label:e.jsxs("div",{class:"flex items-center",children:[e.jsx("input",{id:"Probationary",type:"checkbox",value:"Probationary",checked:r.includes("Probationary"),onChange:t,class:"w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "}),e.jsx("label",{for:"Probationary",class:"ml-2 text-sm font-medium text-gray-900 ",children:"Probationary"})]})}];return s.useEffect(()=>{l(r)},[r]),e.jsx("div",{children:e.jsx(g,{menu:{items:d},autoFocus:!0,open:i,onOpenChange:c,placement:"bottomLeft",arrow:!0,trigger:["click"],children:e.jsx(x,{type:"primary",size:"large",children:"Filter by category"})})})}export{L as default};