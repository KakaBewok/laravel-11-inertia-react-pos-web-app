const a=async(e,o,s)=>{const t=await(await fetch(e)).blob();return new File([t],o,{type:s})};export{a as u};
