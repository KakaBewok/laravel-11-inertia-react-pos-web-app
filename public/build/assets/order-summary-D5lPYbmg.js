import{j as e}from"./app-DWVvGJV7.js";import{B as s}from"./button-wtn4THDw.js";import{S as n}from"./separator-BQjWBYfG.js";import{B as h}from"./constants-JGxeO3yw.js";import{I as g}from"./image-not-found-BCeE-Ta1.js";import"./index-DzMtW_yg.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./index-6ZYeE3mX.js";const k=({products:a,selectedItems:l,setSelectedItems:c,adjustQuantity:r,removeItem:x,totalItems:m,form:d})=>(a.length<1&&localStorage.removeItem("selectedItems"),e.jsx("div",{className:"w-full ",children:e.jsxs("div",{className:"order-summary",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h1",{className:"text-lg font-bold ",children:"Order Summary"}),e.jsx(s,{type:"button",size:"sm",variant:"outline",onClick:()=>c([]),className:`${l.length<1?"hidden":""} text-white bg-red-500  hover:bg-red-500 hover:text-white hover:opacity-85`,children:"Clear Items"})]}),e.jsx(n,{className:"mb-4 bg-slate-300 dark:bg-slate-700"}),l.length>0&&a.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex flex-col justify-start gap-3 lg:gap-6 lg:p-6 h-80 md:h-[548px] dark:bg-gray-950 bg-gray-100 overflow-y-scroll p-3 rounded-sm",children:l.map(t=>{var i,o;return e.jsxs("div",{className:"relative flex items-center justify-center w-full gap-3 p-2 rounded-md shadow-sm lg:gap-5 lg:p-4 dark:bg-slate-800 dark:shadow-none shadow-slate-300 bg-slate-50",children:[e.jsx("div",{className:"w-1/3 h-[87px] overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-85",children:((i=t.photos)==null?void 0:i.length)===0?e.jsx("img",{alt:"Image not found",src:g,className:"object-cover object-center w-full h-full"}):e.jsx("img",{alt:"item image",src:`${h}/storage/${(o=t.photos)==null?void 0:o[0].photo}`,className:"object-cover object-center w-full h-full"})}),e.jsxs("div",{className:"flex flex-col items-start justify-start w-2/3 gap-3",children:[e.jsxs("div",{className:"mr-1",children:[e.jsx("h3",{className:"mb-1 font-medium leading-none text-md",children:t.product_name}),e.jsxs("p",{className:"text-sm font-light text-slate-500",children:["Rp."," ",(t.price*t.quantity).toLocaleString("id-ID")]})]}),e.jsx("div",{className:"flex items-center justify-start w-full lg:justify-end",children:e.jsxs("div",{className:"flex items-center justify-between w-2/3 rounded-md lg:w-24 bg-slate-200 text-slate-700",children:[e.jsx(s,{variant:"ghost",type:"button",className:"bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600",onClick:()=>r(t,-1),children:"-"}),e.jsx("span",{className:"text-sm font-medium",children:t.quantity}),e.jsx(s,{variant:"ghost",className:"bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600",type:"button",onClick:()=>r(t,1),children:"+"})]})},t.id)]},t.id),e.jsx(s,{className:"absolute flex items-center justify-center w-5 h-5 p-2 text-white bg-red-500 rounded-full lg:w-6 lg:h-6 hover:opacity-85 hover:bg-red-500 hover:text-white lg:-right-2 lg:-top-2 -top-1 -right-1",type:"button",onClick:()=>x(t),children:e.jsx("span",{className:"text-xs leading-none",children:"X"})})]},t.id)})}),e.jsxs("div",{className:"flex flex-col items-start justify-start w-full gap-3 p-5 my-10 bg-gray-200 rounded-md shadow-md md:my-6 dark:bg-slate-950 text-slate-500",children:[e.jsxs("div",{className:"flex justify-between w-full text-xs lg:text-sm ",children:[e.jsx("p",{children:"Total items"}),e.jsxs("p",{className:"font-semibold text-slate-900 dark:text-slate-300",children:[Number(m),"x"]})]}),e.jsxs("div",{className:"flex justify-between w-full text-xs lg:text-sm",children:[e.jsx("p",{children:"Subtotal"}),e.jsxs("p",{className:"font-semibold text-slate-900 dark:text-slate-300",children:["Rp."," ",d.getValues("total_amount").toLocaleString("id-ID")]})]}),e.jsxs("div",{className:"flex justify-between w-full text-xs lg:text-sm",children:[e.jsx("p",{children:"Tax"}),e.jsx("p",{className:"font-semibold text-slate-900 dark:text-slate-300",children:"+ 0"})]}),e.jsxs("div",{className:"flex justify-between w-full text-xs lg:text-sm",children:[e.jsx("p",{children:"Discount"}),e.jsx("p",{className:"font-semibold text-slate-900 dark:text-slate-300",children:"- 0"})]}),e.jsx(n,{className:"bg-slate-300 dark:bg-slate-800"}),e.jsxs("div",{className:"flex justify-between w-full font-bold text-md text-slate-900 dark:text-slate-300",children:[e.jsx("p",{children:"Total"}),e.jsxs("p",{children:["Rp."," ",d.getValues("total_amount").toLocaleString("id-ID")]})]})]})]}):e.jsx("h1",{className:"py-6 text-center text-slate-500",children:"No order."})]})}));export{k as default};