import{r,b as m,u as p,j as e,M as c,e as f}from"./app-753af2e0.js";import{s as x}from"./guide-question-thunk-b8e1cb13.js";import{e as g}from"./presets-d249989d.js";import{A as h}from"./AntdIcon-b9d997e7.js";import{M as b}from"./index-466f17d2.js";import"./index-4bceb124.js";import"./render-3a896346.js";import"./asyncToGenerator-abcd90ca.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./useZIndex-a79cfede.js";import"./useId-6f6c842e.js";import"./button-873ff8d7.js";import"./Compact-9246895f.js";import"./useSize-27c5a9ae.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./KeyCode-bde7e4ef.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./ContextIsolator-765e5922.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./PurePanel-def41e9a.js";var v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.6-9.4-22.6zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM402 549c0 5.4 4.4 9.5 9.8 9.5h32.4c5.4 0 9.8-4.2 9.8-9.4 0-28.2 25.8-51.6 58-51.6s58 23.4 58 51.5c0 25.3-21 47.2-49.3 50.9-19.3 2.8-34.5 20.3-34.7 40.1v32c0 5.5 4.5 10 10 10h32c5.5 0 10-4.5 10-10v-12.2c0-6 4-11.5 9.7-13.3 44.6-14.4 75-54 74.3-98.9-.8-55.5-49.2-100.8-108.5-101.6-61.4-.7-111.5 45.6-111.5 103zm78 195a32 32 0 1064 0 32 32 0 10-64 0z"}}]},name:"file-unknown",theme:"outlined"};const w=v;var k=function(o,n){return r.createElement(h,g({},o,{ref:n,icon:w}))},j=r.forwardRef(k);const y=j;function P(){const[s,o]=r.useState(!1),{guideqForm:n}=m(t=>t.guideqs);console.log("guideq",n);const l=p(),u=()=>{o(!1)};function d(t){const i=t.target.name;i=="image"?l(c({...n,[i]:t.target.files})):l(c({...n,[i]:t.target.value}))}function a(t){t.preventDefault(),f.dispatch(x(n)),o(!1),u()}return e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>o(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(y,{className:"text-xl"}),"Add Guide Question"]})}),e.jsx(b,{title:"New Guide Question",centered:!0,open:s,onOk:t=>a(t),onCancel:()=>o(!1),width:1e3,okText:"Save",cancelText:"Cancel",children:e.jsx("form",{class:"w-full",onSubmit:a,children:e.jsx("div",{class:"flex flex-wrap -mx-3 mb-6",children:e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide  text-xs font-bold mb-2",for:"grid-text",children:"Guide Question"}),e.jsx("input",{name:"guideqs",class:"appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",id:"grid-text",type:"text",placeholder:"",onChange:d})]})})})})]})}export{P as default};