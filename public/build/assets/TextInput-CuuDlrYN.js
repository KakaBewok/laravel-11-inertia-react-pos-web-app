import{j as a,r as e}from"./app-C3BytVar.js";function i({message:t,className:o="",...s}){return t?a.jsx("p",{...s,className:"text-sm text-red-600 dark:text-red-400 "+o,children:t}):null}const x=e.forwardRef(function({type:o="text",className:s="",isFocused:u=!1,...d},c){const n=e.useRef(null);return e.useImperativeHandle(c,()=>({focus:()=>{var r;return(r=n.current)==null?void 0:r.focus()}})),e.useEffect(()=>{var r;u&&((r=n.current)==null||r.focus())},[]),a.jsx("input",{...d,type:o,className:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "+s,ref:n})});export{i as I,x as T};
