import{j as e}from"./app-CBjwQAxT.js";import{B as s}from"./button-DEL8svb2.js";import{CellAction as a}from"./cell-action-CIpazI74.js";import{A as r}from"./arrow-up-down-BbxvRzOn.js";import"./index-DCAHNd6M.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./AlertModal-10j36Do2.js";import"./index-DxLAwLwW.js";import"./index-BtB2tnuv.js";import"./index-DJL5S_DW.js";import"./react-icons.esm-TIWuvnpV.js";import"./useGlobalContext-WPfucgOM.js";import"./react-toastify.esm-CFj9e9l2.js";import"./createLucideIcon-DrjK5DNx.js";const k=[{accessorKey:"number",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Num.",e.jsx(r,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>t.index+1},{accessorKey:"name",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Name",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"description",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Description",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"product_quantity",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Product Quantity",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{id:"actions",header:()=>e.jsx("span",{className:"font-bold text-slate-800 dark:text-slate-50",children:"Actions"}),cell:({row:t})=>e.jsx(a,{data:t.original})}];export{k as columns};