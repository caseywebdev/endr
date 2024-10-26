"use strict";(()=>{var{console:$e,document:pe,queueMicrotask:Fe,Text:We}=globalThis,b=(e,t=be,r)=>({type:e,props:t,key:r}),D=b;var he=e=>e.children,G=e=>e.children,ye=e=>(C.catch=e.catch,e.children),ge=()=>{let e=({value:t,children:r})=>{let n=C,s=k(()=>{let p={deps:new Set,value:t};return n.contexts=new Map(n.contexts).set(e,p),p});if(t!==s.value){s.value=t;for(let p of s.deps){p.state=1;let{parent:o}=p;for(;o&&o!==n&&!o.state;)o.state=2,{parent:o}=o}}return r};return e},me=e=>e==null||e===!1||e==="",be={},we={},Oe=b(we,be),ve={},Be=[],He="http://www.w3.org/2000/svg",_e=e=>$e.error(e),qe=(e,t,r)=>{if(typeof e=="function"||e===we)return null;if(e===ve)return pe.createTextNode(t.nodeValue);let n=pe.createElementNS(e==="svg"?He:r.namespaceURI,e);return Ee(n,{},t),n},de=(e,t)=>t in e&&(e[t]==null||typeof e[t]!="object"),Xe=(e,t,r)=>{for(let n in t)n in r||(e[n]="");for(let n in r)e[n]=r[n]??""},Ee=(e,t,r)=>{if(e instanceof We){e.nodeValue=r.nodeValue;return}for(let n in t)n==="children"||n in r||(n==="ref"?t.ref&&(t.ref.current=null):de(e,n)?e[n]="":e.removeAttribute(n));for(let n in r)n==="children"||t[n]===r[n]||(n==="ref"?(t.ref&&(t.ref.current=null),r.ref&&(r.ref.current=e)):n==="style"&&r[n]&&typeof r[n]=="object"?Xe(e.style,t[n]&&typeof t[n]=="object"?t[n]:{},r[n]):de(e,n)?e[n]=r[n]??"":r[n]!=null?e.setAttribute(n,r[n]):e.removeAttribute(n))},C=null,_=0,q=0,L=e=>{let t=C;t.refs??=[];let r=t.refs[q++];return r||(r={current:e},t.refs.push(r)),r},T=(e,t)=>{let r=C;r.effects??=[];let n=r.effects[_++];n?(!n.deps||!t||Ce(n.deps,t))&&(n.after=e,n.deps=t):r.effects.push({before:void 0,after:e,deps:t})},k=(e,t=Be)=>{let r=L(null);return r.current?Ce(r.current.deps,t)&&(r.current.value=e(),r.current.deps=t):r.current={value:e(),deps:t},r.current.value},K=e=>{let t=C,r=k(()=>[e,Object.defineProperty(n=>(n!==r[0]&&(r[0]=n,Je(t)),n),"getCurrent",{value:()=>r[0],writable:!1})]);return r},Ce=(e,t)=>{let{length:r}=e;if(r!==t.length)return!0;for(;r--;)if(e[r]!==t[r])return!0;return!1},V=e=>{let t=L(e);return t.current=e,k(()=>(...r)=>t.current(...r))},Ye=(e,t)=>{if(e===t)return!0;for(let r in e)if(e[r]!==t[r])return!1;for(let r in t)if(!(r in e))return!1;return!0},te=(e,t=Ye)=>(e.memo=t,e),re=e=>{let t=C,r=t.contexts?.get(e);return T(()=>{if(r)return r.deps.add(t),()=>r.deps.delete(t)},[r,t]),r?.value},Ge=(e,t)=>{for(;e.depth>t.depth;)if(e=e.parent,e===t)return 1;for(;t.depth>e.depth;)if(t=t.parent,t===e)return-1;for(;e.parent!==t.parent;)e=e.parent,t=t.parent;return e.index-t.index},Je=e=>{if(e.state===1||e.state===3)return;let{queues:t}=e,{updates:r}=t;r.length===0&&Fe(()=>{let n=r.sort(Ge);t.updates=[];for(let s=0;s<n.length;++s){let p=n[s];p.state===1&&Y(p)}X(t)}),r.push(e),e.state=1},Qe=e=>{let{children:t}=e.props;if(typeof e.type=="function"){let r=[C,_,q];C=e,_=0,q=0;try{t=e.type(e.props)}catch(n){t=null,e.catch(n)}finally{[C,_,q]=r}}return me(t)?[]:Array.isArray(t)?t:[t]},Ze=e=>me(e)?Oe:Array.isArray(e)?b(he,{children:e}):e&&typeof e=="object"&&Object.keys(e).length===3&&"type"in e&&(typeof e.type=="string"||typeof e.type=="function")&&"props"in e&&e.props&&typeof e.props=="object"&&"key"in e?e:b(ve,{nodeValue:e}),Se=e=>{let{child:t,state:r}=e;if(r===1)Y(e);else if(r===2)for(e.state=0;t;t=t.sibling)Se(t)},ee=({child:e,node:t})=>{if(t)return[t];let r=[];for(;e;e=e.sibling)r.push(...ee(e));return r},Y=e=>{let{depth:t,queues:r}=e,{afterEffects:n,inserts:s,moves:p,nodeUpdates:o}=r;if(e.effects)try{for(let l=0;l<e.effects.length;++l){let f=e.effects[l];f.after&&f.before&&(f.before(),f.before=void 0)}}catch(l){e.catch(l)}let i=e.child,d=i&&new Map;for(;i;i=i.sibling)d.set(i.key??i.index,i);let y=e.node??e.parentNode,h=Qe(e);e.state=0,e.child=null;let M=e.node?null:e.prevNode;for(let l=0,f=null;l<h.length;++l){let{type:u,props:a,key:w}=Ze(h[l]),c=d?.get(w??l),R=!1,E=null,v=!1;if(c?.type===u)d.delete(w??l),c.index=l,c.sibling=null,(typeof c.type!="function"||!c.type.memo?.(c.props,a))&&(c.node&&(E=[c.node,c.props,a]),c.props=a,c.state=1),c.parentNode===y&&c.lastNode&&M!==c.prevNode&&(R=!0);else{try{c={catch:e.catch,child:null,contexts:e.contexts,depth:t+1,effects:null,index:l,key:w,lastNode:null,node:qe(u,a,y),parent:e,props:a,queues:r,refs:null,sibling:null,state:1,type:u,...u===G?{parentNode:a.to,prevNode:a.to.lastChild}:{parentNode:y,prevNode:M}}}catch(g){e.catch(g);continue}c.node&&(v=!0)}c.parentNode===y&&(c.prevNode=M),f?f.sibling=c:e.child=c,Se(c),R&&p.push(c),E&&o.push(E),v&&s.push(c),c.parentNode===y&&c.lastNode&&(M=c.lastNode),f=c}if(e.lastNode=e.node??M??null,d)for(let l of d.values())ne(l);e.effects&&n.push(e)},ne=(e,t=!0)=>{e.state=3;let{effects:r,child:n,node:s}=e;if(r)try{for(let o=0;o<r.length;++o){let i=r[o];i.before&&(i.before(),i.before=void 0)}}catch(o){e.catch(o)}let p=t&&!s;for(;n;n=n.sibling)ne(n,p||n.type===G);t&&s&&e.queues.removes.unshift(s)},X=e=>{let{afterEffects:t,inserts:r,moves:n,nodeUpdates:s,removes:p}=e;for(let o=p.length-1;o>=0;--o)p[o].remove();e.removes=[];for(let o=0;o<n.length;++o){let i=n[o],{parentNode:d,prevNode:y}=i;y?y.after(...ee(i)):d.prepend(...ee(i))}e.moves=[];for(let o=0;o<s.length;++o)Ee(...s[o]);e.nodeUpdates=[];for(let o=0;o<r.length;++o){let{node:i,parentNode:d,prevNode:y}=r[o];y?y.after(i):d.prepend(i)}e.inserts=[];for(let o=0;o<t.length;++o){let i=t[o],d=i.effects;try{for(let y=0;y<d.length;++y){let h=d[y];h.after&&(h.before=h.after(),h.after=void 0)}}catch(y){i.catch(y)}}e.afterEffects=[]},Ne=e=>{let t={afterEffects:[],inserts:[],moves:[],nodeUpdates:[],removes:[],updates:[]},r={catch:_e,child:null,contexts:null,depth:0,effects:null,index:0,key:void 0,lastNode:null,node:null,parent:null,parentNode:e,prevNode:e.lastChild,props:{},queues:t,refs:null,sibling:null,state:1,type:he};return Y(r),X(t),{render:n=>{r.props={children:n},Y(r),X(t)},unmount:()=>{ne(r),X(t)}}};var{document:P,getComputedStyle:Ie,Document:ke,ResizeObserver:Me,window:Re,Window:et}=globalThis,{body:Te}=P,tt=P.scrollingElement,$=Re.visualViewport??Re,rt=10,nt={x:"clientWidth",y:"clientHeight"},ot={x:"innerWidth",y:"innerHeight"},st={x:"overflowX",y:"overflowY"},oe={x:"right",y:"bottom"},Pe={x:"width",y:"height"},ct={x:"scrollWidth",y:"scrollHeight"},lt={x:"scrollLeft",y:"scrollTop"},it=({axis:e,el:t})=>{for(;(t&&=t.parentElement)&&!(t===Te||!Te.contains(t));){if(t[ct[e]]<=t[nt[e]])continue;let r=Ie(t)[st[e]];if(r==="scroll"||r==="auto")return t}return P},je=({axis:e="y",containerRef:t,growBuffer:r=200,length:n=0,minIndex:s=0,shrinkBuffer:p=r+200})=>{let o=k(()=>({cache:{},columns:1,isRendering:!1,observed:null,observer:null,prev:{cache:{},minIndex:s,start:s},scrollParent:null,scrollTarget:null,syncUpdateCount:0,resolve:()=>{o.scrollTarget=null,o.syncUpdateCount=0}})),i=V(()=>{if(o.isRendering)return;let l=t.current,{end:f,start:u}=h;if(!l||u===f||l.children.length!==f-u)return o.resolve();let{cache:a,prev:w,scrollTarget:c}=o,R=h.start,E=[],v,g=1;for(let m of l.children){let fe=m.getBoundingClientRect(),ae=fe[Pe[e]];a[R++]=ae,E.push(ae);let ue=fe[e];v==null?v=ue:ue===v&&++g}let De=E.sort()[Math.floor(E.length/2)];o.columns=g;let N=it({axis:e,el:l});N!==o.scrollParent&&(o.scrollParent!==P&&o.scrollParent?.removeEventListener("scroll",i),N!==P&&N.addEventListener("scroll",i),o.scrollParent=N);let j=N instanceof ke?tt:N,z=lt[e],J=0,Le=Math.min(w.minIndex,s),Ke=Math.max(w.start,h.start);for(let m=Le;m<Ke;m+=g)J+=(a[m]??0)-(w.cache[m]??0);if(J&&(j[z]+=J),o.prev={cache:{...a},minIndex:s,start:h.start},o.syncUpdateCount++>rt)return o.resolve();let Q=l.getBoundingClientRect(),F=Q[e]+h.before,W=Q[oe[e]]-h.after,ce=N instanceof ke?{[e]:0,[oe[e]]:$ instanceof et?$[ot[e]]:$[Pe[e]]}:N.getBoundingClientRect(),O=ce[e],Z=ce[oe[e]],I=s+n;for(let m=s;m<I;++m)a[m]??=De;u-=(u-s)%g;let le=(f-s)%g;for(le&&(f+=g-le);u-g>=s&&F>O-r;)F-=a[u-g],u-=g;for(;u<I&&F+a[u]<=O-p;)F+=a[u],u+=g;for(;f<I&&W<Z+r;)W+=a[f],f+=g;for(;f-g>=s&&W-a[f-g]>=Z+p;)W-=a[f-g],f-=g;let A=y({end:f,start:u});if(A.after!==h.after||A.before!==h.before||A.end!==h.end||A.start!==h.start)return o.isRendering=!0,M(A);if(!c)return o.resolve();let{index:U}=c;U=Math.min(s+n-1,Math.max(U,s)),U-=(U-s)%g;let ie=0;for(let m=s;m<U;m+=g)ie+=a[m];let B=j[z],Ve=a[U],x=Q[e]+B-O+ie-c.buffer,H=x-(Z-O)+Ve+c.buffer*2;c.align==="nearest"&&(x<H?c.align="center":B>x?c.align="start":B<H&&(c.align="end")),c.align==="start"?j[z]=x:c.align==="end"?j[z]=H:c.align==="center"&&(j[z]=(x+H)/2),j[z]===B?o.resolve():i()}),d=V(({align:l="nearest",buffer:f=0,index:u})=>{o.scrollTarget={align:l,buffer:f,index:u},i()}),y=({end:l,start:f})=>{if(r===1/0)return{after:0,before:0,end:s+n,scrollTo:d,start:s};let{cache:u,columns:a}=o,w=s+n;f-=(f-s)%a,f=Math.min(w,Math.max(f,s));let c=(l-s)%a;c&&(l+=a-c),l=Math.min(w,Math.max(l,f)),l-f<=a&&(l<w?l=Math.min(w,l+a):f>s&&(f-=a));let R=0,E=0;for(let v=s;v<w;v+=a)v<f?R+=u[v]??0:v>=l&&(E+=u[v]??0);return{after:E,before:R,end:l,scrollTo:d,start:f}},[h,M]=K({after:0,before:0,end:0,scrollTo:d,start:0});return k(()=>{Object.assign(h,y({end:h.end,start:h.start}))},[n,s]),o.observer??=Me&&new Me(i),T(()=>{let{observed:l,observer:f}=o,u=t.current;f&&l!==u&&(l&&f.unobserve(l),u&&f.observe(u),o.observed=u),o.isRendering=!1,i()}),T(()=>{let{observer:l}=o;return $.addEventListener("resize",i),P.addEventListener("scroll",i),()=>{l?.disconnect(),$.removeEventListener("resize",i),P.removeEventListener("scroll",i),o.scrollParent?.removeEventListener("scroll",i)}},[o,i]),h};var{clearTimeout:ze,document:Ae,setTimeout:Ue,setInterval:ft}=globalThis,S=10,at=({children:e})=>{if(Math.random()<.005)throw new Error("red");return T(()=>{if(Math.random()<.005)throw new Error("blue");return()=>{if(Math.random()<.5)throw new Error("yellow")}}),e},ut=te(()=>D("div",{style:{background:"#fff9",borderRadius:"0.25rem",padding:"1rem"},children:["Portal: ",re(se)]})),pt=te(({x:e,y:t})=>{let r=re(se)??0,n=k(()=>`rgb(${128+(e-t)/S*128}, ${128+(t-e)/S*128}, ${(e+t)/S/2*256})`),s=L(void 0),[p,o]=K("black"),i=V(()=>{o(n),ze(s.current),s.current=Ue(()=>o("black"),5e3)});return b(ye,{catch:d=>{o(d.message),ze(s.current),s.current=Ue(()=>o("black"),5e3)},children:D("div",{onpointerdown:i,onpointermove:i,style:{alignItems:"center",backgroundColor:p,borderRadius:"0.25rem",display:"flex",fontSize:"0.75rem",justifyContent:"center",minWidth:"0",overflow:"hidden",padding:"0.25rem",textAlign:"center",transition:p==="black"?"all 5s":""},children:[p==="red"?"Fake Render Error":p==="blue"?"Fake After Effect Error":p==="yellow"?"Fake Before Effect Error":b(at,{children:r}),e===0&&t===0&&!!(r%5)&&b(G,{to:Ae.getElementById("portal"),children:b(ut,{})})]})})}),se=ge(),dt=()=>{let[e,t]=K(new Date().getSeconds());T(()=>{ft(()=>t(new Date().getSeconds()),1e3)},[]);let r=L(null),{start:n,end:s,before:p,after:o}=je({containerRef:r,length:1e4});return D(se,{value:e,children:[b("div",{style:{cursor:"crosshair",display:"grid",gap:"0.25rem",gridTemplate:`repeat(${S}, 1fr) / repeat(${S}, 1fr)`,height:"100%",padding:"0.25rem"},children:Array.from({length:S*S},(i,d)=>b(pt,{x:d%S,y:Math.floor(d/S)},d))}),b("div",{ref:r,style:{color:"white",paddingTop:`${p}px`,paddingBottom:`${o}px`},children:Array.from({length:s-n},(i,d)=>D("div",{style:{borderTop:"1px solid #222",padding:"1rem"},children:["Item ",d+n+1]},d+n))}),b("button",{onclick:xe.unmount,style:{position:"fixed",bottom:"1rem",right:"1rem"},children:"Unmount"})]})},xe=Ne(Ae.getElementById("root"));xe.render(b(dt,{}));})();
