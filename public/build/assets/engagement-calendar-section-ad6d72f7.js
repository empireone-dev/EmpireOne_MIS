import{r as a,j as r}from"./app-3b84976d.js";import l from"./calendar-tab-section-fb3f57de.js";import n from"./both-site-tab-section-02e8261a.js";import s from"./table-tab-section-3533c46f.js";import"./calendar-component-2960d97a.js";import"./ChevronDownIcon-a3bcf4d6.js";import"./portal-a2447bc2.js";import"./use-server-handoff-complete-d4414fc9.js";import"./floating-ui.dom-fef0eb7a.js";import"./main-63ac034b.js";import"./moment-a9aaa855.js";import"./Table-56064b43.js";import"./presets-848e2fba.js";import"./index-fb46f770.js";import"./index-d19d1f57.js";import"./useId-3d30b7d5.js";import"./useZIndex-37b4d1e8.js";import"./useSize-57d8ee82.js";import"./AntdIcon-71e46007.js";import"./Compact-1ade6323.js";import"./ContextIsolator-7b71f2c7.js";import"./asyncToGenerator-c437901c.js";import"./pickAttrs-63d008c5.js";import"./addEventListener-9dcfea1a.js";import"./DownOutlined-d51533fd.js";import"./button-e56b0dd6.js";import"./render-1396a843.js";import"./KeyCode-01d15957.js";import"./index-74ec0d27.js";import"./LeftOutlined-335d1b00.js";import"./PurePanel-46f1ca19.js";import"./index-b75547cf.js";import"./collapse-97de76d4.js";import"./useLocale-e9fef4a7.js";import"./useBreakpoint-b4080518.js";import"./useForceUpdate-db28fbf7.js";import"./CheckOutlined-4fadd5da.js";import"./CloseCircleFilled-8c07b52b.js";import"./CloseOutlined-010645d0.js";import"./index-34003c4d.js";import"./FileOutlined-8d9d2782.js";import"./FolderOpenOutlined-7caeef89.js";import"./HolderOutlined-94cb03dc.js";import"./EyeOutlined-abf0e275.js";function m(){return r.jsx("div",{class:"lg:flex lg:h-full lg:flex-col",children:r.jsx(l,{})})}function p(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(s,{})})}function d(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(n,{})})}function er(){const[t,o]=a.useState("Calendar"),e=i=>{o(i)};return r.jsxs("div",{children:[r.jsx("div",{class:"text-sm font-medium text-center text-gray-500 border-b border-gray-200  ",children:r.jsxs("ul",{class:"flex flex-wrap -mb-px",children:[r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Calendar"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Calendar"),children:"Calendar View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Table"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Table"),children:"Table View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Both"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Both"),children:"Both Site Calendar"})})]})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Calendar"?"opacity-100":"opacity-0"}`,children:t==="Calendar"&&r.jsx(m,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Table"?"opacity-100":"opacity-0"}`,children:t==="Table"&&r.jsx(p,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Both"?"opacity-100":"opacity-0"}`,children:t==="Both"&&r.jsx(d,{})})]})}export{er as default};