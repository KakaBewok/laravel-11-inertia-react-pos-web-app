import{r as a,j as l,R as Ne}from"./app-vVRCAGOW.js";import{c as y,u as V,a as M,b as Pe}from"./index-Ba5YF6YM.js";import{u as N,S as be}from"./index-MU7vlc2G.js";import{u as Re,a as j}from"./index-DoEqfaoL.js";import{P as D,d as Oe}from"./index-GR9MXyJ6.js";import{R as we,h as Ae,u as _e,F as Te}from"./index-BN_t88yI.js";import{C as je}from"./react-icons.esm-PTXMq6VF.js";import{c as b}from"./utils-CcFn7B-c.js";import{B as z}from"./button-cqbvmE_O.js";function Me(e,t){const n=a.createContext(t),o=s=>{const{children:i,...c}=s,d=a.useMemo(()=>c,Object.values(c));return l.jsx(n.Provider,{value:d,children:i})};o.displayName=e+"Provider";function r(s){const i=a.useContext(n);if(i)return i;if(t!==void 0)return t;throw new Error(`\`${s}\` must be used within \`${e}\``)}return[o,r]}function Ie(e,t=[]){let n=[];function o(s,i){const c=a.createContext(i),d=n.length;n=[...n,i];const u=g=>{var R;const{scope:m,children:v,...x}=g,E=((R=m==null?void 0:m[e])==null?void 0:R[d])||c,P=a.useMemo(()=>x,Object.values(x));return l.jsx(E.Provider,{value:P,children:v})};u.displayName=s+"Provider";function f(g,m){var E;const v=((E=m==null?void 0:m[e])==null?void 0:E[d])||c,x=a.useContext(v);if(x)return x;if(i!==void 0)return i;throw new Error(`\`${g}\` must be used within \`${s}\``)}return[u,f]}const r=()=>{const s=n.map(i=>a.createContext(i));return function(c){const d=(c==null?void 0:c[e])||s;return a.useMemo(()=>({[`__scope${e}`]:{...c,[e]:d}}),[c,d])}};return r.scopeName=e,[o,Se(r,...t)]}function Se(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const o=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(s){const i=o.reduce((c,{useScope:d,scopeName:u})=>{const g=d(s)[`__scope${u}`];return{...c,...g}},{});return a.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return n.scopeName=t.scopeName,n}var Le="DismissableLayer",I="dismissableLayer.update",Fe="dismissableLayer.pointerDownOutside",We="dismissableLayer.focusOutside",G,Y=a.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),q=a.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:o,onPointerDownOutside:r,onFocusOutside:s,onInteractOutside:i,onDismiss:c,...d}=e,u=a.useContext(Y),[f,g]=a.useState(null),m=(f==null?void 0:f.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,v]=a.useState({}),x=N(t,p=>g(p)),E=Array.from(u.layers),[P]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),R=E.indexOf(P),k=f?E.indexOf(f):-1,De=u.layersWithOutsidePointerEventsDisabled.size>0,$=k>=R,Ce=Be(p=>{const O=p.target,U=[...u.branches].some(T=>T.contains(O));!$||U||(r==null||r(p),i==null||i(p),p.defaultPrevented||c==null||c())},m),B=Ue(p=>{const O=p.target;[...u.branches].some(T=>T.contains(O))||(s==null||s(p),i==null||i(p),p.defaultPrevented||c==null||c())},m);return Re(p=>{k===u.layers.size-1&&(o==null||o(p),!p.defaultPrevented&&c&&(p.preventDefault(),c()))},m),a.useEffect(()=>{if(f)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(G=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(f)),u.layers.add(f),H(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=G)}},[f,m,n,u]),a.useEffect(()=>()=>{f&&(u.layers.delete(f),u.layersWithOutsidePointerEventsDisabled.delete(f),H())},[f,u]),a.useEffect(()=>{const p=()=>v({});return document.addEventListener(I,p),()=>document.removeEventListener(I,p)},[]),l.jsx(D.div,{...d,ref:x,style:{pointerEvents:De?$?"auto":"none":void 0,...e.style},onFocusCapture:y(e.onFocusCapture,B.onFocusCapture),onBlurCapture:y(e.onBlurCapture,B.onBlurCapture),onPointerDownCapture:y(e.onPointerDownCapture,Ce.onPointerDownCapture)})});q.displayName=Le;var ke="DismissableLayerBranch",$e=a.forwardRef((e,t)=>{const n=a.useContext(Y),o=a.useRef(null),r=N(t,o);return a.useEffect(()=>{const s=o.current;if(s)return n.branches.add(s),()=>{n.branches.delete(s)}},[n.branches]),l.jsx(D.div,{...e,ref:r})});$e.displayName=ke;function Be(e,t=globalThis==null?void 0:globalThis.document){const n=V(e),o=a.useRef(!1),r=a.useRef(()=>{});return a.useEffect(()=>{const s=c=>{if(c.target&&!o.current){let d=function(){K(Fe,n,u,{discrete:!0})};const u={originalEvent:c};c.pointerType==="touch"?(t.removeEventListener("click",r.current),r.current=d,t.addEventListener("click",r.current,{once:!0})):d()}else t.removeEventListener("click",r.current);o.current=!1},i=window.setTimeout(()=>{t.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(i),t.removeEventListener("pointerdown",s),t.removeEventListener("click",r.current)}},[t,n]),{onPointerDownCapture:()=>o.current=!0}}function Ue(e,t=globalThis==null?void 0:globalThis.document){const n=V(e),o=a.useRef(!1);return a.useEffect(()=>{const r=s=>{s.target&&!o.current&&K(We,n,{originalEvent:s},{discrete:!1})};return t.addEventListener("focusin",r),()=>t.removeEventListener("focusin",r)},[t,n]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function H(){const e=new CustomEvent(I);document.dispatchEvent(e)}function K(e,t,n,{discrete:o}){const r=n.originalEvent.target,s=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&r.addEventListener(e,t,{once:!0}),o?Oe(r,s):r.dispatchEvent(s)}var ze="Portal",X=a.forwardRef((e,t)=>{var c;const{container:n,...o}=e,[r,s]=a.useState(!1);M(()=>s(!0),[]);const i=n||r&&((c=globalThis==null?void 0:globalThis.document)==null?void 0:c.body);return i?Ne.createPortal(l.jsx(D.div,{...o,ref:t}),i):null});X.displayName=ze;function Ge(e,t){return a.useReducer((n,o)=>t[n][o]??n,e)}var _=e=>{const{present:t,children:n}=e,o=He(t),r=typeof n=="function"?n({present:o.isPresent}):a.Children.only(n),s=N(o.ref,Ve(r));return typeof n=="function"||o.isPresent?a.cloneElement(r,{ref:s}):null};_.displayName="Presence";function He(e){const[t,n]=a.useState(),o=a.useRef({}),r=a.useRef(e),s=a.useRef("none"),i=e?"mounted":"unmounted",[c,d]=Ge(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return a.useEffect(()=>{const u=w(o.current);s.current=c==="mounted"?u:"none"},[c]),M(()=>{const u=o.current,f=r.current;if(f!==e){const m=s.current,v=w(u);e?d("MOUNT"):v==="none"||(u==null?void 0:u.display)==="none"?d("UNMOUNT"):d(f&&m!==v?"ANIMATION_OUT":"UNMOUNT"),r.current=e}},[e,d]),M(()=>{if(t){let u;const f=t.ownerDocument.defaultView??window,g=v=>{const E=w(o.current).includes(v.animationName);if(v.target===t&&E&&(d("ANIMATION_END"),!r.current)){const P=t.style.animationFillMode;t.style.animationFillMode="forwards",u=f.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=P)})}},m=v=>{v.target===t&&(s.current=w(o.current))};return t.addEventListener("animationstart",m),t.addEventListener("animationcancel",g),t.addEventListener("animationend",g),()=>{f.clearTimeout(u),t.removeEventListener("animationstart",m),t.removeEventListener("animationcancel",g),t.removeEventListener("animationend",g)}}else d("ANIMATION_END")},[t,d]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:a.useCallback(u=>{u&&(o.current=getComputedStyle(u)),n(u)},[])}}function w(e){return(e==null?void 0:e.animationName)||"none"}function Ve(e){var o,r;let t=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(r=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var S="Dialog",[Z,ht]=Ie(S),[Ye,h]=Z(S),J=e=>{const{__scopeDialog:t,children:n,open:o,defaultOpen:r,onOpenChange:s,modal:i=!0}=e,c=a.useRef(null),d=a.useRef(null),[u=!1,f]=Pe({prop:o,defaultProp:r,onChange:s});return l.jsx(Ye,{scope:t,triggerRef:c,contentRef:d,contentId:j(),titleId:j(),descriptionId:j(),open:u,onOpenChange:f,onOpenToggle:a.useCallback(()=>f(g=>!g),[f]),modal:i,children:n})};J.displayName=S;var Q="DialogTrigger",qe=a.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,r=h(Q,n),s=N(t,r.triggerRef);return l.jsx(D.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":W(r.open),...o,ref:s,onClick:y(e.onClick,r.onOpenToggle)})});qe.displayName=Q;var L="DialogPortal",[Ke,ee]=Z(L,{forceMount:void 0}),te=e=>{const{__scopeDialog:t,forceMount:n,children:o,container:r}=e,s=h(L,t);return l.jsx(Ke,{scope:t,forceMount:n,children:a.Children.map(o,i=>l.jsx(_,{present:n||s.open,children:l.jsx(X,{asChild:!0,container:r,children:i})}))})};te.displayName=L;var A="DialogOverlay",ne=a.forwardRef((e,t)=>{const n=ee(A,e.__scopeDialog),{forceMount:o=n.forceMount,...r}=e,s=h(A,e.__scopeDialog);return s.modal?l.jsx(_,{present:o||s.open,children:l.jsx(Xe,{...r,ref:t})}):null});ne.displayName=A;var Xe=a.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,r=h(A,n);return l.jsx(we,{as:be,allowPinchZoom:!0,shards:[r.contentRef],children:l.jsx(D.div,{"data-state":W(r.open),...o,ref:t,style:{pointerEvents:"auto",...o.style}})})}),C="DialogContent",oe=a.forwardRef((e,t)=>{const n=ee(C,e.__scopeDialog),{forceMount:o=n.forceMount,...r}=e,s=h(C,e.__scopeDialog);return l.jsx(_,{present:o||s.open,children:s.modal?l.jsx(Ze,{...r,ref:t}):l.jsx(Je,{...r,ref:t})})});oe.displayName=C;var Ze=a.forwardRef((e,t)=>{const n=h(C,e.__scopeDialog),o=a.useRef(null),r=N(t,n.contentRef,o);return a.useEffect(()=>{const s=o.current;if(s)return Ae(s)},[]),l.jsx(re,{...e,ref:r,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:y(e.onCloseAutoFocus,s=>{var i;s.preventDefault(),(i=n.triggerRef.current)==null||i.focus()}),onPointerDownOutside:y(e.onPointerDownOutside,s=>{const i=s.detail.originalEvent,c=i.button===0&&i.ctrlKey===!0;(i.button===2||c)&&s.preventDefault()}),onFocusOutside:y(e.onFocusOutside,s=>s.preventDefault())})}),Je=a.forwardRef((e,t)=>{const n=h(C,e.__scopeDialog),o=a.useRef(!1),r=a.useRef(!1);return l.jsx(re,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:s=>{var i,c;(i=e.onCloseAutoFocus)==null||i.call(e,s),s.defaultPrevented||(o.current||(c=n.triggerRef.current)==null||c.focus(),s.preventDefault()),o.current=!1,r.current=!1},onInteractOutside:s=>{var d,u;(d=e.onInteractOutside)==null||d.call(e,s),s.defaultPrevented||(o.current=!0,s.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const i=s.target;((u=n.triggerRef.current)==null?void 0:u.contains(i))&&s.preventDefault(),s.detail.originalEvent.type==="focusin"&&r.current&&s.preventDefault()}})}),re=a.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:r,onCloseAutoFocus:s,...i}=e,c=h(C,n),d=a.useRef(null),u=N(t,d);return _e(),l.jsxs(l.Fragment,{children:[l.jsx(Te,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:r,onUnmountAutoFocus:s,children:l.jsx(q,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":W(c.open),...i,ref:u,onDismiss:()=>c.onOpenChange(!1)})}),l.jsxs(l.Fragment,{children:[l.jsx(Qe,{titleId:c.titleId}),l.jsx(tt,{contentRef:d,descriptionId:c.descriptionId})]})]})}),F="DialogTitle",se=a.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,r=h(F,n);return l.jsx(D.h2,{id:r.titleId,...o,ref:t})});se.displayName=F;var ae="DialogDescription",ie=a.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,r=h(ae,n);return l.jsx(D.p,{id:r.descriptionId,...o,ref:t})});ie.displayName=ae;var ce="DialogClose",le=a.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,r=h(ce,n);return l.jsx(D.button,{type:"button",...o,ref:t,onClick:y(e.onClick,()=>r.onOpenChange(!1))})});le.displayName=ce;function W(e){return e?"open":"closed"}var ue="DialogTitleWarning",[xt,de]=Me(ue,{contentName:C,titleName:F,docsSlug:"dialog"}),Qe=({titleId:e})=>{const t=de(ue),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return a.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},et="DialogDescriptionWarning",tt=({contentRef:e,descriptionId:t})=>{const o=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${de(et).contentName}}.`;return a.useEffect(()=>{var s;const r=(s=e.current)==null?void 0:s.getAttribute("aria-describedby");t&&r&&(document.getElementById(t)||console.warn(o))},[o,e,t]),null},nt=J,ot=te,fe=ne,me=oe,pe=se,ge=ie,rt=le;const st=nt,at=ot,ve=a.forwardRef(({className:e,...t},n)=>l.jsx(fe,{ref:n,className:b("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));ve.displayName=fe.displayName;const he=a.forwardRef(({className:e,children:t,...n},o)=>l.jsxs(at,{children:[l.jsx(ve,{}),l.jsxs(me,{ref:o,className:b("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...n,children:[t,l.jsxs(rt,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[l.jsx(je,{className:"h-4 w-4"}),l.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));he.displayName=me.displayName;const xe=({className:e,...t})=>l.jsx("div",{className:b("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});xe.displayName="DialogHeader";const Ee=a.forwardRef(({className:e,...t},n)=>l.jsx(pe,{ref:n,className:b("text-lg font-semibold leading-none tracking-tight",e),...t}));Ee.displayName=pe.displayName;const ye=a.forwardRef(({className:e,...t},n)=>l.jsx(ge,{ref:n,className:b("text-sm text-muted-foreground",e),...t}));ye.displayName=ge.displayName;const it=({title:e,description:t,isOpen:n,onClose:o,children:r})=>{const s=(i,c)=>{i||o()};return l.jsx(st,{open:n,onOpenChange:i=>s(i),children:l.jsxs(he,{className:"rounded-md w-[80vw]",onClick:i=>i.stopPropagation(),children:[l.jsxs(xe,{children:[l.jsx(Ee,{children:e}),l.jsx(ye,{children:t})]}),l.jsx("div",{children:r})]})})},Et=({isOpen:e,onClose:t,onConfirm:n,loading:o,description:r="This action cannot be undone."})=>{const[s,i]=a.useState(!1);return a.useEffect(()=>{i(!0)},[]),s?l.jsx(it,{title:"Are you sure?",description:r,isOpen:e,onClose:t,children:l.jsxs("div",{className:"pt-6 space-x-3 flex items-center justify-center md:justify-end w-full",children:[l.jsx(z,{disabled:o,variant:"outline",onClick:t,children:"Cancel"}),l.jsx(z,{disabled:o,variant:"destructive",onClick:n,className:"dark:bg-red-500",children:"Continue"})]})}):null};export{Et as A};
