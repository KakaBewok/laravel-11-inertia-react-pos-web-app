import{r as l,j as e,y as I}from"./app-DWVvGJV7.js";import{B as S}from"./button-wtn4THDw.js";import{P as ae,a as ne,C as de,b as ce,c as me}from"./popover-BeQVPKxI.js";import{o as le,s as N,g as ue,f as O,u as he,t as xe,F as ge,a as g,b as i,c as p,d as h,e as j}from"./index-DDcuXYW0.js";import{H as ie}from"./heading-Cp2sm0gL.js";import{I as w}from"./input-EX4Xb_8e.js";import{S as E,a as M,b as B,d as J,e as k}from"./select-BI-b3jWj.js";import{S as pe}from"./separator-BQjWBYfG.js";import{T as je}from"./textarea-Ct8hfEwV.js";import{u as fe}from"./useGlobalContext-BRqftNUw.js";import{c as ye}from"./utils-CcFn7B-c.js";import{B as L}from"./react-toastify.esm-a2GOqe9n.js";import{BankTransferCard as Se}from"./bank-transfer-card-U7_kQ4wY.js";import be from"./order-summary-D5lPYbmg.js";import Ne from"./product-cards-BfMEkKWM.js";import{QrModal as ke}from"./qr-modal-Bfrqun8O.js";import{f as _e}from"./format-BEMO4FpZ.js";import"./index-DzMtW_yg.js";import"./createLucideIcon-DqLYUNgl.js";import"./react-icons.esm-BdPl6_9_.js";import"./index-BwM3j6Af.js";import"./index-6ZYeE3mX.js";import"./index-BvoQNY0b.js";import"./index-CJCAG5AA.js";import"./index-BZYCdTEE.js";import"./clsx-B-dksMZM.js";import"./constants-JGxeO3yw.js";import"./image-not-found-BCeE-Ta1.js";const ve=le({customer_name:N().min(3,{message:"Name must contain at least 3 character(s)"}),order_date:ue().refine(t=>{const u=new Date;u.setHours(0,0,0,0);const x=new Date(u);return x.setDate(u.getDate()+1),t<x},{message:"Order date cannot be tomorrow or in the future."}),total_amount:O.number().min(0,{message:"Total amount must be greater than or equal to 0"}),changes:O.number().min(0,{message:"Changes must be greater than or equal to 0"}),status:N().min(3,{message:"Status must contain at least 3 character(s)"}),notes:N().optional(),payment_method_id:N().min(1,{message:"Payment method is required"})}),es=({initialData:t,paymentMethods:u,products:x})=>{const{loading:f,setLoading:F}=fe(),[P,_]=l.useState(t!=null&&t.selectedPaymentMethod?t==null?void 0:t.selectedPaymentMethod.name:null),[Q,V]=l.useState(!1),[H,A]=l.useState(0),[q,R]=l.useState(0),[d,y]=l.useState(t&&t.selectedItems?t.selectedItems:[]),[T,$]=l.useState(""),z=x.filter(s=>s.name.toLowerCase().includes(T.toLowerCase())&&s.stock_quantity>0),G=t?"Edit order":"Create order",K=t?"Edit an order":"Add a new order",U=t?"Order updated.":"Order created.",W=t?"Save changes":"Create",v={customer_name:"",order_date:new Date,total_amount:q,changes:0,status:"",notes:"",payment_method_id:""},n=he({resolver:xe(ve),defaultValues:{customer_name:(t==null?void 0:t.customer_name)||"",order_date:(t==null?void 0:t.order_date)||new Date,total_amount:(t==null?void 0:t.total_amount)||q,changes:(t==null?void 0:t.changes)||0,status:(t==null?void 0:t.status)||"",notes:(t==null?void 0:t.notes)||"",payment_method_id:(t==null?void 0:t.payment_method_id)||""}}),C=n.watch(),X=s=>{F(!0);const r=s.order_date.toLocaleDateString("en-CA"),o=()=>{n.reset(),localStorage.removeItem("selectedItems"),localStorage.removeItem("formData"),localStorage.removeItem("paymentMethodName")},a=()=>{I.visit(route("admin.order.index")),setTimeout(()=>{L.success(U,{position:"top-center"}),o()},1e3)},c=m=>{Object.keys(m).forEach(re=>{const oe=m[re];L.error(oe,{position:"top-center"})})},b=()=>F(!1);t?I.post(route("admin.order.update",t==null?void 0:t.id),{...s,order_date:r,items:[...d.map(m=>({product_id:m.id,quantity:m.quantity}))],_method:"PATCH"},{onSuccess:a,onError:c,onFinish:b}):I.post(route("admin.order.store"),{...s,order_date:r,items:[...d.map(m=>({product_id:m.id,quantity:m.quantity}))]},{onSuccess:a,onError:c,onFinish:b})},Y=s=>{const r=u.find(o=>o.id.toString()===s);_((r==null?void 0:r.name)??null)},Z=(s,r)=>{const o=x.find(a=>a.id==s.id);o&&y(d.map(a=>{if(a.id===s.id){let c=a.quantity+r;return c=Math.min(c,o.stock_quantity),c=Math.max(c,0),{...a,quantity:c}}return a}).filter(a=>a.quantity>0))},D=s=>{const r=d.find(o=>o.id===s.id);y(r?d.map(o=>o.id===s.id?{...o,quantity:Math.min(o.quantity+1,s.stock_quantity)}:o):[...d,{id:s.id,product_name:s.name,price:s.price,unit:s.unit,quantity:1,total_price:s.price,photos:s.photos}])},ee=s=>{y(d.filter(r=>r.id!==s.id))};l.useEffect(()=>{const s=d.reduce((o,a)=>o+a.price*a.quantity,0),r=d.reduce((o,a)=>o+a.quantity,0);n.setValue("total_amount",s),R(s),A(r)},[d,n.setValue]),l.useEffect(()=>{if(!t){const s=localStorage.getItem("selectedItems"),r=localStorage.getItem("formData"),o=localStorage.getItem("paymentMethodName");if(s){const c=JSON.parse(s).filter(b=>x.some(m=>m.id===b.id));y(c)}if(r){const a=JSON.parse(r);a.order_date&&(a.order_date=new Date(a.order_date)),n.reset(a)}o&&_(JSON.parse(o)??null)}},[]),l.useEffect(()=>{t||(localStorage.setItem("selectedItems",JSON.stringify(d)),localStorage.setItem("formData",JSON.stringify(C)),localStorage.setItem("paymentMethodName",JSON.stringify(P)))},[d,C]);const se=Object.keys(v).every(s=>{const r=v[s],o=C[s];return r instanceof Date&&o instanceof Date?r.toDateString()===o.toDateString():o===r}),te=()=>{n.reset(v),_("")};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(ie,{title:G,description:K}),e.jsx(S,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]}),e.jsx(Ne,{searchTerm:T,setSearchTerm:$,filteredProducts:z,addItem:D}),e.jsx(ge,{...n,children:e.jsx("form",{onSubmit:n.handleSubmit(X),className:"w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",children:e.jsxs("div",{className:"grid w-full grid-cols-1 gap-4 md:gap-20 md:grid-cols-2",children:[e.jsx(be,{products:x,selectedItems:d,setSelectedItems:y,adjustQuantity:Z,removeItem:ee,totalItems:H,form:n}),e.jsxs("div",{className:"flex flex-col w-full gap-4",children:[e.jsxs("div",{className:"flex items-baseline justify-between",children:[e.jsx("h1",{className:"text-lg font-bold ",children:"Form Checkout"}),e.jsx(S,{type:"button",size:"sm",variant:"outline",onClick:()=>te(),className:`${se?"hidden":""} text-white bg-red-500 hover:bg-red-500 hover:text-white hover:opacity-85`,children:"Clear Form"})]}),e.jsx(pe,{className:"bg-slate-300 dark:bg-slate-700"}),e.jsx(g,{control:n.control,name:"customer_name",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsxs(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:["Customer name",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(h,{children:e.jsx(w,{className:"dark:bg-slate-700",disabled:f,placeholder:"Kevin Diks",...s})}),e.jsx(j,{className:"dark:text-red-500"})]})}),e.jsx(g,{control:n.control,name:"notes",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsx(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:"Notes"}),e.jsx(h,{children:e.jsx(je,{className:"w-full h-32 max-w-lg max-h-40 dark:bg-slate-700",disabled:f,placeholder:".....",...s})}),e.jsx(j,{className:"dark:text-red-500"})]})}),e.jsx(g,{control:n.control,name:"order_date",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsx(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:"Order Date"}),e.jsx(h,{children:e.jsxs(ae,{children:[e.jsx(ne,{asChild:!0,children:e.jsxs(S,{variant:"outline",className:ye("w-full justify-start gap-3 p-5 text-left font-normal dark:bg-slate-600 dark:hover:bg-slate-600",!s.value&&"text-muted-foreground"),children:[e.jsx(de,{}),s.value?_e(s.value,"PPP"):e.jsx("span",{children:"Pick a date"})]})}),e.jsx(ce,{className:"w-auto p-0",children:e.jsx(me,{mode:"single",selected:s.value,onSelect:s.onChange,initialFocus:!0})})]})}),e.jsx(j,{className:"dark:text-red-500"})]})}),e.jsx("div",{className:"hidden",children:e.jsx(g,{control:n.control,name:"total_amount",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsx(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:"Total amount"}),e.jsx(h,{children:e.jsx(w,{className:"dark:bg-slate-700",type:"number",disabled:!0,...s})}),e.jsx(j,{className:"dark:text-red-500"})]})})}),e.jsx(g,{control:n.control,name:"payment_method_id",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsxs(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:["Payment method",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsxs(E,{disabled:f,onValueChange:o=>{s.onChange(o),Y(o)},value:s.value.toString(),defaultValue:s.value.toString(),children:[e.jsx(h,{className:"dark:bg-slate-700",children:e.jsx(M,{className:"w-full",children:e.jsx(B,{defaultValue:s.value.toString(),placeholder:"Select a payment method"})})}),e.jsx(J,{children:u.filter(o=>o.status).map(o=>e.jsxs(k,{value:o.id.toString(),children:[o.name,o.name=="Cash"?"":` - ${o.bank_name}`]},o.id.toString()))})]}),e.jsx(j,{className:"dark:text-red-500"})]})}),(()=>{switch(P){case"Cash":return e.jsx(g,{control:n.control,name:"changes",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsx(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:"Changes"}),e.jsx(h,{children:e.jsx(w,{className:"dark:bg-slate-700",type:"number",disabled:f,...s})}),e.jsx(j,{className:"dark:text-red-500"})]})});case"QRIS":return e.jsxs(e.Fragment,{children:[e.jsx(S,{onClick:()=>V(!0),type:"button",variant:"outline",className:"text-white bg-sky-500 hover:bg-sky-500 hover:text-white hover:opacity-85",children:"Show QR code"}),e.jsx(ke,{paymentMethodId:n.getValues("payment_method_id"),paymentMethods:u,isVisible:Q,onClose:()=>V(!1)})]});case"Bank Transfer":return e.jsx(Se,{paymentMethodId:n.getValues("payment_method_id"),paymentMethods:u});default:return null}})(),e.jsx(g,{control:n.control,name:"status",render:({field:s,fieldState:r})=>e.jsxs(i,{children:[e.jsxs(p,{className:r.error?"text-red-500":"dark:text-gray-300",children:["Payment Status",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(h,{children:e.jsxs(E,{disabled:f,onValueChange:s.onChange,value:s.value,defaultValue:"completed",children:[e.jsx(h,{className:"dark:bg-slate-700",children:e.jsx(M,{className:"w-full",children:e.jsx(B,{defaultValue:s.value,placeholder:"Select a payment status"})})}),e.jsxs(J,{children:[e.jsx(k,{value:"Paid",children:"Paid"}),e.jsx(k,{value:"Pending",children:"Pending"}),e.jsx(k,{value:"Cancelled",children:"Cancelled"})]})]})}),e.jsx(j,{className:"dark:text-red-500"})]})}),e.jsx(S,{disabled:f,className:"w-full mt-6",type:"submit",children:W})]})]})})})]})};export{es as OrderForm};
