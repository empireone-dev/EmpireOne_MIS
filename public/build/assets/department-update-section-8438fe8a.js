import{r as s,b as x,j as r,e as a}from"./app-9f33efc9.js";import{u as j,g as y}from"./department-thunk-794d296d.js";import b from"./input-2b5528c4.js";import{P as v}from"./PencilSquareIcon-c24a62c3.js";import{M as w}from"./index-7e3e9310.js";import{m as c}from"./index-fcd12960.js";import"./erf-record-service-a3a3b2cc.js";import"./index-f209aef9.js";import"./presets-9016d8c1.js";import"./render-df19e14a.js";import"./AntdIcon-df3d5d9a.js";import"./asyncToGenerator-58dc0849.js";import"./CheckCircleFilled-6ff47d43.js";import"./CloseCircleFilled-3cc945f7.js";import"./InfoCircleFilled-1d84c44c.js";import"./useZIndex-842edc34.js";import"./useId-4c8264f6.js";import"./button-02023954.js";import"./Compact-59bba936.js";import"./useSize-131cb1e1.js";import"./CloseOutlined-883ad826.js";import"./index-80874a1a.js";import"./KeyCode-ab35bf0c.js";import"./pickAttrs-c9513ad0.js";import"./fade-ec6a1f02.js";import"./ContextIsolator-806fd2ef.js";import"./useClosable-d4fd10ba.js";import"./useLocale-996ea218.js";import"./PurePanel-b854e6ca.js";function Y({data:t}){const[u,i]=s.useState(!1),[o,n]=s.useState({}),[d,p]=s.useState(!1),{users:m}=x(e=>e.app);s.useEffect(()=>{var e;n({id:t==null?void 0:t.id,dept:(t==null?void 0:t.dept)||"",depthead:((e=t==null?void 0:t.user)==null?void 0:e.id)||""})},[]);const f=()=>{i(!0)};console.log("datsssa",t);async function l(e){e.preventDefault(),p(!0);try{await a.dispatch(j({...o,id:t.id})),await a.dispatch(y()),c.success("Updated Successfully!"),i(!1)}catch(h){c.error("Failed to update. Please try again."),console.error(h)}finally{p(!1)}}const g=()=>{var e;i(!1),n({dept:(t==null?void 0:t.dept)||"",depthead:((e=t==null?void 0:t.user)==null?void 0:e.id)||""})};return r.jsxs("div",{children:[r.jsx("button",{type:"button",onClick:f,className:"text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center",children:r.jsx(v,{className:"h-6"})}),r.jsx(w,{title:"Edit Department",open:u,onOk:l,onCancel:g,confirmLoading:d,okText:"Update",children:r.jsx("form",{className:"w-full pb-4",onSubmit:l,children:r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsx("h1",{children:"Department Information"}),r.jsx(b,{onChange:e=>n({...o,dept:e.target.value}),value:o==null?void 0:o.dept,name:"dept",label:"Department's Name",type:"text"}),r.jsx("select",{className:"border p-2 rounded-md w-full",onChange:e=>n({...o,depthead:e.target.value}),value:o.depthead,children:Array.isArray(m)&&m.filter(e=>["Manager","Account Manager","Operations Manager","Director","CEO"].includes(e.position)).map(e=>r.jsx("option",{value:e.id,children:`${e.employee_fname} ${e.employee_lname}`},e.id))})]})})})]})}export{Y as default};