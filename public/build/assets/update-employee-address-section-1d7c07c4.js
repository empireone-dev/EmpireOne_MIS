import{r as n,b as h,u as H,j as t,e as v,p as m}from"./app-73b46094.js";import{r as A,p as E,c as k,b as M}from"./barangay-94589600.js";import J from"./input-d59d718d.js";import p from"./select-ad26f257.js";import{e as V}from"./employee-section-thunk-18ce3448.js";import{g as D}from"./final-rate-thunk-97fdb272.js";import{a as L}from"./index-7f86f1b9.js";import{e as P}from"./presets-73c987c9.js";import{A as R}from"./AntdIcon-d3507f1a.js";import{M as U}from"./index-60e8455b.js";import{m as B}from"./index-f1383bf4.js";import"./employee-service-a53a4f62.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-2c0554fb.js";import"./useId-9ba4889a.js";import"./index-d93f8a93.js";import"./useZIndex-e8c3093a.js";import"./useSize-d7f92a55.js";import"./Compact-0fc6e86e.js";import"./ContextIsolator-e4aba7cb.js";import"./asyncToGenerator-bb14fadb.js";import"./render-4c9a3ffe.js";import"./CheckCircleFilled-dc013a69.js";import"./CloseCircleFilled-0176334f.js";import"./InfoCircleFilled-b4caf32f.js";import"./button-4029560c.js";import"./CloseOutlined-b9197a42.js";import"./index-626462f0.js";import"./KeyCode-1cd0ccde.js";import"./pickAttrs-7a971b97.js";import"./fade-967bd62f.js";import"./useClosable-83783234.js";import"./useLocale-827cb8d2.js";import"./PurePanel-a779799e.js";var I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"}}]},name:"home",theme:"outlined"};const T=I;var z=function(i,o){return n.createElement(R,P({},i,{ref:o,icon:T}))},F=n.forwardRef(z);const y=F;function Se(){const[f,i]=n.useState(null),{applicantForm:o}=h(e=>e.applicants),{applicant:d}=h(e=>e.final_rate),[b,_]=n.useState([]),[j,w]=n.useState([]),[N,S]=n.useState([]),[g,x]=n.useState(null),c=H(),O=window.location.pathname.split("/")[5];function C(){i(!0)}async function u(e){e.preventDefault(),x(!0);try{await v.dispatch(V(o)),await v.dispatch(D(O)),i(!1)}catch(a){B.error(a.message||"Error updating address")}finally{x(!1)}}function r(e){if(e.target.name=="region"){const a=JSON.parse(e.target.value),l=E.filter(s=>s.region_code===a.region_code);_(l),c(m({...o,[e.target.name]:a.name}))}else if(e.target.name=="province"){const a=JSON.parse(e.target.value),l=k.filter(s=>s.province_code===a.province_code);w(l),c(m({...o,[e.target.name]:a.name}))}else if(e.target.name=="city"){const a=JSON.parse(e.target.value),l=M.filter(s=>s.city_code===a.city_code);S(l),c(m({...o,[e.target.name]:a.name}))}else c(m({...o,id:d==null?void 0:d.id,[e.target.name]:e.target.value}))}return t.jsxs(t.Fragment,{children:[t.jsx(L,{title:"Update New Address",children:t.jsx("div",{children:t.jsx("button",{type:"button",className:"text-2xl ml-2",onClick:C,children:t.jsx(y,{})})})}),t.jsx(U,{title:"Update Address",visible:f,onOk:u,onCancel:()=>i(!1),width:1e3,okText:"Update",cancelText:"Cancel",footer:null,children:t.jsxs("form",{className:"w-full h-full",onSubmit:u,children:[t.jsxs("div",{children:[t.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[t.jsx("div",{className:"flex flex-col w-full",children:t.jsx(p,{onChange:e=>r(e),options:A.map(e=>({label:e.region_name,value:JSON.stringify({name:e.region_name,region_code:e.region_code})})),name:"region",label:"Region"})}),t.jsx("div",{className:"flex flex-col w-full",children:t.jsx(p,{onChange:e=>r(e),options:b.map(e=>({label:e.province_name,value:JSON.stringify({name:e.province_name,province_code:e.province_code})})),name:"province",label:"Province"})}),t.jsx("div",{className:"flex flex-col w-full",children:t.jsx(p,{onChange:e=>r(e),options:j.map(e=>({label:e.city_name,value:JSON.stringify({name:e.city_name,city_code:e.city_code})})),name:"city",label:"City/Municipality"})})]}),t.jsxs("div",{className:"flex flex-1 gap-1 mb-4",children:[t.jsx("div",{className:"w-1/2 pr-3",children:t.jsx(p,{onChange:e=>r(e),options:N.map(e=>({label:e.brgy_name,value:e.brgy_name})),name:"brgy",label:"Barangay"})}),t.jsx("div",{className:"flex flex-col w-full",children:t.jsx(J,{onChange:e=>r(e),value:o.lot||"",name:"lot",label:"House/Lot No., Street, Purok/Sitio",type:"text"})})]})]}),t.jsx("div",{className:"flex flex-col -mx-3",children:t.jsx("div",{className:"flex items-center justify-center p-1.5 px-2 mt-1",children:t.jsxs("button",{type:"submit",className:` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${g?"cursor-not-allowed opacity-75":""}`,onClick:u,disabled:g,children:[t.jsx(y,{})," UPDATE NEW ADDRESS"]})})})]})})]})}export{Se as default};