import{j as e,y as d}from"./app-C3BytVar.js";import{B as l}from"./button-hOfyr7vC.js";import{H as o}from"./heading-CU1-AL1S.js";import{S as n}from"./separator-ZdAk6Sqq.js";import{u as m}from"./useGlobalContext-BKdBRKDL.js";import x from"./products-table-BhpbbdVa.js";import"./index-BXAOqOtd.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./index-C5mKMNbp.js";import"./table-Cz7Eh8Sr.js";const w=({products:t,category:a})=>{const{loading:r,setLoading:s}=m(),i=()=>{s(!0),d.get(route("admin.category.edit",a.id),{},{onFinish:()=>s(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between pt-6 pb-10",children:[e.jsx(o,{title:"Details category",description:"All about your category"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(l,{disabled:r,variant:"ghost",className:"h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500",onClick:i,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"edit-alt",className:"fill-current",width:"21",height:"21",fill:"none",children:e.jsx("path",{fill:"#F9F9FC",d:"M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"})})}),e.jsx(l,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:[e.jsxs("div",{className:"w-full max-w-lg p-6 space-y-6 rounded-md md:p-7 bg-slate-50 dark:bg-slate-600",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-gray-50",children:a.name}),e.jsx(n,{className:"bg-slate-300 dark:bg-slate-700"}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Total products:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:t.length})]}),e.jsxs("div",{className:"text-gray-800 dark:text-gray-200 ",children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Description:"," "]}),e.jsx("p",{className:"text-sm leading-normal text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300",children:a.description?a.description:e.jsx("span",{className:"text-slate-400",children:"No description."})})]})]}),e.jsxs("div",{className:"w-full max-w-lg p-6 mx-auto rounded-md md:p-7 bg-slate-50 dark:bg-slate-600",children:[e.jsx("h1",{className:"pb-5 font-bold text-md text-slate-700 dark:text-white",children:"List of products"}),t!=null&&t.length>0?e.jsx(x,{products:t}):e.jsx("p",{className:"font-normal text-center text-muted-foreground text-md",children:"No result."})]})]})]})};export{w as default};
