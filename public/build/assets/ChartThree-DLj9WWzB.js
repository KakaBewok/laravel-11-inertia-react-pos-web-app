import{r as l,j as e}from"./app-zU8qvRoH.js";import{R as a}from"./react-apexcharts.min-CVlhFZ_S.js";const t={chart:{fontFamily:"Satoshi, sans-serif",type:"donut"},colors:["#3C50E0","#6577F3","#8FD0EF","#0FADCF"],labels:["Desktop","Tablet","Mobile","Unknown"],legend:{show:!1,position:"bottom"},plotOptions:{pie:{donut:{size:"65%",background:"transparent"}}},dataLabels:{enabled:!1},responsive:[{breakpoint:2600,options:{chart:{width:380}}},{breakpoint:640,options:{chart:{width:200}}}]},d=()=>{const[s,n]=l.useState({series:[65,34,12,56]});return e.jsxs("div",{className:"sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5",children:[e.jsxs("div",{className:"justify-between gap-4 mb-3 sm:flex",children:[e.jsx("div",{children:e.jsx("h5",{className:"text-xl font-semibold text-black dark:text-white",children:"Visitors Analytics"})}),e.jsx("div",{children:e.jsxs("div",{className:"relative z-20 inline-block",children:[e.jsxs("select",{name:"",id:"",className:"relative z-20 inline-flex py-1 pl-3 pr-8 text-sm font-medium bg-transparent outline-none appearance-none",children:[e.jsx("option",{value:"",className:"dark:bg-boxdark",children:"Monthly"}),e.jsx("option",{value:"",className:"dark:bg-boxdark",children:"Yearly"})]}),e.jsx("span",{className:"absolute z-10 -translate-y-1/2 right-3 top-1/2",children:e.jsxs("svg",{width:"10",height:"6",viewBox:"0 0 10 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z",fill:"#637381"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z",fill:"#637381"})]})})]})})]}),e.jsx("div",{className:"mb-2",children:e.jsx("div",{id:"chartThree",className:"flex justify-center mx-auto",children:e.jsx(a,{options:t,series:s.series,type:"donut"})})}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center -mx-8 gap-y-3",children:[e.jsx("div",{className:"w-full px-8 sm:w-1/2",children:e.jsxs("div",{className:"flex items-center w-full",children:[e.jsx("span",{className:"block w-full h-3 mr-2 rounded-full max-w-3 bg-primary"}),e.jsxs("p",{className:"flex justify-between w-full text-sm font-medium text-black dark:text-white",children:[e.jsx("span",{children:" Desktop "}),e.jsx("span",{children:" 65% "})]})]})}),e.jsx("div",{className:"w-full px-8 sm:w-1/2",children:e.jsxs("div",{className:"flex items-center w-full",children:[e.jsx("span",{className:"mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"}),e.jsxs("p",{className:"flex justify-between w-full text-sm font-medium text-black dark:text-white",children:[e.jsx("span",{children:" Tablet "}),e.jsx("span",{children:" 34% "})]})]})}),e.jsx("div",{className:"w-full px-8 sm:w-1/2",children:e.jsxs("div",{className:"flex items-center w-full",children:[e.jsx("span",{className:"mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"}),e.jsxs("p",{className:"flex justify-between w-full text-sm font-medium text-black dark:text-white",children:[e.jsx("span",{children:" Mobile "}),e.jsx("span",{children:" 45% "})]})]})}),e.jsx("div",{className:"w-full px-8 sm:w-1/2",children:e.jsxs("div",{className:"flex items-center w-full",children:[e.jsx("span",{className:"mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"}),e.jsxs("p",{className:"flex justify-between w-full text-sm font-medium text-black dark:text-white",children:[e.jsx("span",{children:" Unknown "}),e.jsx("span",{children:" 12% "})]})]})})]})]})};export{d as default};
