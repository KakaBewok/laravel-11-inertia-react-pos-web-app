import{r as u,j as he}from"./app-vVRCAGOW.js";import{u as me}from"./index-MU7vlc2G.js";import{P as pe}from"./index-GR9MXyJ6.js";import{u as G}from"./index-Ba5YF6YM.js";var _="focusScope.autoFocusOnMount",j="focusScope.autoFocusOnUnmount",Z={bubbles:!1,cancelable:!0},ge="FocusScope",ye=u.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:c,onUnmountAutoFocus:i,...s}=e,[a,S]=u.useState(null),y=G(c),p=G(i),f=u.useRef(null),v=me(t,o=>S(o)),h=u.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;u.useEffect(()=>{if(r){let o=function(m){if(h.paused||!a)return;const g=m.target;a.contains(g)?f.current=g:k(f.current,{select:!0})},l=function(m){if(h.paused||!a)return;const g=m.relatedTarget;g!==null&&(a.contains(g)||k(f.current,{select:!0}))},d=function(m){if(document.activeElement===document.body)for(const b of m)b.removedNodes.length>0&&k(a)};document.addEventListener("focusin",o),document.addEventListener("focusout",l);const E=new MutationObserver(d);return a&&E.observe(a,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",o),document.removeEventListener("focusout",l),E.disconnect()}}},[r,a,h.paused]),u.useEffect(()=>{if(a){Q.add(h);const o=document.activeElement;if(!a.contains(o)){const d=new CustomEvent(_,Z);a.addEventListener(_,y),a.dispatchEvent(d),d.defaultPrevented||(be(ke(oe(a)),{select:!0}),document.activeElement===o&&k(a))}return()=>{a.removeEventListener(_,y),setTimeout(()=>{const d=new CustomEvent(j,Z);a.addEventListener(j,p),a.dispatchEvent(d),d.defaultPrevented||k(o??document.body,{select:!0}),a.removeEventListener(j,p),Q.remove(h)},0)}}},[a,y,p,h]);const w=u.useCallback(o=>{if(!n&&!r||h.paused)return;const l=o.key==="Tab"&&!o.altKey&&!o.ctrlKey&&!o.metaKey,d=document.activeElement;if(l&&d){const E=o.currentTarget,[m,g]=Ee(E);m&&g?!o.shiftKey&&d===g?(o.preventDefault(),n&&k(m,{select:!0})):o.shiftKey&&d===m&&(o.preventDefault(),n&&k(g,{select:!0})):d===E&&o.preventDefault()}},[n,r,h.paused]);return he.jsx(pe.div,{tabIndex:-1,...s,ref:v,onKeyDown:w})});ye.displayName=ge;function be(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(k(r,{select:t}),document.activeElement!==n)return}function Ee(e){const t=oe(e),n=q(t,e),r=q(t.reverse(),e);return[n,r]}function oe(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const c=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||c?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function q(e,t){for(const n of e)if(!Se(n,{upTo:t}))return n}function Se(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function we(e){return e instanceof HTMLInputElement&&"select"in e}function k(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&we(e)&&t&&e.select()}}var Q=Ce();function Ce(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=$(e,t),e.unshift(t)},remove(t){var n;e=$(e,t),(n=e[0])==null||n.resume()}}}function $(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function ke(e){return e.filter(t=>t.tagName!=="A")}var U=0;function mt(){u.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??J()),document.body.insertAdjacentElement("beforeend",e[1]??J()),U++,()=>{U===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),U--}},[])}function J(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var C=function(){return C=Object.assign||function(t){for(var n,r=1,c=arguments.length;r<c;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},C.apply(this,arguments)};function ce(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]]);return n}function Ae(e,t,n){if(n||arguments.length===2)for(var r=0,c=t.length,i;r<c;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var W="right-scroll-bar-position",B="width-before-scroll-bar",Re="with-scroll-bars-hidden",Te="--removed-body-scroll-bar-size";function K(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Pe(e,t){var n=u.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var c=n.value;c!==r&&(n.value=r,n.callback(r,c))}}}})[0];return n.callback=t,n.facade}var Me=typeof window<"u"?u.useLayoutEffect:u.useEffect,ee=new WeakMap;function Ne(e,t){var n=Pe(null,function(r){return e.forEach(function(c){return K(c,r)})});return Me(function(){var r=ee.get(n);if(r){var c=new Set(r),i=new Set(e),s=n.current;c.forEach(function(a){i.has(a)||K(a,null)}),i.forEach(function(a){c.has(a)||K(a,s)})}ee.set(n,e)},[e]),n}function Fe(e){return e}function Le(e,t){t===void 0&&(t=Fe);var n=[],r=!1,c={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(i){var s=t(i,r);return n.push(s),function(){n=n.filter(function(a){return a!==s})}},assignSyncMedium:function(i){for(r=!0;n.length;){var s=n;n=[],s.forEach(i)}n={push:function(a){return i(a)},filter:function(){return n}}},assignMedium:function(i){r=!0;var s=[];if(n.length){var a=n;n=[],a.forEach(i),s=n}var S=function(){var p=s;s=[],p.forEach(i)},y=function(){return Promise.resolve().then(S)};y(),n={push:function(p){s.push(p),y()},filter:function(p){return s=s.filter(p),n}}}};return c}function Oe(e){e===void 0&&(e={});var t=Le(null);return t.options=C({async:!0,ssr:!1},e),t}var ue=function(e){var t=e.sideCar,n=ce(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return u.createElement(r,C({},n))};ue.isSideCarExport=!0;function xe(e,t){return e.useMedium(t),ue}var ie=Oe(),H=function(){},D=u.forwardRef(function(e,t){var n=u.useRef(null),r=u.useState({onScrollCapture:H,onWheelCapture:H,onTouchMoveCapture:H}),c=r[0],i=r[1],s=e.forwardProps,a=e.children,S=e.className,y=e.removeScrollBar,p=e.enabled,f=e.shards,v=e.sideCar,h=e.noIsolation,w=e.inert,o=e.allowPinchZoom,l=e.as,d=l===void 0?"div":l,E=e.gapMode,m=ce(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),g=v,b=Ne([n,t]),A=C(C({},m),c);return u.createElement(u.Fragment,null,p&&u.createElement(g,{sideCar:ie,removeScrollBar:y,shards:f,noIsolation:h,inert:w,setCallbacks:i,allowPinchZoom:!!o,lockRef:n,gapMode:E}),s?u.cloneElement(u.Children.only(a),C(C({},A),{ref:b})):u.createElement(d,C({},A,{className:S,ref:b}),a))});D.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};D.classNames={fullWidth:B,zeroRight:W};var Ie=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function We(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Ie();return t&&e.setAttribute("nonce",t),e}function Be(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function De(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var _e=function(){var e=0,t=null;return{add:function(n){e==0&&(t=We())&&(Be(t,n),De(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},je=function(){var e=_e();return function(t,n){u.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},le=function(){var e=je(),t=function(n){var r=n.styles,c=n.dynamic;return e(r,c),null};return t},Ue={left:0,top:0,right:0,gap:0},V=function(e){return parseInt(e||"",10)||0},Ke=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],c=t[e==="padding"?"paddingRight":"marginRight"];return[V(n),V(r),V(c)]},He=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Ue;var t=Ke(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Ve=le(),M="data-scroll-locked",Xe=function(e,t,n,r){var c=e.left,i=e.top,s=e.right,a=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(Re,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(a,"px ").concat(r,`;
  }
  body[`).concat(M,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(c,`px;
    padding-top: `).concat(i,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(a,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(W,` {
    right: `).concat(a,"px ").concat(r,`;
  }
  
  .`).concat(B,` {
    margin-right: `).concat(a,"px ").concat(r,`;
  }
  
  .`).concat(W," .").concat(W,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(B," .").concat(B,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(M,`] {
    `).concat(Te,": ").concat(a,`px;
  }
`)},te=function(){var e=parseInt(document.body.getAttribute(M)||"0",10);return isFinite(e)?e:0},Ye=function(){u.useEffect(function(){return document.body.setAttribute(M,(te()+1).toString()),function(){var e=te()-1;e<=0?document.body.removeAttribute(M):document.body.setAttribute(M,e.toString())}},[])},ze=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,c=r===void 0?"margin":r;Ye();var i=u.useMemo(function(){return He(c)},[c]);return u.createElement(Ve,{styles:Xe(i,!t,c,n?"":"!important")})},Y=!1;if(typeof window<"u")try{var L=Object.defineProperty({},"passive",{get:function(){return Y=!0,!0}});window.addEventListener("test",L,L),window.removeEventListener("test",L,L)}catch{Y=!1}var R=Y?{passive:!1}:!1,Ge=function(e){return e.tagName==="TEXTAREA"},se=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Ge(e)&&n[t]==="visible")},Ze=function(e){return se(e,"overflowY")},qe=function(e){return se(e,"overflowX")},ne=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var c=fe(e,r);if(c){var i=de(e,r),s=i[1],a=i[2];if(s>a)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},Qe=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},$e=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},fe=function(e,t){return e==="v"?Ze(t):qe(t)},de=function(e,t){return e==="v"?Qe(t):$e(t)},Je=function(e,t){return e==="h"&&t==="rtl"?-1:1},et=function(e,t,n,r,c){var i=Je(e,window.getComputedStyle(t).direction),s=i*r,a=n.target,S=t.contains(a),y=!1,p=s>0,f=0,v=0;do{var h=de(e,a),w=h[0],o=h[1],l=h[2],d=o-l-i*w;(w||d)&&fe(e,a)&&(f+=d,v+=w),a instanceof ShadowRoot?a=a.host:a=a.parentNode}while(!S&&a!==document.body||S&&(t.contains(a)||t===a));return(p&&(Math.abs(f)<1||!c)||!p&&(Math.abs(v)<1||!c))&&(y=!0),y},O=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},re=function(e){return[e.deltaX,e.deltaY]},ae=function(e){return e&&"current"in e?e.current:e},tt=function(e,t){return e[0]===t[0]&&e[1]===t[1]},nt=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},rt=0,T=[];function at(e){var t=u.useRef([]),n=u.useRef([0,0]),r=u.useRef(),c=u.useState(rt++)[0],i=u.useState(le)[0],s=u.useRef(e);u.useEffect(function(){s.current=e},[e]),u.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(c));var o=Ae([e.lockRef.current],(e.shards||[]).map(ae),!0).filter(Boolean);return o.forEach(function(l){return l.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),o.forEach(function(l){return l.classList.remove("allow-interactivity-".concat(c))})}}},[e.inert,e.lockRef.current,e.shards]);var a=u.useCallback(function(o,l){if("touches"in o&&o.touches.length===2||o.type==="wheel"&&o.ctrlKey)return!s.current.allowPinchZoom;var d=O(o),E=n.current,m="deltaX"in o?o.deltaX:E[0]-d[0],g="deltaY"in o?o.deltaY:E[1]-d[1],b,A=o.target,N=Math.abs(m)>Math.abs(g)?"h":"v";if("touches"in o&&N==="h"&&A.type==="range")return!1;var F=ne(N,A);if(!F)return!0;if(F?b=N:(b=N==="v"?"h":"v",F=ne(N,A)),!F)return!1;if(!r.current&&"changedTouches"in o&&(m||g)&&(r.current=b),!b)return!0;var z=r.current||b;return et(z,l,o,z==="h"?m:g,!0)},[]),S=u.useCallback(function(o){var l=o;if(!(!T.length||T[T.length-1]!==i)){var d="deltaY"in l?re(l):O(l),E=t.current.filter(function(b){return b.name===l.type&&(b.target===l.target||l.target===b.shadowParent)&&tt(b.delta,d)})[0];if(E&&E.should){l.cancelable&&l.preventDefault();return}if(!E){var m=(s.current.shards||[]).map(ae).filter(Boolean).filter(function(b){return b.contains(l.target)}),g=m.length>0?a(l,m[0]):!s.current.noIsolation;g&&l.cancelable&&l.preventDefault()}}},[]),y=u.useCallback(function(o,l,d,E){var m={name:o,delta:l,target:d,should:E,shadowParent:ot(d)};t.current.push(m),setTimeout(function(){t.current=t.current.filter(function(g){return g!==m})},1)},[]),p=u.useCallback(function(o){n.current=O(o),r.current=void 0},[]),f=u.useCallback(function(o){y(o.type,re(o),o.target,a(o,e.lockRef.current))},[]),v=u.useCallback(function(o){y(o.type,O(o),o.target,a(o,e.lockRef.current))},[]);u.useEffect(function(){return T.push(i),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:v}),document.addEventListener("wheel",S,R),document.addEventListener("touchmove",S,R),document.addEventListener("touchstart",p,R),function(){T=T.filter(function(o){return o!==i}),document.removeEventListener("wheel",S,R),document.removeEventListener("touchmove",S,R),document.removeEventListener("touchstart",p,R)}},[]);var h=e.removeScrollBar,w=e.inert;return u.createElement(u.Fragment,null,w?u.createElement(i,{styles:nt(c)}):null,h?u.createElement(ze,{gapMode:e.gapMode}):null)}function ot(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const ct=xe(ie,at);var ut=u.forwardRef(function(e,t){return u.createElement(D,C({},e,{ref:t,sideCar:ct}))});ut.classNames=D.classNames;var it=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},P=new WeakMap,x=new WeakMap,I={},X=0,ve=function(e){return e&&(e.host||ve(e.parentNode))},lt=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=ve(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},st=function(e,t,n,r){var c=lt(t,Array.isArray(e)?e:[e]);I[n]||(I[n]=new WeakMap);var i=I[n],s=[],a=new Set,S=new Set(c),y=function(f){!f||a.has(f)||(a.add(f),y(f.parentNode))};c.forEach(y);var p=function(f){!f||S.has(f)||Array.prototype.forEach.call(f.children,function(v){if(a.has(v))p(v);else try{var h=v.getAttribute(r),w=h!==null&&h!=="false",o=(P.get(v)||0)+1,l=(i.get(v)||0)+1;P.set(v,o),i.set(v,l),s.push(v),o===1&&w&&x.set(v,!0),l===1&&v.setAttribute(n,"true"),w||v.setAttribute(r,"true")}catch(d){console.error("aria-hidden: cannot operate on ",v,d)}})};return p(t),a.clear(),X++,function(){s.forEach(function(f){var v=P.get(f)-1,h=i.get(f)-1;P.set(f,v),i.set(f,h),v||(x.has(f)||f.removeAttribute(r),x.delete(f)),h||f.removeAttribute(n)}),X--,X||(P=new WeakMap,P=new WeakMap,x=new WeakMap,I={})}},pt=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),c=it(e);return c?(r.push.apply(r,Array.from(c.querySelectorAll("[aria-live]"))),st(r,c,n,"aria-hidden")):function(){return null}};export{ye as F,ut as R,pt as h,mt as u};
