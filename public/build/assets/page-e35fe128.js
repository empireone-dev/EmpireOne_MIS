import{h as i,B as m,r as p,e,j as o}from"./app-12dd3627.js";import n from"./admin-layout-b312bd76.js";import a from"./engagement-calendar-section-0578cac3.js";import"./admin-footer-components-35bacb47.js";import"./presets-2db74b6f.js";import"./AntdIcon-8b25e930.js";import"./app-thunk-693b107c.js";import"./user-service-ac7e7e7d.js";import"./update-profile-9a9ce9d0.js";import"./index-d368cae6.js";import"./index-4e0ea6ca.js";import"./render-a458bafb.js";import"./asyncToGenerator-318e6964.js";import"./CheckCircleFilled-f633c792.js";import"./CloseCircleFilled-aa5e31c4.js";import"./InfoCircleFilled-b0e0705a.js";import"./useZIndex-4dd54a5e.js";import"./useId-befc3d2c.js";import"./button-aae57988.js";import"./Compact-9e968cf1.js";import"./useSize-ccd2c154.js";import"./CloseOutlined-1663eb1a.js";import"./index-d6389f7c.js";import"./KeyCode-3ea1579b.js";import"./pickAttrs-43c39746.js";import"./fade-7035e12f.js";import"./ContextIsolator-dcadb18f.js";import"./useClosable-fa807f3c.js";import"./useLocale-7d03fe10.js";import"./PurePanel-2c13f978.js";import"./index-8ae8737d.js";import"./KeyIcon-a8fd8b63.js";import"./index-734ac57e.js";import"./index-1f34c205.js";import"./LeftOutlined-2fa34ff8.js";import"./collapse-97de76d4.js";import"./HolderOutlined-14030367.js";import"./UsergroupAddOutlined-29ad53a5.js";import"./FileSearchOutlined-613d0213.js";import"./UserDeleteOutlined-fa09654f.js";import"./calendar-tab-section-03563d63.js";import"./calendar-component-38fec369.js";import"./ChevronDownIcon-a3e8a36f.js";import"./portal-63a1a2b2.js";import"./use-server-handoff-complete-4a5242ee.js";import"./floating-ui.dom-fef0eb7a.js";import"./both-site-tab-section-7253bf2e.js";import"./table-tab-section-cb1ce634.js";import"./main-7aa7af08.js";import"./moment-a9aaa855.js";import"./Table-117bf68c.js";import"./addEventListener-4ceeba21.js";import"./DownOutlined-5adaded5.js";import"./index-b3f92c81.js";import"./useBreakpoint-769c2c69.js";import"./useForceUpdate-018cd649.js";import"./CheckOutlined-05cd87ef.js";import"./index-a5fbad9e.js";import"./FileOutlined-390f3a30.js";import"./FolderOpenOutlined-c2659d31.js";import"./EyeOutlined-2bad6abe.js";async function s(){return(await i.get("/api/engagement")).data}function c(){return async function(t,g){const r=(await s()).data;console.log("result",r),t(m.actions.setEngagements(r))}}function ht(){return p.useEffect(()=>{e.dispatch(c())},[]),o.jsx(n,{children:o.jsx(a,{})})}export{ht as default};