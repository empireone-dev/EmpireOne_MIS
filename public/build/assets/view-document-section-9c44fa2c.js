import{r as x,j as t}from"./store-390fb298.js";import"./summernote-editor2-41c61798.js";import{u as a}from"./app-0b66f5d4.js";import{h}from"./html2pdf-8225b14f.js";import{S as j}from"./index-c26109e9.js";import{B as v}from"./button-9049a3c6.js";import{L as y}from"./UnstableContext-bbfb4318.js";import{F as b}from"./FilePdfOutlined-42e2aaf2.js";import"./jd-blank-29be8b06.js";import"./UnorderedListOutlined-50a31df6.js";import"./warning-08302788.js";import"./defineProperty-83f36300.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-f72dbcde.js";import"./html2canvas.esm-b9c845f8.js";import"./genStyleUtils-4580025e.js";import"./createSuper-f29e89b0.js";import"./Compact-2e77b16b.js";import"./useSize-622fd96a.js";import"./index-32acc91f.js";import"./omit-644b1847.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function W(){var p,g;const{onboarding_ackdoc:N,signature:n}=a(e=>e.onboarding_ackdocs),{applicant:r}=a(e=>e.final_rate),{onboarding_doc:i}=a(e=>e.onboarding_docs),[l,d]=x.useState(!1),m=x.useRef(null),c=!((p=i==null?void 0:i.data)!=null&&p.doc_content),u=()=>{var o;let e=((o=i==null?void 0:i.data)==null?void 0:o.doc_content)??"";if(e=e.replace(/background-color:[^;"]+;?/gi,""),e=e.replace(/background:[^;"]+;?/gi,""),e=e.replace(/bgcolor="[^"]*"/gi,""),n){const s=`
               <div style="
    display: block; 
    text-align: left; 
    margin: 40px 0; 
    page-break-inside: avoid; 
    break-inside: avoid; 
">
    <img 
        src="${n}" 
        alt="Electronic Signature" 
        style="max-width: 400px; max-height: 180px; margin-left: 50px; display: block"
        loading="eager"
    />
    <div style="border-top: 1px solid #000; padding-top: 6px; text-transform: uppercase; letter-spacing: 1px; width: 300px; ">
    <div style="align-items: center; justify-content: center; display: flex; font-weight: bold; font-size: 12px; color: #000;">
    ${[r==null?void 0:r.fname,r==null?void 0:r.lname].filter(Boolean).join(" ").toUpperCase()||"NO NAME PROVIDED"}
    </div>
    </div>
</div>

            `;e+=s}return e},f=async()=>{var s;const e=m.current;d(!0);const o={margin:.5,filename:`${((s=i==null?void 0:i.data)==null?void 0:s.doc_name)??"No Document Title"} (${r==null?void 0:r.lname}).pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"]}};await h().set(o).from(e).save(),d(!1)};return t.jsx("div",{children:c?t.jsx("div",{className:"bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]",children:t.jsxs("div",{className:"text-center",children:[t.jsx(j,{indicator:t.jsx(y,{style:{fontSize:48},spin:!0}),size:"large"}),t.jsx("div",{className:"mt-4 text-lg text-gray-600",children:"Loading document..."})]})}):t.jsxs("div",{className:"px-24 py-20 bg-gray-200",children:[t.jsx("div",{className:"mb-3 flex justify-end items-center",children:t.jsx(v,{type:"primary",icon:t.jsx(b,{}),onClick:f,loading:l,disabled:c,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:l?"Generating PDF...":"Download PDF"})}),t.jsxs("div",{ref:m,className:"p-4 bg-white rounded-lg",children:[t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((g=i==null?void 0:i.data)==null?void 0:g.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:u()}})]})]})})}export{W as default};
