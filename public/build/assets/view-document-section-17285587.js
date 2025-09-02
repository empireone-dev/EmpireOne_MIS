import{r as f,j as t}from"./store-bb4697b2.js";import"./summernote-editor2-8f7973e2.js";import{u as s}from"./app-5e17c83c.js";import{h as v}from"./html2pdf-8e046946.js";import{S as j}from"./index-8495ccf9.js";import{B as b}from"./button-70cd92ba.js";import{L as D}from"./UnstableContext-b7467f96.js";import{F as N}from"./FilePdfOutlined-d1b08d9d.js";import"./jd-blank-a618e6bb.js";import"./UnorderedListOutlined-8eff026f.js";import"./warning-b41e9706.js";import"./defineProperty-83f36300.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-5ca1d8c5.js";import"./html2canvas.esm-432f7d47.js";import"./genStyleUtils-9f5b0f7b.js";import"./createSuper-f29e89b0.js";import"./Compact-058d274e.js";import"./useSize-d258a147.js";import"./index-dc0f88ac.js";import"./omit-644b1847.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function K(){var g,x;const{onboarding_ackdoc:w,signature:l}=s(e=>e.onboarding_ackdocs),{e_signature:o}=s(e=>e.onboarding_ackdocs),{applicant:r}=s(e=>e.final_rate),{onboarding_doc:i}=s(e=>e.onboarding_docs),[d,c]=f.useState(!1),m=f.useRef(null),p=!((g=i==null?void 0:i.data)!=null&&g.doc_content);console.log("e_signature:",o);const u=()=>{var a,n;let e=((a=i==null?void 0:i.data)==null?void 0:a.doc_content)??"";if(e=e.replace(/background-color:[^;"]+;?/gi,""),e=e.replace(/background:[^;"]+;?/gi,""),e=e.replace(/bgcolor="[^"]*"/gi,""),l){const y=`
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
        font-style: italic;
    ">
        ${(n=o==null?void 0:o[0])!=null&&n.created_at?new Date(o[0].created_at).toISOString().split("T")[0]:""}
    </div>
    <div style="border-top: 1px solid #000; padding-top: 6px; text-transform: uppercase; letter-spacing: 1px; width: 300px; ">
    <div style="align-items: center; justify-content: center; display: flex; font-weight: bold; font-size: 12px; color: #000;">
    ${[r==null?void 0:r.fname,r==null?void 0:r.lname].filter(Boolean).join(" ").toUpperCase()||"NO NAME PROVIDED"}
    </div>
    </div>
</div>

            `;e+=y}return e},h=async()=>{var n;const e=m.current;c(!0);const a={margin:.5,filename:`${((n=i==null?void 0:i.data)==null?void 0:n.doc_name)??"No Document Title"} (${r==null?void 0:r.lname}).pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"]}};await v().set(a).from(e).save(),c(!1)};return t.jsx("div",{children:p?t.jsx("div",{className:"bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]",children:t.jsxs("div",{className:"text-center",children:[t.jsx(j,{indicator:t.jsx(D,{style:{fontSize:48},spin:!0}),size:"large"}),t.jsx("div",{className:"mt-4 text-lg text-gray-600",children:"Loading document..."})]})}):t.jsxs("div",{className:"px-24 py-20 bg-gray-200",children:[t.jsx("div",{className:"mb-3 flex justify-end items-center",children:t.jsx(b,{type:"primary",icon:t.jsx(N,{}),onClick:h,loading:d,disabled:p,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:d?"Generating PDF...":"Download PDF"})}),t.jsxs("div",{ref:m,className:"p-4 bg-white rounded-lg",children:[t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((x=i==null?void 0:i.data)==null?void 0:x.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:u()}})]})]})})}export{K as default};
