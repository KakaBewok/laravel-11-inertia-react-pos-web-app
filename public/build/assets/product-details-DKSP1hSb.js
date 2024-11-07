import{r as A,j as v,y as le}from"./app-vVRCAGOW.js";import{A as fe,g as de}from"./react-icons.esm-PTXMq6VF.js";import{B as yt}from"./button-cqbvmE_O.js";import{c as gt}from"./utils-CcFn7B-c.js";import{I as me}from"./image-not-found-BCeE-Ta1.js";import{H as pe}from"./heading-w8uDzKiO.js";import{u as ge}from"./useGlobalContext-WqwPRLsa.js";import"./index-MU7vlc2G.js";import"./clsx-B-dksMZM.js";function he(t){return Object.prototype.toString.call(t)==="[object Object]"}function qt(t){return he(t)||Array.isArray(t)}function xe(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function At(t,e){const r=Object.keys(t),s=Object.keys(e);if(r.length!==s.length)return!1;const i=JSON.stringify(Object.keys(t.breakpoints||{})),o=JSON.stringify(Object.keys(e.breakpoints||{}));return i!==o?!1:r.every(n=>{const u=t[n],a=e[n];return typeof u=="function"?`${u}`==`${a}`:!qt(u)||!qt(a)?u===a:At(u,a)})}function Kt(t){return t.concat().sort((e,r)=>e.name>r.name?1:-1).map(e=>e.options)}function ye(t,e){if(t.length!==e.length)return!1;const r=Kt(t),s=Kt(e);return r.every((i,o)=>{const n=s[o];return At(i,n)})}function Dt(t){return typeof t=="number"}function kt(t){return typeof t=="string"}function St(t){return typeof t=="boolean"}function Ut(t){return Object.prototype.toString.call(t)==="[object Object]"}function D(t){return Math.abs(t)}function Tt(t){return Math.sign(t)}function ft(t,e){return D(t-e)}function be(t,e){if(t===0||e===0||D(t)<=D(e))return 0;const r=ft(D(t),D(e));return D(r/t)}function dt(t){return mt(t).map(Number)}function V(t){return t[ht(t)]}function ht(t){return Math.max(0,t.length-1)}function Ot(t,e){return e===ht(t)}function Zt(t,e=0){return Array.from(Array(t),(r,s)=>e+s)}function mt(t){return Object.keys(t)}function Qt(t,e){return[t,e].reduce((r,s)=>(mt(s).forEach(i=>{const o=r[i],n=s[i],u=Ut(o)&&Ut(n);r[i]=u?Qt(o,n):n}),r),{})}function It(t,e){return typeof e.MouseEvent<"u"&&t instanceof e.MouseEvent}function Se(t,e){const r={start:s,center:i,end:o};function s(){return 0}function i(a){return o(a)/2}function o(a){return e-a}function n(a,c){return kt(t)?r[t](a):t(e,a,c)}return{measure:n}}function pt(){let t=[];function e(i,o,n,u={passive:!0}){let a;if("addEventListener"in i)i.addEventListener(o,n,u),a=()=>i.removeEventListener(o,n,u);else{const c=i;c.addListener(n),a=()=>c.removeListener(n)}return t.push(a),s}function r(){t=t.filter(i=>i())}const s={add:e,clear:r};return s}function ve(t,e,r,s){const i=pt(),o=1e3/60;let n=null,u=0,a=0;function c(){i.add(t,"visibilitychange",()=>{t.hidden&&l()})}function x(){b(),i.clear()}function d(h){if(!a)return;n||(n=h);const f=h-n;for(n=h,u+=f;u>=o;)r(o),u-=o;const p=u/o;s(p),a&&e.requestAnimationFrame(d)}function g(){a||(a=e.requestAnimationFrame(d))}function b(){e.cancelAnimationFrame(a),n=null,u=0,a=0}function l(){n=null,u=0}return{init:c,destroy:x,start:g,stop:b,update:()=>r(o),render:s}}function we(t,e){const r=e==="rtl",s=t==="y",i=s?"y":"x",o=s?"x":"y",n=!s&&r?-1:1,u=x(),a=d();function c(l){const{height:m,width:h}=l;return s?m:h}function x(){return s?"top":r?"right":"left"}function d(){return s?"bottom":r?"left":"right"}function g(l){return l*n}return{scroll:i,cross:o,startEdge:u,endEdge:a,measureSize:c,direction:g}}function rt(t=0,e=0){const r=D(t-e);function s(c){return c<t}function i(c){return c>e}function o(c){return s(c)||i(c)}function n(c){return o(c)?s(c)?t:e:c}function u(c){return r?c-r*Math.ceil((c-e)/r):c}return{length:r,max:e,min:t,constrain:n,reachedAny:o,reachedMax:i,reachedMin:s,removeOffset:u}}function Jt(t,e,r){const{constrain:s}=rt(0,t),i=t+1;let o=n(e);function n(g){return r?D((i+g)%i):s(g)}function u(){return o}function a(g){return o=n(g),d}function c(g){return x().set(u()+g)}function x(){return Jt(t,u(),r)}const d={get:u,set:a,add:c,clone:x};return d}function Ne(t,e,r,s,i,o,n,u,a,c,x,d,g,b,l,m,h,f,p){const{cross:S,direction:L}=t,I=["INPUT","SELECT","TEXTAREA"],C={passive:!1},w=pt(),N=pt(),j=rt(50,225).constrain(b.measure(20)),T={mouse:300,touch:400},E={mouse:500,touch:600},z=l?43:25;let H=!1,G=0,$=0,et=!1,_=!1,U=!1,Z=!1;function it(y){if(!p)return;function k(F){(St(p)||p(y,F))&&at(F)}const O=e;w.add(O,"dragstart",F=>F.preventDefault(),C).add(O,"touchmove",()=>{},C).add(O,"touchend",()=>{}).add(O,"touchstart",k).add(O,"mousedown",k).add(O,"touchcancel",M).add(O,"contextmenu",M).add(O,"click",J,!0)}function q(){w.clear(),N.clear()}function st(){const y=Z?r:e;N.add(y,"touchmove",B,C).add(y,"touchend",M).add(y,"mousemove",B,C).add(y,"mouseup",M)}function ot(y){const k=y.nodeName||"";return I.includes(k)}function Q(){return(l?E:T)[Z?"mouse":"touch"]}function ct(y,k){const O=d.add(Tt(y)*-1),F=x.byDistance(y,!l).distance;return l||D(y)<j?F:h&&k?F*.5:x.byIndex(O.get(),0).distance}function at(y){const k=It(y,s);Z=k,U=l&&k&&!y.buttons&&H,H=ft(i.get(),n.get())>=2,!(k&&y.button!==0)&&(ot(y.target)||(et=!0,o.pointerDown(y),c.useFriction(0).useDuration(0),i.set(n),st(),G=o.readPoint(y),$=o.readPoint(y,S),g.emit("pointerDown")))}function B(y){if(!It(y,s)&&y.touches.length>=2)return M(y);const O=o.readPoint(y),F=o.readPoint(y,S),K=ft(O,G),X=ft(F,$);if(!_&&!Z&&(!y.cancelable||(_=K>X,!_)))return M(y);const Y=o.pointerMove(y);K>m&&(U=!0),c.useFriction(.3).useDuration(.75),u.start(),i.add(L(Y)),y.preventDefault()}function M(y){const O=x.byDistance(0,!1).index!==d.get(),F=o.pointerUp(y)*Q(),K=ct(L(F),O),X=be(F,K),Y=z-10*X,W=f+X/50;_=!1,et=!1,N.clear(),c.useDuration(Y).useFriction(W),a.distance(K,!l),Z=!1,g.emit("pointerUp")}function J(y){U&&(y.stopPropagation(),y.preventDefault(),U=!1)}function R(){return et}return{init:it,destroy:q,pointerDown:R}}function je(t,e){let s,i;function o(d){return d.timeStamp}function n(d,g){const l=`client${(g||t.scroll)==="x"?"X":"Y"}`;return(It(d,e)?d:d.touches[0])[l]}function u(d){return s=d,i=d,n(d)}function a(d){const g=n(d)-n(i),b=o(d)-o(s)>170;return i=d,b&&(s=d),g}function c(d){if(!s||!i)return 0;const g=n(i)-n(s),b=o(d)-o(s),l=o(d)-o(i)>170,m=g/b;return b&&!l&&D(m)>.1?m:0}return{pointerDown:u,pointerMove:a,pointerUp:c,readPoint:n}}function Ee(){function t(r){const{offsetTop:s,offsetLeft:i,offsetWidth:o,offsetHeight:n}=r;return{top:s,right:i+o,bottom:s+n,left:i,width:o,height:n}}return{measure:t}}function Le(t){function e(s){return t*(s/100)}return{measure:e}}function Ce(t,e,r,s,i,o,n){const u=[t].concat(s);let a,c,x=[],d=!1;function g(h){return i.measureSize(n.measure(h))}function b(h){if(!o)return;c=g(t),x=s.map(g);function f(p){for(const S of p){if(d)return;const L=S.target===t,I=s.indexOf(S.target),C=L?c:x[I],w=g(L?t:s[I]);if(D(w-C)>=.5){h.reInit(),e.emit("resize");break}}}a=new ResizeObserver(p=>{(St(o)||o(h,p))&&f(p)}),r.requestAnimationFrame(()=>{u.forEach(p=>a.observe(p))})}function l(){d=!0,a&&a.disconnect()}return{init:b,destroy:l}}function ke(t,e,r,s,i,o){let n=0,u=0,a=i,c=o,x=t.get(),d=0;function g(C){const w=C/1e3,N=a*w,j=s.get()-t.get(),T=!a;let E=0;return T?(n=0,r.set(s),t.set(s),E=j):(r.set(t),n+=j/N,n*=c,x+=n,t.add(n*w),E=x-d),u=Tt(E),d=x,I}function b(){const C=s.get()-e.get();return D(C)<.001}function l(){return a}function m(){return u}function h(){return n}function f(){return S(i)}function p(){return L(o)}function S(C){return a=C,I}function L(C){return c=C,I}const I={direction:m,duration:l,velocity:h,seek:g,settled:b,useBaseFriction:p,useBaseDuration:f,useFriction:L,useDuration:S};return I}function Ie(t,e,r,s,i){const o=i.measure(10),n=i.measure(50),u=rt(.1,.99);let a=!1;function c(){return!(a||!t.reachedAny(r.get())||!t.reachedAny(e.get()))}function x(b){if(!c())return;const l=t.reachedMin(e.get())?"min":"max",m=D(t[l]-e.get()),h=r.get()-e.get(),f=u.constrain(m/n);r.subtract(h*f),!b&&D(h)<o&&(r.set(t.constrain(r.get())),s.useDuration(25).useBaseFriction())}function d(b){a=!b}return{shouldConstrain:c,constrain:x,toggleActive:d}}function Pe(t,e,r,s,i){const o=rt(-e+t,0),n=d(),u=x(),a=g();function c(l,m){return ft(l,m)<1}function x(){const l=n[0],m=V(n),h=n.lastIndexOf(l),f=n.indexOf(m)+1;return rt(h,f)}function d(){return r.map((l,m)=>{const{min:h,max:f}=o,p=o.constrain(l),S=!m,L=Ot(r,m);return S?f:L||c(h,p)?h:c(f,p)?f:p}).map(l=>parseFloat(l.toFixed(3)))}function g(){if(e<=t+i)return[o.max];if(s==="keepSnaps")return n;const{min:l,max:m}=u;return n.slice(l,m)}return{snapsContained:a,scrollContainLimit:u}}function Ae(t,e,r){const s=e[0],i=r?s-t:V(e);return{limit:rt(i,s)}}function De(t,e,r,s){const o=e.min+.1,n=e.max+.1,{reachedMin:u,reachedMax:a}=rt(o,n);function c(g){return g===1?a(r.get()):g===-1?u(r.get()):!1}function x(g){if(!c(g))return;const b=t*(g*-1);s.forEach(l=>l.add(b))}return{loop:x}}function Te(t){const{max:e,length:r}=t;function s(o){const n=o-e;return r?n/-r:0}return{get:s}}function Oe(t,e,r,s,i){const{startEdge:o,endEdge:n}=t,{groupSlides:u}=i,a=d().map(e.measure),c=g(),x=b();function d(){return u(s).map(m=>V(m)[n]-m[0][o]).map(D)}function g(){return s.map(m=>r[o]-m[o]).map(m=>-D(m))}function b(){return u(c).map(m=>m[0]).map((m,h)=>m+a[h])}return{snaps:c,snapsAligned:x}}function Me(t,e,r,s,i,o){const{groupSlides:n}=i,{min:u,max:a}=s,c=x();function x(){const g=n(o),b=!t||e==="keepSnaps";return r.length===1?[o]:b?g:g.slice(u,a).map((l,m,h)=>{const f=!m,p=Ot(h,m);if(f){const S=V(h[0])+1;return Zt(S)}if(p){const S=ht(o)-V(h)[0]+1;return Zt(S,V(h)[0])}return l})}return{slideRegistry:c}}function Fe(t,e,r,s,i){const{reachedAny:o,removeOffset:n,constrain:u}=s;function a(l){return l.concat().sort((m,h)=>D(m)-D(h))[0]}function c(l){const m=t?n(l):u(l),h=e.map((p,S)=>({diff:x(p-m,0),index:S})).sort((p,S)=>D(p.diff)-D(S.diff)),{index:f}=h[0];return{index:f,distance:m}}function x(l,m){const h=[l,l+r,l-r];if(!t)return l;if(!m)return a(h);const f=h.filter(p=>Tt(p)===m);return f.length?a(f):V(h)-r}function d(l,m){const h=e[l]-i.get(),f=x(h,m);return{index:l,distance:f}}function g(l,m){const h=i.get()+l,{index:f,distance:p}=c(h),S=!t&&o(h);if(!m||S)return{index:f,distance:l};const L=e[f]-p,I=l+x(L,0);return{index:f,distance:I}}return{byDistance:g,byIndex:d,shortcut:x}}function ze(t,e,r,s,i,o,n){function u(d){const g=d.distance,b=d.index!==e.get();o.add(g),g&&(s.duration()?t.start():(t.update(),t.render(1),t.update())),b&&(r.set(e.get()),e.set(d.index),n.emit("select"))}function a(d,g){const b=i.byDistance(d,g);u(b)}function c(d,g){const b=e.clone().set(d),l=i.byIndex(b.get(),g);u(l)}return{distance:a,index:c}}function Be(t,e,r,s,i,o,n,u){const a={passive:!0,capture:!0};let c=0;function x(b){if(!u)return;function l(m){if(new Date().getTime()-c>10)return;n.emit("slideFocusStart"),t.scrollLeft=0;const p=r.findIndex(S=>S.includes(m));Dt(p)&&(i.useDuration(0),s.index(p,0),n.emit("slideFocus"))}o.add(document,"keydown",d,!1),e.forEach((m,h)=>{o.add(m,"focus",f=>{(St(u)||u(b,f))&&l(h)},a)})}function d(b){b.code==="Tab"&&(c=new Date().getTime())}return{init:x}}function lt(t){let e=t;function r(){return e}function s(a){e=n(a)}function i(a){e+=n(a)}function o(a){e-=n(a)}function n(a){return Dt(a)?a:a.get()}return{get:r,set:s,add:i,subtract:o}}function Xt(t,e){const r=t.scroll==="x"?o:n,s=e.style;let i=!1;function o(d){return`translate3d(${d}px,0px,0px)`}function n(d){return`translate3d(0px,${d}px,0px)`}function u(d){i||(s.transform=r(t.direction(d)))}function a(d){i=!d}function c(){i||(s.transform="",e.getAttribute("style")||e.removeAttribute("style"))}return{clear:c,to:u,toggleActive:a}}function Re(t,e,r,s,i,o,n,u,a){const x=dt(i),d=dt(i).reverse(),g=f().concat(p());function b(w,N){return w.reduce((j,T)=>j-i[T],N)}function l(w,N){return w.reduce((j,T)=>b(j,N)>0?j.concat([T]):j,[])}function m(w){return o.map((N,j)=>({start:N-s[j]+.5+w,end:N+e-.5+w}))}function h(w,N,j){const T=m(N);return w.map(E=>{const z=j?0:-r,H=j?r:0,G=j?"end":"start",$=T[E][G];return{index:E,loopPoint:$,slideLocation:lt(-1),translate:Xt(t,a[E]),target:()=>u.get()>$?z:H}})}function f(){const w=n[0],N=l(d,w);return h(N,r,!1)}function p(){const w=e-n[0]-1,N=l(x,w);return h(N,-r,!0)}function S(){return g.every(({index:w})=>{const N=x.filter(j=>j!==w);return b(N,e)<=.1})}function L(){g.forEach(w=>{const{target:N,translate:j,slideLocation:T}=w,E=N();E!==T.get()&&(j.to(E),T.set(E))})}function I(){g.forEach(w=>w.translate.clear())}return{canLoop:S,clear:I,loop:L,loopPoints:g}}function Ve(t,e,r){let s,i=!1;function o(a){if(!r)return;function c(x){for(const d of x)if(d.type==="childList"){a.reInit(),e.emit("slidesChanged");break}}s=new MutationObserver(x=>{i||(St(r)||r(a,x))&&c(x)}),s.observe(t,{childList:!0})}function n(){s&&s.disconnect(),i=!0}return{init:o,destroy:n}}function He(t,e,r,s){const i={};let o=null,n=null,u,a=!1;function c(){u=new IntersectionObserver(l=>{a||(l.forEach(m=>{const h=e.indexOf(m.target);i[h]=m}),o=null,n=null,r.emit("slidesInView"))},{root:t.parentElement,threshold:s}),e.forEach(l=>u.observe(l))}function x(){u&&u.disconnect(),a=!0}function d(l){return mt(i).reduce((m,h)=>{const f=parseInt(h),{isIntersecting:p}=i[f];return(l&&p||!l&&!p)&&m.push(f),m},[])}function g(l=!0){if(l&&o)return o;if(!l&&n)return n;const m=d(l);return l&&(o=m),l||(n=m),m}return{init:c,destroy:x,get:g}}function Ge(t,e,r,s,i,o){const{measureSize:n,startEdge:u,endEdge:a}=t,c=r[0]&&i,x=l(),d=m(),g=r.map(n),b=h();function l(){if(!c)return 0;const p=r[0];return D(e[u]-p[u])}function m(){if(!c)return 0;const p=o.getComputedStyle(V(s));return parseFloat(p.getPropertyValue(`margin-${a}`))}function h(){return r.map((p,S,L)=>{const I=!S,C=Ot(L,S);return I?g[S]+x:C?g[S]+d:L[S+1][u]-p[u]}).map(D)}return{slideSizes:g,slideSizesWithGaps:b,startGap:x,endGap:d}}function $e(t,e,r,s,i,o,n,u,a){const{startEdge:c,endEdge:x,direction:d}=t,g=Dt(r);function b(f,p){return dt(f).filter(S=>S%p===0).map(S=>f.slice(S,S+p))}function l(f){return f.length?dt(f).reduce((p,S,L)=>{const I=V(p)||0,C=I===0,w=S===ht(f),N=i[c]-o[I][c],j=i[c]-o[S][x],T=!s&&C?d(n):0,E=!s&&w?d(u):0,z=D(j-E-(N+T));return L&&z>e+a&&p.push(S),w&&p.push(f.length),p},[]).map((p,S,L)=>{const I=Math.max(L[S-1]||0);return f.slice(I,p)}):[]}function m(f){return g?b(f,r):l(f)}return{groupSlides:m}}function qe(t,e,r,s,i,o,n){const{align:u,axis:a,direction:c,startIndex:x,loop:d,duration:g,dragFree:b,dragThreshold:l,inViewThreshold:m,slidesToScroll:h,skipSnaps:f,containScroll:p,watchResize:S,watchSlides:L,watchDrag:I,watchFocus:C}=o,w=2,N=Ee(),j=N.measure(e),T=r.map(N.measure),E=we(a,c),z=E.measureSize(j),H=Le(z),G=Se(u,z),$=!d&&!!p,et=d||!!p,{slideSizes:_,slideSizesWithGaps:U,startGap:Z,endGap:it}=Ge(E,j,T,r,et,i),q=$e(E,z,h,d,j,T,Z,it,w),{snaps:st,snapsAligned:ot}=Oe(E,G,j,T,q),Q=-V(st)+V(U),{snapsContained:ct,scrollContainLimit:at}=Pe(z,Q,ot,p,w),B=$?ct:ot,{limit:M}=Ae(Q,B,d),J=Jt(ht(B),x,d),R=J.clone(),P=dt(r),y=({dragHandler:tt,scrollBody:Et,scrollBounds:Lt,options:{loop:xt}},Ct)=>{xt||Lt.constrain(tt.pointerDown()),Et.seek(Ct)},k=({scrollBody:tt,translate:Et,location:Lt,offsetLocation:xt,scrollLooper:Ct,slideLooper:se,dragHandler:oe,animation:ie,eventHandler:Rt,scrollBounds:ce,options:{loop:Vt}},Ht)=>{const Gt=tt.settled(),ae=!ce.shouldConstrain(),$t=Vt?Gt:Gt&&ae;$t&&!oe.pointerDown()&&(ie.stop(),Rt.emit("settle")),$t||Rt.emit("scroll");const ue=Lt.get()*Ht+Y.get()*(1-Ht);xt.set(ue),Vt&&(Ct.loop(tt.direction()),se.loop()),Et.to(xt.get())},O=ve(s,i,tt=>y(jt,tt),tt=>k(jt,tt)),F=.68,K=B[J.get()],X=lt(K),Y=lt(K),W=lt(K),nt=lt(K),ut=ke(X,W,Y,nt,g,F),wt=Fe(d,B,Q,M,nt),Nt=ze(O,J,R,ut,wt,nt,n),Ft=Te(M),zt=pt(),ne=He(e,r,n,m),{slideRegistry:Bt}=Me($,p,B,at,q,P),re=Be(t,r,Bt,Nt,ut,zt,n,C),jt={ownerDocument:s,ownerWindow:i,eventHandler:n,containerRect:j,slideRects:T,animation:O,axis:E,dragHandler:Ne(E,t,s,i,nt,je(E,i),X,O,Nt,ut,wt,J,n,H,b,l,f,F,I),eventStore:zt,percentOfView:H,index:J,indexPrevious:R,limit:M,location:X,offsetLocation:W,previousLocation:Y,options:o,resizeHandler:Ce(e,n,i,r,E,S,N),scrollBody:ut,scrollBounds:Ie(M,W,nt,ut,H),scrollLooper:De(Q,M,W,[X,W,Y,nt]),scrollProgress:Ft,scrollSnapList:B.map(Ft.get),scrollSnaps:B,scrollTarget:wt,scrollTo:Nt,slideLooper:Re(E,z,Q,_,U,st,B,W,r),slideFocus:re,slidesHandler:Ve(e,n,L),slidesInView:ne,slideIndexes:P,slideRegistry:Bt,slidesToScroll:q,target:nt,translate:Xt(E,e)};return jt}function Ke(){let t={},e;function r(c){e=c}function s(c){return t[c]||[]}function i(c){return s(c).forEach(x=>x(e,c)),a}function o(c,x){return t[c]=s(c).concat([x]),a}function n(c,x){return t[c]=s(c).filter(d=>d!==x),a}function u(){t={}}const a={init:r,emit:i,off:n,on:o,clear:u};return a}const Ue={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function Ze(t){function e(o,n){return Qt(o,n||{})}function r(o){const n=o.breakpoints||{},u=mt(n).filter(a=>t.matchMedia(a).matches).map(a=>n[a]).reduce((a,c)=>e(a,c),{});return e(o,u)}function s(o){return o.map(n=>mt(n.breakpoints||{})).reduce((n,u)=>n.concat(u),[]).map(t.matchMedia)}return{mergeOptions:e,optionsAtMedia:r,optionsMediaQueries:s}}function Qe(t){let e=[];function r(o,n){return e=n.filter(({options:u})=>t.optionsAtMedia(u).active!==!1),e.forEach(u=>u.init(o,t)),n.reduce((u,a)=>Object.assign(u,{[a.name]:a}),{})}function s(){e=e.filter(o=>o.destroy())}return{init:r,destroy:s}}function bt(t,e,r){const s=t.ownerDocument,i=s.defaultView,o=Ze(i),n=Qe(o),u=pt(),a=Ke(),{mergeOptions:c,optionsAtMedia:x,optionsMediaQueries:d}=o,{on:g,off:b,emit:l}=a,m=E;let h=!1,f,p=c(Ue,bt.globalOptions),S=c(p),L=[],I,C,w;function N(){const{container:P,slides:y}=S;C=(kt(P)?t.querySelector(P):P)||t.children[0];const O=kt(y)?C.querySelectorAll(y):y;w=[].slice.call(O||C.children)}function j(P){const y=qe(t,C,w,s,i,P,a);if(P.loop&&!y.slideLooper.canLoop()){const k=Object.assign({},P,{loop:!1});return j(k)}return y}function T(P,y){h||(p=c(p,P),S=x(p),L=y||L,N(),f=j(S),d([p,...L.map(({options:k})=>k)]).forEach(k=>u.add(k,"change",E)),S.active&&(f.translate.to(f.location.get()),f.animation.init(),f.slidesInView.init(),f.slideFocus.init(R),f.eventHandler.init(R),f.resizeHandler.init(R),f.slidesHandler.init(R),f.options.loop&&f.slideLooper.loop(),C.offsetParent&&w.length&&f.dragHandler.init(R),I=n.init(R,L)))}function E(P,y){const k=q();z(),T(c({startIndex:k},P),y),a.emit("reInit")}function z(){f.dragHandler.destroy(),f.eventStore.clear(),f.translate.clear(),f.slideLooper.clear(),f.resizeHandler.destroy(),f.slidesHandler.destroy(),f.slidesInView.destroy(),f.animation.destroy(),n.destroy(),u.clear()}function H(){h||(h=!0,u.clear(),z(),a.emit("destroy"),a.clear())}function G(P,y,k){!S.active||h||(f.scrollBody.useBaseFriction().useDuration(y===!0?0:S.duration),f.scrollTo.index(P,k||0))}function $(P){const y=f.index.add(1).get();G(y,P,-1)}function et(P){const y=f.index.add(-1).get();G(y,P,1)}function _(){return f.index.add(1).get()!==q()}function U(){return f.index.add(-1).get()!==q()}function Z(){return f.scrollSnapList}function it(){return f.scrollProgress.get(f.location.get())}function q(){return f.index.get()}function st(){return f.indexPrevious.get()}function ot(){return f.slidesInView.get()}function Q(){return f.slidesInView.get(!1)}function ct(){return I}function at(){return f}function B(){return t}function M(){return C}function J(){return w}const R={canScrollNext:_,canScrollPrev:U,containerNode:M,internalEngine:at,destroy:H,off:b,on:g,emit:l,plugins:ct,previousScrollSnap:st,reInit:m,rootNode:B,scrollNext:$,scrollPrev:et,scrollProgress:it,scrollSnapList:Z,scrollTo:G,selectedScrollSnap:q,slideNodes:J,slidesInView:ot,slidesNotInView:Q};return T(e,r),setTimeout(()=>a.emit("init"),0),R}bt.globalOptions=void 0;function Mt(t={},e=[]){const r=A.useRef(t),s=A.useRef(e),[i,o]=A.useState(),[n,u]=A.useState(),a=A.useCallback(()=>{i&&i.reInit(r.current,s.current)},[i]);return A.useEffect(()=>{At(r.current,t)||(r.current=t,a())},[t,a]),A.useEffect(()=>{ye(s.current,e)||(s.current=e,a())},[e,a]),A.useEffect(()=>{if(xe()&&n){bt.globalOptions=Mt.globalOptions;const c=bt(n,r.current,s.current);return o(c),()=>c.destroy()}else o(void 0)},[n,o]),[u,i]}Mt.globalOptions=void 0;const _t=A.createContext(null);function vt(){const t=A.useContext(_t);if(!t)throw new Error("useCarousel must be used within a <Carousel />");return t}const Yt=A.forwardRef(({orientation:t="horizontal",opts:e,setApi:r,plugins:s,className:i,children:o,...n},u)=>{const[a,c]=Mt({...e,axis:t==="horizontal"?"x":"y"},s),[x,d]=A.useState(!1),[g,b]=A.useState(!1),l=A.useCallback(p=>{p&&(d(p.canScrollPrev()),b(p.canScrollNext()))},[]),m=A.useCallback(()=>{c==null||c.scrollPrev()},[c]),h=A.useCallback(()=>{c==null||c.scrollNext()},[c]),f=A.useCallback(p=>{p.key==="ArrowLeft"?(p.preventDefault(),m()):p.key==="ArrowRight"&&(p.preventDefault(),h())},[m,h]);return A.useEffect(()=>{!c||!r||r(c)},[c,r]),A.useEffect(()=>{if(c)return l(c),c.on("reInit",l),c.on("select",l),()=>{c==null||c.off("select",l)}},[c,l]),v.jsx(_t.Provider,{value:{carouselRef:a,api:c,opts:e,orientation:t||((e==null?void 0:e.axis)==="y"?"vertical":"horizontal"),scrollPrev:m,scrollNext:h,canScrollPrev:x,canScrollNext:g},children:v.jsx("div",{ref:u,onKeyDownCapture:f,className:gt("relative",i),role:"region","aria-roledescription":"carousel",...n,children:o})})});Yt.displayName="Carousel";const Wt=A.forwardRef(({className:t,...e},r)=>{const{carouselRef:s,orientation:i}=vt();return v.jsx("div",{ref:s,className:"overflow-hidden",children:v.jsx("div",{ref:r,className:gt("flex",i==="horizontal"?"-ml-4":"-mt-4 flex-col",t),...e})})});Wt.displayName="CarouselContent";const Pt=A.forwardRef(({className:t,...e},r)=>{const{orientation:s}=vt();return v.jsx("div",{ref:r,role:"group","aria-roledescription":"slide",className:gt("min-w-0 shrink-0 grow-0 basis-full",s==="horizontal"?"pl-4":"pt-4",t),...e})});Pt.displayName="CarouselItem";const te=A.forwardRef(({className:t,variant:e="outline",size:r="icon",...s},i)=>{const{orientation:o,scrollPrev:n,canScrollPrev:u}=vt();return v.jsxs(yt,{ref:i,variant:e,size:r,className:gt("absolute  h-8 w-8 rounded-full",o==="horizontal"?"lg:-left-12 left-6 top-1/2 -translate-y-1/2":"-top-12 left-1/2 -translate-x-1/2 rotate-90",t),disabled:!u,onClick:n,...s,children:[v.jsx(fe,{className:"w-4 h-4"}),v.jsx("span",{className:"sr-only",children:"Previous slide"})]})});te.displayName="CarouselPrevious";const ee=A.forwardRef(({className:t,variant:e="outline",size:r="icon",...s},i)=>{const{orientation:o,scrollNext:n,canScrollNext:u}=vt();return v.jsxs(yt,{ref:i,variant:e,size:r,className:gt("absolute h-8 w-8 rounded-full",o==="horizontal"?"lg:-right-12 right-6 top-1/2 -translate-y-1/2":"-bottom-12 left-1/2 -translate-x-1/2 rotate-90",t),disabled:!u,onClick:n,...s,children:[v.jsx(de,{className:"w-4 h-4"}),v.jsx("span",{className:"sr-only",children:"Next slide"})]})});ee.displayName="CarouselNext";function Je({photos:t}){return v.jsxs(Yt,{className:"w-full max-w-sm p-4 rounded-md bg-slate-50 dark:bg-slate-600",children:[v.jsx(Wt,{children:t.length>0?t.map(e=>v.jsx(Pt,{children:v.jsx("img",{src:`undefined/storage/${e.photo}`,alt:"Product photo",className:"object-contain w-full h-full"})},e.id)):v.jsx(Pt,{children:v.jsx("img",{src:me,alt:"Product photo not found",className:"object-contain w-full h-full"})})}),t.length>1&&v.jsxs(v.Fragment,{children:[v.jsx(te,{className:"dark:bg-white dark:text-slate-800"}),v.jsx(ee,{className:"dark:bg-white dark:text-slate-800"})]})]})}const on=({product:t,category:e,photos:r})=>{const{loading:s,setLoading:i}=ge(),o=()=>{i(!0),le.get(route("admin.product.edit",t.id),{},{onFinish:()=>i(!1)})};return v.jsxs(v.Fragment,{children:[v.jsxs("div",{className:"flex items-center justify-between pt-6 pb-10",children:[v.jsx(pe,{title:"Details product",description:"All about your product"}),v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsx(yt,{disabled:s,variant:"ghost",className:"h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500",onClick:o,children:v.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"edit-alt",className:"fill-current",width:"21",height:"21",fill:"none",children:v.jsx("path",{fill:"#F9F9FC",d:"M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"})})}),v.jsx(yt,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]})]}),v.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 justify-items-center",children:[v.jsx(Je,{photos:r}),v.jsx("div",{className:"w-full max-w-lg",children:v.jsxs("div",{className:"p-6 space-y-6 rounded-md md:p-10 bg-slate-50 dark:bg-slate-600",children:[v.jsxs("div",{children:[v.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-gray-50",children:t.name}),v.jsx("h2",{className:"text-xl font-semibold text-gray-400",children:e.name})]}),v.jsxs("div",{children:[v.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Price:"," "]}),v.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:["Rp. ",t.price,"/",t.unit]})]}),v.jsxs("div",{children:[v.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Stock:"," "]}),v.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:[t.stock_quantity," ",t.unit]})]}),v.jsxs("div",{className:"text-gray-800 dark:text-gray-200 ",children:[v.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Description:"," "]}),v.jsx("p",{className:"text-sm leading-normal text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300",children:t.description?t.description:v.jsx("span",{className:"text-slate-400",children:"No description."})})]})]})})]})]})};export{on as default};
