import{w as D,e as x,a as l,j as U,u as q,b as N,n as F,c as G,_ as h,d as H}from"./presets-e6ca7264.js";import{r as s,R as _}from"./app-8c72944d.js";function J(n,o){if(n==null)return{};var e={};for(var r in n)if({}.hasOwnProperty.call(n,r)){if(o.indexOf(r)!==-1)continue;e[r]=n[r]}return e}function S(n,o){if(n==null)return{};var e,r,t=J(n,o);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)e=a[r],o.indexOf(e)===-1&&{}.propertyIsEnumerable.call(n,e)&&(t[e]=n[e])}return t}var K=s.createContext({});const R=K;function E(n){var o;return n==null||(o=n.getRootNode)===null||o===void 0?void 0:o.call(n)}function M(n){return E(n)instanceof ShadowRoot}function Q(n){return M(n)?E(n):null}function V(n){return n.replace(/-(.)/g,function(o,e){return e.toUpperCase()})}function X(n,o){D(n,"[@ant-design/icons] ".concat(o))}function I(n){return x(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(x(n.icon)==="object"||typeof n.icon=="function")}function k(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var r=n[e];switch(e){case"class":o.className=r,delete o.class;break;default:delete o[e],o[V(e)]=r}return o},{})}function T(n,o,e){return e?_.createElement(n.tag,l(l({key:o},k(n.attrs)),e),(n.children||[]).map(function(r,t){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(t))})):_.createElement(n.tag,l({key:o},k(n.attrs)),(n.children||[]).map(function(r,t){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(t))}))}function j(n){return U(n)[0]}function O(n){return n?Array.isArray(n)?n:[n]:[]}var Y=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,Z=function(o){var e=s.useContext(R),r=e.csp,t=e.prefixCls,a=e.layer,i=Y;t&&(i=i.replace(/anticon/g,t)),a&&(i="@layer ".concat(a,` {
`).concat(i,`
}`)),s.useEffect(function(){var u=o.current,d=Q(u);q(i,"@ant-design-icons",{prepend:!a,csp:r,attachTo:d})},[])},nn=["icon","className","onClick","style","primaryColor","secondaryColor"],m={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function on(n){var o=n.primaryColor,e=n.secondaryColor;m.primaryColor=o,m.secondaryColor=e||j(o),m.calculated=!!e}function en(){return l({},m)}var y=function(o){var e=o.icon,r=o.className,t=o.onClick,a=o.style,i=o.primaryColor,u=o.secondaryColor,d=S(o,nn),C=s.useRef(),f=m;if(i&&(f={primaryColor:i,secondaryColor:u||j(i)}),Z(C),X(I(e),"icon should be icon definiton, but got ".concat(e)),!I(e))return null;var c=e;return c&&typeof c.icon=="function"&&(c=l(l({},c),{},{icon:c.icon(f.primaryColor,f.secondaryColor)})),T(c.icon,"svg-".concat(c.name),l(l({className:r,onClick:t,style:a,"data-icon":c.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},d),{},{ref:C}))};y.displayName="IconReact";y.getTwoToneColors=en;y.setTwoToneColors=on;const b=y;function z(n){var o=O(n),e=N(o,2),r=e[0],t=e[1];return b.setTwoToneColors({primaryColor:r,secondaryColor:t})}function rn(){var n=b.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var tn=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];z(F.primary);var g=s.forwardRef(function(n,o){var e=n.className,r=n.icon,t=n.spin,a=n.rotate,i=n.tabIndex,u=n.onClick,d=n.twoToneColor,C=S(n,tn),f=s.useContext(R),c=f.prefixCls,p=c===void 0?"anticon":c,P=f.rootClassName,A=G(P,p,h(h({},"".concat(p,"-").concat(r.name),!!r.name),"".concat(p,"-spin"),!!t||r.name==="loading"),e),v=i;v===void 0&&u&&(v=-1);var $=a?{msTransform:"rotate(".concat(a,"deg)"),transform:"rotate(".concat(a,"deg)")}:void 0,B=O(d),w=N(B,2),L=w[0],W=w[1];return s.createElement("span",H({role:"img","aria-label":r.name},C,{ref:o,tabIndex:v,onClick:u,className:A}),s.createElement(b,{icon:r,primaryColor:L,secondaryColor:W,style:$}))});g.displayName="AntdIcon";g.getTwoToneColor=rn;g.setTwoToneColor=z;const ln=g;export{ln as A,R as C,S as _,Q as g};
