import{d as j,B as m,r as i,b as I,u as q,j as e,n as g,s as F}from"./app-cbabef96.js";import _ from"./upload-resume-section-8364fb41.js";import E from"./working-experience-section-7a9d488f.js";import n from"./input-bbb74a4b.js";import{U as M}from"./UserPlusIcon-8542e3bf.js";import{M as D}from"./index-5988df73.js";async function P(){return(await j.get("/api/applicant"+window.location.search)).data}async function T(r){return(await j.post("/api/applicant",r)).data}function H(){return async function(r,s){const c=(await P()).data;r(m.actions.setApplicants(c))}}function G(r){return async function(s,c){const d=await T(r);s(m.actions.setApplicants(d.data)),s(m.actions.setApplicantForm({}))}}function O(){const[r,s]=i.useState(!1),[c,d]=i.useState(0),{applicantForm:l}=I(a=>a.applicants);console.log("applicants",l);const u=q(),b=()=>{s(!1)};function v(){const a=new Date,o=a.getFullYear().toString().slice(-2),C=(a.getMonth()+1).toString().padStart(2,"0"),k=a.getDate().toString().padStart(2,"0"),S=`${o}${C}${k}`,A=(c+1).toString().padStart(2,"0");return`${S}${A}`}i.useEffect(()=>{(async()=>{d(0)})()},[]);function h(a){a.preventDefault();const o=v();u(g({...l,uniqueAppId:o})),F.dispatch(G({...l,uniqueAppId:o})),s(!1),b()}const[x,p]=i.useState(!1),[y,f]=i.useState(!1);i.useState(null);const N=a=>{p(a.target.checked),f(!1)},w=a=>{f(a.target.checked),p(!1)};function t(a){u(g({...l,[a.target.name]:a.target.value}))}return console.log("applicantForm",l),e.jsxs("div",{className:"my-2",children:[e.jsx("div",{class:"inline-flex rounded-md shadow-sm",role:"group",children:e.jsxs("button",{type:"button",onClick:()=>s(!0),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1",children:[e.jsx(M,{className:"h-5"}),"Add New Applicant"]})}),e.jsxs(D,{title:" ",centered:!0,open:r,onOk:a=>h(a),onCancel:()=>s(!1),width:1500,okText:"Submit",cancelText:"Cancel",children:[e.jsx("div",{className:"flex text-2xl items-center justify-center",children:e.jsx("h1",{children:e.jsx("b",{children:"APPLICATION FORM"})})}),e.jsxs("form",{className:"border rounded-lg p-3.5",onSubmit:h,children:[e.jsx("div",{className:"w-1/4",children:e.jsx(n,{onChange:a=>t(a),value:l.app_id??"",name:"app_id",label:"Application ID",type:"text",readOnly:!0})}),e.jsx("h1",{className:"text-xl font-semibold mb-3 mt-4 text-gray-900 dark:text-gray-100",children:"Site Information"}),e.jsx("div",{children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:e.jsxs("select",{name:"site",className:"border p-2 rounded w-full",children:[e.jsx("option",{disabled:!0,selected:!0,children:"Select Site"}),e.jsx("option",{children:"San Carlos "}),e.jsx("option",{children:"Carcar "})]})})}),e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-6",children:"Personal Information"}),e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsx("div",{className:"flex flex-col w-full mb-4",children:e.jsxs("div",{className:"flex flex-1 gap-3",children:[e.jsx(n,{onChange:a=>t(a),value:l.fname??"",required:"true",name:"fname",label:"First Name",type:"text"}),e.jsx(n,{onChange:a=>t(a),value:l.mname??"",required:"true",name:"mname",label:"Middle Name",type:"text"}),e.jsx(n,{onChange:a=>t(a),value:l.lname??"",required:"true",name:"lname",label:"Last Name",type:"text"}),e.jsxs("select",{onChange:a=>t(a),name:"suffix",className:"border p-2 rounded  w-1/5",children:[e.jsx("option",{disabled:!0,selected:!0,children:"Suffix"}),e.jsx("option",{children:" Sr."}),e.jsx("option",{children:" Jr."}),e.jsx("option",{children:" II"}),e.jsx("option",{children:" III"}),e.jsx("option",{children:" IV"}),e.jsx("option",{children:" V"})]})]})})}),e.jsxs("div",{className:"flex flex-1 gap-4",children:[e.jsx("div",{className:"flex w-full",children:e.jsxs("div",{className:"flex flex-col gap-4 mb-4 w-full",children:[e.jsx("div",{className:"flex flex-col w-full",children:e.jsxs("select",{onChange:a=>t(a),name:"gender",className:"border p-2 rounded w-full",children:[e.jsx("option",{className:"",disabled:!0,selected:!0,children:"  Gender"}),e.jsx("option",{children:" Male"}),e.jsx("option",{children:" Female"})]})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.dob??"",required:"true",name:"dob",label:"Date of Birth",type:"date"})}),e.jsx("div",{className:" w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.email??"",required:"true",name:"email",label:"Email",type:"email"})}),e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.phone??"",required:"true",name:"phone",label:"Phone Number",type:"number"})})]})}),e.jsx("div",{className:"flex w-full",children:e.jsxs("div",{className:"flex flex-col gap-4 mb-4 w-full",children:[e.jsx("div",{className:"flex flex-col w-full",children:e.jsxs("select",{onChange:a=>t(a),name:"marital",className:"border p-2 rounded w-full",children:[e.jsx("option",{disabled:!0,selected:!0,children:"  Marital Status"}),e.jsx("option",{children:" Single"}),e.jsx("option",{children:" Married"}),e.jsx("option",{children:" Widowed"}),e.jsx("option",{children:" Divorced"})]})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.religion??"",required:"true",name:"religion",label:"Religion",type:"text"})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.nationality??"",required:"true",name:"nationality",label:"Nationality",type:"text"})})]})})]}),e.jsx("div",{className:"mb-4",children:e.jsx(n,{onChange:a=>t(a),value:l.mmname??"",required:"true",name:"mmname",label:"Mothers maiden name",type:"text"})}),e.jsx("div",{className:"mb-4",children:e.jsx(n,{onChange:a=>t(a),value:l.ffname??"",required:"true",name:"ffname",label:"Fathers fullname",type:"text"})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"w-full",children:e.jsxs("select",{name:"educ",className:"border p-2.5 rounded w-full",onChange:a=>t(a),children:[e.jsx("option",{disabled:!0,selected:!0,children:"  Highest Educational Attainment"}),e.jsx("option",{children:" Elementary Undergraduate"}),e.jsx("option",{children:" Elementary Graduate"}),e.jsx("option",{children:" Highschool/K-12 Undergraduate"}),e.jsx("option",{children:" Highschool/K-12 Graduate"}),e.jsx("option",{children:" College Level"}),e.jsx("option",{children:" College Graduate"}),e.jsx("option",{children:" Vocational Graduate"}),e.jsx("option",{children:" Masteral Degree"}),e.jsx("option",{children:" Doctoral Degree"})]})}),e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.courset??"",required:"true",name:"courset",label:"Course taken",type:"text"})})]}),e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9",children:"Address Information"}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4 w-full",children:[e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.region??"",required:"true",name:"region",label:"Region",type:"text"})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.province??"",required:"true",name:"province",label:"Province",type:"text"})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.city??"",required:"true",name:"city",label:"City/Municipality",type:"text"})})]}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"flex flex-col  w-1/2",children:e.jsx(n,{onChange:a=>t(a),value:l.brgy??"",required:"true",name:"brgy",label:"Barangay",type:"text"})}),e.jsx("div",{className:"flex flex-col w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.lot??"",required:"true",name:"lot",label:"House/Lot No., Street, Purok/Sitio",type:"text"})})]}),e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9",children:"Government ID Information"}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.sss??"",name:"sss",label:"SSS No.",type:"text"})}),e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.pagibig??"",name:"pagibig",label:"Pag-IBIG No.",type:"text"})})]}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.tin??"",name:"tin",label:"Tin No.",type:"text"})}),e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.philh??"",name:"philh",label:"Philhealth No.",type:"text"})})]}),e.jsxs("div",{className:"flex items-center mb-4 mt-6",children:[e.jsx("input",{id:"with-working-experience-checkbox",type:"checkbox",value:"",checked:x,onChange:N,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"with-working-experience-checkbox",className:"ms-2 text-md font-medium text-gray-900 dark:text-gray-300",children:e.jsx("b",{children:"with Working Experience"})})]}),e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("input",{id:"first-time-jobseeker-checkbox",type:"checkbox",value:"",checked:y,onChange:w,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",disabled:x}),e.jsx("label",{htmlFor:"first-time-jobseeker-checkbox",className:"ms-2 text-md font-medium text-gray-900 dark:text-gray-300",children:e.jsx("b",{children:"First Time Jobseeker"})})]}),x&&e.jsx(E,{}),e.jsx("h1",{className:"text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-7",children:"Emergency Contact Information"}),e.jsx("div",{className:"mb-4 w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.ename??"",name:"ename",label:"Emergency Contact Fullname",type:"text"})}),e.jsx("div",{className:"mb-4 w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.eaddress??"",name:"eaddress",label:"Address",type:"text"})}),e.jsxs("div",{className:"flex flex-1 gap-4 mb-4",children:[e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.relationship??"",name:"relationship",label:"Relationship",type:"text"})}),e.jsx("div",{className:"w-full",children:e.jsx(n,{onChange:a=>t(a),value:l.ephone??"",name:"ephone",label:"Contact No.",type:"number"})})]}),e.jsx(_,{})]})]})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));export{O as A,L as a,H as g};