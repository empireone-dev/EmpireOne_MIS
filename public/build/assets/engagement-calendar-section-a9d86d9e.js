import{r as a,j as r}from"./app-5903bcdc.js";import l from"./calendar-tab-section-f2768ffe.js";import n from"./both-site-tab-section-597c7dc3.js";import s from"./table-tab-section-5c6f76f0.js";import"./calendar-component-c3653c09.js";import"./ChevronDownIcon-5c711aa6.js";import"./portal-0b8f5f3f.js";import"./use-server-handoff-complete-93e9c6ac.js";import"./floating-ui.dom-fef0eb7a.js";import"./main-77b662b0.js";import"./moment-a9aaa855.js";import"./Table-66f43769.js";import"./presets-ac6d2c0f.js";import"./index-a2a66e96.js";import"./index-0f76888d.js";import"./useId-6966ca54.js";import"./useZIndex-79d8cff9.js";import"./useSize-d214a582.js";import"./AntdIcon-567c410e.js";import"./Compact-1e3d859e.js";import"./ContextIsolator-7d8b47d5.js";import"./asyncToGenerator-71d13e75.js";import"./pickAttrs-436cebda.js";import"./addEventListener-6176f8ae.js";import"./DownOutlined-a3db3c88.js";import"./button-d3ea38b4.js";import"./render-4b6d5da1.js";import"./KeyCode-8bfe2c69.js";import"./index-8f1aafcd.js";import"./LeftOutlined-d60bca4f.js";import"./PurePanel-521b647a.js";import"./index-ab6764a2.js";import"./collapse-97de76d4.js";import"./useLocale-beb3b3ad.js";import"./useBreakpoint-b24cb66a.js";import"./useForceUpdate-4c280bef.js";import"./CheckOutlined-a3ac31a0.js";import"./CloseCircleFilled-697206b5.js";import"./CloseOutlined-e89cbee7.js";import"./index-0c08cd8e.js";import"./FileOutlined-6cbcdcee.js";import"./FolderOpenOutlined-d680583b.js";import"./HolderOutlined-4c0450e4.js";import"./EyeOutlined-c52f0cbc.js";function m(){return r.jsx("div",{class:"lg:flex lg:h-full lg:flex-col",children:r.jsx(l,{})})}function p(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(s,{})})}function d(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(n,{})})}function er(){const[t,o]=a.useState("Calendar"),e=i=>{o(i)};return r.jsxs("div",{children:[r.jsx("div",{class:"text-sm font-medium text-center text-gray-500 border-b border-gray-200  ",children:r.jsxs("ul",{class:"flex flex-wrap -mb-px",children:[r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Calendar"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Calendar"),children:"Calendar View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Table"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Table"),children:"Table View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Both"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Both"),children:"Both Site Calendar"})})]})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Calendar"?"opacity-100":"opacity-0"}`,children:t==="Calendar"&&r.jsx(m,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Table"?"opacity-100":"opacity-0"}`,children:t==="Table"&&r.jsx(p,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Both"?"opacity-100":"opacity-0"}`,children:t==="Both"&&r.jsx(d,{})})]})}export{er as default};