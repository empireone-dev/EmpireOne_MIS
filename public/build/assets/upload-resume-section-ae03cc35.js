import{r as c,j as e}from"./app-62b5ebaa.js";import{X as x}from"./XMarkIcon-a3510d25.js";import{F as m}from"./FilePdfOutlined-a9dcd42a.js";import"./presets-463863c6.js";import"./AntdIcon-d5231a29.js";function g(){const[i,s]=c.useState(null),r=t=>{if(t){const l=URL.createObjectURL(t);s(l)}else s(null)},a=t=>{const l=t.target.files[0];r(l)},d=t=>{t.preventDefault()},n=t=>{t.preventDefault(),r(t.dataTransfer.files[0])},o=()=>{s(null)};return e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900  mt-9",children:"Upload CV File"}),e.jsxs("div",{className:"w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed",onDragOver:d,onDrop:n,children:[e.jsxs("div",{className:"grid gap-1",children:[e.jsx(m,{className:"flex items-center justify-center text-4xl"}),e.jsx("h2",{className:"text-center text-gray-400 text-xs leading-4",children:"PDF File"})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("h4",{className:"text-center text-gray-900 text-sm font-medium leading-snug",children:"Drag and Drop your file here or"}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("label",{children:[e.jsx("input",{type:"file",accept:"application/pdf",hidden:!0,onChange:a}),e.jsx("div",{className:"flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none",children:"Choose File"})]})})]})]}),e.jsx("div",{children:i&&e.jsxs("div",{id:"display-area",className:"mt-4 mb-4",children:[e.jsx("div",{className:"flex flex-1 items-center justify-end w-full bg-neutral-800 rounded-t-md",children:e.jsx("div",{children:e.jsx("button",{className:" rounded-t-md text-white py-1.5 px-3 items-center justify-end",onClick:o,children:e.jsx(x,{className:"h-6"})})})}),e.jsx("iframe",{src:i,width:"100%",height:"1200px",className:"rounded-b-md",title:"Uploaded PDF File"})]})})]})}export{g as default};