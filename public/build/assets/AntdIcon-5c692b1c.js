import{w as L,e as x,a as l,j as U,u as W,b as N,n as q,c as F,_ as h,d as G}from"./presets-48fdd834.js";import{C as S,g as H,_ as R}from"./shadow-f0bae77f.js";import{R as _,r as s}from"./app-0f695b94.js";function J(n){return n.replace(/-(.)/g,function(o,e){return e.toUpperCase()})}function K(n,o){L(n,"[@ant-design/icons] ".concat(o))}function k(n){return x(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(x(n.icon)==="object"||typeof n.icon=="function")}function I(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var r=n[e];switch(e){case"class":o.className=r,delete o.class;break;default:delete o[e],o[J(e)]=r}return o},{})}function v(n,o,e){return e?_.createElement(n.tag,l(l({key:o},I(n.attrs)),e),(n.children||[]).map(function(r,a){return v(r,"".concat(o,"-").concat(n.tag,"-").concat(a))})):_.createElement(n.tag,l({key:o},I(n.attrs)),(n.children||[]).map(function(r,a){return v(r,"".concat(o,"-").concat(n.tag,"-").concat(a))}))}function E(n){return U(n)[0]}function z(n){return n?Array.isArray(n)?n:[n]:[]}var M=`
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
`,Q=function(o){var e=s.useContext(S),r=e.csp,a=e.prefixCls,c=e.layer,t=M;a&&(t=t.replace(/anticon/g,a)),c&&(t="@layer ".concat(c,` {
`).concat(t,`
}`)),s.useEffect(function(){var m=o.current,f=H(m);W(t,"@ant-design-icons",{prepend:!c,csp:r,attachTo:f})},[])},V=["icon","className","onClick","style","primaryColor","secondaryColor"],C={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function X(n){var o=n.primaryColor,e=n.secondaryColor;C.primaryColor=o,C.secondaryColor=e||E(o),C.calculated=!!e}function Y(){return l({},C)}var y=function(o){var e=o.icon,r=o.className,a=o.onClick,c=o.style,t=o.primaryColor,m=o.secondaryColor,f=R(o,V),u=s.useRef(),d=C;if(t&&(d={primaryColor:t,secondaryColor:m||E(t)}),Q(u),K(k(e),"icon should be icon definiton, but got ".concat(e)),!k(e))return null;var i=e;return i&&typeof i.icon=="function"&&(i=l(l({},i),{},{icon:i.icon(d.primaryColor,d.secondaryColor)})),v(i.icon,"svg-".concat(i.name),l(l({className:r,onClick:a,style:c,"data-icon":i.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},f),{},{ref:u}))};y.displayName="IconReact";y.getTwoToneColors=Y;y.setTwoToneColors=X;const w=y;function A(n){var o=z(n),e=N(o,2),r=e[0],a=e[1];return w.setTwoToneColors({primaryColor:r,secondaryColor:a})}function Z(){var n=w.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var nn=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];A(q.primary);var g=s.forwardRef(function(n,o){var e=n.className,r=n.icon,a=n.spin,c=n.rotate,t=n.tabIndex,m=n.onClick,f=n.twoToneColor,u=R(n,nn),d=s.useContext(S),i=d.prefixCls,p=i===void 0?"anticon":i,j=d.rootClassName,$=F(j,p,h(h({},"".concat(p,"-").concat(r.name),!!r.name),"".concat(p,"-spin"),!!a||r.name==="loading"),e),T=t;T===void 0&&m&&(T=-1);var P=c?{msTransform:"rotate(".concat(c,"deg)"),transform:"rotate(".concat(c,"deg)")}:void 0,B=z(f),b=N(B,2),O=b[0],D=b[1];return s.createElement("span",G({role:"img","aria-label":r.name},u,{ref:o,tabIndex:T,onClick:m,className:$}),s.createElement(w,{icon:r,primaryColor:O,secondaryColor:D,style:P}))});g.displayName="AntdIcon";g.getTwoToneColor=Z;g.setTwoToneColor=A;const an=g;export{an as A};
