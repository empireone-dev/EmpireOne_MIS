import{a as c,r as n,j as t}from"./app-3b8e98c8.js";import"./summernote-editor2-58c35fd1.js";import{h as x}from"./html2pdf-1b3f9910.js";import{B as h}from"./button-de2f89a0.js";import{F as b}from"./FilePdfOutlined-c78a65bc.js";import"./jd-blank-62a65c73.js";import"./UnorderedListOutlined-737327ef.js";import"./presets-17871ccc.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./AntdIcon-a997d854.js";import"./html2canvas.esm-dfea2986.js";import"./omit-644b1847.js";import"./genStyleUtils-c1b4aa35.js";import"./createSuper-c7e84a61.js";import"./Compact-ba893197.js";import"./useSize-f1955e4c.js";import"./index-211d42c3.js";import"./UnstableContext-cfd9b057.js";import"./regeneratorRuntime-92fa3873.js";import"./asyncToGenerator-8c72b493.js";function U(){var l;const{onboarding_ackdoc:p,signature:r}=c(e=>e.onboarding_ackdocs),{onboarding_doc:o}=c(e=>e.onboarding_docs);n.useState({}),n.useState(!1);const[a,y]=n.useState(!1),[m,v]=n.useState(!1),s=n.useRef(null);console.log("onboarding_ackdoc:",p);const i=r,g=()=>{var d;let e=((d=o==null?void 0:o.data)==null?void 0:d.doc_content)??"";if(r){const f=`
                        <div style="display: inline-block; text-align: center; margin: 20px 0;">
                        <img 
                            src="${r}" 
                            alt="Electronic Signature" 
                            style="max-width: 400px; max-height: 180px; background-color: white; display: block; margin: 0 auto; border: none; outline: none;"
                            loading="eager"
                        />
                        <div style="display: none; color: #6b7280; font-size: 14px;">
                            Signature image could not be loaded
                        </div>
                        <div style=" border-top: 1px solid #000; padding-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
                            ${i.applicant?i.applicant.fname.toUpperCase():""} 
                            ${i.applicant?i.applicant.lname.toUpperCase():""}
                        </div>
                    </div>
            `;e+=f}return e},u=async()=>{const e=s.current;x().from(e).save("download.pdf")};return t.jsxs("div",{children:[t.jsx("div",{className:"mb-6 flex justify-end items-center",children:t.jsx(h,{type:"primary",icon:t.jsx(b,{}),onClick:u,loading:a,size:"large",className:"bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700",children:a?"Generating PDF...":"Download PDF"})}),t.jsxs("div",{ref:s,className:"bg-white p-8 shadow-sm border rounded-lg",style:{width:"100%",maxWidth:"none",minHeight:"auto",height:"auto"},children:[!m&&t.jsx("div",{className:"text-center mb-6",children:t.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:((l=o==null?void 0:o.data)==null?void 0:l.doc_name)??"No Document Title"})}),t.jsx("div",{className:"document-content",dangerouslySetInnerHTML:{__html:g()},style:{fontFamily:"Arial, sans-serif",lineHeight:"1.6",color:"#333",fontSize:"14px",width:"100%",wordWrap:"break-word",overflow:"visible",display:"block"}})]})]})}export{U as default};
