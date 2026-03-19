import{w as L,_ as l,g as U,u as W,d as N,e as q,b as F,a as G}from"./warning-8a11f3af.js";import{_ as x}from"./defineProperty-83f36300.js";import{I as S,g as H,_ as R}from"./shadow-371a5539.js";import{R as h,r as s}from"./store-9c50da1b.js";import{_}from"./typeof-7fd5df1e.js";function J(n){return n.replace(/-(.)/g,function(o,e){return e.toUpperCase()})}function K(n,o){L(n,"[@ant-design/icons] ".concat(o))}function I(n){return _(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(_(n.icon)==="object"||typeof n.icon=="function")}function k(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var r=n[e];switch(e){case"class":o.className=r,delete o.class;break;default:delete o[e],o[J(e)]=r}return o},{})}function v(n,o,e){return e?h.createElement(n.tag,l(l({key:o},k(n.attrs)),e),(n.children||[]).map(function(r,a){return v(r,"".concat(o,"-").concat(n.tag,"-").concat(a))})):h.createElement(n.tag,l({key:o},k(n.attrs)),(n.children||[]).map(function(r,a){return v(r,"".concat(o,"-").concat(n.tag,"-").concat(a))}))}function E(n){return U(n)[0]}function z(n){return n?Array.isArray(n)?n:[n]:[]}var M=`
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
}`)),s.useEffect(function(){var m=o.current,d=H(m);W(t,"@ant-design-icons",{prepend:!c,csp:r,attachTo:d})},[])},V=["icon","className","onClick","style","primaryColor","secondaryColor"],C={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function X(n){var o=n.primaryColor,e=n.secondaryColor;C.primaryColor=o,C.secondaryColor=e||E(o),C.calculated=!!e}function Y(){return l({},C)}var y=function(o){var e=o.icon,r=o.className,a=o.onClick,c=o.style,t=o.primaryColor,m=o.secondaryColor,d=R(o,V),u=s.useRef(),f=C;if(t&&(f={primaryColor:t,secondaryColor:m||E(t)}),Q(u),K(I(e),"icon should be icon definiton, but got ".concat(e)),!I(e))return null;var i=e;return i&&typeof i.icon=="function"&&(i=l(l({},i),{},{icon:i.icon(f.primaryColor,f.secondaryColor)})),v(i.icon,"svg-".concat(i.name),l(l({className:r,onClick:a,style:c,"data-icon":i.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},d),{},{ref:u}))};y.displayName="IconReact";y.getTwoToneColors=Y;y.setTwoToneColors=X;const w=y;function A(n){var o=z(n),e=N(o,2),r=e[0],a=e[1];return w.setTwoToneColors({primaryColor:r,secondaryColor:a})}function Z(){var n=w.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var nn=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];A(q.primary);var g=s.forwardRef(function(n,o){var e=n.className,r=n.icon,a=n.spin,c=n.rotate,t=n.tabIndex,m=n.onClick,d=n.twoToneColor,u=R(n,nn),f=s.useContext(S),i=f.prefixCls,p=i===void 0?"anticon":i,j=f.rootClassName,$=F(j,p,x(x({},"".concat(p,"-").concat(r.name),!!r.name),"".concat(p,"-spin"),!!a||r.name==="loading"),e),T=t;T===void 0&&m&&(T=-1);var P=c?{msTransform:"rotate(".concat(c,"deg)"),transform:"rotate(".concat(c,"deg)")}:void 0,B=z(d),b=N(B,2),O=b[0],D=b[1];return s.createElement("span",G({role:"img","aria-label":r.name},u,{ref:o,tabIndex:T,onClick:m,className:$}),s.createElement(w,{icon:r,primaryColor:O,secondaryColor:D,style:P}))});g.displayName="AntdIcon";g.getTwoToneColor=Z;g.setTwoToneColor=A;const cn=g;export{cn as A};
