function h(e,t){var a,c,u,l;const r=t.split(".");if(r.length>1){const o=r[0];let s;for(const d of e.errors||[])if(d.property===o&&(s=(a=d.children)==null?void 0:a.find(g=>g.property===r[1]),s))break;const f=((c=Object.values((s==null?void 0:s.constraints)||{}))==null?void 0:c.pop())||"";return f===""?!0:f}const n=(u=e.errors)==null?void 0:u.find(o=>o.property===t),i=((l=Object.values((n==null?void 0:n.constraints)||{}))==null?void 0:l.pop())||"";return i===""?!0:i}function y(){let e=0;if(document&&window){const t=document.getElementsByTagName("*");for(let r=0;r<t.length;r++){const n=parseInt(window.getComputedStyle(t[r]).zIndex);n&&n>e&&(e=n)}}return e}function m({loader:e,timer:t,requestProcessingRef:r}={}){e&&e.hide(),t&&clearTimeout(t),r&&(r.value=!1)}function I(e){var t;return!((t=e.errors)!=null&&t.length)}function b(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function j(e){let t="";return!e||e===null||Object.keys(e).length===0?"":(t=Object.entries(e).reduce((r,[n,i])=>(r!==""&&(r+="&"),r+=`${n}=${i}`,r),""),t)}function x(e){return`${e.property} is required.`}export{x as G,j as a,m as c,y as g,I as i,b as t,h as v};
