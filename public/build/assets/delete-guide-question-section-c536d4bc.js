import{r as s,j as e,s as p}from"./app-bafafda5.js";import{d as f}from"./guide-question-thunk-d5a92850.js";import{m as x}from"./index-76a104f8.js";import{M as h}from"./index-b1d9ec21.js";import{M as j}from"./index-11430430.js";import"./index-3489f972.js";import"./warning-3045d72d.js";import"./render-e2ad3102.js";import"./asyncToGenerator-b5e9f51a.js";import"./CheckCircleFilled-9a27eb54.js";import"./AntdIcon-a6021e08.js";import"./pickAttrs-738cc4b0.js";import"./ExclamationCircleFilled-7d4c17ea.js";import"./InfoCircleFilled-93d6a5ad.js";import"./LoadingOutlined-89f0f2bf.js";import"./useZIndex-2c590492.js";import"./CloseOutlined-82d8888b.js";import"./index-473fd553.js";import"./zoom-6001308e.js";import"./useSize-f4859fa4.js";import"./Compact-053f96f5.js";import"./button-53cc1c49.js";import"./useClosable-e8a84018.js";import"./useLocale-2928605e.js";import"./PurePanel-e7c2c981.js";function J({data:r,label:o,icon:l}){const[a,n]=s.useState({}),[i,m]=x.useMessage(),[u,t]=s.useState(!1);s.useEffect(()=>{n(r)},[]);function c(d){d.preventDefault();try{p.dispatch(f(a.id)),i.success("Deleted Successfully"),t(!1)}catch{i.error("error")}}return e.jsxs("div",{children:[m,e.jsxs(h.Item,{icon:l,children:[e.jsx("button",{onClick:()=>t(!0),children:o}),e.jsx(j,{title:o,centered:!0,visible:u,footer:null,onOk:()=>t(!1),onCancel:()=>t(!1),width:520,okText:"Save Changes",cancelText:"Cancel",children:e.jsx("div",{className:"w-full",children:e.jsx("div",{className:"flex flex-wrap -mx-3",children:e.jsx("div",{className:"w-full px-3",children:e.jsx("form",{onSubmit:c,className:"w-full",children:e.jsxs("div",{children:[e.jsx("p",{children:"Are you sure you want to delete this question?"}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>t(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",type:"submit",children:"Delete"})]})]})})})})})})]},r.key)]})}export{J as default};