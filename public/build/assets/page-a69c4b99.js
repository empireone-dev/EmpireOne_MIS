import{h as i,B as m,r as p,e,j as o}from"./app-7d68ca85.js";import n from"./admin-layout-aa05bb48.js";import a from"./engagement-calendar-section-915a27ca.js";import"./admin-footer-components-f94a217d.js";import"./presets-a105bbc6.js";import"./AntdIcon-9cfc0218.js";import"./app-thunk-3e4ebc52.js";import"./user-service-1bd1ee67.js";import"./update-profile-d745ecee.js";import"./UserOutlined-84927a8f.js";import"./index-c093f7be.js";import"./index-2eb55d07.js";import"./render-1607753e.js";import"./asyncToGenerator-ddb06381.js";import"./CheckCircleFilled-e7ef87be.js";import"./CloseCircleFilled-f459e844.js";import"./InfoCircleFilled-38415a9a.js";import"./useZIndex-2e09f723.js";import"./useId-ccfb42d5.js";import"./button-30820779.js";import"./Compact-b3700746.js";import"./useSize-69609da4.js";import"./CloseOutlined-2578f623.js";import"./index-2f1bc9db.js";import"./KeyCode-7f5cb5e5.js";import"./pickAttrs-e875352b.js";import"./fade-75e05e2d.js";import"./ContextIsolator-b1720554.js";import"./useClosable-72ee6749.js";import"./useLocale-fab103d1.js";import"./PurePanel-077df24c.js";import"./index-ef610335.js";import"./KeyIcon-0b404bdf.js";import"./index-97491272.js";import"./index-1d086a91.js";import"./LeftOutlined-72133fab.js";import"./collapse-97de76d4.js";import"./HolderOutlined-650172be.js";import"./UsergroupAddOutlined-05e5d4fc.js";import"./FileSearchOutlined-fd00a5da.js";import"./SignatureOutlined-ec82193a.js";import"./UserDeleteOutlined-31c6fb1b.js";import"./calendar-tab-section-bee28cbf.js";import"./calendar-component-497057b3.js";import"./ChevronDownIcon-6d933373.js";import"./portal-639219a9.js";import"./use-server-handoff-complete-025fd896.js";import"./floating-ui.dom-fef0eb7a.js";import"./both-site-tab-section-620ba81e.js";import"./table-tab-section-0481ab2d.js";import"./main-070e6b79.js";import"./moment-a9aaa855.js";import"./Table-086c58eb.js";import"./addEventListener-a6a70504.js";import"./DownOutlined-f97462df.js";import"./index-15749420.js";import"./useBreakpoint-de48abe7.js";import"./useForceUpdate-8cc2e619.js";import"./CheckOutlined-b87cb42c.js";import"./index-e969da80.js";import"./FileOutlined-72f169c5.js";import"./FolderOpenOutlined-e8860472.js";import"./EyeOutlined-e2edfe6e.js";async function s(){return(await i.get("/api/engagement")).data}function c(){return async function(t,g){const r=(await s()).data;console.log("result",r),t(m.actions.setEngagements(r))}}function yt(){return p.useEffect(()=>{e.dispatch(c())},[]),o.jsx(n,{children:o.jsx(a,{})})}export{yt as default};