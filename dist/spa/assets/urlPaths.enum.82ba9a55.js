let a,r=0;const s=new Array(256);for(let e=0;e<256;e++)s[e]=(e+256).toString(16).substring(1);const d=(()=>{const e=typeof crypto<"u"?crypto:typeof window<"u"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return i=>{const t=new Uint8Array(i);return e.getRandomValues(t),t}}return i=>{const t=[];for(let n=i;n>0;n--)t.push(Math.floor(Math.random()*256));return t}})(),c=4096;function I(){(a===void 0||r+16>c)&&(r=0,a=d(c));const e=Array.prototype.slice.call(a,r,r+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,s[e[0]]+s[e[1]]+s[e[2]]+s[e[3]]+"-"+s[e[4]]+s[e[5]]+"-"+s[e[6]]+s[e[7]]+"-"+s[e[8]]+s[e[9]]+"-"+s[e[10]]+s[e[11]]+s[e[12]]+s[e[13]]+s[e[14]]+s[e[15]]}const o="/auth";var f=(e=>(e[e.SIGNUP=o+"/signup"]="SIGNUP",e[e.SIGNIN=o+"/signin"]="SIGNIN",e[e.VERIFY=o+"/verify"]="VERIFY",e[e.RESEND_TOKEN=`${o}/resend-token`]="RESEND_TOKEN",e[e.USER=`${o}/user`]="USER",e))(f||{}),y=(e=>(e.GET_SERVICES="/services",e.Get_SUITES="/services/suites",e.GET_SUITE_DETAILS="/services/suites/:suiteId",e.GET_CATEGORIES="/services/suites/categories",e.GET_OFFERS="/services/offers",e))(y||{}),E=(e=>(e.PROCESS_BOOKING="/service-bookings/process",e.GET_PAYMENT_REFERENCE="/service-bookings/payment-reference",e.GET_BOOKINGS="/service-bookings",e.GET_PAYSTACK_PUBLIC_KEY="/service-bookings/paystack-public-key",e.GET_DOLLAR_RATE="/service-bookings/dollar-rate",e))(E||{});export{f as A,E as B,y as S,I as u};
