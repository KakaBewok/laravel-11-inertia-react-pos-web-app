import{r as c}from"./app-vVRCAGOW.js";function S(t,e,{checkForDefaultPrevented:u=!0}={}){return function(o){if(t==null||t(o),u===!1||!o.defaultPrevented)return e==null?void 0:e(o)}}var b=globalThis!=null&&globalThis.document?c.useLayoutEffect:()=>{};function l(t){const e=c.useRef(t);return c.useEffect(()=>{e.current=t}),c.useMemo(()=>(...u)=>{var s;return(s=e.current)==null?void 0:s.call(e,...u)},[])}function y({prop:t,defaultProp:e,onChange:u=()=>{}}){const[s,o]=h({defaultProp:e,onChange:u}),n=t!==void 0,i=n?t:s,r=l(u),d=c.useCallback(f=>{if(n){const a=typeof f=="function"?f(t):f;a!==t&&r(a)}else o(f)},[n,t,o,r]);return[i,d]}function h({defaultProp:t,onChange:e}){const u=c.useState(t),[s]=u,o=c.useRef(s),n=l(e);return c.useEffect(()=>{o.current!==s&&(n(s),o.current=s)},[s,o,n]),u}export{b as a,y as b,S as c,l as u};
