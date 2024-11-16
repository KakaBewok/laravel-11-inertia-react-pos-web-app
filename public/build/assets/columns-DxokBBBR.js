import{j as e}from"./app-DWVvGJV7.js";import{B as l}from"./badge-DukTBEQO.js";import{B as r}from"./button-wtn4THDw.js";import{CellAction as n}from"./cell-action-Buy6UMzD.js";import{A as s}from"./arrow-up-down-BEjoKQLW.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./index-DzMtW_yg.js";import"./AlertModal-CA9GHc29.js";import"./index-BwM3j6Af.js";import"./index-6ZYeE3mX.js";import"./index-BvoQNY0b.js";import"./react-icons.esm-BdPl6_9_.js";import"./useGlobalContext-BRqftNUw.js";import"./react-toastify.esm-a2GOqe9n.js";import"./createLucideIcon-DqLYUNgl.js";const I=[{accessorKey:"number",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Num.",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>t.index+1},{accessorKey:"customer_name",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Customer name",e.jsx(s,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"total_amount",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Total amount",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>{const a=parseFloat(t.getValue("total_amount"));return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(a)}},{accessorKey:"total_paid",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Total paid",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>{const a=parseFloat(t.getValue("total_paid"));return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(a)}},{accessorKey:"changes",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Changes",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>{const a=parseFloat(t.getValue("changes"));return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(a)}},{accessorKey:"status",header:({column:t})=>e.jsxs(r,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Status",e.jsx(s,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>{const a=t.getValue("status");return e.jsx(l,{variant:"default",className:`${a==="Paid"?"bg-green-500 dark:text-white hover:bg-green-500 hover:text-white":a==="Pending"?"bg-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white":"bg-red-500 dark:text-white hover:bg-red-500 hover:text-white"} px-3 py-1 text-sm rounded-sm`,children:a})}},{id:"actions",header:()=>e.jsx("span",{className:"font-bold text-slate-800 dark:text-slate-50",children:"Actions"}),cell:({row:t})=>e.jsx(n,{data:t.original})}];export{I as columns};