import{r as S,j as e,y as d}from"./app-CFpK7jNL.js";import{B as c}from"./button-DI8lM0hK.js";import{P,a as T,C as _,b as A,c as B}from"./popover-DfPVb7F9.js";import{o as H,s as f,f as I,g as L,u as M,t as $,F as G,a as m,b as l,c as x,d as p,e as u}from"./index-Czb7JRCe.js";import{H as R}from"./heading-BkKrbAuW.js";import{I as k}from"./input-Cnu_APYr.js";import{T as V}from"./textarea-DRwS2fFv.js";import{u as q}from"./useGlobalContext-DpoTVwfz.js";import{c as z}from"./utils-CcFn7B-c.js";import{B as J}from"./react-toastify.esm-DWkCdtop.js";import{f as K}from"./format-BEMO4FpZ.js";import"./index-DFBz5MRV.js";import"./createLucideIcon-XyDN5AVm.js";import"./react-icons.esm-DvMEuux4.js";import"./index-CECetD3n.js";import"./index-pfC0p5Pa.js";import"./index-BjLbwCKc.js";import"./index-Ch4xAwkz.js";import"./clsx-B-dksMZM.js";const O=H({name:f().min(3,{message:"Category must contain at least 3 character(s)"}),amount:I.number().min(0,{message:"Minimal amount is 0"}),description:f().optional(),expense_date:L().refine(s=>{const o=new Date;o.setHours(0,0,0,0);const a=new Date(o);return a.setDate(o.getDate()+1),s<a},{message:"The expense date cannot be tomorrow or in the future."})}),pe=({initialData:s})=>{const{loading:o,setLoading:a}=q(),[N,h]=S.useState(!1),y=s?"Edit expense":"Create expense",w=s?"Edit an expense":"Add a new expense",C=s?"Expense updated.":"Expense created.",v=s?"Save changes":"Create",n=M({resolver:$(O),defaultValues:{name:(s==null?void 0:s.name)||"",amount:(s==null?void 0:s.amount)||0,description:(s==null?void 0:s.description)||"",expense_date:(s==null?void 0:s.expense_date)||new Date}}),F=r=>{a(!0),console.log(r);const t=()=>{n.reset()},g=()=>{t(),N?d.visit(route("admin.expense.create")):d.visit(route("admin.expense.index")),setTimeout(()=>{J.success(C,{position:"top-center"})},1e3)},i=E=>{console.log("An error occurred: ",E)},j=()=>a(!1),b=r.expense_date.toLocaleDateString("en-CA");s?d.post(route("admin.expense.update",s==null?void 0:s.id),{...r,expense_date:b,_method:"PATCH"},{onSuccess:g,onError:i,onFinish:j}):d.post(route("admin.expense.store"),{...r,expense_date:b},{onSuccess:g,onError:i,onFinish:j})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between pb-5",children:[e.jsx(R,{title:y,description:w}),e.jsx(c,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]}),e.jsx(G,{...n,children:e.jsxs("form",{onSubmit:n.handleSubmit(F),className:"w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2",children:[e.jsx(m,{control:n.control,name:"name",render:({field:r,fieldState:t})=>e.jsxs(l,{children:[e.jsxs(x,{className:t.error?"text-red-500":"dark:text-gray-300",children:["Name",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(p,{children:e.jsx(k,{className:"dark:bg-slate-700",disabled:o,placeholder:"Paying taxes",...r})}),e.jsx(u,{className:"dark:text-red-500"})]})}),e.jsx(m,{control:n.control,name:"amount",render:({field:r,fieldState:t})=>e.jsxs(l,{children:[e.jsxs(x,{className:t.error?"text-red-500":"dark:text-gray-300",children:["Amount",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(p,{children:e.jsx(k,{className:"dark:bg-slate-700",type:"number",disabled:o,...r})}),e.jsx(u,{className:"dark:text-red-500"})]})}),e.jsx(m,{control:n.control,name:"description",render:({field:r,fieldState:t})=>e.jsxs(l,{children:[e.jsx(x,{className:t.error?"text-red-500":"dark:text-gray-300",children:"Description"}),e.jsx(p,{children:e.jsx(V,{className:"w-full h-32 max-w-lg max-h-40 dark:bg-slate-700",disabled:o,placeholder:"Describe about paying taxes.",...r})}),e.jsx(u,{className:"dark:text-red-500"})]})}),e.jsx(m,{control:n.control,name:"expense_date",render:({field:r,fieldState:t})=>e.jsxs(l,{children:[e.jsx(x,{className:t.error?"text-red-500":"dark:text-gray-300",children:"Expense Date"}),e.jsx(p,{children:e.jsxs(P,{children:[e.jsx(T,{asChild:!0,children:e.jsxs(c,{variant:"outline",className:z("w-full justify-start gap-3 p-5 text-left font-normal dark:bg-slate-600 dark:hover:bg-slate-600",!r.value&&"text-muted-foreground"),children:[e.jsx(_,{}),r.value?K(r.value,"PPP"):e.jsx("span",{children:"Pick a date"})]})}),e.jsx(A,{className:"w-auto p-0",children:e.jsx(B,{mode:"single",selected:r.value,onSelect:r.onChange,initialFocus:!0})})]})}),e.jsx(u,{className:"dark:text-red-500"})]})})]}),e.jsxs("div",{className:"flex flex-col items-center justify-between w-full gap-4 mt-10 md:w-1/2 lg:flex-row",children:[e.jsx(c,{disabled:o,className:"w-full",type:"submit",onClick:()=>h(!1),children:v}),e.jsx(c,{disabled:o,className:`${s?"hidden":""} w-full bg-slate-300 text-slate-950 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200`,type:"submit",onClick:()=>h(!0),children:"Create & Create another"})]})]})})]})};export{pe as ExpenseForm};
