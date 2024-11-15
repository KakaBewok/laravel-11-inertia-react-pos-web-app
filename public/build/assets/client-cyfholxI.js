import{r as a,j as e,y as r}from"./app-D9pFrhhQ.js";import{A as g}from"./AlertModal-D2jUMq9L.js";import{B as f}from"./button-FegJZZ0G.js";import{P as x,D as y}from"./plus-T2XwA_sc.js";import{H as h}from"./heading-COvbuDjO.js";import{u as j}from"./useGlobalContext-D4zjIaB6.js";import{B as C}from"./react-toastify.esm-DoOGIfX5.js";import{columns as b}from"./columns-dOiuAsu5.js";import"./index-CLx_H4vX.js";import"./index-B1AYJYdR.js";import"./index-DI3y1uhg.js";import"./index-Cud0KnTV.js";import"./react-icons.esm-BZ7oayWu.js";import"./utils-CcFn7B-c.js";import"./clsx-B-dksMZM.js";import"./select-DApvIETE.js";import"./index-CT1L61lC.js";import"./index-D7QuIRA-.js";import"./input-CrCVKbUg.js";import"./table-D208WbO-.js";import"./createLucideIcon-BDk9GcPF.js";import"./cell-action-DKd4nfaY.js";import"./arrow-up-down-DhREkNrX.js";const J=({data:s})=>{const{loading:n,setLoading:t}=j(),[l,m]=a.useState([""]),[p,i]=a.useState(!1),c=()=>{t(!0),r.post(route("admin.category.destroy-bulk",{ids:l}),{},{onSuccess:()=>{r.visit(route("admin.category.index")),setTimeout(()=>{C.success("Data deleted.",{position:"top-center"})},1e3)},onError:o=>console.log("An error occurred: ",o),onFinish:()=>t(!1)})},d=o=>{m(o),i(!0)},u=()=>{t(!0),r.get(route("admin.category.create"),{},{onFinish:()=>t(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(h,{title:`Categories (${s.length})`,description:"Manage categories for your store"}),e.jsx(f,{onClick:u,variant:"outline",className:"dark:bg-slate-200",children:e.jsx(x,{className:"w-4 h-4 dark:text-slate-900"})})]}),e.jsx(g,{isOpen:p,onClose:()=>i(!1),onConfirm:c,loading:n,description:"All products under this category will also be deleted."}),e.jsx(y,{onDelete:d,searchKey:"name",columns:b,data:s})]})};export{J as CategoryClient};