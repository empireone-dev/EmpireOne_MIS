import{b as p,r as a,j as e,y as n,c as d}from"./app-63d290ed.js";import u from"./summernote-editor2-924223bd.js";import"./quill.snow-9b9c8739.js";import"./purify.es-3e986492.js";import{e as b}from"./department-thunk-c78dc269.js";import{m}from"./index-9d2c8c61.js";import"./jd-blank-08129bb7.js";import"./UnorderedListOutlined-f6afbf87.js";import"./presets-9872d8f0.js";import"./AntdIcon-d99b3c04.js";import"./erf-record-service-6ddc89aa.js";import"./index-d8b89dfe.js";import"./render-b321c488.js";import"./asyncToGenerator-be57daf5.js";import"./CheckCircleFilled-a9217836.js";import"./CloseCircleFilled-2948c024.js";import"./InfoCircleFilled-34cb931e.js";import"./LoadingOutlined-8390b05c.js";import"./useZIndex-dc62b87b.js";import"./pickAttrs-8fbf8c8c.js";import"./CloseOutlined-a4ab623b.js";function $(){var s;const{erf:t}=p(o=>o.departments),[r,c]=a.useState({}),[x,i]=a.useState(!1);async function l(){i(!0);try{await d.dispatch(b({form:r,...t})),m.success("Updated Successfully!"),n.visit(`/admin/sourcing/job_title_section/job_description/${t==null?void 0:t.ref_id}`)}catch(o){m.error("Failed to update. Please try again."),console.error(o)}finally{i(!1)}}return e.jsxs("div",{children:[e.jsxs("div",{className:"mb-12",children:[e.jsx("label",{htmlFor:"content",className:"block text-xl font-medium text-gray-800 text-center",children:"Job Description"}),e.jsx(u,{form:r,setForm:c,data:((s=t==null?void 0:t.jd)==null?void 0:s.content)??""})]}),e.jsxs("div",{className:"flex flex-1 gap-2 justify-end items-center",children:[e.jsx("button",{className:"rounded-md hover:bg-blue-100  w-32 h-10 mt-2",type:"button",onClick:()=>n.visit("/admin/sourcing/job_title_section"),children:"Cancel"}),e.jsx("button",{onClick:l,className:"bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2",children:"Save Changes"})]})]})}export{$ as default};