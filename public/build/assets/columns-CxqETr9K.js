import{j as e}from"./app-DWVvGJV7.js";import{B as r}from"./button-wtn4THDw.js";import{CellAction as o}from"./cell-action-BtOir9hR.js";import{A as s}from"./arrow-up-down-BEjoKQLW.js";import"./index-DzMtW_yg.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./AlertModal-CA9GHc29.js";import"./index-BwM3j6Af.js";import"./index-6ZYeE3mX.js";import"./index-BvoQNY0b.js";import"./react-icons.esm-BdPl6_9_.js";import"./useGlobalContext-BRqftNUw.js";import"./react-toastify.esm-a2GOqe9n.js";import"./createLucideIcon-DqLYUNgl.js";const b=[{accessorKey:"number",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Num.",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>t.index+1},{accessorKey:"name",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Name",e.jsx(s,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"amount",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Amount",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>{const a=parseFloat(t.getValue("amount"));return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(a)}},{accessorKey:"expense_date",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Expense date",e.jsx(s,{className:"w-4 h-4 ml-2"})]})},{id:"actions",header:()=>e.jsx("span",{className:"font-bold text-slate-800 dark:text-slate-50",children:"Actions"}),cell:({row:t})=>e.jsx(o,{data:t.original})}];export{b as columns};