import{j as e}from"./app-CBjwQAxT.js";import{B as n}from"./button-DEL8svb2.js";import{B as d}from"./constants-BUrVtmhx.js";import"./index-DCAHNd6M.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";function u({paymentMethodId:r,paymentMethods:i,isVisible:s,onClose:o}){const t=i.find(a=>a.id.toString()===r);return s?e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"relative p-5 bg-white rounded-sm shadow-md dark:bg-slate-800",children:[e.jsx("img",{src:`${d}/storage/${t==null?void 0:t.qris_image}`,alt:"QR Code",className:"object-cover h-64 md:w-96 md:h-80 w-72"}),e.jsx(n,{className:"absolute flex items-center justify-center w-6 h-6 p-2 text-white bg-red-500 rounded-full hover:opacity-95 hover:bg-red-500 hover:text-white right-2 top-2",type:"button",onClick:o,children:e.jsx("span",{className:"text-xs leading-none",children:"X"})})]})}):null}export{u as QrModal};
