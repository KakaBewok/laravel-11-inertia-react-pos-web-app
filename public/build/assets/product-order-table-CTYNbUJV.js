import{j as e}from"./app-BDFo6oUw.js";import{T as c,a as d,b as x,c as a,d as n,e as s,f as i}from"./table-CC50BmMq.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";const N=({productsOrdered:r})=>e.jsx(e.Fragment,{children:e.jsxs(c,{children:[e.jsx(d,{children:e.jsxs(x,{children:[e.jsx(a,{className:" text-slate-700 font-bold text-md dark:text-white",children:"Num."}),e.jsx(a,{className:"w-[150px] text-slate-700 font-bold text-md dark:text-white",children:"Name"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Price"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Unit"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Qty"}),e.jsx(a,{className:"font-bold text-center text-slate-700 text-md dark:text-white",children:"Total Price"})]})}),e.jsx(n,{children:r.map((t,l)=>e.jsxs(x,{className:"text-slate-500 dark:text-slate-300 text-xs md:text-sm",children:[e.jsx(s,{className:"text-left",children:l+1}),e.jsx(s,{className:"text-left",children:t.product_name}),e.jsxs(s,{className:"text-left",children:["Rp. ",t.price]}),e.jsx(s,{className:"text-center",children:t.unit}),e.jsx(s,{className:"text-center",children:t.quantity}),e.jsxs(s,{className:"text-left",children:["Rp. ",t.total_price]})]},t.id))}),e.jsx(i,{children:e.jsxs(x,{className:"text-xs md:text-sm",children:[e.jsx(s,{colSpan:4,children:"Total"}),e.jsxs(s,{colSpan:2,className:"text-right",children:["Rp."," ",r.reduce((t,l)=>t+l.total_price,0)]})]})})]})});export{N as default};
