import{j as e,y as n}from"./app-CFpK7jNL.js";import{B as t}from"./badge-BRb_jiwq.js";import{B as l}from"./button-DI8lM0hK.js";import{H as c}from"./heading-BkKrbAuW.js";import{u as m}from"./useGlobalContext-DpoTVwfz.js";import{I as i}from"./image-not-found-BCeE-Ta1.js";import{B as o}from"./constants-BUrVtmhx.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./index-DFBz5MRV.js";const k=({paymentMethod:a})=>{const{loading:s,setLoading:r}=m(),d=()=>{r(!0),n.get(route("admin.payment_method.edit",a.id),{},{onFinish:()=>r(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between pt-6 pb-10",children:[e.jsx(c,{title:"Details payment method",description:"All about your payment method"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(l,{disabled:s,variant:"ghost",className:"h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500",onClick:d,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"edit-alt",className:"fill-current",width:"21",height:"21",fill:"none",children:e.jsx("path",{fill:"#F9F9FC",d:"M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"})})}),e.jsx(l,{disabled:s,variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]})]}),e.jsxs("div",{className:"flex flex-col justify-between rounded-lg md:flex-row bg-slate-50 dark:bg-slate-600",children:[e.jsxs("div",{className:"w-full p-6 space-y-6 md:w-1/3 md:p-7",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 dark:text-gray-50",children:a.name}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Bank name:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:a.bank_name==""?"-":a.bank_name})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Account Holder:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:a.account_holder==""?"-":a.account_holder})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Account Number:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:a.account_number==""?"-":a.account_number})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800 dark:text-gray-50",children:["Payment type:"," "]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-300",children:a.name=="Cash"?"Cash":"Cashless"})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-1 font-semibold text-gray-800 dark:text-gray-50",children:["Status:"," "]}),e.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-300",children:a.status?e.jsx(t,{variant:"default",className:"bg-green-500 dark:text-white hover:bg-green-500 hover:text-white",children:"Active"}):e.jsx(t,{variant:"destructive",className:"pointer-events-none dark:bg-red-500",children:"Non-Active"})})]})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center w-full gap-5 p-5 md:w-2/3 md:flex-row",children:[e.jsx("div",{className:"w-full h-full overflow-hidden border border-gray-200 rounded-sm shadow-sm dark:border-gray-400",children:a.bank_logo?e.jsx("img",{src:`${o}/storage/${a.bank_logo}`,alt:"Bank Logo",className:"object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"}):e.jsx("img",{src:i,alt:"No image uploaded",className:"object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"})}),e.jsx("div",{className:"w-full h-full overflow-hidden border border-gray-200 rounded-sm shadow-sm dark:border-gray-400",children:a.qris_image?e.jsx("img",{src:`${o}/storage/${a.qris_image}`,alt:"QRIS image",className:"object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"}):e.jsx("img",{src:i,alt:"No image uploaded",className:"object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"})})]})]})]})};export{k as default};
