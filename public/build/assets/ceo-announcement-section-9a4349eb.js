import{j as e}from"./app-12dd3627.js";import{C as r}from"./CalendarDaysIcon-3a0d37e6.js";function i(){const s=new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),t=new Date().getHours();let n;return t<12?n="Good morning":t<18?n="Good afternoon":n="Good evening",e.jsx("div",{children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-2xl font-medium font-sans",children:e.jsxs("b",{children:[n,", CEO"]})}),e.jsx("div",{className:"border border-black rounded-md shadow-xl p-1.5 px-3.5 items-center justify-center",children:e.jsxs("h2",{className:"text-lg font-medium flex items-center",children:[e.jsx("b",{className:"mr-1",children:e.jsx(r,{className:"h-6 text-red-600"})}),e.jsx("b",{children:s})]})})]})})}export{i as default};