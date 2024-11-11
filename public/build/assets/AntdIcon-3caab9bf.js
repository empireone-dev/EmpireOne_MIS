import{w as L,f as x,a as c,A as W,D as I,u as q,d as S,b as R,E as F,c as G,_ as h,e as H}from"./presets-202283c5.js";import{U as k,r as s}from"./app-0df8c9ad.js";function E(n){var o;return n==null||(o=n.getRootNode)===null||o===void 0?void 0:o.call(n)}function J(n){return E(n)instanceof ShadowRoot}function K(n){return J(n)?E(n):null}function M(n){return n.replace(/-(.)/g,function(o,e){return e.toUpperCase()})}function Q(n,o){L(n,"[@ant-design/icons] ".concat(o))}function N(n){return x(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(x(n.icon)==="object"||typeof n.icon=="function")}function _(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var r=n[e];switch(e){case"class":o.className=r,delete o.class;break;default:delete o[e],o[M(e)]=r}return o},{})}function T(n,o,e){return e?k.createElement(n.tag,c(c({key:o},_(n.attrs)),e),(n.children||[]).map(function(r,t){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(t))})):k.createElement(n.tag,c({key:o},_(n.attrs)),(n.children||[]).map(function(r,t){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(t))}))}function z(n){return W(n)[0]}function A(n){return n?Array.isArray(n)?n:[n]:[]}var V=`
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
`,X=function(o){var e=s.useContext(I),r=e.csp,t=e.prefixCls,i=V;t&&(i=i.replace(/anticon/g,t)),s.useEffect(function(){var l=o.current,u=K(l);q(i,"@ant-design-icons",{prepend:!0,csp:r,attachTo:u})},[])},Y=["icon","className","onClick","style","primaryColor","secondaryColor"],m={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Z(n){var o=n.primaryColor,e=n.secondaryColor;m.primaryColor=o,m.secondaryColor=e||z(o),m.calculated=!!e}function nn(){return c({},m)}var C=function(o){var e=o.icon,r=o.className,t=o.onClick,i=o.style,l=o.primaryColor,u=o.secondaryColor,g=S(o,Y),f=s.useRef(),d=m;if(l&&(d={primaryColor:l,secondaryColor:u||z(l)}),X(f),Q(N(e),"icon should be icon definiton, but got ".concat(e)),!N(e))return null;var a=e;return a&&typeof a.icon=="function"&&(a=c(c({},a),{},{icon:a.icon(d.primaryColor,d.secondaryColor)})),T(a.icon,"svg-".concat(a.name),c(c({className:r,onClick:t,style:i,"data-icon":a.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},g),{},{ref:f}))};C.displayName="IconReact";C.getTwoToneColors=nn;C.setTwoToneColors=Z;const w=C;function $(n){var o=A(n),e=R(o,2),r=e[0],t=e[1];return w.setTwoToneColors({primaryColor:r,secondaryColor:t})}function on(){var n=w.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var en=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];$(F.primary);var y=s.forwardRef(function(n,o){var e=n.className,r=n.icon,t=n.spin,i=n.rotate,l=n.tabIndex,u=n.onClick,g=n.twoToneColor,f=S(n,en),d=s.useContext(I),a=d.prefixCls,v=a===void 0?"anticon":a,j=d.rootClassName,P=G(j,v,h(h({},"".concat(v,"-").concat(r.name),!!r.name),"".concat(v,"-spin"),!!t||r.name==="loading"),e),p=l;p===void 0&&u&&(p=-1);var B=i?{msTransform:"rotate(".concat(i,"deg)"),transform:"rotate(".concat(i,"deg)")}:void 0,D=A(g),b=R(D,2),O=b[0],U=b[1];return s.createElement("span",H({role:"img","aria-label":r.name},f,{ref:o,tabIndex:p,onClick:u,className:P}),s.createElement(w,{icon:r,primaryColor:O,secondaryColor:U,style:B}))});y.displayName="AntdIcon";y.getTwoToneColor=on;y.setTwoToneColor=$;const an=y;export{an as A,K as g};
