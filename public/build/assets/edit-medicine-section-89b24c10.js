import{r as i,j as e,c as u}from"./app-62b5ebaa.js";import{u as f}from"./medicine-record-thunk-fcd4f751.js";import{m as x}from"./index-5562dec6.js";import{M as b}from"./index-c27c4d05.js";import{M as g}from"./index-055ee658.js";import"./index-408febe5.js";import"./presets-463863c6.js";import"./render-c5e68dcb.js";import"./asyncToGenerator-b4664d6d.js";import"./CheckCircleFilled-bd23b91f.js";import"./AntdIcon-d5231a29.js";import"./CloseCircleFilled-15fc6c63.js";import"./InfoCircleFilled-fb1cc4b6.js";import"./LoadingOutlined-6e2cb589.js";import"./useZIndex-23e93c6a.js";import"./pickAttrs-c39b57d6.js";import"./CloseOutlined-69cfb2a4.js";import"./index-a8bad4b0.js";import"./useId-8a7e6d05.js";import"./useSize-35d6e2ee.js";import"./Compact-914b018d.js";import"./ContextIsolator-af1fcc42.js";import"./LeftOutlined-cbb65ec1.js";import"./collapse-97de76d4.js";import"./button-4ffb358a.js";import"./index-0b644e77.js";import"./useClosable-19de31a3.js";import"./useLocale-a93b4d95.js";import"./PurePanel-7c150b65.js";function W({data:n,label:l,icon:a}){const[t,s]=i.useState({}),[c,p]=x.useMessage(),[m,o]=i.useState(!1);i.useEffect(()=>{s(n)},[]);function d(r){r.preventDefault();try{u.dispatch(f(t)),c.success("Updated Successfully"),o(!1)}catch{c.error("error")}}return e.jsxs("div",{children:[p,e.jsxs(b.Item,{icon:a,children:[e.jsx("button",{onClick:()=>o(!0),children:l}),e.jsx(g,{title:l,centered:!0,open:m,onOk:()=>o(!1),onCancel:()=>o(!1),width:1e3,footer:null,children:e.jsxs("form",{class:"w-full",onSubmit:d,children:[e.jsxs("div",{class:"flex flex-wrap -mx-3 mb-6",children:[e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine"}),e.jsx("input",{defaultValue:t==null?void 0:t.medicine,onChange:r=>s({...t,medicine:r.target.value}),name:"medicine",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine Type"}),e.jsx("input",{defaultValue:t==null?void 0:t.med_type,onChange:r=>s({...t,med_type:r.target.value}),name:"med_type",class:"appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]}),e.jsxs("div",{class:"w-full px-3",children:[e.jsx("label",{class:"block uppercase tracking-wide text-xs font-bold mb-1 mt-2",for:"grid-text",children:"Medicine Description"}),e.jsx("textarea",{defaultValue:t==null?void 0:t.med_desc,onChange:r=>s({...t,med_desc:r.target.value}),name:"med_desc",class:"appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"text"})]})]}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>o(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",onClick:d,type:"submit",children:"Save Changes"})]})]})})]},n.key)]})}export{W as default};