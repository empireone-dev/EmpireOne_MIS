import{r as o,j as e,c as u}from"./app-63d290ed.js";import{d as f}from"./medicine-record-thunk-ddb7df67.js";import{m as x}from"./index-9d2c8c61.js";import{M as h}from"./index-67c61ede.js";import{M as j}from"./index-ccb87f83.js";import"./index-d8b89dfe.js";import"./presets-9872d8f0.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./AntdIcon-d99b3c04.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./LoadingOutlined-8390b05c.js";import"./useZIndex-dc62b87b.js";import"./pickAttrs-8fbf8c8c.js";import"./CloseOutlined-a4ab623b.js";import"./index-2cdf993a.js";import"./useId-ad7dc23b.js";import"./useSize-3c640658.js";import"./Compact-641d596c.js";import"./ContextIsolator-63f8fbab.js";import"./LeftOutlined-a441e7f6.js";import"./collapse-97de76d4.js";import"./button-082e41af.js";import"./index-dee3d1b8.js";import"./useClosable-eb9686b6.js";import"./useLocale-29929ee3.js";import"./PurePanel-1f85830c.js";function U({data:r,label:i,icon:m}){const[n,l]=o.useState({}),[s,p]=x.useMessage(),[c,t]=o.useState(!1);o.useEffect(()=>{l(r)},[]);function d(a){a.preventDefault();try{u.dispatch(f(n.id)),s.success("Deleted Successfully"),t(!1)}catch{s.error("error")}}return e.jsxs("div",{children:[p,e.jsxs(h.Item,{icon:m,children:[e.jsx("button",{onClick:()=>t(!0),children:i}),e.jsx(j,{title:i,centered:!0,visible:c,onOk:()=>t(!1),onCancel:()=>t(!1),footer:null,children:e.jsx("form",{onSubmit:d,children:e.jsxs("div",{children:[e.jsxs("p",{children:["Are you sure you want to delete ",e.jsx("b",{children:r.medicine})," ?"]}),e.jsxs("div",{className:"flex flex-1 gap-1.5 justify-end mt-1",children:[e.jsx("button",{className:"flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300",onClick:()=>t(!1),type:"button",children:"Cancel"}),e.jsx("button",{className:"flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500",type:"submit",children:"Delete"})]})]})})})]},r.key)]})}export{U as default};