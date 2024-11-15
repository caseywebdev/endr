"use strict";(()=>{var{console:Oe,queueMicrotask:Ve}=globalThis,b=(e,t=ge,r)=>({type:e,props:t,key:r}),K=b;var ge={},me={},We=b(me,ge),ye={},Be=[],He="http://www.w3.org/2000/svg",_e=e=>Oe.error(e),be=e=>e==null||e===!1||e==="",R=e=>typeof e=="function",Xe=e=>Array.isArray(e),L=e=>typeof e=="object",we=e=>e.children,Q=e=>e.children,ve=e=>(S.catch=e.catch,e.children),Ee=e=>{let t=Object.assign(({value:r,children:n})=>{let s=S,p=N(()=>{let o={deps:new Set,value:r};return s.contexts=new Map(s.contexts).set(t,o),o});if(r!==p.value){p.value=r;for(let o of p.deps){o.state=1;let{parent:c}=o;for(;c&&c!==s&&!c.state;)c.state=2,{parent:c}=c}}return n},{value:e});return t},qe=(e,t,r)=>{if(R(e)||e===me)return null;if(e===ye)return r.ownerDocument.createTextNode(t.nodeValue);let n=r.ownerDocument.createElementNS(e==="svg"?He:r.namespaceURI,e);return Se(n,{},t),n},Ye=e=>e.nodeType===e.TEXT_NODE,he=(e,t)=>t in e&&(e[t]==null||!L(e[t])),Ge=(e,t,r)=>{for(let n in t)n in r||(e[n]="");for(let n in r)e[n]=r[n]??""},Se=(e,t,r)=>{if(Ye(e)){e.nodeValue=r.nodeValue;return}for(let n in t)n==="children"||n in r||(n==="ref"?t.ref&&(t.ref.current=null):he(e,n)?e[n]="":e.removeAttribute(n));for(let n in r)n==="children"||t[n]===r[n]||(n==="ref"?(t.ref&&(t.ref.current=null),r.ref&&(r.ref.current=e)):n==="style"&&r[n]&&L(r[n])?Ge(e.style,t[n]&&L(t[n])?t[n]:{},r[n]):he(e,n)?e[n]=r[n]??"":r[n]!=null?e.setAttribute(n,r[n]):e.removeAttribute(n))},S=null,q=0,Y=0,F=e=>{let t=S;t.refs??=[];let r=t.refs[Y++];return r||(r={current:R(e)?e():e},t.refs.push(r)),r},P=(e,t)=>{let r=S;r.effects??=[];let n=r.effects[q++];n?(!n.deps||!t||Ce(n.deps,t))&&(n.after=e,n.deps=t):r.effects.push({before:void 0,after:e,deps:t})},N=(e,t=Be)=>{let r=F(()=>({value:e(),deps:t}));return Ce(r.current.deps,t)&&(r.current.value=e(),r.current.deps=t),r.current.value},$=e=>{let t=S,r=N(()=>[R(e)?e():e,n=>{let s=R(n)?n(r[0]):n;return s!==r[0]&&(r[0]=s,Ze(t)),s}]);return[...r]},Ce=(e,t)=>{let{length:r}=e;if(r!==t.length)return!0;for(;r--;)if(e[r]!==t[r])return!0;return!1},O=e=>{let t=F(()=>e);return t.current=e,N(()=>(...r)=>t.current(...r))},Je=(e,t)=>{if(e===t)return!0;for(let r in e)if(e[r]!==t[r])return!1;for(let r in t)if(!(r in e))return!1;return!0},ne=(e,t=Je)=>(e.memo=t,e),oe=e=>{let t=S,r=t.contexts?.get(e);return P(()=>{if(r)return r.deps.add(t),()=>r.deps.delete(t)},[r,t]),(r??e).value},Qe=(e,t)=>{for(;e.depth>t.depth;)if(e=e.parent,e===t)return 1;for(;t.depth>e.depth;)if(t=t.parent,t===e)return-1;for(;e.parent!==t.parent;)e=e.parent,t=t.parent;return e.index-t.index},Ze=e=>{if(e.state===1||e.state===3)return;let{queues:t}=e,{updates:r}=t;r.length===0&&Ve(()=>{let n=r.sort(Qe);t.updates=[];for(let s=0;s<n.length;++s){let p=n[s];p.state===1&&J(p)}G(t)}),r.push(e),e.state=1},Ie=e=>{let{children:t}=e.props;if(R(e.type)){let r=[S,q,Y];S=e,q=0,Y=0;try{t=e.type(e.props)}catch(n){t=null,e.catch(n)}finally{[S,q,Y]=r}}return be(t)?[]:Xe(t)?t:[t]},et=e=>be(e)?We:Array.isArray(e)?b(we,{children:e}):e&&L(e)&&Object.keys(e).length===3&&"type"in e&&(typeof e.type=="string"||R(e.type))&&"props"in e&&e.props&&L(e.props)&&"key"in e?e:b(ye,{nodeValue:e}),ke=e=>{let{child:t,state:r}=e;if(r===1)J(e);else if(r===2)for(e.state=0;t;t=t.sibling)ke(t)},re=({child:e,node:t})=>{if(t)return[t];let r=[];for(;e;e=e.sibling)r.push(...re(e));return r},J=e=>{let{depth:t,queues:r}=e,{afterEffects:n,inserts:s,moves:p,nodeUpdates:o}=r;if(e.effects)try{for(let i=0;i<e.effects.length;++i){let f=e.effects[i];f.after&&f.before&&(f.before(),f.before=void 0)}}catch(i){e.catch(i)}let c=e.child,d=c&&new Map;for(;c;c=c.sibling)d.set(c.key??c.index,c);let g=e.node??e.parentNode,h=Ie(e);e.state=0,e.child=null;let T=e.node?null:e.prevNode;for(let i=0,f=null;i<h.length;++i){let{type:u,props:a,key:w}=et(h[i]),l=d?.get(w??i),M=!1,E=null,v=!1;if(l?.type===u)d.delete(w??i),l.index=i,l.sibling=null,(!R(l.type)||!l.type.memo?.(l.props,a))&&(l.node&&(E=[l.node,l.props,a]),l.props=a,l.state=1),l.parentNode===g&&l.lastNode&&T!==l.prevNode&&(M=!0);else{try{l={catch:e.catch,child:null,contexts:e.contexts,depth:t+1,effects:null,index:i,key:w,lastNode:null,node:qe(u,a,g),parent:e,props:a,queues:r,refs:null,sibling:null,state:1,type:u,...u===Q?{parentNode:a.to,prevNode:a.to.lastChild}:{parentNode:g,prevNode:T}}}catch(m){e.catch(m);continue}l.node&&(v=!0)}l.parentNode===g&&(l.prevNode=T),f?f.sibling=l:e.child=l,ke(l),M&&p.push(l),E&&o.push(E),v&&s.push(l),l.parentNode===g&&l.lastNode&&(T=l.lastNode),f=l}if(e.lastNode=e.node??T??null,d)for(let i of d.values())se(i);e.effects&&n.push(e)},se=(e,t=!0)=>{e.state=3;let{effects:r,child:n,node:s}=e;if(r)try{for(let o=0;o<r.length;++o){let c=r[o];c.before&&(c.before(),c.before=void 0)}}catch(o){e.catch(o)}let p=t&&!s;for(;n;n=n.sibling)se(n,p||n.type===Q);t&&s&&e.queues.removes.unshift(s)},G=e=>{let{afterEffects:t,inserts:r,moves:n,nodeUpdates:s,removes:p}=e;for(let o=p.length-1;o>=0;--o)p[o].remove();e.removes=[];for(let o=0;o<n.length;++o){let c=n[o],{parentNode:d,prevNode:g}=c;g?g.after(...re(c)):d.prepend(...re(c))}e.moves=[];for(let o=0;o<s.length;++o)Se(...s[o]);e.nodeUpdates=[];for(let o=0;o<r.length;++o){let{node:c,parentNode:d,prevNode:g}=r[o];g?g.after(c):d.prepend(c)}e.inserts=[];for(let o=0;o<t.length;++o){let c=t[o],d=c.effects;try{for(let g=0;g<d.length;++g){let h=d[g];h.after&&(h.before=h.after(),h.after=void 0)}}catch(g){c.catch(g)}}e.afterEffects=[]},Ne=e=>{let t={afterEffects:[],inserts:[],moves:[],nodeUpdates:[],removes:[],updates:[]},r={catch:_e,child:null,contexts:null,depth:0,effects:null,index:0,key:void 0,lastNode:null,node:null,parent:null,parentNode:e,prevNode:e.lastChild,props:{},queues:t,refs:null,sibling:null,state:1,type:we};return J(r),G(t),{render:n=>{r.props={children:n},J(r),G(t)},unmount:()=>{se(r),G(t)}}};var{document:z,getComputedStyle:tt,Document:Te,ResizeObserver:Me,window:Re,Window:rt}=globalThis,{body:Pe}=z,nt=z.scrollingElement,V=Re.visualViewport??Re,ot=10,st={x:"clientWidth",y:"clientHeight"},ct={x:"innerWidth",y:"innerHeight"},lt={x:"overflowX",y:"overflowY"},ce={x:"right",y:"bottom"},ze={x:"width",y:"height"},it={x:"scrollWidth",y:"scrollHeight"},ft={x:"scrollLeft",y:"scrollTop"},at=({axis:e,el:t})=>{for(;(t&&=t.parentElement)&&!(t===Pe||!Pe.contains(t));){if(t[it[e]]<=t[st[e]])continue;let r=tt(t)[lt[e]];if(r==="scroll"||r==="auto")return t}return z},Ae=({axis:e="y",containerRef:t,growBuffer:r=200,length:n=0,minIndex:s=0,shrinkBuffer:p=r+200})=>{let o=N(()=>({cache:{},columns:1,isRendering:!1,observed:null,observer:null,prev:{cache:{},minIndex:s,start:s},scrollParent:null,scrollTarget:null,syncUpdateCount:0,resolve:()=>{o.scrollTarget=null,o.syncUpdateCount=0}})),c=O(()=>{if(o.isRendering)return;let i=t.current,{end:f,start:u}=h;if(!i||u===f||i.children.length!==f-u)return o.resolve();let{cache:a,prev:w,scrollTarget:l}=o,M=h.start,E=[],v,m=1;for(let y of i.children){let ue=y.getBoundingClientRect(),de=ue[ze[e]];a[M++]=de,E.push(de);let pe=ue[e];v==null?v=pe:pe===v&&++m}let Le=E.sort()[Math.floor(E.length/2)];o.columns=m;let k=at({axis:e,el:i});k!==o.scrollParent&&(o.scrollParent!==z&&o.scrollParent?.removeEventListener("scroll",c),k!==z&&k.addEventListener("scroll",c),o.scrollParent=k);let A=k instanceof Te?nt:k,D=ft[e],Z=0,Ke=Math.min(w.minIndex,s),Fe=Math.max(w.start,h.start);for(let y=Ke;y<Fe;y+=m)Z+=(a[y]??0)-(w.cache[y]??0);if(Z&&(A[D]+=Z),o.prev={cache:{...a},minIndex:s,start:h.start},o.syncUpdateCount++>ot)return o.resolve();let I=i.getBoundingClientRect(),W=I[e]+h.before,B=I[ce[e]]-h.after,ie=k instanceof Te?{[e]:0,[ce[e]]:V instanceof rt?V[ct[e]]:V[ze[e]]}:k.getBoundingClientRect(),H=ie[e],ee=ie[ce[e]],te=s+n;for(let y=s;y<te;++y)a[y]??=Le;u-=(u-s)%m;let fe=(f-s)%m;for(fe&&(f+=m-fe);u-m>=s&&W>H-r;)W-=a[u-m],u-=m;for(;u<te&&W+a[u]<=H-p;)W+=a[u],u+=m;for(;f<te&&B<ee+r;)B+=a[f],f+=m;for(;f-m>=s&&B-a[f-m]>=ee+p;)B-=a[f-m],f-=m;let j=g({end:f,start:u});if(j.after!==h.after||j.before!==h.before||j.end!==h.end||j.start!==h.start)return o.isRendering=!0,T(j);if(!l)return o.resolve();let{index:U}=l;U=Math.min(s+n-1,Math.max(U,s)),U-=(U-s)%m;let ae=0;for(let y=s;y<U;y+=m)ae+=a[y];let _=A[D],$e=a[U],x=I[e]+_-H+ae-l.buffer,X=x-(ee-H)+$e+l.buffer*2;l.align==="nearest"&&(x<X?l.align="center":_>x?l.align="start":_<X&&(l.align="end")),l.align==="start"?A[D]=x:l.align==="end"?A[D]=X:l.align==="center"&&(A[D]=(x+X)/2),A[D]===_?o.resolve():c()}),d=O(({align:i="nearest",buffer:f=0,index:u})=>{o.scrollTarget={align:i,buffer:f,index:u},c()}),g=({end:i,start:f})=>{if(r===1/0)return{after:0,before:0,end:s+n,scrollTo:d,start:s};let{cache:u,columns:a}=o,w=s+n;f-=(f-s)%a,f=Math.min(w,Math.max(f,s));let l=(i-s)%a;l&&(i+=a-l),i=Math.min(w,Math.max(i,f)),i-f<=a&&(i<w?i=Math.min(w,i+a):f>s&&(f-=a));let M=0,E=0;for(let v=s;v<w;v+=a)v<f?M+=u[v]??0:v>=i&&(E+=u[v]??0);return{after:E,before:M,end:i,scrollTo:d,start:f}},[h,T]=$({after:0,before:0,end:0,scrollTo:d,start:0});return N(()=>{Object.assign(h,g({end:h.end,start:h.start}))},[n,s]),o.observer??=Me&&new Me(c),P(()=>{let{observed:i,observer:f}=o,u=t.current;f&&i!==u&&(i&&f.unobserve(i),u&&f.observe(u),o.observed=u),o.isRendering=!1,c()}),P(()=>{let{observer:i}=o;return V.addEventListener("resize",c),z.addEventListener("scroll",c),()=>{i?.disconnect(),V.removeEventListener("resize",c),z.removeEventListener("scroll",c),o.scrollParent?.removeEventListener("scroll",c)}},[o,c]),h};var{clearTimeout:De,document:je,setTimeout:Ue,setInterval:ut}=globalThis,C=10,dt=({children:e})=>{if(Math.random()<.005)throw new Error("red");return P(()=>{if(Math.random()<.005)throw new Error("blue");return()=>{if(Math.random()<.5)throw new Error("yellow")}}),e},pt=ne(()=>K("div",{style:{background:"#fff9",borderRadius:"0.25rem",padding:"1rem"},children:["Portal: ",oe(le)]})),ht=ne(({x:e,y:t})=>{let r=oe(le),n=N(()=>`rgb(${128+(e-t)/C*128}, ${128+(t-e)/C*128}, ${(e+t)/C/2*256})`),s=F(void 0),[p,o]=$("black"),c=O(()=>{o(n),De(s.current),s.current=Ue(()=>o("black"),5e3)});return b(ve,{catch:d=>{o(d.message),De(s.current),s.current=Ue(()=>o("black"),5e3)},children:K("div",{onpointerdown:c,onpointermove:c,style:{alignItems:"center",backgroundColor:p,borderRadius:"0.25rem",display:"flex",fontSize:"0.75rem",justifyContent:"center",minWidth:"0",overflow:"hidden",padding:"0.25rem",textAlign:"center",transition:p==="black"?"all 5s":""},children:[p==="red"?"Fake Render Error":p==="blue"?"Fake After Effect Error":p==="yellow"?"Fake Before Effect Error":b(dt,{children:r}),e===0&&t===0&&!!(r%5)&&b(Q,{to:je.getElementById("portal"),children:b(pt,{})})]})})}),le=Ee(0),gt=()=>{let[e,t]=$(new Date().getSeconds());P(()=>{ut(()=>t(new Date().getSeconds()),1e3)},[]);let r=F(null),{start:n,end:s,before:p,after:o}=Ae({containerRef:r,length:1e4});return K(le,{value:e,children:[b("div",{style:{cursor:"crosshair",display:"grid",gap:"0.25rem",gridTemplate:`repeat(${C}, 1fr) / repeat(${C}, 1fr)`,height:"100%",padding:"0.25rem"},children:Array.from({length:C*C},(c,d)=>b(ht,{x:d%C,y:Math.floor(d/C)},d))}),b("div",{ref:r,style:{color:"white",paddingTop:`${p}px`,paddingBottom:`${o}px`},children:Array.from({length:s-n},(c,d)=>K("div",{style:{borderTop:"1px solid #222",padding:"1rem"},children:["Item ",d+n+1]},d+n))}),b("button",{onclick:xe.unmount,style:{position:"fixed",bottom:"1rem",right:"1rem"},children:"Unmount"})]})},xe=Ne(je.getElementById("root"));xe.render(b(gt,{}));})();
