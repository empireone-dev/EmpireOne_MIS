import{r as c,b as p,j as e,e as d}from"./app-753af2e0.js";import{u as m}from"./pre-employment-file-service-629d8857.js";import{g as u}from"./final-rate-thunk-91de09e4.js";import"./applicant-final-service-912b1e89.js";import"./applicant-record-service-592ef5c3.js";function j({data:t,setOpen:s}){const[n,r]=c.useState(""),i=window.location.pathname.split("/")[3],{applicant:o}=p(a=>a.final_rate);async function l(a){await m({...t,...n,email:o.email,status:"Declined"}),await d.dispatch(u(i)),s(!1)}return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"",children:e.jsx("b",{children:"Reason of Declination"})}),e.jsx("input",{name:"reas",onChange:a=>r({[a.target.name]:a.target.value}),type:"text",className:"border p-2 rounded  w-full"})]}),e.jsx("button",{onClick:l,className:"bg-red-500 text-white w-full rounded hover:bg-red-600 p-0.5",children:"Declined"})]})}export{j as default};