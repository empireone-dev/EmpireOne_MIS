import{r as u,j as t}from"./store-f8230777.js";import"./summernote-editor2-865c1488.js";import{u as s}from"./app-d9116f3a.js";import{h as v}from"./html2pdf-1b226786.js";import{S as j}from"./index-f9e56270.js";import{B as b}from"./button-ab6cacc2.js";import{L as D}from"./UnstableContext-1cfcc566.js";import{F as N}from"./FilePdfOutlined-4ef7e9dd.js";import"./jd-blank-c9ee7c55.js";import"./UnorderedListOutlined-cc7c6a15.js";import"./warning-2fb5e01a.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-6334f102.js";import"./html2canvas.esm-60a00486.js";import"./genStyleUtils-3bf19d03.js";import"./createSuper-f29e89b0.js";import"./Compact-b917f4aa.js";import"./useSize-eda9c8d0.js";import"./index-f996af67.js";import"./omit-644b1847.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function J(){var g,x;const{onboarding_ackdoc:w,signature:l}=s(e=>e.onboarding_ackdocs),{e_signature:o}=s(e=>e.onboarding_ackdocs),{applicant:r}=s(e=>e.final_rate),{onboarding_doc:i}=s(e=>e.onboarding_docs),[d,c]=u.useState(!1),m=u.useRef(null),p=!((g=i==null?void 0:i.data)!=null&&g.doc_content);console.log("e_signature:",o);const f=()=>{var a,n;let e=((a=i==null?void 0:i.data)==null?void 0:a.doc_content)??"";if(e=e.replace(/background-color:[^;"]+;?/gi,""),e=e.replace(/background:[^;"]+;?/gi,""),e=e.replace(/bgcolor="[^"]*"/gi,""),l){const y=`
               <div style="
    display: block; 
    text-align: left; 
    margin: 40px 0; 
    page-break-inside: avoid; 
    break-inside: avoid; 
">
    <img 
        src="${l}" 
        alt="Electronic Signature" 
        style="max-width: 400px; max-height: 180px; margin-left: 50px; display: block;"
        loading="eager"
    />
    <div style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        letter-spacing: 1px; 
        width: 300px; 
        margin-bottom: 1rem;
    ">
        ${(n=o==null?void 0:o[0])!=null&&n.created_at?new Date(o[0].created_at).toISOString().split("T")[0]:""}
    </div>
    <div style="border-top: 1px solid #000; padding-top: 6px; text-transform: uppercase; letter-spacing: 1px; width: 300px; ">
    <div style="align-items: center; justify-content: center; display: flex; font-weight: bold; font-size: 12px; color: #000;">
    ${[r==null?void 0:r.fname,r==null?void 0:r.lname].filter(Boolean).join(" ").toUpperCase()||"NO NAME PROVIDED"}
    </div>
    </div>
</div>

            `;e+=y}return e},h=async()=>{var n;const e=m.current;c(!0);const a={margin:.5,filename:`${((n=i==null?void 0:i.data)==null?void 0:n.doc_name)??"No Document Title"} (${r==null?void 0:r.lname}).pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"]}};await v().set(a).from(e).save(),c(!1)};return t.jsx("div",{children:p?t.jsx("div",{className:"bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]",children:t.jsxs("div",{className:"text-center",children:[t.jsx(j,{indicator:t.jsx(D,{style:{fontSize:48},spin:!0}),size:"large"}),t.jsx("div",{className:"mt-4 text-lg text-gray-600",children:"Loading document..."})]})}):t.jsxs("div",{className:"px-24 py-20 bg-gray-200",children:[t.jsx("div",{className:"mb-3 flex justify-end items-center",children:t.jsx(b,{type:"primary",icon:t.jsx(N,{}),onClick:h,loading:d,disabled:p,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:d?"Generating PDF...":"Download PDF"})}),t.jsxs("div",{ref:m,className:"p-4 bg-white rounded-lg",children:[t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((x=i==null?void 0:i.data)==null?void 0:x.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:f()}})]})]})})}export{J as default};
