import{r as n,j as e,y as r}from"./app-BDFo6oUw.js";import{A as f}from"./AlertModal-MdqANP1E.js";import{B as x}from"./button-DArU0F6p.js";import{P as h,D as j}from"./plus-CvaRDXAw.js";import{H as g}from"./heading-CbGLtiTL.js";import{u as y}from"./useGlobalContext-CJNLfktq.js";import{B as C}from"./react-toastify.esm-6DYMdDcn.js";import{columns as D}from"./columns-BehhSOND.js";import"./index-CAqmWMrS.js";import"./index-C-Wu41O2.js";import"./index-DSKujPjE.js";import"./index-BEguvLlE.js";import"./react-icons.esm-Bon-99m0.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./select-BnFr0tFP.js";import"./index-a83yYvjM.js";import"./index-CXarvApX.js";import"./input-Ci5xMt7U.js";import"./table-CC50BmMq.js";import"./createLucideIcon-wUse0bSb.js";import"./badge-CZjXNmrr.js";import"./cell-action-C_3oK1Va.js";import"./arrow-up-down-CxSFumaj.js";const J=({data:s})=>{const{loading:a,setLoading:t}=y(),[m,l]=n.useState([""]),[p,i]=n.useState(!1),d=()=>{t(!0),r.post(route("admin.order.destroy-bulk",{ids:m}),{},{onSuccess:()=>{r.visit(route("admin.order.index")),setTimeout(()=>{C.success("Data deleted.",{position:"top-center"})},1e3)},onError:o=>console.log("An error occurred: ",o),onFinish:()=>t(!1)})},c=o=>{l(o),i(!0)},u=()=>{t(!0),r.get(route("admin.order.create"),{},{onFinish:()=>t(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(g,{title:`Orders (${s.length})`,description:"Manage orders for your store"}),e.jsx(x,{onClick:u,variant:"outline",className:"dark:bg-slate-200",children:e.jsx(h,{className:"w-4 h-4 dark:text-slate-900"})})]}),e.jsx(f,{isOpen:p,onClose:()=>i(!1),onConfirm:d,loading:a}),e.jsx(j,{onDelete:c,searchKey:"customer_name",columns:D,data:s})]})};export{J as OrderClient};