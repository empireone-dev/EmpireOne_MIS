import{r as o,j as t}from"./app-12dd3627.js";import c from"./file-201-approved-section-b5929935.js";import m from"./file-201-button-declined-section-7fa8e984.js";import{e as n}from"./presets-2db74b6f.js";import{A as s}from"./AntdIcon-8b25e930.js";import{M as l}from"./index-d368cae6.js";import{I as p}from"./index-69a383f3.js";import"./pre-employment-file-service-0bba09c2.js";import"./final-rate-thunk-0b31a9c0.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-bc53da68.js";import"./file-201-declined-section-54ef6619.js";import"./index-c821828a.js";import"./floating-ui.dom-fef0eb7a.js";import"./index-4e0ea6ca.js";import"./render-a458bafb.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./button-aae57988.js";import"./Compact-9e968cf1.js";import"./useSize-ccd2c154.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./EyeOutlined-2bad6abe.js";import"./addEventListener-4ceeba21.js";import"./LeftOutlined-2fa34ff8.js";var a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1a8.11 8.11 0 01-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l229.6 271.6c2.6 3.3 2.2 8.4-1.2 11.2z"}}]},name:"picture",theme:"filled"};const u=a;var f=function(i,r){return o.createElement(s,n({},i,{ref:r,icon:u}))},d=o.forwardRef(f);const x=d;var g={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"}}]},name:"stop",theme:"outlined"};const h=g;var v=function(i,r){return o.createElement(s,n({},i,{ref:r,icon:h}))},j=o.forwardRef(v);const S=j;function ot({data:e}){const[i,r]=o.useState(!1);return t.jsxs("div",{children:[t.jsx("button",{type:"button",onClick:()=>r(!0),className:"text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center",children:t.jsx(x,{})}),t.jsxs(l,{title:e.reqs,visible:i,onCancel:()=>r(!1),width:800,footer:null,children:[e!=null&&e.reqs_img?t.jsx(p,{src:e.reqs_img}):t.jsxs("p",{className:"flex items-center justify-center text-gray-400 font-sans",children:[t.jsx(S,{})," No image available"]}),t.jsx("div",{className:"flex flex-1 gap-1.5 w-full items-center justify-center mt-3 text-white",children:e.status==="Uploaded"?t.jsxs(t.Fragment,{children:[t.jsx(c,{setOpen:r,data:e}),t.jsx(m,{setOpen:r,data:e})]}):t.jsxs("p",{className:"text-center",children:["Status: ",e.status]})})]})]})}export{ot as default};