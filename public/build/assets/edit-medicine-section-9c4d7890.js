import{r as i,j as e,c as u}from"./app-3fef3a63.js";import{u as f}from"./medicine-record-thunk-3a1d8ff8.js";import{m as x}from"./index-17ede4fa.js";import{M as b}from"./index-1bbc017a.js";import{M as g}from"./index-b28d3991.js";import"./index-aee74163.js";import"./presets-ca4e9e1b.js";import"./render-06651440.js";import"./asyncToGenerator-d91032a9.js";import"./CheckCircleFilled-ae4c12ba.js";import"./AntdIcon-f6a6858b.js";import"./CloseCircleFilled-c0e51506.js";import"./InfoCircleFilled-ffcebb9d.js";import"./LoadingOutlined-285e92e4.js";import"./KeyCode-dba4fb16.js";import"./pickAttrs-0272306c.js";import"./useZIndex-0bbceadc.js";import"./CloseOutlined-cc20978d.js";import"./index-8215846e.js";import"./useId-486ac681.js";import"./useSize-d7041e64.js";import"./Compact-7f0d1344.js";import"./ContextIsolator-7f0f291f.js";import"./LeftOutlined-697ba1d8.js";import"./collapse-97de76d4.js";import"./button-7a476b2b.js";import"./index-067d7e3e.js";import"./fade-fce3c8f0.js";import"./useClosable-e3f3eb25.js";import"./useLocale-d278345a.js";import"./PurePanel-06125fb1.js";function Y({data:n,label:l,icon:a}){const[t,s]=i.useState({}),[c,p]=x.useMessage(),[m,o]=i.useState(!1);i.useEffect(()=>{s(n)},[]);function d(r){r.preventDefault();try{u.dispatch(f(t)),c.success("Updated Successfully"),o(!1)}catch{c.error("error")}}return e.jsxs("div",{children:[p,e.jsxs(b.Item,{icon:a,children:[e.jsx("button",{onClick:()=>o(!0),children:l}),e.jsx(g,{title:l,centered:!0,open:m,onOk:()=>o(!1),onCancel:()=>o(!1),width:1e3,footer:null,children:e.jsxs("form",{class:"w-full",onSubmit:d,children:[e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine"}),e.jsx("input",{defaultValue:t==null?void 0:t.medicine,onChange:r=>s({...t,medicine:r.target.value}),name:"medicine",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine Type"}),e.jsx("input",{defaultValue:t==null?void 0:t.med_type,onChange:r=>s({...t,med_type:r.target.value}),name:"med_type",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine Description"}),e.jsx("textarea",{defaultValue:t==null?void 0:t.med_desc,onChange:r=>s({...t,med_desc:r.target.value}),name:"med_desc",class:"appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]})]}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>o(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",onClick:d,type:"submit",children:"Save Changes"})]})]})})]},n.key)]})}export{Y as default};