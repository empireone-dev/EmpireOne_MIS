import{a,r as x,j as t}from"./app-cb97cd41.js";import"./summernote-editor2-4d91cd13.js";import{h}from"./html2pdf-d3bbc44b.js";import{S as j}from"./index-339cbf1d.js";import{B as v}from"./button-0fd4dbf3.js";import{L as y}from"./UnstableContext-cf9810f7.js";import{F as b}from"./FilePdfOutlined-b51b5314.js";import"./jd-blank-93b2d01b.js";import"./UnorderedListOutlined-919dea46.js";import"./presets-0e1dacae.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-80c404c8.js";import"./html2canvas.esm-1c3e37a3.js";import"./genStyleUtils-14989ffc.js";import"./createSuper-c7e84a61.js";import"./Compact-09e0cbc3.js";import"./useSize-92579392.js";import"./index-061a302e.js";import"./omit-644b1847.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function G(){var p,g;const{onboarding_ackdoc:N,signature:n}=a(e=>e.onboarding_ackdocs),{applicant:i}=a(e=>e.final_rate),{onboarding_doc:r}=a(e=>e.onboarding_docs),[l,d]=x.useState(!1),m=x.useRef(null),c=!((p=r==null?void 0:r.data)!=null&&p.doc_content),u=()=>{var o;let e=((o=r==null?void 0:r.data)==null?void 0:o.doc_content)??"";if(e=e.replace(/background-color:[^;"]+;?/gi,""),e=e.replace(/background:[^;"]+;?/gi,""),e=e.replace(/bgcolor="[^"]*"/gi,""),n){const s=`
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
    ${[i==null?void 0:i.fname,i==null?void 0:i.lname].filter(Boolean).join(" ").toUpperCase()||"NO NAME PROVIDED"}
    </div>
    </div>
</div>

            `;e+=s}return e},f=async()=>{var s;const e=m.current;d(!0);const o={margin:.5,filename:`${((s=r==null?void 0:r.data)==null?void 0:s.doc_name)??"No Document Title"} (${i==null?void 0:i.lname}).pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["avoid-all","css","legacy"]}};await h().set(o).from(e).save(),d(!1)};return t.jsx("div",{children:c?t.jsx("div",{className:"bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]",children:t.jsxs("div",{className:"text-center",children:[t.jsx(j,{indicator:t.jsx(y,{style:{fontSize:48},spin:!0}),size:"large"}),t.jsx("div",{className:"mt-4 text-lg text-gray-600",children:"Loading document..."})]})}):t.jsxs("div",{className:"px-24 py-20",children:[t.jsx("div",{className:"mb-3 flex justify-end items-center",children:t.jsx(v,{type:"primary",icon:t.jsx(b,{}),onClick:f,loading:l,disabled:c,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:l?"Generating PDF...":"Download PDF"})}),t.jsxs("div",{ref:m,className:" p-20 border border-gray-400 rounded-lg",children:[t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((g=r==null?void 0:r.data)==null?void 0:g.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:u()}})]})]})})}export{G as default};
