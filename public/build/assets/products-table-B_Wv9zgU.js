import{j as e}from"./app-DWVvGJV7.js";import{T as r,a as c,b as l,c as a,d as n,e as s}from"./table-CkkZNLtB.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";const h=({products:x})=>e.jsx(e.Fragment,{children:e.jsxs(r,{children:[e.jsx(c,{children:e.jsxs(l,{children:[e.jsx(a,{className:"w-[150px] text-slate-700 font-bold text-md dark:text-white",children:"Name"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Price (IDR)"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Unit"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Stock"})]})}),e.jsx(n,{children:x.map(t=>e.jsxs(l,{className:"text-slate-500 dark:text-slate-300",children:[e.jsx(s,{className:"text-left",children:t.name}),e.jsx(s,{className:"text-center",children:t.price.toLocaleString("id-ID")}),e.jsx(s,{className:"text-center",children:t.unit}),e.jsx(s,{className:"text-center",children:t.stock_quantity})]},t.id))})]})});export{h as default};