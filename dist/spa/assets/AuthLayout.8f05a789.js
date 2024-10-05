import{Q as O}from"./QImg.f991f149.js";import{e as M,Q as T,a as B,b as H,c as U,d as j}from"./QLayout.ec9ef037.js";import{m as D,i as K,P as y,r as w,L as X,c as i,w as f,I as E,a0 as G,h as b,U as J,g as W,d as Y,t as Z,u as F,v as k,x as s,f as a,y as p,A as _,Q as ee,C as te,B as h,aO as L,aN as x}from"./index.2539991c.js";var oe=D({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(o,{slots:g,emit:v}){const{proxy:{$q:c}}=W(),t=K(J,y);if(t===y)return console.error("QFooter needs to be child of QLayout"),y;const n=w(parseInt(o.heightHint,10)),u=w(!0),Q=w(X.value===!0||t.isContainer.value===!0?0:window.innerHeight),m=i(()=>o.reveal===!0||t.view.value.indexOf("F")>-1||c.platform.is.ios&&t.isContainer.value===!0),q=i(()=>t.isContainer.value===!0?t.containerHeight.value:Q.value),C=i(()=>{if(o.modelValue!==!0)return 0;if(m.value===!0)return u.value===!0?n.value:0;const e=t.scroll.value.position+q.value+n.value-t.height.value;return e>0?e:0}),z=i(()=>o.modelValue!==!0||m.value===!0&&u.value!==!0),R=i(()=>o.modelValue===!0&&z.value===!0&&o.reveal===!0),$=i(()=>"q-footer q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-bottom"+(o.bordered===!0?" q-footer--bordered":"")+(z.value===!0?" q-footer--hidden":"")+(o.modelValue!==!0?" q-layout--prevent-focus"+(m.value!==!0?" hidden":""):"")),I=i(()=>{const e=t.rows.value.bottom,r={};return e[0]==="l"&&t.left.space===!0&&(r[c.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),e[2]==="r"&&t.right.space===!0&&(r[c.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),r});function l(e,r){t.update("footer",e,r)}function d(e,r){e.value!==r&&(e.value=r)}function P({height:e}){d(n,e),l("size",e)}function S(){if(o.reveal!==!0)return;const{direction:e,position:r,inflectionPoint:N}=t.scroll.value;d(u,e==="up"||r-N<100||t.height.value-q.value-r-n.value<300)}function A(e){R.value===!0&&d(u,!0),v("focusin",e)}f(()=>o.modelValue,e=>{l("space",e),d(u,!0),t.animate()}),f(C,e=>{l("offset",e)}),f(()=>o.reveal,e=>{e===!1&&d(u,o.modelValue)}),f(u,e=>{t.animate(),v("reveal",e)}),f([n,t.scroll,t.height],S),f(()=>c.screen.height,e=>{t.isContainer.value!==!0&&d(Q,e)});const V={};return t.instances.footer=V,o.modelValue===!0&&l("size",n.value),l("space",o.modelValue),l("offset",C.value),E(()=>{t.instances.footer===V&&(t.instances.footer=void 0,l("size",0),l("offset",0),l("space",!1))}),()=>{const e=G(g.default,[b(M,{debounce:0,onResize:P})]);return o.elevated===!0&&e.push(b("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),b("footer",{class:$.value,style:I.value,onFocusin:A},e)}}});const ae={class:"q-mr-lg"},re=_("div",null,"\xA9",-1),le=_("div",null,"Starling",-1),se={class:"flex row flex-center q-mb-sm",style:{width:"8rem"}},ce=Y({__name:"AuthLayout",setup(o){function g(){}function v(){}return(c,t)=>{const n=Z("router-view");return F(),k(T,{view:"hHh lpR fFf"},{default:s(()=>[a(U,{class:"bg-white text-white",bordered:"",style:{"border-bottom-style":"solid","border-bottom-width":"0.2rem"}},{default:s(()=>[a(B,null,{default:s(()=>[p((F(),k(H,{class:"q-mt-sm cursor-pointer"},{default:s(()=>[a(O,{height:"8rem",width:"10rem",fit:"cover",src:"/assets/starglings_logo_bird_text 2_xpoint5.png"})]),_:1})),[[x]]),_("div",ae,[a(ee,{class:"flex row justify-between",style:te({border:`${c.$getColor("primary")} solid 0.1px`}),color:"white",flat:"",outline:"",size:"1.4rem",rounded:"",ripple:!1},{default:s(()=>[p(a(h,{class:"q-mr-md",color:"dark",name:"menu",onClick:L(g,["self"])},null,512),[[x]]),p(a(h,{color:"dark",name:"account_circle",onClick:L(v,["self"])},null,512),[[x,void 0,void 0,{center:!0}]])]),_:1},8,["style"])])]),_:1})]),_:1}),a(j,{class:"alegreya q-pa-xl"},{default:s(()=>[a(n)]),_:1}),a(oe,{bordered:"",class:"bg-white text-black"},{default:s(()=>[a(B,{class:"items-center"},{default:s(()=>[a(H,{class:"flex row q-gutter-sm text-caption cursor-pointer"},{default:s(()=>[re,le]),_:1}),_("div",se,[a(h,{class:"q-mt-md cursor-pointer",size:"3rem",name:"instagram",color:"secondary"}),a(h,{class:"cursor-pointer",size:"3rem",name:"X",color:"secondary"})])]),_:1})]),_:1})]),_:1})}}});export{ce as default};