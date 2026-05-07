import{r as o,R as d,c as H,j as a}from"./store-19d01ea0.js";import{S as U}from"./index-b410a762.js";import{s as V}from"./account-service-c9f83fd1.js";import{u as $,a as B}from"./app-8f444a42.js";import"./objectWithoutProperties-b8ddaaad.js";import"./createSuper-cd69a035.js";import"./toPropertyKey-d8419463.js";import"./typeof-7fd5df1e.js";import"./index-ae3d407c.js";/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=e=>{const t=K(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},G=o.createContext({}),Z=()=>o.useContext(G),q=o.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:n,className:c="",children:i,iconNode:h,...l},u)=>{const{size:f=24,strokeWidth:g=2,absoluteStrokeWidth:m=!1,color:C="currentColor",className:S=""}=Z()??{},w=n??m?Number(r??g)*24/Number(t??f):r??g;return o.createElement("svg",{ref:u,...k,width:t??f??k.width,height:t??f??k.height,stroke:e??C,strokeWidth:w,className:L("lucide",S,c),...!i&&!F(l)&&{"aria-hidden":"true"},...l},[...h.map(([y,s])=>o.createElement(y,s)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=(e,t)=>{const r=o.forwardRef(({className:n,...c},i)=>o.createElement(q,{ref:i,iconNode:t,className:L(`lucide-${T(E(e))}`,`lucide-${e}`,n),...c}));return r.displayName=E(e),r};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",key:"nt11vn"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",key:"15qc1e"}],["path",{d:"m2.3 2.3 7.286 7.286",key:"1wuzzi"}],["circle",{cx:"11",cy:"11",r:"2",key:"xmgehs"}]],Y=N("pen-tool",X);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Q=N("pen",J);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],te=N("trash-2",ee);var W={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},z=d.createContext&&d.createContext(W),re=["attr","size","title"];function ne(e,t){if(e==null)return{};var r,n,c=se(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}function se(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},b.apply(null,arguments)}function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(c){return Object.getOwnPropertyDescriptor(e,c).enumerable})),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?_(Object(r),!0).forEach(function(n){ae(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ae(e,t,r){return(t=ie(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ie(e){var t=oe(e,"string");return typeof t=="symbol"?t:t+""}function oe(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function A(e){return e&&e.map((t,r)=>d.createElement(t.tag,j({key:r},t.attr),A(t.child)))}function ce(e){return t=>d.createElement(le,b({attr:j({},e.attr)},t),A(e.child))}function le(e){var t=r=>{var{attr:n,size:c,title:i}=e,h=ne(e,re),l=c||r.size||"1em",u;return r.className&&(u=r.className),e.className&&(u=(u?u+" ":"")+e.className),d.createElement("svg",b({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,h,{className:u,style:j(j({color:e.color||r.color},r.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&d.createElement("title",null,i),e.children)};return z!==void 0?d.createElement(z.Consumer,null,r=>t(r)):t(W)}function ue(e){return ce({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"},child:[]}]})(e)}const R=H({name:"app",initialState:{user:{},alert:null},reducers:{setUser:(e,t)=>{e.user=t.payload},setAlert:(e,t)=>{e.alert=t.payload}}}),{setUser:be,setAlert:de}=R.actions;R.reducer;const je=()=>{var w,y;const e=o.useRef({}),[t,r]=o.useState(null),[n,c]=o.useState({width:0,height:0}),[i,h]=o.useState(!1),{data:l}=$(s=>s.app),u=B(),f="#000000",g=3;o.useEffect(()=>{const s=()=>{c({width:(window.innerWidth>800,window.innerWidth),height:window.innerHeight})};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]);const m=((y=(w=l==null?void 0:l.user)==null?void 0:w.account_employee)==null?void 0:y.signature)??null;o.useEffect(()=>{if(e.current&&m){const s=e.current.getCanvas(),O=s.getContext("2d"),p=new Image;p.onload=()=>{const P=p.width/p.height,I=s.width/s.height;let v,x;P>I?(v=s.width*.8,x=v/P):(x=s.height*.8,v=x*P);const M=(s.width-v)/2,D=(s.height-x)/2;O.clearRect(0,0,s.width,s.height),O.drawImage(p,M,D,v,x),r(m)},p.src=m}},[m]);const C=()=>{e.current.clear(),r(null)},S=async()=>{if(e.current.isEmpty()){alert("Please provide a signature first. or please click the clear button.");return}const s=e.current.toDataURL("image/png");try{h(!0),await V({signature:s}),await u(de({type:"success",title:"Signature save successfully!"})),h(!1)}catch{}};return a.jsxs("div",{className:"h-screen w-full flex flex-col items-center font-sans bg-slate-50",children:[a.jsxs("div",{className:"fixed w-full flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Y,{className:"text-blue-600",size:24}),a.jsx("h1",{className:"text-xl font-bold text-slate-800 tracking-tight",children:"E-Signature"})]}),a.jsxs("div",{className:"flex gap-4",children:[a.jsxs("button",{onClick:C,className:"flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors",children:[a.jsx(te,{size:18})," Clear"]}),a.jsx("button",{onClick:S,disabled:i,className:`flex items-center gap-2 px-8 py-2 text-sm font-bold text-white rounded-full shadow-lg transition-all active:scale-95 ${i?"bg-slate-400":"bg-slate-900 hover:bg-black shadow-slate-200"}`,children:i?"Submitting...":a.jsxs(a.Fragment,{children:[a.jsx(ue,{size:18})," Save"]})})]})]}),a.jsxs("div",{className:"bg-gray-100 border ",children:[a.jsx(U,{ref:e,penColor:f,minWidth:g,maxWidth:g+1,canvasProps:{width:n.width,height:n.height,className:"cursor-crosshair w-full"},onBegin:()=>{t||r("signed")}}),!t&&a.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center pointer-events-none",children:[a.jsx(Q,{size:60,className:"opacity-5 mb-4"}),a.jsx("p",{className:"text-slate-300 font-medium text-lg",children:"Sign Here"})]})]})]})};export{je as default};
