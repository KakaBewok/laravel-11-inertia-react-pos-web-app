import{r as m,j as e,y as R}from"./app-vVRCAGOW.js";import{B as L}from"./button-cqbvmE_O.js";import{o as J,s as I,i as $,j as H,k as U,u as D,t as ee,F as se,a as v,b as w,c as _,l as O,d as C,e as S,T as re}from"./index-CY1qIC-V.js";import{H as oe}from"./heading-w8uDzKiO.js";import{I as T}from"./input-DGDJBCOL.js";import{b as te,c as ne}from"./index-Ba5YF6YM.js";import{u as ce}from"./index-MU7vlc2G.js";import{u as ae}from"./index-CGT5Zpqz.js";import{u as de}from"./index-CvUxNp2A.js";import{P as z}from"./index-GR9MXyJ6.js";import{c as Q}from"./utils-CcFn7B-c.js";import{u as le}from"./useGlobalContext-WqwPRLsa.js";import{A as V,M as F,u as me}from"./config-BrmZX2t1.js";import{B as ue}from"./react-toastify.esm-CR37Gj2I.js";import"./clsx-B-dksMZM.js";function ie(s,i=[]){let o=[];function g(u,a){const t=m.createContext(a),h=o.length;o=[...o,a];const k=x=>{var r;const{scope:p,children:d,...j}=x,b=((r=p==null?void 0:p[s])==null?void 0:r[h])||t,N=m.useMemo(()=>j,Object.values(j));return e.jsx(b.Provider,{value:N,children:d})};k.displayName=u+"Provider";function y(x,p){var b;const d=((b=p==null?void 0:p[s])==null?void 0:b[h])||t,j=m.useContext(d);if(j)return j;if(a!==void 0)return a;throw new Error(`\`${x}\` must be used within \`${u}\``)}return[k,y]}const l=()=>{const u=o.map(a=>m.createContext(a));return function(t){const h=(t==null?void 0:t[s])||u;return m.useMemo(()=>({[`__scope${s}`]:{...t,[s]:h}}),[t,h])}};return l.scopeName=s,[g,he(l,...i)]}function he(...s){const i=s[0];if(s.length===1)return i;const o=()=>{const g=s.map(l=>({useScope:l(),scopeName:l.scopeName}));return function(u){const a=g.reduce((t,{useScope:h,scopeName:k})=>{const x=h(u)[`__scope${k}`];return{...t,...x}},{});return m.useMemo(()=>({[`__scope${i.scopeName}`]:a}),[a])}};return o.scopeName=i.scopeName,o}var M="Switch",[pe,qe]=ie(M),[ge,fe]=pe(M),K=m.forwardRef((s,i)=>{const{__scopeSwitch:o,name:g,checked:l,defaultChecked:u,required:a,disabled:t,value:h="on",onCheckedChange:k,form:y,...x}=s,[p,d]=m.useState(null),j=ce(i,c=>d(c)),b=m.useRef(!1),N=p?y||!!p.closest("form"):!0,[r=!1,n]=te({prop:l,defaultProp:u,onChange:k});return e.jsxs(ge,{scope:o,checked:r,disabled:t,children:[e.jsx(z.button,{type:"button",role:"switch","aria-checked":r,"aria-required":a,"data-state":W(r),"data-disabled":t?"":void 0,disabled:t,value:h,...x,ref:j,onClick:ne(s.onClick,c=>{n(f=>!f),N&&(b.current=c.isPropagationStopped(),b.current||c.stopPropagation())})}),N&&e.jsx(xe,{control:p,bubbles:!b.current,name:g,value:h,checked:r,required:a,disabled:t,form:y,style:{transform:"translateX(-100%)"}})]})});K.displayName=M;var G="SwitchThumb",X=m.forwardRef((s,i)=>{const{__scopeSwitch:o,...g}=s,l=fe(G,o);return e.jsx(z.span,{"data-state":W(l.checked),"data-disabled":l.disabled?"":void 0,...g,ref:i})});X.displayName=G;var xe=s=>{const{control:i,checked:o,bubbles:g=!0,...l}=s,u=m.useRef(null),a=ae(o),t=de(i);return m.useEffect(()=>{const h=u.current,k=window.HTMLInputElement.prototype,x=Object.getOwnPropertyDescriptor(k,"checked").set;if(a!==o&&x){const p=new Event("click",{bubbles:g});x.call(h,o),h.dispatchEvent(p)}},[a,o,g]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:o,...l,tabIndex:-1,ref:u,style:{...s.style,...t,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function W(s){return s?"checked":"unchecked"}var Y=K,be=X;const q=m.forwardRef(({className:s,...i},o)=>e.jsx(Y,{className:Q("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50","dark:data-[state=checked]:bg-slate-50 data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-input","dark:bg-slate-600",s),...i,ref:o,children:e.jsx(be,{className:Q("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")})}));q.displayName=Y.displayName;const ke=J({name:I().min(3,{message:"Name must contain at least 3 character(s)"}),bank_name:I().min(3,{message:"Bank name must contain at least 3 character(s)"}),status:$({required_error:"Status is required",invalid_type_error:"Status must be a boolean"}),is_cash:$({required_error:"Is cash is required",invalid_type_error:"Is cash must be a boolean"}),description:I().optional(),bank_logo:H([U(File).refine(s=>V.includes(s.type),{message:"Bank logo must be jpg, jpeg, png or webp formats"}).refine(s=>s.size<=F*1024,{message:`Bank logo is more than ${F}KB`}),I()]).optional(),qris_image:H([U(File).refine(s=>V.includes(s.type),{message:"QRIS Image must be jpg, jpeg, png or webp formats"}).refine(s=>s.size<=F*1024,{message:`QRIS Image is more than ${F}KB`}),I()]).optional()}),Me=({initialData:s})=>{const[i,o]=m.useState(),[g,l]=m.useState(),u=m.useRef(null),a=m.useRef(null),{loading:t,setLoading:h}=le(),k=s?"Edit payment method":"Create payment method",y=s?"Edit a payment method":"Add a new payment method",x=s?"Payment method updated.":"Payment method created.",p=s?"Save changes":"Create",d=D({resolver:ee(ke),defaultValues:{name:(s==null?void 0:s.name)||"",bank_name:(s==null?void 0:s.bank_name)||"",description:(s==null?void 0:s.description)||"",status:(s==null?void 0:s.status)||!1,is_cash:(s==null?void 0:s.is_cash)||!1,bank_logo:s==null?void 0:s.bank_logo,qris_image:s==null?void 0:s.qris_image}});m.useEffect(()=>{(async()=>{var c;const n=[{key:"bank_logo",ref:u,setFile:o},{key:"qris_image",ref:a,setFile:l}];if(s!=null&&s.bank_logo||s!=null&&s.qris_image)for(const f of n){const P=s==null?void 0:s[f.key];if(P){const E=Math.floor(Math.random()*9e4)+1e4,Z=`undefined/storage/${P}`,B=await me(Z,`${f.key}-${E}.jpg`,"image/jpeg");f.setFile(B);const A=new DataTransfer;A.items.add(B),(c=f.ref)!=null&&c.current&&(f.ref.current.files=A.files),d.setValue(f.key,B)}}})()},[s,d]);const j=(r,n)=>{if(r.target.files&&r.target.files.length){const c=r.target.files[0];n==="bank_logo"?(o(c),d.setValue("bank_logo",c)):n==="qris_image"&&(l(c),d.setValue("qris_image",c))}},b=r=>{const c=[{key:"bank_logo",ref:u,setFile:o},{key:"qris_image",ref:a,setFile:l}].find(f=>f.key===r);c&&(c!=null&&c.ref.current)&&(c.setFile(void 0),c.ref.current.value="",d.setValue(c.key,void 0))},N=r=>{h(!0),console.log(r);const n=()=>{d.reset(),o(void 0),l(void 0),u.current&&a.current&&(u.current.value="",a.current.value="")},c=()=>{n(),R.visit(route("admin.payment_method.index")),setTimeout(()=>{ue.success(x,{position:"top-center"})},1e3)},f=E=>{console.log("An error occurred: ",E)},P=()=>h(!1);s?R.post(route("admin.payment_method.update",s==null?void 0:s.id),{...r,_method:"PATCH"},{onSuccess:c,onError:f,onFinish:P}):R.post(route("admin.payment_method.store"),r,{onSuccess:c,onError:f,onFinish:P})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(oe,{title:k,description:y}),e.jsx(L,{variant:"outline",onClick:()=>window.history.back(),className:"dark:bg-slate-200 dark:text-slate-900",children:"Back"})]}),e.jsx(se,{...d,children:e.jsxs("form",{onSubmit:d.handleSubmit(N),className:"w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2",children:[e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(v,{control:d.control,name:"bank_logo",render:({fieldState:r})=>e.jsxs(w,{children:[e.jsx(_,{className:r.error?"text-red-500":"dark:text-gray-300",children:"Bank Logo"}),e.jsxs(O,{children:["Max. ",F,"KB (jpg, jpeg, png, webp only)."]}),e.jsx(C,{children:e.jsx(T,{className:"w-full md:w-[48%] dark:bg-slate-700",ref:u,type:"file",accept:"image/jpeg, image/png, image/jpg, image/webp",onChange:n=>j(n,"bank_logo")})}),e.jsx(S,{className:"dark:text-red-500"})]})}),i&&e.jsxs("div",{className:"relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52",children:[e.jsx("img",{src:URL.createObjectURL(i),alt:"Bank logo uploaded",className:"object-cover w-full h-full"}),e.jsx("button",{className:"absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2",type:"button",onClick:()=>b("bank_logo"),children:e.jsx("span",{className:"text-xs leading-none",children:"✕"})})]})]}),e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(v,{control:d.control,name:"qris_image",render:({fieldState:r})=>e.jsxs(w,{children:[e.jsx(_,{className:r.error?"text-red-500":"dark:text-gray-300",children:"QRIS image"}),e.jsxs(O,{children:["Max. ",F,"KB (jpg, jpeg, png, webp only)."]}),e.jsx(C,{children:e.jsx(T,{className:"w-full md:w-[48%] dark:bg-slate-700",ref:a,type:"file",accept:"image/jpeg, image/png, image/jpg, image/webp",onChange:n=>j(n,"qris_image")})}),e.jsx(S,{className:"dark:text-red-500"})]})}),g&&e.jsxs("div",{className:"relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52",children:[e.jsx("img",{src:URL.createObjectURL(g),alt:"QRIS image uploaded",className:"object-cover w-full h-full"}),e.jsx("button",{className:"absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2",type:"button",onClick:()=>b("qris_image"),children:e.jsx("span",{className:"text-xs leading-none",children:"✕"})})]})]}),e.jsx(v,{control:d.control,name:"name",render:({field:r,fieldState:n})=>e.jsxs(w,{children:[e.jsx(_,{className:n.error?"text-red-500":"dark:text-gray-300",children:"Name"}),e.jsx(C,{children:e.jsx(T,{className:"dark:bg-slate-700",disabled:t,placeholder:"Bank transfer",...r})}),e.jsx(S,{className:"dark:text-red-500"})]})}),e.jsx(v,{control:d.control,name:"bank_name",render:({field:r,fieldState:n})=>e.jsxs(w,{children:[e.jsx(_,{className:n.error?"text-red-500":"dark:text-gray-300",children:"Bank Name"}),e.jsx(C,{children:e.jsx(T,{className:"dark:bg-slate-700",disabled:t,placeholder:"Bank Central Asia (BCA)",...r})}),e.jsx(S,{className:"dark:text-red-500"})]})}),e.jsx(v,{control:d.control,name:"is_cash",render:({field:r,fieldState:n})=>e.jsxs(w,{children:[e.jsx(_,{className:n.error?"text-red-500":"dark:text-gray-300",children:"Is cash?"}),e.jsx(C,{children:e.jsx("div",{children:e.jsx(q,{checked:r.value,onCheckedChange:r.onChange,disabled:t,"aria-readonly":!0})})}),e.jsx(S,{className:"dark:text-red-500"})]})}),e.jsx(v,{control:d.control,name:"status",render:({field:r,fieldState:n})=>e.jsxs(w,{children:[e.jsx(_,{className:n.error?"text-red-500":"dark:text-gray-300",children:"Active"}),e.jsx(C,{children:e.jsx("div",{children:e.jsx(q,{checked:r.value,onCheckedChange:r.onChange,disabled:t,"aria-readonly":!0})})}),e.jsx(S,{className:"dark:text-red-500"})]})}),e.jsx(v,{control:d.control,name:"description",render:({field:r,fieldState:n})=>e.jsxs(w,{children:[e.jsx(_,{className:n.error?"text-red-500":"dark:text-gray-300",children:"Description"}),e.jsx(C,{children:e.jsx(re,{className:"w-full h-32 max-w-lg max-h-40 dark:bg-slate-700",disabled:t,placeholder:"Account number: 0894387263",...r})}),e.jsx(S,{className:"dark:text-red-500"})]})})]}),e.jsx(L,{disabled:t,className:"w-full lg:w-1/2",type:"submit",children:p})]})})]})};export{Me as PaymentMethodForm};
