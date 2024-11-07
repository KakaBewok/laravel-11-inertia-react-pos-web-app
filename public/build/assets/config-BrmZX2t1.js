const t=async(e,s,a)=>{const n=await(await fetch(e)).blob();return new File([n],s,{type:a})},i=300,p=["image/jpeg","image/jpg","image/png","image/webp"];export{p as A,i as M,t as u};
