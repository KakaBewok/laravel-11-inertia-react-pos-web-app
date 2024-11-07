import{j as e,y as l}from"./app-vVRCAGOW.js";import{B as s}from"./button-cqbvmE_O.js";import{H as d}from"./heading-w8uDzKiO.js";import{u as n}from"./useGlobalContext-WqwPRLsa.js";import{f as o}from"./format-BEMO4FpZ.js";import"./index-MU7vlc2G.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";const f=({expense:t})=>{const{loading:r,setLoading:a}=n(),i=()=>{a(!0),l.get(route("admin.expense.edit",t.id),{},{onFinish:()=>a(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between pt-6 pb-10",children:[e.jsx(d,{title:"Details Expense",description:"All about your expense"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(s,{disabled:r,variant:"ghost",className:"h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500",onClick:i,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"edit-alt",className:"fill-current",width:"21",height:"21",fill:"none",children:e.jsx("path",{fill:"#F9F9FC",d:"M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"})})}),e.jsx(s,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]})]}),e.jsxs("div",{className:"max-w-lg p-6 space-y-6 rounded-md md:p-9 bg-slate-50 dark:bg-slate-600",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-gray-50",children:t.name}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Amount:"," "]}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:["Rp. ",t.amount]})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Expense date:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:o(new Date(t.expense_date),"dd MMMM yyyy")})]}),e.jsxs("div",{className:"text-gray-800 dark:text-gray-200 ",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Description:"," "]}),e.jsx("p",{className:"text-sm leading-normal md:text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300",children:t.description?t.description:e.jsx("span",{className:"text-slate-400",children:"No description."})})]})]})]})};export{f as default};
