import{R as l,r as h}from"./app-cbabef96.js";import{k as f,x as m}from"./useSize-e1afdcd9.js";import"./warning-81272f54.js";const p=["xxl","xl","lg","md","sm","xs"],x=r=>({xs:`(max-width: ${r.screenXSMax}px)`,sm:`(min-width: ${r.screenSM}px)`,md:`(min-width: ${r.screenMD}px)`,lg:`(min-width: ${r.screenLG}px)`,xl:`(min-width: ${r.screenXL}px)`,xxl:`(min-width: ${r.screenXXL}px)`}),$=r=>{const e=r,s=[].concat(p).reverse();return s.forEach((i,a)=>{const t=i.toUpperCase(),c=`screen${t}Min`,n=`screen${t}`;if(!(e[c]<=e[n]))throw new Error(`${c}<=${n} fails : !(${e[c]}<=${e[n]})`);if(a<s.length-1){const o=`screen${t}Max`;if(!(e[n]<=e[o]))throw new Error(`${n}<=${o} fails : !(${e[n]}<=${e[o]})`);const u=`screen${s[a+1].toUpperCase()}Min`;if(!(e[o]<=e[u]))throw new Error(`${o}<=${u} fails : !(${e[o]}<=${e[u]})`)}}),r};function b(){const[,r]=f(),e=x($(r));return l.useMemo(()=>{const s=new Map;let i=-1,a={};return{matchHandlers:{},dispatch(t){return a=t,s.forEach(c=>c(a)),s.size>=1},subscribe(t){return s.size||this.register(),i+=1,s.set(i,t),t(a),i},unsubscribe(t){s.delete(t),s.size||this.unregister()},unregister(){Object.keys(e).forEach(t=>{const c=e[t],n=this.matchHandlers[c];n==null||n.mql.removeListener(n==null?void 0:n.listener)}),s.clear()},register(){Object.keys(e).forEach(t=>{const c=e[t],n=d=>{let{matches:u}=d;this.dispatch(Object.assign(Object.assign({},a),{[t]:u}))},o=window.matchMedia(c);o.addListener(n),this.matchHandlers[c]={mql:o,listener:n},n(o)})},responsiveMap:e}},[r])}const E=(r,e)=>{if(e&&typeof e=="object")for(let s=0;s<p.length;s++){const i=p[s];if(r[i]&&e[i]!==void 0)return e[i]}};function M(){const[,r]=h.useReducer(e=>e+1,0);return r}function U(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;const e=h.useRef({}),s=M(),i=b();return m(()=>{const a=i.subscribe(t=>{e.current=t,r&&s()});return()=>i.unsubscribe(a)},[]),e.current}export{M as a,E as m,U as u};