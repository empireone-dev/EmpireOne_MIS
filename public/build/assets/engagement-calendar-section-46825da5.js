import{r as a,j as r}from"./app-9f33efc9.js";import l from"./calendar-tab-section-d3972664.js";import n from"./both-site-tab-section-2f67dacf.js";import s from"./table-tab-section-65015f7a.js";import"./calendar-component-83625451.js";import"./ChevronDownIcon-934f7360.js";import"./portal-928f3771.js";import"./use-server-handoff-complete-b4ba7ec0.js";import"./floating-ui.dom-fef0eb7a.js";import"./main-1bc2ad6c.js";import"./moment-a9aaa855.js";import"./Table-22fde7aa.js";import"./presets-9016d8c1.js";import"./index-f209aef9.js";import"./index-5c4735b9.js";import"./useId-4c8264f6.js";import"./useZIndex-842edc34.js";import"./useSize-131cb1e1.js";import"./AntdIcon-df3d5d9a.js";import"./Compact-59bba936.js";import"./ContextIsolator-806fd2ef.js";import"./asyncToGenerator-58dc0849.js";import"./pickAttrs-c9513ad0.js";import"./addEventListener-fe1d22c9.js";import"./DownOutlined-19f243a4.js";import"./button-02023954.js";import"./render-df19e14a.js";import"./KeyCode-ab35bf0c.js";import"./index-2de49e1a.js";import"./LeftOutlined-8ea79cc2.js";import"./PurePanel-b854e6ca.js";import"./index-265b3ce3.js";import"./collapse-97de76d4.js";import"./useLocale-996ea218.js";import"./useBreakpoint-95547406.js";import"./useForceUpdate-4b585886.js";import"./CheckOutlined-45370998.js";import"./CloseCircleFilled-3cc945f7.js";import"./CloseOutlined-883ad826.js";import"./index-851cd320.js";import"./FileOutlined-57005106.js";import"./FolderOpenOutlined-f3658b1c.js";import"./HolderOutlined-e217c8a7.js";import"./EyeOutlined-e147c9b4.js";function m(){return r.jsx("div",{class:"lg:flex lg:h-full lg:flex-col",children:r.jsx(l,{})})}function p(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(s,{})})}function d(){return r.jsx("div",{class:"mx-auto ",children:r.jsx(n,{})})}function er(){const[t,o]=a.useState("Calendar"),e=i=>{o(i)};return r.jsxs("div",{children:[r.jsx("div",{class:"text-sm font-medium text-center text-gray-500 border-b border-gray-200  ",children:r.jsxs("ul",{class:"flex flex-wrap -mb-px",children:[r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Calendar"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Calendar"),children:"Calendar View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Table"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Table"),children:"Table View"})}),r.jsx("li",{class:"me-2",children:r.jsx("a",{href:"#",className:`inline-block p-4 ${t==="Both"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"}`,onClick:()=>e("Both"),children:"Both Site Calendar"})})]})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Calendar"?"opacity-100":"opacity-0"}`,children:t==="Calendar"&&r.jsx(m,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Table"?"opacity-100":"opacity-0"}`,children:t==="Table"&&r.jsx(p,{})}),r.jsx("div",{className:`transition-opacity duration-500 ease-in-out ${t==="Both"?"opacity-100":"opacity-0"}`,children:t==="Both"&&r.jsx(d,{})})]})}export{er as default};