import{h as i,B as m,r as p,c as e,j as o}from"./app-a38c20d9.js";import n from"./admin-layout-fe7ce55b.js";import a from"./engagement-calendar-section-5cf3d351.js";import"./admin-footer-components-36cc786a.js";import"./presets-490ebc63.js";import"./AntdIcon-13630a05.js";import"./update-profile-7eb3f974.js";import"./user-service-20506c5a.js";import"./UserOutlined-dec014fc.js";import"./index-9d513160.js";import"./index-227a9330.js";import"./render-85b81fbb.js";import"./asyncToGenerator-0b1de8dc.js";import"./CheckCircleFilled-ab80464f.js";import"./CloseCircleFilled-f6bebab3.js";import"./InfoCircleFilled-59d04494.js";import"./useZIndex-e5bae908.js";import"./useId-cb27096a.js";import"./button-17307643.js";import"./Compact-784794a1.js";import"./useSize-b76cc852.js";import"./CloseOutlined-f995126c.js";import"./index-6d9fa839.js";import"./KeyCode-aaf7665e.js";import"./pickAttrs-9206db1b.js";import"./fade-de3a406c.js";import"./ContextIsolator-4898b4fd.js";import"./useClosable-89a8d2ae.js";import"./useLocale-07fc7437.js";import"./PurePanel-5ba12f79.js";import"./index-cec043e3.js";import"./KeyIcon-aa80834e.js";import"./index-d6006951.js";import"./index-0b3a26a0.js";import"./LeftOutlined-3156f812.js";import"./collapse-97de76d4.js";import"./HolderOutlined-37106fe1.js";import"./UsergroupAddOutlined-bb5bb2ff.js";import"./FileSearchOutlined-83a3faa9.js";import"./UserDeleteOutlined-77925a66.js";import"./calendar-tab-section-615246b0.js";import"./calendar-component-8b94af54.js";import"./ChevronDownIcon-b89de436.js";import"./portal-d7d74407.js";import"./use-server-handoff-complete-cd3f6338.js";import"./floating-ui.dom-fef0eb7a.js";import"./both-site-tab-section-8d2006db.js";import"./table-tab-section-df8dc58c.js";import"./main-20e15cee.js";import"./moment-a9aaa855.js";import"./Table-43f58894.js";import"./addEventListener-bf7c6823.js";import"./DownOutlined-c18f1332.js";import"./index-1f832939.js";import"./useBreakpoint-65ba658a.js";import"./useForceUpdate-b47cc207.js";import"./CheckOutlined-a928eb33.js";import"./index-bc8fd31c.js";import"./FileOutlined-648de434.js";import"./FolderOpenOutlined-2cfd7471.js";import"./EyeOutlined-d8762945.js";async function s(){return(await i.get("/api/engagement")).data}function c(){return async function(t,g){const r=(await s()).data;console.log("result",r),t(m.actions.setEngagements(r))}}function ht(){return p.useEffect(()=>{e.dispatch(c())},[]),o.jsx(n,{children:o.jsx(a,{})})}export{ht as default};