import{d as i,A as m,r as p,s as n,j as r}from"./app-cbabef96.js";import a from"./admin-layout-6174e211.js";import s from"./onboarding-docu-table-section-b790d357.js";import"./admin-footer-components-a5af7e94.js";import"./warning-81272f54.js";import"./AntdIcon-d783d7a4.js";import"./useSize-e1afdcd9.js";import"./button-34753591.js";import"./index-fce4089b.js";import"./PurePanel-8e6559d6.js";import"./index-5988df73.js";import"./CheckCircleFilled-ea076c21.js";import"./pickAttrs-ac86a368.js";import"./ExclamationCircleFilled-a625f2c8.js";import"./InfoCircleFilled-e8f2092a.js";import"./CloseOutlined-b384916a.js";import"./useClosable-b00e50cd.js";import"./useLocale-1c19f6a1.js";import"./HolderOutlined-918e5ee1.js";import"./UsergroupAddOutlined-6460e5fe.js";import"./FileSearchOutlined-3d96923c.js";import"./MedicineBoxOutlined-ef3740f7.js";import"./main-1fe3586a.js";import"./DownOutlined-707e9def.js";import"./index-3e7a4945.js";import"./useBreakpoint-c403aa47.js";import"./FileOutlined-c9fe2434.js";import"./FolderOpenOutlined-d5431798.js";import"./EyeOutlined-4dd6df62.js";import"./button-components-745cc358.js";import"./EditOutlined-7cf165b0.js";import"./moment-a9aaa855.js";import"./add-onboarding-docu-section-5563d1ff.js";import"./wysiwyg-fa94a164.js";import"./quill.snow-fe7e3155.js";import"./PlusSquareTwoTone-9bd04356.js";async function e(){return(await i.get("/api/onboarding_doc")).data}function c(){return async function(o,u){const t=(await e()).data;console.log("result",t),o(m.actions.setOnboardingDocus(t))}}function V(){return p.useEffect(()=>{n.dispatch(c())},[]),r.jsx(a,{children:r.jsx(s,{})})}export{V as default};