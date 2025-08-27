import{a as s,r as u,j as t}from"./app-4e0e0f40.js";import"./summernote-editor2-d999c301.js";import{h}from"./html2pdf-ffe235a9.js";import{B as y}from"./button-78b1ab17.js";import{S as v}from"./index-3aedb7ee.js";import{F as b}from"./FilePdfOutlined-fbe41c87.js";import{L as j}from"./UnstableContext-69c2a6dd.js";import"./jd-blank-60cee938.js";import"./UnorderedListOutlined-6ccb51d7.js";import"./presets-8a79033a.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-41598c1e.js";import"./html2canvas.esm-fa6efc10.js";import"./omit-644b1847.js";import"./genStyleUtils-d1d734a6.js";import"./createSuper-c7e84a61.js";import"./Compact-408a035f.js";import"./useSize-32c08d87.js";import"./index-af3bd790.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function q(){var p,g;const{onboarding_ackdoc:w,signature:n}=s(e=>e.onboarding_ackdocs),{applicant:o}=s(e=>e.final_rate),{onboarding_doc:i}=s(e=>e.onboarding_docs),[l,d]=u.useState(!1),m=u.useRef(null),c=!((p=i==null?void 0:i.data)!=null&&p.doc_content),x=()=>{var r;let e=((r=i==null?void 0:i.data)==null?void 0:r.doc_content)??"";if(e=e.replace(/background-color:[^;"]+;?/gi,""),e=e.replace(/background:[^;"]+;?/gi,""),e=e.replace(/bgcolor="[^"]*"/gi,""),n){const a=`
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
    ${[o==null?void 0:o.fname,o==null?void 0:o.lname].filter(Boolean).join(" ").toUpperCase()||"NO NAME PROVIDED"}
    </div>
    </div>
</div>

            `;e+=a}return e},f=async()=>{var a;const e=m.current;d(!0);const r={margin:.5,filename:`${((a=i==null?void 0:i.data)==null?void 0:a.doc_name)??"No Document Title"} (${o==null?void 0:o.lname}).pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"]}};await h().set(r).from(e).save(),d(!1)};return t.jsxs("div",{children:[t.jsx("div",{className:"mb-6 flex justify-end items-center",children:t.jsx(y,{type:"primary",icon:t.jsx(b,{}),onClick:f,loading:l,disabled:c,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:l?"Generating PDF...":"Download PDF"})}),c?t.jsx("div",{className:"bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]",children:t.jsxs("div",{className:"text-center",children:[t.jsx(v,{indicator:t.jsx(j,{style:{fontSize:48},spin:!0}),size:"large"}),t.jsx("div",{className:"mt-4 text-lg text-gray-600",children:"Loading document..."})]})}):t.jsxs("div",{ref:m,className:"bg-white p-8 shadow-sm border rounded-lg",style:{width:"100%",maxWidth:"none",minHeight:"auto",height:"auto"},children:[t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((g=i==null?void 0:i.data)==null?void 0:g.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:x()},style:{fontFamily:"Arial, sans-serif",lineHeight:"1.6",color:"#333",fontSize:"14px",width:"100%",wordWrap:"break-word",overflow:"visible",display:"block",background:"white"}})]})]})}export{q as default};
