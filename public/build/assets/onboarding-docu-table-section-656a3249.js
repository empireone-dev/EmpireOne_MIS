import{r as p,b as y,j as t}from"./app-62b5ebaa.js";import{H as C}from"./main-9d5726a8.js";import{h as k}from"./moment-a9aaa855.js";import D from"./add-onboarding-docu-section-8a362091.js";import v from"./onboarding-menu-button-sections-1738a353.js";import{T as _,I as w,S as u}from"./Table-4040e2fb.js";import{S as T}from"./index-38316397.js";import{B as n}from"./button-4ffb358a.js";import"./summernote-2f325838.js";import"./UnorderedListOutlined-0c7effb6.js";import"./presets-463863c6.js";import"./AntdIcon-d5231a29.js";import"./onboarding-docu-thunk-7825e328.js";import"./onboading-doc-service-0287421f.js";import"./index-055ee658.js";import"./index-408febe5.js";import"./render-c5e68dcb.js";import"./asyncToGenerator-b4664d6d.js";import"./CheckCircleFilled-bd23b91f.js";import"./CloseCircleFilled-15fc6c63.js";import"./InfoCircleFilled-fb1cc4b6.js";import"./useZIndex-23e93c6a.js";import"./useId-8a7e6d05.js";import"./CloseOutlined-69cfb2a4.js";import"./index-0b644e77.js";import"./pickAttrs-c39b57d6.js";import"./ContextIsolator-af1fcc42.js";import"./useSize-35d6e2ee.js";import"./Compact-914b018d.js";import"./useClosable-19de31a3.js";import"./useLocale-a93b4d95.js";import"./PurePanel-7c150b65.js";import"./index-5562dec6.js";import"./LoadingOutlined-6e2cb589.js";import"./PlusSquareTwoTone-ca84596d.js";import"./edit-onboarding-document-component-79215bfa.js";import"./index-c27c4d05.js";import"./index-a8bad4b0.js";import"./LeftOutlined-cbb65ec1.js";import"./collapse-97de76d4.js";import"./view-onboarding-document-b05d5f66.js";import"./DownOutlined-97885799.js";import"./EditOutlined-9d9d6c20.js";import"./EyeOutlined-ad223f6d.js";import"./addEventListener-346d85bc.js";import"./useBreakpoint-07286cf4.js";import"./useForceUpdate-3cb26160.js";import"./CheckOutlined-d4271da3.js";import"./index-bd9773ae.js";import"./FileOutlined-e0b597f1.js";import"./FolderOpenOutlined-5ea30f50.js";import"./HolderOutlined-c3311687.js";function wt(){const[g,s]=p.useState(""),[x,l]=p.useState(""),{onboarding_docs:f}=y(r=>r.onboarding_docs),c=p.useRef(null),d=(r,o,e)=>{o(),s(r[0]),l(e)},j=r=>{r(),s("")},m=r=>({filterDropdown:({setSelectedKeys:o,selectedKeys:e,confirm:a,clearFilters:h,close:b})=>t.jsxs("div",{style:{padding:8},onKeyDown:i=>i.stopPropagation(),children:[t.jsx(w,{ref:c,placeholder:`Search ${r}`,value:e[0],onChange:i=>o(i.target.value?[i.target.value]:[]),onPressEnter:()=>d(e,a,r),style:{marginBottom:8,display:"block"}}),t.jsxs(T,{children:[t.jsx(n,{type:"primary",onClick:()=>d(e,a,r),icon:t.jsx(u,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(n,{onClick:()=>h&&j(h),size:"small",style:{width:90},children:"Reset"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{a({closeDropdown:!1}),s(e[0]),l(r)},children:"Filter"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{b()},children:"close"})]})]}),filterIcon:o=>t.jsx(u,{style:{color:o?"#1677ff":void 0}}),onFilter:(o,e)=>e[r].toString().toLowerCase().includes(o.toLowerCase()),onFilterDropdownOpenChange:o=>{o&&setTimeout(()=>{var e;return(e=c.current)==null?void 0:e.select()},100)},render:o=>x===r?t.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[g],autoEscape:!0,textToHighlight:o?o.toString():""}):o}),S=[{title:"ID #",dataIndex:"id",key:"emp_id",...m("emp_id")},{title:"Document Name",dataIndex:"doc_name",key:"doc_name",...m("doc_name")},{title:"Date Created",dataIndex:"created",key:"created",...m("created"),render:(r,o)=>t.jsx("div",{className:"gap-1.5 flex",children:k(o.created).format("LLL")})},{title:"Action",dataIndex:"action",render:(r,o)=>t.jsx(v,{data:o})}];return t.jsxs("div",{children:[t.jsx("div",{children:t.jsx("div",{className:"flex items-center gap-x-3 mb-4",children:t.jsxs("h2",{className:"text-lg font-medium text-gray-800",children:[t.jsx("b",{children:"Onboarding Documents"}),t.jsx(D,{})]})})}),t.jsx(_,{columns:S,dataSource:f}),";"]})}export{wt as default};