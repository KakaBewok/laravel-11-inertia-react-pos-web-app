import{j as e}from"./app-C3BytVar.js";import{B as s}from"./button-hOfyr7vC.js";import{CellAction as a}from"./cell-action-eOeIYPwy.js";import{A as r}from"./arrow-up-down-D_KoBS_c.js";import"./index-BXAOqOtd.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./AlertModal-DMGaQ6CS.js";import"./index-BzrfCKk8.js";import"./index-C5mKMNbp.js";import"./index-UM38h8RB.js";import"./react-icons.esm-CnE1ajTP.js";import"./useGlobalContext-BKdBRKDL.js";import"./react-toastify.esm-DWzPGhLO.js";import"./createLucideIcon-C89la_SK.js";const k=[{accessorKey:"number",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Num.",e.jsx(r,{className:"w-4 h-4 ml-2"})]}),cell:({row:t})=>t.index+1},{accessorKey:"name",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Name",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"description",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Description",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{accessorKey:"product_quantity",header:({column:t})=>e.jsxs(s,{variant:"ghost",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"font-bold text-slate-800 dark:text-slate-50",children:["Product Quantity",e.jsx(r,{className:"w-4 h-4 ml-2"})]})},{id:"actions",header:()=>e.jsx("span",{className:"font-bold text-slate-800 dark:text-slate-50",children:"Actions"}),cell:({row:t})=>e.jsx(a,{data:t.original})}];export{k as columns};