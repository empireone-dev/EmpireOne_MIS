import{r,b as x,e as u,j as e}from"./app-753af2e0.js";import"./main-9636dc9e.js";import{A as c}from"./add-attrition-section-9a5ac795.js";import{g as h}from"./employee-section-thunk-b62082cf.js";import f from"./attrition-menu-section-28a43e49.js";import{h as l}from"./moment-a9aaa855.js";import{T as y}from"./Table-4e6f0df9.js";import{T as o}from"./index-8c7e70f9.js";import"./user-service-797727e7.js";import"./index-466f17d2.js";import"./index-4bceb124.js";import"./presets-d249989d.js";import"./render-3a896346.js";import"./AntdIcon-b9d997e7.js";import"./asyncToGenerator-abcd90ca.js";import"./CheckCircleFilled-af37935f.js";import"./CloseCircleFilled-ff830d80.js";import"./InfoCircleFilled-93bf1e9f.js";import"./useZIndex-a79cfede.js";import"./useId-6f6c842e.js";import"./button-873ff8d7.js";import"./Compact-9246895f.js";import"./useSize-27c5a9ae.js";import"./CloseOutlined-4479ae24.js";import"./index-15cb16f5.js";import"./KeyCode-bde7e4ef.js";import"./pickAttrs-73f2a9e8.js";import"./fade-4eb13914.js";import"./ContextIsolator-765e5922.js";import"./useClosable-dd2c3227.js";import"./useLocale-1fb32241.js";import"./PurePanel-def41e9a.js";import"./UserAddOutlined-a5369efa.js";import"./index-adb8e5ea.js";import"./UserDeleteOutlined-3dc22951.js";import"./employee-service-e33dc814.js";import"./applicant-final-service-912b1e89.js";import"./file-201-component-371abc29.js";import"./index-a5be535f.js";import"./index-b31ab175.js";import"./LeftOutlined-cd9ffefc.js";import"./collapse-97de76d4.js";import"./attrition-reason-components-d3e065d2.js";import"./attrition-exit-interview-component-c09a36ed.js";import"./index-45b52881.js";import"./FileSearchOutlined-028ae52e.js";import"./FolderOpenOutlined-48b31105.js";import"./DeliveredProcedureOutlined-f5246290.js";import"./DownOutlined-d2001029.js";import"./addEventListener-e12acff0.js";import"./useBreakpoint-c17c223a.js";import"./useForceUpdate-68311461.js";import"./CheckOutlined-9fad5569.js";import"./index-7d483204.js";import"./FileOutlined-e063f41c.js";import"./HolderOutlined-8450d39e.js";import"./EyeOutlined-d5f2209d.js";function gt(){r.useState(""),r.useState(""),r.useRef(null);const{employee_attritions:m}=x(a=>a.employee_attritions);console.log("attrition",m),r.useEffect(()=>{u.dispatch(h())},[]);const d=[{title:"Employee No.",dataIndex:"emp_id",key:"emp_id"},{title:"Employee Name",dataIndex:"fullname",key:"fullname",render:(a,t,i)=>{var p,s,n;return e.jsxs("div",{children:[(p=t==null?void 0:t.applicant)==null?void 0:p.fname," ",(s=t==null?void 0:t.applicant)==null?void 0:s.mname," ",(n=t==null?void 0:t.applicant)==null?void 0:n.lname]},i)}},{title:"Position",dataIndex:"position",key:"position"},{title:"Department",dataIndex:"dept",key:"dept"},{title:"Hired",dataIndex:"hired",key:"hired",render:(a,t)=>e.jsx("div",{className:"gap-1.5 flex",children:t.hired?l(t.hired).format("LL"):""})},{title:"Separation",dataIndex:"separation",key:"separation",render:(a,t)=>e.jsx("div",{className:"gap-1.5 flex",children:t.separation?l(t.separation).format("LL"):""})},{title:"Employment Status",dataIndex:"status",key:"status",render:(a,t)=>{let i="";switch(t.status){case"Probationary":i="#52D017";break;case"Regular":i="#43BFC7";break}return e.jsx(o,{color:i,children:t.status},t.key)}},{title:"Reason for Separation",dataIndex:"reas",key:"reas",render:(a,t)=>e.jsx(o,{color:"#FF0000",children:t.reas},t.key)},{title:"Exit Clearance Status",dataIndex:"estatus",key:"estatus",render:(a,t)=>{let i="";switch(t.estatus){case"Pending":i="#E1AD01";break;case"Cleared":i="#52D017";break}return e.jsx(o,{color:i,children:t.estatus},t.key)}},{title:"Action",dataIndex:"action",render:(a,t)=>e.jsx("h1",{children:e.jsx(f,{data:t})})}];return e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:e.jsx("b",{children:"Employee Attrition Records"})})})}),e.jsx(c,{}),e.jsx(y,{columns:d,dataSource:m}),";"]})}export{gt as default};