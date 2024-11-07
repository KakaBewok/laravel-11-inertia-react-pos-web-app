import{U as ee,j as d,r as o,R as Ct,b as De}from"./app-vVRCAGOW.js";import{c as bt,d as Et,e as Pt,b as It}from"./react-icons.esm-PTXMq6VF.js";import{c as R,u as Ie,a as $,b as Ne}from"./index-Ba5YF6YM.js";import{c as Tt,a as je,A as Rt,C as Nt,b as _t,R as Ot}from"./index-DHhLAQoV.js";import{u as j,S as Se}from"./index-MU7vlc2G.js";import{P as M,d as Mt}from"./index-GR9MXyJ6.js";import{u as Dt,a as Te}from"./index-DoEqfaoL.js";import{h as jt,u as At,R as Lt,F as Bt}from"./index-BN_t88yI.js";import{u as kt}from"./index-CGT5Zpqz.js";import{V as Vt}from"./index-CiLFz9Bf.js";import{c as q}from"./utils-CcFn7B-c.js";function Ht(t){const n=t+"CollectionProvider",[e,c]=Tt(n),[r,l]=e(n,{collectionRef:{current:null},itemMap:new Map}),a=b=>{const{scope:x,children:p}=b,h=ee.useRef(null),S=ee.useRef(new Map).current;return d.jsx(r,{scope:x,itemMap:S,collectionRef:h,children:p})};a.displayName=n;const s=t+"CollectionSlot",i=ee.forwardRef((b,x)=>{const{scope:p,children:h}=b,S=l(s,p),f=j(x,S.collectionRef);return d.jsx(Se,{ref:f,children:h})});i.displayName=s;const u=t+"CollectionItemSlot",m="data-radix-collection-item",y=ee.forwardRef((b,x)=>{const{scope:p,children:h,...S}=b,f=ee.useRef(null),v=j(x,f),N=l(u,p);return ee.useEffect(()=>(N.itemMap.set(f,{ref:f,...S}),()=>void N.itemMap.delete(f))),d.jsx(Se,{[m]:"",ref:v,children:h})});y.displayName=u;function w(b){const x=l(t+"CollectionConsumer",b);return ee.useCallback(()=>{const h=x.collectionRef.current;if(!h)return[];const S=Array.from(h.querySelectorAll(`[${m}]`));return Array.from(x.itemMap.values()).sort((N,_)=>S.indexOf(N.ref.current)-S.indexOf(_.ref.current))},[x.collectionRef,x.itemMap])}return[{Provider:a,Slot:i,ItemSlot:y},w,c]}var Ft=o.createContext(void 0);function Wt(t){const n=o.useContext(Ft);return t||n||"ltr"}function _e(t,[n,e]){return Math.min(e,Math.max(n,t))}function Ut(t,n=[]){let e=[];function c(l,a){const s=o.createContext(a),i=e.length;e=[...e,a];const u=y=>{var S;const{scope:w,children:b,...x}=y,p=((S=w==null?void 0:w[t])==null?void 0:S[i])||s,h=o.useMemo(()=>x,Object.values(x));return d.jsx(p.Provider,{value:h,children:b})};u.displayName=l+"Provider";function m(y,w){var p;const b=((p=w==null?void 0:w[t])==null?void 0:p[i])||s,x=o.useContext(b);if(x)return x;if(a!==void 0)return a;throw new Error(`\`${y}\` must be used within \`${l}\``)}return[u,m]}const r=()=>{const l=e.map(a=>o.createContext(a));return function(s){const i=(s==null?void 0:s[t])||l;return o.useMemo(()=>({[`__scope${t}`]:{...s,[t]:i}}),[s,i])}};return r.scopeName=t,[c,Kt(r,...n)]}function Kt(...t){const n=t[0];if(t.length===1)return n;const e=()=>{const c=t.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(l){const a=c.reduce((s,{useScope:i,scopeName:u})=>{const y=i(l)[`__scope${u}`];return{...s,...y}},{});return o.useMemo(()=>({[`__scope${n.scopeName}`]:a}),[a])}};return e.scopeName=n.scopeName,e}var $t="DismissableLayer",we="dismissableLayer.update",zt="dismissableLayer.pointerDownOutside",Gt="dismissableLayer.focusOutside",Oe,Ae=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Le=o.forwardRef((t,n)=>{const{disableOutsidePointerEvents:e=!1,onEscapeKeyDown:c,onPointerDownOutside:r,onFocusOutside:l,onInteractOutside:a,onDismiss:s,...i}=t,u=o.useContext(Ae),[m,y]=o.useState(null),w=(m==null?void 0:m.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,b]=o.useState({}),x=j(n,C=>y(C)),p=Array.from(u.layers),[h]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),S=p.indexOf(h),f=m?p.indexOf(m):-1,v=u.layersWithOutsidePointerEventsDisabled.size>0,N=f>=S,_=Xt(C=>{const O=C.target,L=[...u.branches].some(B=>B.contains(O));!N||L||(r==null||r(C),a==null||a(C),C.defaultPrevented||s==null||s())},w),z=Zt(C=>{const O=C.target;[...u.branches].some(B=>B.contains(O))||(l==null||l(C),a==null||a(C),C.defaultPrevented||s==null||s())},w);return Dt(C=>{f===u.layers.size-1&&(c==null||c(C),!C.defaultPrevented&&s&&(C.preventDefault(),s()))},w),o.useEffect(()=>{if(m)return e&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Oe=w.body.style.pointerEvents,w.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(m)),u.layers.add(m),Me(),()=>{e&&u.layersWithOutsidePointerEventsDisabled.size===1&&(w.body.style.pointerEvents=Oe)}},[m,w,e,u]),o.useEffect(()=>()=>{m&&(u.layers.delete(m),u.layersWithOutsidePointerEventsDisabled.delete(m),Me())},[m,u]),o.useEffect(()=>{const C=()=>b({});return document.addEventListener(we,C),()=>document.removeEventListener(we,C)},[]),d.jsx(M.div,{...i,ref:x,style:{pointerEvents:v?N?"auto":"none":void 0,...t.style},onFocusCapture:R(t.onFocusCapture,z.onFocusCapture),onBlurCapture:R(t.onBlurCapture,z.onBlurCapture),onPointerDownCapture:R(t.onPointerDownCapture,_.onPointerDownCapture)})});Le.displayName=$t;var Yt="DismissableLayerBranch",qt=o.forwardRef((t,n)=>{const e=o.useContext(Ae),c=o.useRef(null),r=j(n,c);return o.useEffect(()=>{const l=c.current;if(l)return e.branches.add(l),()=>{e.branches.delete(l)}},[e.branches]),d.jsx(M.div,{...t,ref:r})});qt.displayName=Yt;function Xt(t,n=globalThis==null?void 0:globalThis.document){const e=Ie(t),c=o.useRef(!1),r=o.useRef(()=>{});return o.useEffect(()=>{const l=s=>{if(s.target&&!c.current){let i=function(){Be(zt,e,u,{discrete:!0})};const u={originalEvent:s};s.pointerType==="touch"?(n.removeEventListener("click",r.current),r.current=i,n.addEventListener("click",r.current,{once:!0})):i()}else n.removeEventListener("click",r.current);c.current=!1},a=window.setTimeout(()=>{n.addEventListener("pointerdown",l)},0);return()=>{window.clearTimeout(a),n.removeEventListener("pointerdown",l),n.removeEventListener("click",r.current)}},[n,e]),{onPointerDownCapture:()=>c.current=!0}}function Zt(t,n=globalThis==null?void 0:globalThis.document){const e=Ie(t),c=o.useRef(!1);return o.useEffect(()=>{const r=l=>{l.target&&!c.current&&Be(Gt,e,{originalEvent:l},{discrete:!1})};return n.addEventListener("focusin",r),()=>n.removeEventListener("focusin",r)},[n,e]),{onFocusCapture:()=>c.current=!0,onBlurCapture:()=>c.current=!1}}function Me(){const t=new CustomEvent(we);document.dispatchEvent(t)}function Be(t,n,e,{discrete:c}){const r=e.originalEvent.target,l=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:e});n&&r.addEventListener(t,n,{once:!0}),c?Mt(r,l):r.dispatchEvent(l)}var Jt="Portal",ke=o.forwardRef((t,n)=>{var s;const{container:e,...c}=t,[r,l]=o.useState(!1);$(()=>l(!0),[]);const a=e||r&&((s=globalThis==null?void 0:globalThis.document)==null?void 0:s.body);return a?Ct.createPortal(d.jsx(M.div,{...c,ref:n}),a):null});ke.displayName=Jt;var Qt=[" ","Enter","ArrowUp","ArrowDown"],eo=[" ","Enter"],ae="Select",[de,ue,to]=Ht(ae),[ne,Wo]=Ut(ae,[to,je]),pe=je(),[oo,X]=ne(ae),[no,ro]=ne(ae),Ve=t=>{const{__scopeSelect:n,children:e,open:c,defaultOpen:r,onOpenChange:l,value:a,defaultValue:s,onValueChange:i,dir:u,name:m,autoComplete:y,disabled:w,required:b,form:x}=t,p=pe(n),[h,S]=o.useState(null),[f,v]=o.useState(null),[N,_]=o.useState(!1),z=Wt(u),[C=!1,O]=Ne({prop:c,defaultProp:r,onChange:l}),[L,B]=Ne({prop:a,defaultProp:s,onChange:i}),H=o.useRef(null),F=h?x||!!h.closest("form"):!0,[G,W]=o.useState(new Set),U=Array.from(G).map(D=>D.props.value).join(";");return d.jsx(Ot,{...p,children:d.jsxs(oo,{required:b,scope:n,trigger:h,onTriggerChange:S,valueNode:f,onValueNodeChange:v,valueNodeHasChildren:N,onValueNodeHasChildrenChange:_,contentId:Te(),value:L,onValueChange:B,open:C,onOpenChange:O,dir:z,triggerPointerDownPosRef:H,disabled:w,children:[d.jsx(de.Provider,{scope:n,children:d.jsx(no,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(D=>{W(V=>new Set(V).add(D))},[]),onNativeOptionRemove:o.useCallback(D=>{W(V=>{const K=new Set(V);return K.delete(D),K})},[]),children:e})}),F?d.jsxs(dt,{"aria-hidden":!0,required:b,tabIndex:-1,name:m,autoComplete:y,value:L,onChange:D=>B(D.target.value),disabled:w,form:x,children:[L===void 0?d.jsx("option",{value:""}):null,Array.from(G)]},U):null]})})};Ve.displayName=ae;var He="SelectTrigger",Fe=o.forwardRef((t,n)=>{const{__scopeSelect:e,disabled:c=!1,...r}=t,l=pe(e),a=X(He,e),s=a.disabled||c,i=j(n,a.onTriggerChange),u=ue(e),m=o.useRef("touch"),[y,w,b]=ut(p=>{const h=u().filter(v=>!v.disabled),S=h.find(v=>v.value===a.value),f=pt(h,p,S);f!==void 0&&a.onValueChange(f.value)}),x=p=>{s||(a.onOpenChange(!0),b()),p&&(a.triggerPointerDownPosRef.current={x:Math.round(p.pageX),y:Math.round(p.pageY)})};return d.jsx(Rt,{asChild:!0,...l,children:d.jsx(M.button,{type:"button",role:"combobox","aria-controls":a.contentId,"aria-expanded":a.open,"aria-required":a.required,"aria-autocomplete":"none",dir:a.dir,"data-state":a.open?"open":"closed",disabled:s,"data-disabled":s?"":void 0,"data-placeholder":lt(a.value)?"":void 0,...r,ref:i,onClick:R(r.onClick,p=>{p.currentTarget.focus(),m.current!=="mouse"&&x(p)}),onPointerDown:R(r.onPointerDown,p=>{m.current=p.pointerType;const h=p.target;h.hasPointerCapture(p.pointerId)&&h.releasePointerCapture(p.pointerId),p.button===0&&p.ctrlKey===!1&&p.pointerType==="mouse"&&(x(p),p.preventDefault())}),onKeyDown:R(r.onKeyDown,p=>{const h=y.current!=="";!(p.ctrlKey||p.altKey||p.metaKey)&&p.key.length===1&&w(p.key),!(h&&p.key===" ")&&Qt.includes(p.key)&&(x(),p.preventDefault())})})})});Fe.displayName=He;var We="SelectValue",Ue=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:c,style:r,children:l,placeholder:a="",...s}=t,i=X(We,e),{onValueNodeHasChildrenChange:u}=i,m=l!==void 0,y=j(n,i.onValueNodeChange);return $(()=>{u(m)},[u,m]),d.jsx(M.span,{...s,ref:y,style:{pointerEvents:"none"},children:lt(i.value)?d.jsx(d.Fragment,{children:a}):l})});Ue.displayName=We;var so="SelectIcon",Ke=o.forwardRef((t,n)=>{const{__scopeSelect:e,children:c,...r}=t;return d.jsx(M.span,{"aria-hidden":!0,...r,ref:n,children:c||"▼"})});Ke.displayName=so;var ao="SelectPortal",$e=t=>d.jsx(ke,{asChild:!0,...t});$e.displayName=ao;var te="SelectContent",ze=o.forwardRef((t,n)=>{const e=X(te,t.__scopeSelect),[c,r]=o.useState();if($(()=>{r(new DocumentFragment)},[]),!e.open){const l=c;return l?De.createPortal(d.jsx(Ge,{scope:t.__scopeSelect,children:d.jsx(de.Slot,{scope:t.__scopeSelect,children:d.jsx("div",{children:t.children})})}),l):null}return d.jsx(Ye,{...t,ref:n})});ze.displayName=te;var k=10,[Ge,Z]=ne(te),co="SelectContentImpl",Ye=o.forwardRef((t,n)=>{const{__scopeSelect:e,position:c="item-aligned",onCloseAutoFocus:r,onEscapeKeyDown:l,onPointerDownOutside:a,side:s,sideOffset:i,align:u,alignOffset:m,arrowPadding:y,collisionBoundary:w,collisionPadding:b,sticky:x,hideWhenDetached:p,avoidCollisions:h,...S}=t,f=X(te,e),[v,N]=o.useState(null),[_,z]=o.useState(null),C=j(n,g=>N(g)),[O,L]=o.useState(null),[B,H]=o.useState(null),F=ue(e),[G,W]=o.useState(!1),U=o.useRef(!1);o.useEffect(()=>{if(v)return jt(v)},[v]),At();const D=o.useCallback(g=>{const[T,...A]=F().map(P=>P.ref.current),[I]=A.slice(-1),E=document.activeElement;for(const P of g)if(P===E||(P==null||P.scrollIntoView({block:"nearest"}),P===T&&_&&(_.scrollTop=0),P===I&&_&&(_.scrollTop=_.scrollHeight),P==null||P.focus(),document.activeElement!==E))return},[F,_]),V=o.useCallback(()=>D([O,v]),[D,O,v]);o.useEffect(()=>{G&&V()},[G,V]);const{onOpenChange:K,triggerPointerDownPosRef:Y}=f;o.useEffect(()=>{if(v){let g={x:0,y:0};const T=I=>{var E,P;g={x:Math.abs(Math.round(I.pageX)-(((E=Y.current)==null?void 0:E.x)??0)),y:Math.abs(Math.round(I.pageY)-(((P=Y.current)==null?void 0:P.y)??0))}},A=I=>{g.x<=10&&g.y<=10?I.preventDefault():v.contains(I.target)||K(!1),document.removeEventListener("pointermove",T),Y.current=null};return Y.current!==null&&(document.addEventListener("pointermove",T),document.addEventListener("pointerup",A,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",A,{capture:!0})}}},[v,K,Y]),o.useEffect(()=>{const g=()=>K(!1);return window.addEventListener("blur",g),window.addEventListener("resize",g),()=>{window.removeEventListener("blur",g),window.removeEventListener("resize",g)}},[K]);const[fe,ce]=ut(g=>{const T=F().filter(E=>!E.disabled),A=T.find(E=>E.ref.current===document.activeElement),I=pt(T,g,A);I&&setTimeout(()=>I.ref.current.focus())}),me=o.useCallback((g,T,A)=>{const I=!U.current&&!A;(f.value!==void 0&&f.value===T||I)&&(L(g),I&&(U.current=!0))},[f.value]),he=o.useCallback(()=>v==null?void 0:v.focus(),[v]),oe=o.useCallback((g,T,A)=>{const I=!U.current&&!A;(f.value!==void 0&&f.value===T||I)&&H(g)},[f.value]),ie=c==="popper"?ye:qe,re=ie===ye?{side:s,sideOffset:i,align:u,alignOffset:m,arrowPadding:y,collisionBoundary:w,collisionPadding:b,sticky:x,hideWhenDetached:p,avoidCollisions:h}:{};return d.jsx(Ge,{scope:e,content:v,viewport:_,onViewportChange:z,itemRefCallback:me,selectedItem:O,onItemLeave:he,itemTextRefCallback:oe,focusSelectedItem:V,selectedItemText:B,position:c,isPositioned:G,searchRef:fe,children:d.jsx(Lt,{as:Se,allowPinchZoom:!0,children:d.jsx(Bt,{asChild:!0,trapped:f.open,onMountAutoFocus:g=>{g.preventDefault()},onUnmountAutoFocus:R(r,g=>{var T;(T=f.trigger)==null||T.focus({preventScroll:!0}),g.preventDefault()}),children:d.jsx(Le,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:l,onPointerDownOutside:a,onFocusOutside:g=>g.preventDefault(),onDismiss:()=>f.onOpenChange(!1),children:d.jsx(ie,{role:"listbox",id:f.contentId,"data-state":f.open?"open":"closed",dir:f.dir,onContextMenu:g=>g.preventDefault(),...S,...re,onPlaced:()=>W(!0),ref:C,style:{display:"flex",flexDirection:"column",outline:"none",...S.style},onKeyDown:R(S.onKeyDown,g=>{const T=g.ctrlKey||g.altKey||g.metaKey;if(g.key==="Tab"&&g.preventDefault(),!T&&g.key.length===1&&ce(g.key),["ArrowUp","ArrowDown","Home","End"].includes(g.key)){let I=F().filter(E=>!E.disabled).map(E=>E.ref.current);if(["ArrowUp","End"].includes(g.key)&&(I=I.slice().reverse()),["ArrowUp","ArrowDown"].includes(g.key)){const E=g.target,P=I.indexOf(E);I=I.slice(P+1)}setTimeout(()=>D(I)),g.preventDefault()}})})})})})})});Ye.displayName=co;var io="SelectItemAlignedPosition",qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,onPlaced:c,...r}=t,l=X(te,e),a=Z(te,e),[s,i]=o.useState(null),[u,m]=o.useState(null),y=j(n,C=>m(C)),w=ue(e),b=o.useRef(!1),x=o.useRef(!0),{viewport:p,selectedItem:h,selectedItemText:S,focusSelectedItem:f}=a,v=o.useCallback(()=>{if(l.trigger&&l.valueNode&&s&&u&&p&&h&&S){const C=l.trigger.getBoundingClientRect(),O=u.getBoundingClientRect(),L=l.valueNode.getBoundingClientRect(),B=S.getBoundingClientRect();if(l.dir!=="rtl"){const E=B.left-O.left,P=L.left-E,J=C.left-P,Q=C.width+J,ve=Math.max(Q,O.width),ge=window.innerWidth-k,xe=_e(P,[k,Math.max(k,ge-ve)]);s.style.minWidth=Q+"px",s.style.left=xe+"px"}else{const E=O.right-B.right,P=window.innerWidth-L.right-E,J=window.innerWidth-C.right-P,Q=C.width+J,ve=Math.max(Q,O.width),ge=window.innerWidth-k,xe=_e(P,[k,Math.max(k,ge-ve)]);s.style.minWidth=Q+"px",s.style.right=xe+"px"}const H=w(),F=window.innerHeight-k*2,G=p.scrollHeight,W=window.getComputedStyle(u),U=parseInt(W.borderTopWidth,10),D=parseInt(W.paddingTop,10),V=parseInt(W.borderBottomWidth,10),K=parseInt(W.paddingBottom,10),Y=U+D+G+K+V,fe=Math.min(h.offsetHeight*5,Y),ce=window.getComputedStyle(p),me=parseInt(ce.paddingTop,10),he=parseInt(ce.paddingBottom,10),oe=C.top+C.height/2-k,ie=F-oe,re=h.offsetHeight/2,g=h.offsetTop+re,T=U+D+g,A=Y-T;if(T<=oe){const E=H.length>0&&h===H[H.length-1].ref.current;s.style.bottom="0px";const P=u.clientHeight-p.offsetTop-p.offsetHeight,J=Math.max(ie,re+(E?he:0)+P+V),Q=T+J;s.style.height=Q+"px"}else{const E=H.length>0&&h===H[0].ref.current;s.style.top="0px";const J=Math.max(oe,U+p.offsetTop+(E?me:0)+re)+A;s.style.height=J+"px",p.scrollTop=T-oe+p.offsetTop}s.style.margin=`${k}px 0`,s.style.minHeight=fe+"px",s.style.maxHeight=F+"px",c==null||c(),requestAnimationFrame(()=>b.current=!0)}},[w,l.trigger,l.valueNode,s,u,p,h,S,l.dir,c]);$(()=>v(),[v]);const[N,_]=o.useState();$(()=>{u&&_(window.getComputedStyle(u).zIndex)},[u]);const z=o.useCallback(C=>{C&&x.current===!0&&(v(),f==null||f(),x.current=!1)},[v,f]);return d.jsx(uo,{scope:e,contentWrapper:s,shouldExpandOnScrollRef:b,onScrollButtonChange:z,children:d.jsx("div",{ref:i,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:N},children:d.jsx(M.div,{...r,ref:y,style:{boxSizing:"border-box",maxHeight:"100%",...r.style}})})})});qe.displayName=io;var lo="SelectPopperPosition",ye=o.forwardRef((t,n)=>{const{__scopeSelect:e,align:c="start",collisionPadding:r=k,...l}=t,a=pe(e);return d.jsx(Nt,{...a,...l,ref:n,align:c,collisionPadding:r,style:{boxSizing:"border-box",...l.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});ye.displayName=lo;var[uo,Re]=ne(te,{}),Ce="SelectViewport",Xe=o.forwardRef((t,n)=>{const{__scopeSelect:e,nonce:c,...r}=t,l=Z(Ce,e),a=Re(Ce,e),s=j(n,l.onViewportChange),i=o.useRef(0);return d.jsxs(d.Fragment,{children:[d.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:c}),d.jsx(de.Slot,{scope:e,children:d.jsx(M.div,{"data-radix-select-viewport":"",role:"presentation",...r,ref:s,style:{position:"relative",flex:1,overflow:"hidden auto",...r.style},onScroll:R(r.onScroll,u=>{const m=u.currentTarget,{contentWrapper:y,shouldExpandOnScrollRef:w}=a;if(w!=null&&w.current&&y){const b=Math.abs(i.current-m.scrollTop);if(b>0){const x=window.innerHeight-k*2,p=parseFloat(y.style.minHeight),h=parseFloat(y.style.height),S=Math.max(p,h);if(S<x){const f=S+b,v=Math.min(x,f),N=f-v;y.style.height=v+"px",y.style.bottom==="0px"&&(m.scrollTop=N>0?N:0,y.style.justifyContent="flex-end")}}}i.current=m.scrollTop})})})]})});Xe.displayName=Ce;var Ze="SelectGroup",[po,fo]=ne(Ze),mo=o.forwardRef((t,n)=>{const{__scopeSelect:e,...c}=t,r=Te();return d.jsx(po,{scope:e,id:r,children:d.jsx(M.div,{role:"group","aria-labelledby":r,...c,ref:n})})});mo.displayName=Ze;var Je="SelectLabel",Qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,...c}=t,r=fo(Je,e);return d.jsx(M.div,{id:r.id,...c,ref:n})});Qe.displayName=Je;var le="SelectItem",[ho,et]=ne(le),tt=o.forwardRef((t,n)=>{const{__scopeSelect:e,value:c,disabled:r=!1,textValue:l,...a}=t,s=X(le,e),i=Z(le,e),u=s.value===c,[m,y]=o.useState(l??""),[w,b]=o.useState(!1),x=j(n,f=>{var v;return(v=i.itemRefCallback)==null?void 0:v.call(i,f,c,r)}),p=Te(),h=o.useRef("touch"),S=()=>{r||(s.onValueChange(c),s.onOpenChange(!1))};if(c==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return d.jsx(ho,{scope:e,value:c,disabled:r,textId:p,isSelected:u,onItemTextChange:o.useCallback(f=>{y(v=>v||((f==null?void 0:f.textContent)??"").trim())},[]),children:d.jsx(de.ItemSlot,{scope:e,value:c,disabled:r,textValue:m,children:d.jsx(M.div,{role:"option","aria-labelledby":p,"data-highlighted":w?"":void 0,"aria-selected":u&&w,"data-state":u?"checked":"unchecked","aria-disabled":r||void 0,"data-disabled":r?"":void 0,tabIndex:r?void 0:-1,...a,ref:x,onFocus:R(a.onFocus,()=>b(!0)),onBlur:R(a.onBlur,()=>b(!1)),onClick:R(a.onClick,()=>{h.current!=="mouse"&&S()}),onPointerUp:R(a.onPointerUp,()=>{h.current==="mouse"&&S()}),onPointerDown:R(a.onPointerDown,f=>{h.current=f.pointerType}),onPointerMove:R(a.onPointerMove,f=>{var v;h.current=f.pointerType,r?(v=i.onItemLeave)==null||v.call(i):h.current==="mouse"&&f.currentTarget.focus({preventScroll:!0})}),onPointerLeave:R(a.onPointerLeave,f=>{var v;f.currentTarget===document.activeElement&&((v=i.onItemLeave)==null||v.call(i))}),onKeyDown:R(a.onKeyDown,f=>{var N;((N=i.searchRef)==null?void 0:N.current)!==""&&f.key===" "||(eo.includes(f.key)&&S(),f.key===" "&&f.preventDefault())})})})})});tt.displayName=le;var se="SelectItemText",ot=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:c,style:r,...l}=t,a=X(se,e),s=Z(se,e),i=et(se,e),u=ro(se,e),[m,y]=o.useState(null),w=j(n,S=>y(S),i.onItemTextChange,S=>{var f;return(f=s.itemTextRefCallback)==null?void 0:f.call(s,S,i.value,i.disabled)}),b=m==null?void 0:m.textContent,x=o.useMemo(()=>d.jsx("option",{value:i.value,disabled:i.disabled,children:b},i.value),[i.disabled,i.value,b]),{onNativeOptionAdd:p,onNativeOptionRemove:h}=u;return $(()=>(p(x),()=>h(x)),[p,h,x]),d.jsxs(d.Fragment,{children:[d.jsx(M.span,{id:i.textId,...l,ref:w}),i.isSelected&&a.valueNode&&!a.valueNodeHasChildren?De.createPortal(l.children,a.valueNode):null]})});ot.displayName=se;var nt="SelectItemIndicator",rt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...c}=t;return et(nt,e).isSelected?d.jsx(M.span,{"aria-hidden":!0,...c,ref:n}):null});rt.displayName=nt;var be="SelectScrollUpButton",st=o.forwardRef((t,n)=>{const e=Z(be,t.__scopeSelect),c=Re(be,t.__scopeSelect),[r,l]=o.useState(!1),a=j(n,c.onScrollButtonChange);return $(()=>{if(e.viewport&&e.isPositioned){let s=function(){const u=i.scrollTop>0;l(u)};const i=e.viewport;return s(),i.addEventListener("scroll",s),()=>i.removeEventListener("scroll",s)}},[e.viewport,e.isPositioned]),r?d.jsx(ct,{...t,ref:a,onAutoScroll:()=>{const{viewport:s,selectedItem:i}=e;s&&i&&(s.scrollTop=s.scrollTop-i.offsetHeight)}}):null});st.displayName=be;var Ee="SelectScrollDownButton",at=o.forwardRef((t,n)=>{const e=Z(Ee,t.__scopeSelect),c=Re(Ee,t.__scopeSelect),[r,l]=o.useState(!1),a=j(n,c.onScrollButtonChange);return $(()=>{if(e.viewport&&e.isPositioned){let s=function(){const u=i.scrollHeight-i.clientHeight,m=Math.ceil(i.scrollTop)<u;l(m)};const i=e.viewport;return s(),i.addEventListener("scroll",s),()=>i.removeEventListener("scroll",s)}},[e.viewport,e.isPositioned]),r?d.jsx(ct,{...t,ref:a,onAutoScroll:()=>{const{viewport:s,selectedItem:i}=e;s&&i&&(s.scrollTop=s.scrollTop+i.offsetHeight)}}):null});at.displayName=Ee;var ct=o.forwardRef((t,n)=>{const{__scopeSelect:e,onAutoScroll:c,...r}=t,l=Z("SelectScrollButton",e),a=o.useRef(null),s=ue(e),i=o.useCallback(()=>{a.current!==null&&(window.clearInterval(a.current),a.current=null)},[]);return o.useEffect(()=>()=>i(),[i]),$(()=>{var m;const u=s().find(y=>y.ref.current===document.activeElement);(m=u==null?void 0:u.ref.current)==null||m.scrollIntoView({block:"nearest"})},[s]),d.jsx(M.div,{"aria-hidden":!0,...r,ref:n,style:{flexShrink:0,...r.style},onPointerDown:R(r.onPointerDown,()=>{a.current===null&&(a.current=window.setInterval(c,50))}),onPointerMove:R(r.onPointerMove,()=>{var u;(u=l.onItemLeave)==null||u.call(l),a.current===null&&(a.current=window.setInterval(c,50))}),onPointerLeave:R(r.onPointerLeave,()=>{i()})})}),vo="SelectSeparator",it=o.forwardRef((t,n)=>{const{__scopeSelect:e,...c}=t;return d.jsx(M.div,{"aria-hidden":!0,...c,ref:n})});it.displayName=vo;var Pe="SelectArrow",go=o.forwardRef((t,n)=>{const{__scopeSelect:e,...c}=t,r=pe(e),l=X(Pe,e),a=Z(Pe,e);return l.open&&a.position==="popper"?d.jsx(_t,{...r,...c,ref:n}):null});go.displayName=Pe;function lt(t){return t===""||t===void 0}var dt=o.forwardRef((t,n)=>{const{value:e,...c}=t,r=o.useRef(null),l=j(n,r),a=kt(e);return o.useEffect(()=>{const s=r.current,i=window.HTMLSelectElement.prototype,m=Object.getOwnPropertyDescriptor(i,"value").set;if(a!==e&&m){const y=new Event("change",{bubbles:!0});m.call(s,e),s.dispatchEvent(y)}},[a,e]),d.jsx(Vt,{asChild:!0,children:d.jsx("select",{...c,ref:l,defaultValue:e})})});dt.displayName="BubbleSelect";function ut(t){const n=Ie(t),e=o.useRef(""),c=o.useRef(0),r=o.useCallback(a=>{const s=e.current+a;n(s),function i(u){e.current=u,window.clearTimeout(c.current),u!==""&&(c.current=window.setTimeout(()=>i(""),1e3))}(s)},[n]),l=o.useCallback(()=>{e.current="",window.clearTimeout(c.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(c.current),[]),[e,r,l]}function pt(t,n,e){const r=n.length>1&&Array.from(n).every(u=>u===n[0])?n[0]:n,l=e?t.indexOf(e):-1;let a=xo(t,Math.max(l,0));r.length===1&&(a=a.filter(u=>u!==e));const i=a.find(u=>u.textValue.toLowerCase().startsWith(r.toLowerCase()));return i!==e?i:void 0}function xo(t,n){return t.map((e,c)=>t[(n+c)%t.length])}var So=Ve,ft=Fe,wo=Ue,yo=Ke,Co=$e,mt=ze,bo=Xe,ht=Qe,vt=tt,Eo=ot,Po=rt,gt=st,xt=at,St=it;const Uo=So,Ko=wo,Io=o.forwardRef(({className:t,children:n,...e},c)=>d.jsxs(ft,{ref:c,className:q("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[n,d.jsx(yo,{asChild:!0,children:d.jsx(bt,{className:"w-4 h-4 opacity-50"})})]}));Io.displayName=ft.displayName;const wt=o.forwardRef(({className:t,...n},e)=>d.jsx(gt,{ref:e,className:q("flex cursor-default items-center justify-center py-1",t),...n,children:d.jsx(Et,{})}));wt.displayName=gt.displayName;const yt=o.forwardRef(({className:t,...n},e)=>d.jsx(xt,{ref:e,className:q("flex cursor-default items-center justify-center py-1",t),...n,children:d.jsx(Pt,{})}));yt.displayName=xt.displayName;const To=o.forwardRef(({className:t,children:n,position:e="popper",...c},r)=>d.jsx(Co,{children:d.jsxs(mt,{ref:r,className:q("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...c,children:[d.jsx(wt,{}),d.jsx(bo,{className:q("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),d.jsx(yt,{})]})}));To.displayName=mt.displayName;const Ro=o.forwardRef(({className:t,...n},e)=>d.jsx(ht,{ref:e,className:q("px-2 py-1.5 text-sm font-semibold",t),...n}));Ro.displayName=ht.displayName;const No=o.forwardRef(({className:t,children:n,...e},c)=>d.jsxs(vt,{ref:c,className:q("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[d.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:d.jsx(Po,{children:d.jsx(It,{className:"w-4 h-4"})})}),d.jsx(Eo,{children:n})]}));No.displayName=vt.displayName;const _o=o.forwardRef(({className:t,...n},e)=>d.jsx(St,{ref:e,className:q("-mx-1 my-1 h-px bg-muted",t),...n}));_o.displayName=St.displayName;export{Uo as S,Io as a,Ko as b,Ht as c,To as d,No as e,Wt as u};
