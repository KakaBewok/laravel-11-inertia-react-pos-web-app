import{r as a,j as e,y as r}from"./app-CBjwQAxT.js";import{A as h}from"./AlertModal-10j36Do2.js";import{B as f}from"./button-DEL8svb2.js";import{P as x,D as y}from"./plus-DSzl9buD.js";import{H as j}from"./heading-BmbMu-Jf.js";import{u as g}from"./useGlobalContext-WPfucgOM.js";import{B as M}from"./react-toastify.esm-CFj9e9l2.js";import{columns as C}from"./columns-D-XcteSH.js";import"./index-DxLAwLwW.js";import"./index-DCAHNd6M.js";import"./index-BtB2tnuv.js";import"./index-DJL5S_DW.js";import"./react-icons.esm-TIWuvnpV.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./select-DYtbBsWu.js";import"./index-H3tww2bM.js";import"./index-BTEjy6hw.js";import"./input-Cdi3gyGp.js";import"./table-C93t7MF5.js";import"./createLucideIcon-DrjK5DNx.js";import"./badge-sMfwaoir.js";import"./cell-action-B4IzSgav.js";import"./arrow-up-down-BbxvRzOn.js";const J=({data:s})=>{const{loading:i,setLoading:t}=g(),[m,l]=a.useState([""]),[p,n]=a.useState(!1),d=()=>{t(!0),r.post(route("admin.payment_method.destroy-bulk",{ids:m}),{},{onSuccess:()=>{r.visit(route("admin.payment_method.index")),setTimeout(()=>{M.success("Data deleted.",{position:"top-center"})},1e3)},onError:o=>console.log("An error occurred: ",o),onFinish:()=>t(!1)})},c=o=>{l(o),n(!0)},u=()=>{t(!0),r.get(route("admin.payment_method.create"),{},{onFinish:()=>t(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(j,{title:`Payment Methods (${s.length})`,description:"Manage payment method for your store"}),e.jsx(f,{onClick:u,variant:"outline",className:"dark:bg-slate-200",children:e.jsx(x,{className:"w-4 h-4 dark:text-slate-900"})})]}),e.jsx(h,{isOpen:p,onClose:()=>n(!1),onConfirm:d,loading:i}),e.jsx(y,{onDelete:c,searchKey:"name",columns:C,data:s})]})};export{J as PaymentMethodClient};