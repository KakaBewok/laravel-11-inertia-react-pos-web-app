import{j as e}from"./app-BDFo6oUw.js";import{B as s}from"./button-DArU0F6p.js";import{CellAction as a}from"./cell-action-DUn4FwsM.js";import{A as r}from"./arrow-up-down-CxSFumaj.js";import"./index-C-Wu41O2.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./AlertModal-MdqANP1E.js";import"./index-CAqmWMrS.js";import"./index-DSKujPjE.js";import"./index-BEguvLlE.js";import"./react-icons.esm-Bon-99m0.js";import"./useGlobalContext-CJNLfktq.js";import"./react-toastify.esm-6DYMdDcn.js";import"./createLucideIcon-wUse0bSb.js";const k=[{accessorKey:"number",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Num.",e.jsx(r,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>t.index+1},{accessorKey:"name",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Name",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"description",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Description",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"product_quantity",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Product Quantity",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{id:"actions",header:()=>e.jsx("span",{className:"font-bold text-slate-800 dark:text-slate-50",children:"Actions"}),cell:({row:t})=>e.jsx(a,{data:t.original})}];export{k as columns};