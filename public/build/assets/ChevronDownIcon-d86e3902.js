import{R as V,r as u,g as W,f as lt}from"./app-cbabef96.js";import{u as Ve,d as at,a as st,n as ct,b as ft,y as dt,t as pt,U as mt,A as vt,h as gt,o as P,j as bt,F as Fe,G as Ke,_ as ht}from"./portal-f25f6173.js";import{p as Ee,o as I,W as K,y as X,n as D,H as U,M as Me,e as yt,u as Ue,i as ne,D as Ye,a as Et,V as $t,m as wt,A as xt,g as Rt}from"./use-server-handoff-complete-007cf2df.js";import{o as It,s as St,f as Ft,a as Mt,c as Ct,i as ee,e as Pt,d as se,b as Tt}from"./floating-ui.dom-0fe77a48.js";const Ge=typeof document<"u"?V.useLayoutEffect:()=>{};function Dt(e){const t=u.useRef(null);return Ge(()=>{t.current=e},[e]),u.useCallback((...n)=>{const r=t.current;return r==null?void 0:r(...n)},[])}const J=e=>{var t;return(t=e==null?void 0:e.ownerDocument)!==null&&t!==void 0?t:document},Y=e=>e&&"window"in e&&e.window===e?e:J(e).defaultView||window;function Lt(e){var t;return typeof window>"u"||window.navigator==null?!1:((t=window.navigator.userAgentData)===null||t===void 0?void 0:t.brands.some(n=>e.test(n.brand)))||e.test(window.navigator.userAgent)}function Ht(e){var t;return typeof window<"u"&&window.navigator!=null?e.test(((t=window.navigator.userAgentData)===null||t===void 0?void 0:t.platform)||window.navigator.platform):!1}function Qe(e){let t=null;return()=>(t==null&&(t=e()),t)}const kt=Qe(function(){return Ht(/^Mac/i)}),At=Qe(function(){return Lt(/Android/i)});function Ot(e){return e.mozInputSource===0&&e.isTrusted?!0:At()&&e.pointerType?e.type==="click"&&e.buttons===1:e.detail===0&&!e.pointerType}class _t{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(t,n){this.nativeEvent=n,this.target=n.target,this.currentTarget=n.currentTarget,this.relatedTarget=n.relatedTarget,this.bubbles=n.bubbles,this.cancelable=n.cancelable,this.defaultPrevented=n.defaultPrevented,this.eventPhase=n.eventPhase,this.isTrusted=n.isTrusted,this.timeStamp=n.timeStamp,this.type=t}}function qe(e){let t=u.useRef({isFocused:!1,observer:null});Ge(()=>{const r=t.current;return()=>{r.observer&&(r.observer.disconnect(),r.observer=null)}},[]);let n=Dt(r=>{e==null||e(r)});return u.useCallback(r=>{if(r.target instanceof HTMLButtonElement||r.target instanceof HTMLInputElement||r.target instanceof HTMLTextAreaElement||r.target instanceof HTMLSelectElement){t.current.isFocused=!0;let o=r.target,i=s=>{t.current.isFocused=!1,o.disabled&&n(new _t("blur",s)),t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)};o.addEventListener("focusout",i,{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&o.disabled){var s;(s=t.current.observer)===null||s===void 0||s.disconnect();let l=o===document.activeElement?null:document.activeElement;o.dispatchEvent(new FocusEvent("blur",{relatedTarget:l})),o.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:l}))}}),t.current.observer.observe(o,{attributes:!0,attributeFilter:["disabled"]})}},[n])}function Bt(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:o}=e;const i=u.useCallback(c=>{if(c.target===c.currentTarget)return r&&r(c),o&&o(!1),!0},[r,o]),s=qe(i),l=u.useCallback(c=>{const d=J(c.target);c.target===c.currentTarget&&d.activeElement===c.target&&(n&&n(c),o&&o(!0),s(c))},[o,n,s]);return{focusProps:{onFocus:!t&&(n||o||r)?l:void 0,onBlur:!t&&(r||o)?i:void 0}}}let Z=null,ve=new Set,z=new Map,G=!1,ge=!1;const Nt={Tab:!0,Escape:!0};function $e(e,t){for(let n of ve)n(e,t)}function Wt(e){return!(e.metaKey||!kt()&&e.altKey||e.ctrlKey||e.key==="Control"||e.key==="Shift"||e.key==="Meta")}function re(e){G=!0,Wt(e)&&(Z="keyboard",$e("keyboard",e))}function A(e){Z="pointer",(e.type==="mousedown"||e.type==="pointerdown")&&(G=!0,$e("pointer",e))}function ze(e){Ot(e)&&(G=!0,Z="virtual")}function Xe(e){e.target===window||e.target===document||(!G&&!ge&&(Z="virtual",$e("virtual",e)),G=!1,ge=!1)}function Je(){G=!1,ge=!0}function be(e){if(typeof window>"u"||z.get(Y(e)))return;const t=Y(e),n=J(e);let r=t.HTMLElement.prototype.focus;t.HTMLElement.prototype.focus=function(){G=!0,r.apply(this,arguments)},n.addEventListener("keydown",re,!0),n.addEventListener("keyup",re,!0),n.addEventListener("click",ze,!0),t.addEventListener("focus",Xe,!0),t.addEventListener("blur",Je,!1),typeof PointerEvent<"u"?(n.addEventListener("pointerdown",A,!0),n.addEventListener("pointermove",A,!0),n.addEventListener("pointerup",A,!0)):(n.addEventListener("mousedown",A,!0),n.addEventListener("mousemove",A,!0),n.addEventListener("mouseup",A,!0)),t.addEventListener("beforeunload",()=>{Ze(e)},{once:!0}),z.set(t,{focus:r})}const Ze=(e,t)=>{const n=Y(e),r=J(e);t&&r.removeEventListener("DOMContentLoaded",t),z.has(n)&&(n.HTMLElement.prototype.focus=z.get(n).focus,r.removeEventListener("keydown",re,!0),r.removeEventListener("keyup",re,!0),r.removeEventListener("click",ze,!0),n.removeEventListener("focus",Xe,!0),n.removeEventListener("blur",Je,!1),typeof PointerEvent<"u"?(r.removeEventListener("pointerdown",A,!0),r.removeEventListener("pointermove",A,!0),r.removeEventListener("pointerup",A,!0)):(r.removeEventListener("mousedown",A,!0),r.removeEventListener("mousemove",A,!0),r.removeEventListener("mouseup",A,!0)),z.delete(n))};function jt(e){const t=J(e);let n;return t.readyState!=="loading"?be(e):(n=()=>{be(e)},t.addEventListener("DOMContentLoaded",n)),()=>Ze(e,n)}typeof document<"u"&&jt();function et(){return Z!=="pointer"}const Vt=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);function Kt(e,t,n){var r;const o=typeof window<"u"?Y(n==null?void 0:n.target).HTMLInputElement:HTMLInputElement,i=typeof window<"u"?Y(n==null?void 0:n.target).HTMLTextAreaElement:HTMLTextAreaElement,s=typeof window<"u"?Y(n==null?void 0:n.target).HTMLElement:HTMLElement,l=typeof window<"u"?Y(n==null?void 0:n.target).KeyboardEvent:KeyboardEvent;return e=e||(n==null?void 0:n.target)instanceof o&&!Vt.has(n==null||(r=n.target)===null||r===void 0?void 0:r.type)||(n==null?void 0:n.target)instanceof i||(n==null?void 0:n.target)instanceof s&&(n==null?void 0:n.target.isContentEditable),!(e&&t==="keyboard"&&n instanceof l&&!Nt[n.key])}function Ut(e,t,n){be(),u.useEffect(()=>{let r=(o,i)=>{Kt(!!(n!=null&&n.isTextInput),o,i)&&e(et())};return ve.add(r),()=>{ve.delete(r)}},t)}function Yt(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:o}=e,i=u.useRef({isFocusWithin:!1}),s=u.useCallback(d=>{i.current.isFocusWithin&&!d.currentTarget.contains(d.relatedTarget)&&(i.current.isFocusWithin=!1,n&&n(d),o&&o(!1))},[n,o,i]),l=qe(s),c=u.useCallback(d=>{!i.current.isFocusWithin&&document.activeElement===d.target&&(r&&r(d),o&&o(!0),i.current.isFocusWithin=!0,l(d))},[r,o,l]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:c,onBlur:s}}}let oe=!1,ce=0;function he(){oe=!0,setTimeout(()=>{oe=!1},50)}function Ce(e){e.pointerType==="touch"&&he()}function Gt(){if(!(typeof document>"u"))return typeof PointerEvent<"u"?document.addEventListener("pointerup",Ce):document.addEventListener("touchend",he),ce++,()=>{ce--,!(ce>0)&&(typeof PointerEvent<"u"?document.removeEventListener("pointerup",Ce):document.removeEventListener("touchend",he))}}function Qt(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,isDisabled:o}=e,[i,s]=u.useState(!1),l=u.useRef({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;u.useEffect(Gt,[]);let{hoverProps:c,triggerHoverEnd:d}=u.useMemo(()=>{let p=(a,v)=>{if(l.pointerType=v,o||v==="touch"||l.isHovered||!a.currentTarget.contains(a.target))return;l.isHovered=!0;let m=a.currentTarget;l.target=m,t&&t({type:"hoverstart",target:m,pointerType:v}),n&&n(!0),s(!0)},g=(a,v)=>{if(l.pointerType="",l.target=null,v==="touch"||!l.isHovered)return;l.isHovered=!1;let m=a.currentTarget;r&&r({type:"hoverend",target:m,pointerType:v}),n&&n(!1),s(!1)},f={};return typeof PointerEvent<"u"?(f.onPointerEnter=a=>{oe&&a.pointerType==="mouse"||p(a,a.pointerType)},f.onPointerLeave=a=>{!o&&a.currentTarget.contains(a.target)&&g(a,a.pointerType)}):(f.onTouchStart=()=>{l.ignoreEmulatedMouseEvents=!0},f.onMouseEnter=a=>{!l.ignoreEmulatedMouseEvents&&!oe&&p(a,"mouse"),l.ignoreEmulatedMouseEvents=!1},f.onMouseLeave=a=>{!o&&a.currentTarget.contains(a.target)&&g(a,"mouse")}),{hoverProps:f,triggerHoverEnd:g}},[t,n,r,o,l]);return u.useEffect(()=>{o&&d({currentTarget:l.target},l.pointerType)},[o]),{hoverProps:c,isHovered:i}}function qt(e={}){let{autoFocus:t=!1,isTextInput:n,within:r}=e,o=u.useRef({isFocused:!1,isFocusVisible:t||et()}),[i,s]=u.useState(!1),[l,c]=u.useState(()=>o.current.isFocused&&o.current.isFocusVisible),d=u.useCallback(()=>c(o.current.isFocused&&o.current.isFocusVisible),[]),p=u.useCallback(a=>{o.current.isFocused=a,s(a),d()},[d]);Ut(a=>{o.current.isFocusVisible=a,d()},[],{isTextInput:n});let{focusProps:g}=Bt({isDisabled:r,onFocusChange:p}),{focusWithinProps:f}=Yt({isDisabled:!r,onFocusWithinChange:p});return{isFocused:i,isFocusVisible:l,focusProps:r?f:g}}function zt(e){let t=e.width/2,n=e.height/2;return{top:e.clientY-n,right:e.clientX+t,bottom:e.clientY+n,left:e.clientX-t}}function Xt(e,t){return!(!e||!t||e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom)}function Jt({disabled:e=!1}={}){let t=u.useRef(null),[n,r]=u.useState(!1),o=Ee(),i=I(()=>{t.current=null,r(!1),o.dispose()}),s=I(l=>{if(o.dispose(),t.current===null){t.current=l.currentTarget,r(!0);{let c=Ve(l.currentTarget);o.addEventListener(c,"pointerup",i,!1),o.addEventListener(c,"pointermove",d=>{if(t.current){let p=zt(d);r(Xt(p,t.current.getBoundingClientRect()))}},!1),o.addEventListener(c,"pointercancel",i,!1)}}});return{pressed:n,pressProps:e?{}:{onPointerDown:s,onPointerUp:i,onClick:i}}}let Zt=u.createContext(void 0);function en(){return u.useContext(Zt)}function tn(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(t==null?void 0:t.getAttribute("disabled"))==="";return r&&nn(n)?!1:r}function nn(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let ue=u.createContext(null);ue.displayName="LabelContext";function we(){let e=u.useContext(ue);if(e===null){let t=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,we),t}return e}function rn(e){var t,n,r;let o=(n=(t=u.useContext(ue))==null?void 0:t.value)!=null?n:void 0;return((r=e==null?void 0:e.length)!=null?r:0)>0?[o,...e].filter(Boolean).join(" "):o}function tt({inherit:e=!1}={}){let t=rn(),[n,r]=u.useState([]),o=e?[t,...n].filter(Boolean):n;return[o.length>0?o.join(" "):void 0,u.useMemo(()=>function(i){let s=I(c=>(r(d=>[...d,c]),()=>r(d=>{let p=d.slice(),g=p.indexOf(c);return g!==-1&&p.splice(g,1),p}))),l=u.useMemo(()=>({register:s,slot:i.slot,name:i.name,props:i.props,value:i.value}),[s,i.slot,i.name,i.props,i.value]);return V.createElement(ue.Provider,{value:l},i.children)},[r])]}let on="label";function un(e,t){var n;let r=u.useId(),o=we(),i=en(),s=at(),{id:l=`headlessui-label-${r}`,htmlFor:c=i??((n=o.props)==null?void 0:n.htmlFor),passive:d=!1,...p}=e,g=X(t);D(()=>o.register(l),[l,o.register]);let f=I(y=>{let w=y.currentTarget;if(w instanceof HTMLLabelElement&&y.preventDefault(),o.props&&"onClick"in o.props&&typeof o.props.onClick=="function"&&o.props.onClick(y),w instanceof HTMLLabelElement){let E=document.getElementById(w.htmlFor);if(E){let h=E.getAttribute("disabled");if(h==="true"||h==="")return;let $=E.getAttribute("aria-disabled");if($==="true"||$==="")return;(E instanceof HTMLInputElement&&(E.type==="radio"||E.type==="checkbox")||E.role==="radio"||E.role==="checkbox"||E.role==="switch")&&E.click(),E.focus({preventScroll:!0})}}}),a=s||!1,v=u.useMemo(()=>({...o.slot,disabled:a}),[o.slot,a]),m={ref:g,...o.props,id:l,htmlFor:c,onClick:f};return d&&("onClick"in m&&(delete m.htmlFor,delete m.onClick),"onClick"in p&&delete p.onClick),U({ourProps:m,theirProps:p,slot:v,defaultTag:c?on:"div",name:o.name||"Label"})}let ln=K(un);Object.assign(ln,{});function an(e){if(e===null)return{width:0,height:0};let{width:t,height:n}=e.getBoundingClientRect();return{width:t,height:n}}function sn(e,t=!1){let n=e===null?null:"current"in e?e.current:e,[r,o]=u.useReducer(()=>({}),{}),i=u.useMemo(()=>an(n),[n,r]);return D(()=>{if(!n)return;let s=new ResizeObserver(o);return s.observe(n),()=>{s.disconnect()}},[n]),t?{width:`${i.width}px`,height:`${i.height}px`}:i}function Pe(e){var t;if(e.type)return e.type;let n=(t=e.as)!=null?t:"button";if(typeof n=="string"&&n.toLowerCase()==="button")return"button"}function cn(e,t){let[n,r]=u.useState(()=>Pe(e));return D(()=>{r(Pe(e))},[e.type,e.as]),D(()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&r("button")},[n,t]),n}function Te(e){return[e.screenX,e.screenY]}function fn(){let e=u.useRef([-1,-1]);return{wasMoved(t){let n=Te(t);return e.current[0]===n[0]&&e.current[1]===n[1]?!1:(e.current=n,!0)},update(t){e.current=Te(t)}}}function dn(e,{container:t,accept:n,walk:r}){let o=u.useRef(n),i=u.useRef(r);u.useEffect(()=>{o.current=n,i.current=r},[n,r]),D(()=>{if(!t||!e)return;let s=Ve(t);if(!s)return;let l=o.current,c=i.current,d=Object.assign(g=>l(g),{acceptNode:l}),p=s.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,d,!1);for(;p.nextNode();)c(p.currentNode)},[t,e,o,i])}function pn(){const e=navigator.userAgentData;return e&&Array.isArray(e.brands)?e.brands.map(t=>{let{brand:n,version:r}=t;return n+"/"+r}).join(" "):navigator.userAgent}var te=typeof document<"u"?u.useLayoutEffect:u.useEffect;function ie(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!ie(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;r--!==0;){const i=o[r];if(!(i==="_owner"&&e.$$typeof)&&!ie(e[i],t[i]))return!1}return!0}return e!==e&&t!==t}function nt(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function De(e,t){const n=nt(e);return Math.round(t*n)/n}function Le(e){const t=u.useRef(e);return te(()=>{t.current=e}),t}function mn(e){e===void 0&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:i,floating:s}={},transform:l=!0,whileElementsMounted:c,open:d}=e,[p,g]=u.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[f,a]=u.useState(r);ie(f,r)||a(r);const[v,m]=u.useState(null),[y,w]=u.useState(null),E=u.useCallback(R=>{R!==M.current&&(M.current=R,m(R))},[]),h=u.useCallback(R=>{R!==x.current&&(x.current=R,w(R))},[]),$=i||v,S=s||y,M=u.useRef(null),x=u.useRef(null),L=u.useRef(p),F=c!=null,O=Le(c),H=Le(o),k=u.useCallback(()=>{if(!M.current||!x.current)return;const R={placement:t,strategy:n,middleware:f};H.current&&(R.platform=H.current),Ct(M.current,x.current,R).then(N=>{const C={...N,isPositioned:!0};_.current&&!ie(L.current,C)&&(L.current=C,W.flushSync(()=>{g(C)}))})},[f,t,n,H]);te(()=>{d===!1&&L.current.isPositioned&&(L.current.isPositioned=!1,g(R=>({...R,isPositioned:!1})))},[d]);const _=u.useRef(!1);te(()=>(_.current=!0,()=>{_.current=!1}),[]),te(()=>{if($&&(M.current=$),S&&(x.current=S),$&&S){if(O.current)return O.current($,S,k);k()}},[$,S,k,O,F]);const B=u.useMemo(()=>({reference:M,floating:x,setReference:E,setFloating:h}),[E,h]),b=u.useMemo(()=>({reference:$,floating:S}),[$,S]),j=u.useMemo(()=>{const R={position:n,left:0,top:0};if(!b.floating)return R;const N=De(b.floating,p.x),C=De(b.floating,p.y);return l?{...R,transform:"translate("+N+"px, "+C+"px)",...nt(b.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:N,top:C}},[n,l,b.floating,p.x,p.y]);return u.useMemo(()=>({...p,update:k,refs:B,elements:b,floatingStyles:j}),[p,k,B,b,j])}const rt=(e,t)=>({...It(e),options:[e,t]}),vn=(e,t)=>({...St(e),options:[e,t]}),gn=(e,t)=>({...Ft(e),options:[e,t]}),bn=(e,t)=>({...Mt(e),options:[e,t]}),ot={...lt},hn=ot.useInsertionEffect,yn=hn||(e=>e());function it(e){const t=u.useRef(()=>{});return yn(()=>{t.current=e}),u.useCallback(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}var ye=typeof document<"u"?u.useLayoutEffect:u.useEffect;let He=!1,En=0;const ke=()=>"floating-ui-"+Math.random().toString(36).slice(2,6)+En++;function $n(){const[e,t]=u.useState(()=>He?ke():void 0);return ye(()=>{e==null&&t(ke())},[]),u.useEffect(()=>{He=!0},[]),e}const wn=ot.useId,xn=wn||$n;function Rn(){const e=new Map;return{emit(t,n){var r;(r=e.get(t))==null||r.forEach(o=>o(n))},on(t,n){e.set(t,[...e.get(t)||[],n])},off(t,n){var r;e.set(t,((r=e.get(t))==null?void 0:r.filter(o=>o!==n))||[])}}}const In=u.createContext(null),Sn=u.createContext(null),Fn=()=>{var e;return((e=u.useContext(In))==null?void 0:e.id)||null},Mn=()=>u.useContext(Sn);function Cn(e){const{open:t=!1,onOpenChange:n,elements:r}=e,o=xn(),i=u.useRef({}),[s]=u.useState(()=>Rn()),l=Fn()!=null,[c,d]=u.useState(r.reference),p=it((a,v,m)=>{i.current.openEvent=a?v:void 0,s.emit("openchange",{open:a,event:v,reason:m,nested:l}),n==null||n(a,v,m)}),g=u.useMemo(()=>({setPositionReference:d}),[]),f=u.useMemo(()=>({reference:c||r.reference||null,floating:r.floating||null,domReference:r.reference}),[c,r.reference,r.floating]);return u.useMemo(()=>({dataRef:i,open:t,onOpenChange:p,elements:f,events:s,floatingId:o,refs:g}),[t,p,f,s,o,g])}function Pn(e){e===void 0&&(e={});const{nodeId:t}=e,n=Cn({...e,elements:{reference:null,floating:null,...e.elements}}),r=e.rootContext||n,o=r.elements,[i,s]=u.useState(null),[l,c]=u.useState(null),p=(o==null?void 0:o.reference)||i,g=u.useRef(null),f=Mn();ye(()=>{p&&(g.current=p)},[p]);const a=mn({...e,elements:{...o,...l&&{reference:l}}}),v=u.useCallback(h=>{const $=ee(h)?{getBoundingClientRect:()=>h.getBoundingClientRect(),contextElement:h}:h;c($),a.refs.setReference($)},[a.refs]),m=u.useCallback(h=>{(ee(h)||h===null)&&(g.current=h,s(h)),(ee(a.refs.reference.current)||a.refs.reference.current===null||h!==null&&!ee(h))&&a.refs.setReference(h)},[a.refs]),y=u.useMemo(()=>({...a.refs,setReference:m,setPositionReference:v,domReference:g}),[a.refs,m,v]),w=u.useMemo(()=>({...a.elements,domReference:p}),[a.elements,p]),E=u.useMemo(()=>({...a,...r,refs:y,elements:w,nodeId:t}),[a,y,w,t,r]);return ye(()=>{r.dataRef.current.floatingContext=E;const h=f==null?void 0:f.nodesRef.current.find($=>$.id===t);h&&(h.context=E)}),u.useMemo(()=>({...a,context:E,refs:y,elements:w}),[a,y,w,E])}const Ae="active",Oe="selected";function fe(e,t,n){const r=new Map,o=n==="item";let i=e;if(o&&e){const{[Ae]:s,[Oe]:l,...c}=e;i=c}return{...n==="floating"&&{tabIndex:-1},...i,...t.map(s=>{const l=s?s[n]:null;return typeof l=="function"?e?l(e):null:l}).concat(e).reduce((s,l)=>(l&&Object.entries(l).forEach(c=>{let[d,p]=c;if(!(o&&[Ae,Oe].includes(d)))if(d.indexOf("on")===0){if(r.has(d)||r.set(d,[]),typeof p=="function"){var g;(g=r.get(d))==null||g.push(p),s[d]=function(){for(var f,a=arguments.length,v=new Array(a),m=0;m<a;m++)v[m]=arguments[m];return(f=r.get(d))==null?void 0:f.map(y=>y(...v)).find(y=>y!==void 0)}}}else s[d]=p}),s),{})}}function Tn(e){e===void 0&&(e=[]);const t=e.map(l=>l==null?void 0:l.reference),n=e.map(l=>l==null?void 0:l.floating),r=e.map(l=>l==null?void 0:l.item),o=u.useCallback(l=>fe(l,e,"reference"),t),i=u.useCallback(l=>fe(l,e,"floating"),n),s=u.useCallback(l=>fe(l,e,"item"),r);return u.useMemo(()=>({getReferenceProps:o,getFloatingProps:i,getItemProps:s}),[o,i,s])}function _e(e,t){return{...e,rects:{...e.rects,floating:{...e.rects.floating,height:t}}}}const Dn=e=>({name:"inner",options:e,async fn(t){const{listRef:n,overflowRef:r,onFallbackChange:o,offset:i=0,index:s=0,minItemsVisible:l=4,referenceOverflowThreshold:c=0,scrollRef:d,...p}=Pt(e,t),{rects:g,elements:{floating:f}}=t,a=n.current[s];if(!a)return{};const v={...t,...await rt(-a.offsetTop-f.clientTop-g.reference.height/2-a.offsetHeight/2-i).fn(t)},m=(d==null?void 0:d.current)||f,y=await se(_e(v,m.scrollHeight),p),w=await se(v,{...p,elementContext:"reference"}),E=Math.max(0,y.top),h=v.y+E,$=Math.max(0,m.scrollHeight-E-Math.max(0,y.bottom));return m.style.maxHeight=$+"px",m.scrollTop=E,o&&(m.offsetHeight<a.offsetHeight*Math.min(l,n.current.length-1)-1||w.top>=-c||w.bottom>=-c?W.flushSync(()=>o(!0)):W.flushSync(()=>o(!1))),r&&(r.current=await se(_e({...v,y:h},m.offsetHeight),p)),{y:h}}});function Ln(e,t){const{open:n,elements:r}=e,{enabled:o=!0,overflowRef:i,scrollRef:s,onChange:l}=t,c=it(l),d=u.useRef(!1),p=u.useRef(null),g=u.useRef(null);u.useEffect(()=>{if(!o)return;function a(m){if(m.ctrlKey||!v||i.current==null)return;const y=m.deltaY,w=i.current.top>=-.5,E=i.current.bottom>=-.5,h=v.scrollHeight-v.clientHeight,$=y<0?-1:1,S=y<0?"max":"min";v.scrollHeight<=v.clientHeight||(!w&&y>0||!E&&y<0?(m.preventDefault(),W.flushSync(()=>{c(M=>M+Math[S](y,h*$))})):/firefox/i.test(pn())&&(v.scrollTop+=y))}const v=(s==null?void 0:s.current)||r.floating;if(n&&v)return v.addEventListener("wheel",a),requestAnimationFrame(()=>{p.current=v.scrollTop,i.current!=null&&(g.current={...i.current})}),()=>{p.current=null,g.current=null,v.removeEventListener("wheel",a)}},[o,n,r.floating,i,s,c]);const f=u.useMemo(()=>({onKeyDown(){d.current=!0},onWheel(){d.current=!1},onPointerMove(){d.current=!1},onScroll(){const a=(s==null?void 0:s.current)||r.floating;if(!(!i.current||!a||!d.current)){if(p.current!==null){const v=a.scrollTop-p.current;(i.current.bottom<-.5&&v<-1||i.current.top<-.5&&v>1)&&W.flushSync(()=>c(m=>m+v))}requestAnimationFrame(()=>{p.current=a.scrollTop})}}}),[r.floating,c,i,s]);return u.useMemo(()=>o?{floating:f}:{},[o,f])}let q=u.createContext({styles:void 0,setReference:()=>{},setFloating:()=>{},getReferenceProps:()=>({}),getFloatingProps:()=>({}),slot:{}});q.displayName="FloatingContext";let xe=u.createContext(null);xe.displayName="PlacementContext";function Hn(e){return u.useMemo(()=>e?typeof e=="string"?{to:e}:e:null,[e])}function kn(){return u.useContext(q).setReference}function An(){return u.useContext(q).getReferenceProps}function On(){let{getFloatingProps:e,slot:t}=u.useContext(q);return u.useCallback((...n)=>Object.assign({},e(...n),{"data-anchor":t.anchor}),[e,t])}function _n(e=null){e===!1&&(e=null),typeof e=="string"&&(e={to:e});let t=u.useContext(xe),n=u.useMemo(()=>e,[JSON.stringify(e,typeof HTMLElement<"u"?(o,i)=>i instanceof HTMLElement?i.outerHTML:i:void 0)]);D(()=>{t==null||t(n??null)},[t,n]);let r=u.useContext(q);return u.useMemo(()=>[r.setFloating,e?r.styles:{}],[r.setFloating,e,r.styles])}let Be=4;function Bn({children:e,enabled:t=!0}){let[n,r]=u.useState(null),[o,i]=u.useState(0),s=u.useRef(null),[l,c]=u.useState(null);Nn(l);let d=t&&n!==null&&l!==null,{to:p="bottom",gap:g=0,offset:f=0,padding:a=0,inner:v}=Wn(n,l),[m,y="center"]=p.split(" ");D(()=>{d&&i(0)},[d]);let{refs:w,floatingStyles:E,context:h}=Pn({open:d,placement:m==="selection"?y==="center"?"bottom":`bottom-${y}`:y==="center"?`${m}`:`${m}-${y}`,strategy:"absolute",transform:!1,middleware:[rt({mainAxis:m==="selection"?0:g,crossAxis:f}),vn({padding:a}),m!=="selection"&&gn({padding:a}),m==="selection"&&v?Dn({...v,padding:a,overflowRef:s,offset:o,minItemsVisible:Be,referenceOverflowThreshold:a,onFallbackChange(H){var k,_;if(!H)return;let B=h.elements.floating;if(!B)return;let b=parseFloat(getComputedStyle(B).scrollPaddingBottom)||0,j=Math.min(Be,B.childElementCount),R=0,N=0;for(let C of(_=(k=h.elements.floating)==null?void 0:k.childNodes)!=null?_:[])if(C instanceof HTMLElement){let Q=C.offsetTop,Ie=Q+C.clientHeight+b,ae=B.scrollTop,Se=ae+B.clientHeight;if(Q>=ae&&Ie<=Se)j--;else{N=Math.max(0,Math.min(Ie,Se)-Math.max(Q,ae)),R=C.clientHeight;break}}j>=1&&i(C=>{let Q=R*j-N+b;return C>=Q?C:Q})}}):null,bn({padding:a,apply({availableWidth:H,availableHeight:k,elements:_}){Object.assign(_.floating.style,{overflow:"auto",maxWidth:`${H}px`,maxHeight:`min(var(--anchor-max-height, 100vh), ${k}px)`})}})].filter(Boolean),whileElementsMounted:Tt}),[$=m,S=y]=h.placement.split("-");m==="selection"&&($="selection");let M=u.useMemo(()=>({anchor:[$,S].filter(Boolean).join(" ")}),[$,S]),x=Ln(h,{overflowRef:s,onChange:i}),{getReferenceProps:L,getFloatingProps:F}=Tn([x]),O=I(H=>{c(H),w.setFloating(H)});return u.createElement(xe.Provider,{value:r},u.createElement(q.Provider,{value:{setFloating:O,setReference:w.setReference,styles:E,getReferenceProps:L,getFloatingProps:F,slot:M}},e))}function Nn(e){D(()=>{if(!e)return;let t=new MutationObserver(()=>{let n=window.getComputedStyle(e).maxHeight,r=parseFloat(n);if(isNaN(r))return;let o=parseInt(n);isNaN(o)||r!==o&&(e.style.maxHeight=`${Math.ceil(r)}px`)});return t.observe(e,{attributes:!0,attributeFilter:["style"]}),()=>{t.disconnect()}},[e])}function Wn(e,t){var n,r,o;let i=de((n=e==null?void 0:e.gap)!=null?n:"var(--anchor-gap, 0)",t),s=de((r=e==null?void 0:e.offset)!=null?r:"var(--anchor-offset, 0)",t),l=de((o=e==null?void 0:e.padding)!=null?o:"var(--anchor-padding, 0)",t);return{...e,gap:i,offset:s,padding:l}}function de(e,t,n=void 0){let r=Ee(),o=I((c,d)=>{if(c==null)return[n,null];if(typeof c=="number")return[c,null];if(typeof c=="string"){if(!d)return[n,null];let p=Ne(c,d);return[p,g=>{let f=ut(c);{let a=f.map(v=>window.getComputedStyle(d).getPropertyValue(v));r.requestAnimationFrame(function v(){r.nextFrame(v);let m=!1;for(let[w,E]of f.entries()){let h=window.getComputedStyle(d).getPropertyValue(E);if(a[w]!==h){a[w]=h,m=!0;break}}if(!m)return;let y=Ne(c,d);p!==y&&(g(y),p=y)})}return r.dispose}]}return[n,null]}),i=u.useMemo(()=>o(e,t)[0],[e,t]),[s=i,l]=u.useState();return D(()=>{let[c,d]=o(e,t);if(l(c),!!d)return d(l)},[e,t]),s}function ut(e){let t=/var\((.*)\)/.exec(e);if(t){let n=t[1].indexOf(",");if(n===-1)return[t[1]];let r=t[1].slice(0,n).trim(),o=t[1].slice(n+1).trim();return o?[r,...ut(o)]:[r]}return[]}function Ne(e,t){let n=document.createElement("div");t.appendChild(n),n.style.setProperty("margin-top","0px","important"),n.style.setProperty("margin-top",e,"important");let r=parseFloat(window.getComputedStyle(n).marginTop)||0;return t.removeChild(n),r}function jn(e){throw new Error("Unexpected object: "+e)}var T=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(T||{});function pe(e,t){let n=t.resolveItems();if(n.length<=0)return null;let r=t.resolveActiveIndex(),o=r??-1;switch(e.focus){case 0:{for(let i=0;i<n.length;++i)if(!t.resolveDisabled(n[i],i,n))return i;return r}case 1:{o===-1&&(o=n.length);for(let i=o-1;i>=0;--i)if(!t.resolveDisabled(n[i],i,n))return i;return r}case 2:{for(let i=o+1;i<n.length;++i)if(!t.resolveDisabled(n[i],i,n))return i;return r}case 3:{for(let i=n.length-1;i>=0;--i)if(!t.resolveDisabled(n[i],i,n))return i;return r}case 4:{for(let i=0;i<n.length;++i)if(t.resolveId(n[i],i,n)===e.id)return i;return r}case 5:return null;default:jn(e)}}function Vn(e,t){let n=u.useRef({left:0,top:0});if(D(()=>{let o=t.current;if(!o)return;let i=o.getBoundingClientRect();i&&(n.current=i)},[e]),t.current==null||!e||t.current===document.activeElement)return!1;let r=t.current.getBoundingClientRect();return r.top!==n.current.top||r.left!==n.current.left}let We=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function je(e){var t,n;let r=(t=e.innerText)!=null?t:"",o=e.cloneNode(!0);if(!(o instanceof HTMLElement))return r;let i=!1;for(let l of o.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))l.remove(),i=!0;let s=i?(n=o.innerText)!=null?n:"":r;return We.test(s)&&(s=s.replace(We,"")),s}function Kn(e){let t=e.getAttribute("aria-label");if(typeof t=="string")return t.trim();let n=e.getAttribute("aria-labelledby");if(n){let r=n.split(" ").map(o=>{let i=document.getElementById(o);if(i){let s=i.getAttribute("aria-label");return typeof s=="string"?s.trim():je(i).trim()}return null}).filter(Boolean);if(r.length>0)return r.join(", ")}return je(e).trim()}function Un(e){let t=u.useRef(""),n=u.useRef("");return I(()=>{let r=e.current;if(!r)return"";let o=r.innerText;if(t.current===o)return n.current;let i=Kn(r).trim().toLowerCase();return t.current=o,n.current=i,i})}var Yn=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Yn||{}),Gn=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(Gn||{}),Qn=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(Qn||{});function me(e,t=n=>n){let n=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,r=ht(t(e.items.slice()),i=>i.dataRef.current.domRef.current),o=n?r.indexOf(n):null;return o===-1&&(o=null),{items:r,activeItemIndex:o}}let qn={1(e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},0(e){return e.menuState===0?e:{...e,__demoMode:!1,menuState:0}},2:(e,t)=>{var n,r,o,i,s;if(e.menuState===1)return e;let l={...e,searchQuery:"",activationTrigger:(n=t.trigger)!=null?n:1,__demoMode:!1};if(t.focus===T.Nothing)return{...l,activeItemIndex:null};if(t.focus===T.Specific)return{...l,activeItemIndex:e.items.findIndex(p=>p.id===t.id)};if(t.focus===T.Previous){let p=e.activeItemIndex;if(p!==null){let g=e.items[p].dataRef.current.domRef,f=pe(t,{resolveItems:()=>e.items,resolveActiveIndex:()=>e.activeItemIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});if(f!==null){let a=e.items[f].dataRef.current.domRef;if(((r=g.current)==null?void 0:r.previousElementSibling)===a.current||((o=a.current)==null?void 0:o.previousElementSibling)===null)return{...l,activeItemIndex:f}}}}else if(t.focus===T.Next){let p=e.activeItemIndex;if(p!==null){let g=e.items[p].dataRef.current.domRef,f=pe(t,{resolveItems:()=>e.items,resolveActiveIndex:()=>e.activeItemIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});if(f!==null){let a=e.items[f].dataRef.current.domRef;if(((i=g.current)==null?void 0:i.nextElementSibling)===a.current||((s=a.current)==null?void 0:s.nextElementSibling)===null)return{...l,activeItemIndex:f}}}}let c=me(e),d=pe(t,{resolveItems:()=>c.items,resolveActiveIndex:()=>c.activeItemIndex,resolveId:p=>p.id,resolveDisabled:p=>p.dataRef.current.disabled});return{...l,...c,activeItemIndex:d}},3:(e,t)=>{let n=e.searchQuery!==""?0:1,r=e.searchQuery+t.value.toLowerCase(),o=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+n).concat(e.items.slice(0,e.activeItemIndex+n)):e.items).find(s=>{var l;return((l=s.dataRef.current.textValue)==null?void 0:l.startsWith(r))&&!s.dataRef.current.disabled}),i=o?e.items.indexOf(o):-1;return i===-1||i===e.activeItemIndex?{...e,searchQuery:r}:{...e,searchQuery:r,activeItemIndex:i,activationTrigger:1}},4(e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},5:(e,t)=>{let n=me(e,r=>[...r,{id:t.id,dataRef:t.dataRef}]);return{...e,...n}},6:(e,t)=>{let n=me(e,r=>{let o=r.findIndex(i=>i.id===t.id);return o!==-1&&r.splice(o,1),r});return{...e,...n,activationTrigger:1}}},Re=u.createContext(null);Re.displayName="MenuContext";function le(e){let t=u.useContext(Re);if(t===null){let n=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,le),n}return t}function zn(e,t){return Ue(t.type,qn,e,t)}let Xn=u.Fragment;function Jn(e,t){let{__demoMode:n=!1,...r}=e,o=u.useReducer(zn,{__demoMode:n,menuState:n?0:1,buttonRef:u.createRef(),itemsRef:u.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:i,itemsRef:s,buttonRef:l},c]=o,d=X(t);st(i===0,[l,s],(a,v)=>{var m;c({type:1}),vt(v,gt.Loose)||(a.preventDefault(),(m=l.current)==null||m.focus())});let p=I(()=>{c({type:1})}),g=u.useMemo(()=>({open:i===0,close:p}),[i,p]),f={ref:d};return V.createElement(Bn,null,V.createElement(Re.Provider,{value:o},V.createElement(yt,{value:Ue(i,{0:ne.Open,1:ne.Closed})},U({ourProps:f,theirProps:r,slot:g,defaultTag:Xn,name:"Menu"}))))}let Zn="button";function er(e,t){var n;let r=u.useId(),{id:o=`headlessui-menu-button-${r}`,disabled:i=!1,autoFocus:s=!1,...l}=e,[c,d]=le("Menu.Button"),p=An(),g=X(c.buttonRef,t,kn()),f=I(x=>{switch(x.key){case P.Space:case P.Enter:case P.ArrowDown:x.preventDefault(),x.stopPropagation(),W.flushSync(()=>d({type:0})),d({type:2,focus:T.First});break;case P.ArrowUp:x.preventDefault(),x.stopPropagation(),W.flushSync(()=>d({type:0})),d({type:2,focus:T.Last});break}}),a=I(x=>{switch(x.key){case P.Space:x.preventDefault();break}}),v=I(x=>{var L;if(tn(x.currentTarget))return x.preventDefault();i||(c.menuState===0?(W.flushSync(()=>d({type:1})),(L=c.buttonRef.current)==null||L.focus({preventScroll:!0})):(x.preventDefault(),d({type:0})))}),{isFocusVisible:m,focusProps:y}=qt({autoFocus:s}),{isHovered:w,hoverProps:E}=Qt({isDisabled:i}),{pressed:h,pressProps:$}=Jt({disabled:i}),S=u.useMemo(()=>({open:c.menuState===0,active:h||c.menuState===0,disabled:i,hover:w,focus:m,autofocus:s}),[c,w,m,h,i,s]),M=Ye(p(),{ref:g,id:o,type:cn(e,c.buttonRef),"aria-haspopup":"menu","aria-controls":(n=c.itemsRef.current)==null?void 0:n.id,"aria-expanded":c.menuState===0,disabled:i||void 0,autoFocus:s,onKeyDown:f,onKeyUp:a,onClick:v},y,E,$);return U({ourProps:M,theirProps:l,slot:S,defaultTag:Zn,name:"Menu.Button"})}let tr="div",nr=Me.RenderStrategy|Me.Static;function rr(e,t){var n,r;let o=u.useId(),{id:i=`headlessui-menu-items-${o}`,anchor:s,portal:l=!1,modal:c=!0,transition:d=!1,...p}=e,g=Hn(s),[f,a]=le("Menu.Items"),[v,m]=_n(g),y=On(),w=X(f.itemsRef,t,g?v:null),E=ct(f.itemsRef);g&&(l=!0);let h=Et(),[$,S]=$t(d,f.itemsRef,h!==null?(h&ne.Open)===ne.Open:f.menuState===0);wt($,f.buttonRef,()=>{a({type:1})});let M=f.__demoMode?!1:c&&f.menuState===0;ft(M,E);let x=f.__demoMode?!1:c&&f.menuState===0;dt(x,{allowed:I(()=>[f.buttonRef.current,f.itemsRef.current])});let L=f.menuState!==0,F=Vn(L,f.buttonRef)?!1:$;u.useEffect(()=>{let b=f.itemsRef.current;b&&f.menuState===0&&b!==(E==null?void 0:E.activeElement)&&b.focus({preventScroll:!0})},[f.menuState,f.itemsRef,E,f.itemsRef.current]),dn(f.menuState===0,{container:f.itemsRef.current,accept(b){return b.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:b.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(b){b.setAttribute("role","none")}});let O=Ee(),H=I(b=>{var j,R,N;switch(O.dispose(),b.key){case P.Space:if(f.searchQuery!=="")return b.preventDefault(),b.stopPropagation(),a({type:3,value:b.key});case P.Enter:if(b.preventDefault(),b.stopPropagation(),a({type:1}),f.activeItemIndex!==null){let{dataRef:C}=f.items[f.activeItemIndex];(R=(j=C.current)==null?void 0:j.domRef.current)==null||R.click()}Ke(f.buttonRef.current);break;case P.ArrowDown:return b.preventDefault(),b.stopPropagation(),a({type:2,focus:T.Next});case P.ArrowUp:return b.preventDefault(),b.stopPropagation(),a({type:2,focus:T.Previous});case P.Home:case P.PageUp:return b.preventDefault(),b.stopPropagation(),a({type:2,focus:T.First});case P.End:case P.PageDown:return b.preventDefault(),b.stopPropagation(),a({type:2,focus:T.Last});case P.Escape:b.preventDefault(),b.stopPropagation(),W.flushSync(()=>a({type:1})),(N=f.buttonRef.current)==null||N.focus({preventScroll:!0});break;case P.Tab:b.preventDefault(),b.stopPropagation(),W.flushSync(()=>a({type:1})),bt(f.buttonRef.current,b.shiftKey?Fe.Previous:Fe.Next);break;default:b.key.length===1&&(a({type:3,value:b.key}),O.setTimeout(()=>a({type:4}),350));break}}),k=I(b=>{switch(b.key){case P.Space:b.preventDefault();break}}),_=u.useMemo(()=>({open:f.menuState===0}),[f.menuState]),B=Ye(g?y():{},{"aria-activedescendant":f.activeItemIndex===null||(n=f.items[f.activeItemIndex])==null?void 0:n.id,"aria-labelledby":(r=f.buttonRef.current)==null?void 0:r.id,id:i,onKeyDown:H,onKeyUp:k,role:"menu",tabIndex:f.menuState===0?0:void 0,ref:w,style:{...p.style,...m,"--button-width":sn(f.buttonRef,!0).width},...xt(S)});return V.createElement(pt,{enabled:l?e.static||$:!1},U({ourProps:B,theirProps:p,slot:_,defaultTag:tr,features:nr,visible:F,name:"Menu.Items"}))}let or=u.Fragment;function ir(e,t){let n=u.useId(),{id:r=`headlessui-menu-item-${n}`,disabled:o=!1,...i}=e,[s,l]=le("Menu.Item"),c=s.activeItemIndex!==null?s.items[s.activeItemIndex].id===r:!1,d=u.useRef(null),p=X(t,d);D(()=>{if(!s.__demoMode&&s.menuState===0&&c&&s.activationTrigger!==0)return Rt().requestAnimationFrame(()=>{var F,O;(O=(F=d.current)==null?void 0:F.scrollIntoView)==null||O.call(F,{block:"nearest"})})},[s.__demoMode,d,c,s.menuState,s.activationTrigger,s.activeItemIndex]);let g=Un(d),f=u.useRef({disabled:o,domRef:d,get textValue(){return g()}});D(()=>{f.current.disabled=o},[f,o]),D(()=>(l({type:5,id:r,dataRef:f}),()=>l({type:6,id:r})),[f,r]);let a=I(()=>{l({type:1})}),v=I(F=>{if(o)return F.preventDefault();l({type:1}),Ke(s.buttonRef.current)}),m=I(()=>{if(o)return l({type:2,focus:T.Nothing});l({type:2,focus:T.Specific,id:r})}),y=fn(),w=I(F=>{y.update(F),!o&&(c||l({type:2,focus:T.Specific,id:r,trigger:0}))}),E=I(F=>{y.wasMoved(F)&&(o||c||l({type:2,focus:T.Specific,id:r,trigger:0}))}),h=I(F=>{y.wasMoved(F)&&(o||c&&l({type:2,focus:T.Nothing}))}),[$,S]=tt(),[M,x]=mt(),L=u.useMemo(()=>({active:c,focus:c,disabled:o,close:a}),[c,o,a]);return V.createElement(S,null,V.createElement(x,null,U({ourProps:{id:r,ref:p,role:"menuitem",tabIndex:o===!0?void 0:-1,"aria-disabled":o===!0?!0:void 0,"aria-labelledby":$,"aria-describedby":M,disabled:void 0,onClick:v,onFocus:m,onPointerEnter:w,onMouseEnter:w,onPointerMove:E,onMouseMove:E,onPointerLeave:h,onMouseLeave:h},theirProps:i,slot:L,defaultTag:or,name:"Menu.Item"})))}let ur="div";function lr(e,t){let[n,r]=tt();return V.createElement(r,null,U({ourProps:{ref:t,"aria-labelledby":n,role:"group"},theirProps:e,slot:{},defaultTag:ur,name:"Menu.Section"}))}let ar="header";function sr(e,t){let n=u.useId(),{id:r=`headlessui-menu-heading-${n}`,...o}=e,i=we();D(()=>i.register(r),[r,i.register]);let s={id:r,ref:t,role:"presentation",...i.props};return U({ourProps:s,theirProps:o,slot:{},defaultTag:ar,name:"Menu.Heading"})}let cr="div";function fr(e,t){return U({ourProps:{ref:t,role:"separator"},theirProps:e,slot:{},defaultTag:cr,name:"Menu.Separator"})}let dr=K(Jn),pr=K(er),mr=K(rr),vr=K(ir),gr=K(lr),br=K(sr),hr=K(fr),Ir=Object.assign(dr,{Button:pr,Items:mr,Item:vr,Section:gr,Heading:br,Separator:hr});function yr({title:e,titleId:t,...n},r){return u.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},n),e?u.createElement("title",{id:t},e):null,u.createElement("path",{fillRule:"evenodd",d:"M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const Er=u.forwardRef(yr),Sr=Er;export{Sr as C,vr as T,Ir as Z,pr as c,mr as f};