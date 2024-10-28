"use strict";(()=>{var{console:Ve,document:pe,Function:T,queueMicrotask:We,Text:Be}=globalThis,b=(e,t=ve,r)=>({type:e,props:t,key:r}),L=b;var ge=e=>e.children,J=e=>e.children,ye=e=>(S.catch=e.catch,e.children),me=()=>{let e=({value:t,children:r})=>{let n=S,s=k(()=>{let d={deps:new Set,value:t};return n.contexts=new Map(n.contexts).set(e,d),d});if(t!==s.value){s.value=t;for(let d of s.deps){d.state=1;let{parent:o}=d;for(;o&&o!==n&&!o.state;)o.state=2,{parent:o}=o}}return r};return e},be=e=>e==null||e===!1||e==="",ve={},we={},He=b(we,ve),Ee={},Oe=[],_e="http://www.w3.org/2000/svg",qe=e=>Ve.error(e),Xe=(e,t,r)=>{if(e instanceof T||e===we)return null;if(e===Ee)return pe.createTextNode(t.nodeValue);let n=pe.createElementNS(e==="svg"?_e:r.namespaceURI,e);return Se(n,{},t),n},he=(e,t)=>t in e&&(e[t]==null||typeof e[t]!="object"),Ye=(e,t,r)=>{for(let n in t)n in r||(e[n]="");for(let n in r)e[n]=r[n]??""},Se=(e,t,r)=>{if(e instanceof Be){e.nodeValue=r.nodeValue;return}for(let n in t)n==="children"||n in r||(n==="ref"?t.ref&&(t.ref.current=null):he(e,n)?e[n]="":e.removeAttribute(n));for(let n in r)n==="children"||t[n]===r[n]||(n==="ref"?(t.ref&&(t.ref.current=null),r.ref&&(r.ref.current=e)):n==="style"&&r[n]&&typeof r[n]=="object"?Ye(e.style,t[n]&&typeof t[n]=="object"?t[n]:{},r[n]):he(e,n)?e[n]=r[n]??"":r[n]!=null?e.setAttribute(n,r[n]):e.removeAttribute(n))},S=null,q=0,X=0,K=e=>{let t=S;t.refs??=[];let r=t.refs[X++];return r||(r={current:e instanceof T?e():e},t.refs.push(r)),r},P=(e,t)=>{let r=S;r.effects??=[];let n=r.effects[q++];n?(!n.deps||!t||Ce(n.deps,t))&&(n.after=e,n.deps=t):r.effects.push({before:void 0,after:e,deps:t})},k=(e,t=Oe)=>{let r=K(()=>({value:e(),deps:t}));return Ce(r.current.deps,t)&&(r.current.value=e(),r.current.deps=t),r.current.value},F=e=>{let t=S,r=k(()=>[e instanceof T?e():e,n=>{let s=n instanceof T?n(r[0]):n;return s!==r[0]&&(r[0]=s,Qe(t)),s}]);return[...r]},Ce=(e,t)=>{let{length:r}=e;if(r!==t.length)return!0;for(;r--;)if(e[r]!==t[r])return!0;return!1},$=e=>{let t=K(()=>e);return t.current=e,k(()=>(...r)=>t.current(...r))},Ge=(e,t)=>{if(e===t)return!0;for(let r in e)if(e[r]!==t[r])return!1;for(let r in t)if(!(r in e))return!1;return!0},re=(e,t=Ge)=>(e.memo=t,e),ne=e=>{let t=S,r=t.contexts?.get(e);return P(()=>{if(r)return r.deps.add(t),()=>r.deps.delete(t)},[r,t]),r?.value},Je=(e,t)=>{for(;e.depth>t.depth;)if(e=e.parent,e===t)return 1;for(;t.depth>e.depth;)if(t=t.parent,t===e)return-1;for(;e.parent!==t.parent;)e=e.parent,t=t.parent;return e.index-t.index},Qe=e=>{if(e.state===1||e.state===3)return;let{queues:t}=e,{updates:r}=t;r.length===0&&We(()=>{let n=r.sort(Je);t.updates=[];for(let s=0;s<n.length;++s){let d=n[s];d.state===1&&G(d)}Y(t)}),r.push(e),e.state=1},Ze=e=>{let{children:t}=e.props;if(e.type instanceof T){let r=[S,q,X];S=e,q=0,X=0;try{t=e.type(e.props)}catch(n){t=null,e.catch(n)}finally{[S,q,X]=r}}return be(t)?[]:Array.isArray(t)?t:[t]},Ie=e=>be(e)?He:Array.isArray(e)?b(ge,{children:e}):e&&typeof e=="object"&&Object.keys(e).length===3&&"type"in e&&(typeof e.type=="string"||e.type instanceof T)&&"props"in e&&e.props&&typeof e.props=="object"&&"key"in e?e:b(Ee,{nodeValue:e}),Ne=e=>{let{child:t,state:r}=e;if(r===1)G(e);else if(r===2)for(e.state=0;t;t=t.sibling)Ne(t)},te=({child:e,node:t})=>{if(t)return[t];let r=[];for(;e;e=e.sibling)r.push(...te(e));return r},G=e=>{let{depth:t,queues:r}=e,{afterEffects:n,inserts:s,moves:d,nodeUpdates:o}=r;if(e.effects)try{for(let l=0;l<e.effects.length;++l){let f=e.effects[l];f.after&&f.before&&(f.before(),f.before=void 0)}}catch(l){e.catch(l)}let i=e.child,p=i&&new Map;for(;i;i=i.sibling)p.set(i.key??i.index,i);let g=e.node??e.parentNode,h=Ze(e);e.state=0,e.child=null;let M=e.node?null:e.prevNode;for(let l=0,f=null;l<h.length;++l){let{type:u,props:a,key:v}=Ie(h[l]),c=p?.get(v??l),R=!1,E=null,w=!1;if(c?.type===u)p.delete(v??l),c.index=l,c.sibling=null,(!(c.type instanceof T)||!c.type.memo?.(c.props,a))&&(c.node&&(E=[c.node,c.props,a]),c.props=a,c.state=1),c.parentNode===g&&c.lastNode&&M!==c.prevNode&&(R=!0);else{try{c={catch:e.catch,child:null,contexts:e.contexts,depth:t+1,effects:null,index:l,key:v,lastNode:null,node:Xe(u,a,g),parent:e,props:a,queues:r,refs:null,sibling:null,state:1,type:u,...u===J?{parentNode:a.to,prevNode:a.to.lastChild}:{parentNode:g,prevNode:M}}}catch(y){e.catch(y);continue}c.node&&(w=!0)}c.parentNode===g&&(c.prevNode=M),f?f.sibling=c:e.child=c,Ne(c),R&&d.push(c),E&&o.push(E),w&&s.push(c),c.parentNode===g&&c.lastNode&&(M=c.lastNode),f=c}if(e.lastNode=e.node??M??null,p)for(let l of p.values())oe(l);e.effects&&n.push(e)},oe=(e,t=!0)=>{e.state=3;let{effects:r,child:n,node:s}=e;if(r)try{for(let o=0;o<r.length;++o){let i=r[o];i.before&&(i.before(),i.before=void 0)}}catch(o){e.catch(o)}let d=t&&!s;for(;n;n=n.sibling)oe(n,d||n.type===J);t&&s&&e.queues.removes.unshift(s)},Y=e=>{let{afterEffects:t,inserts:r,moves:n,nodeUpdates:s,removes:d}=e;for(let o=d.length-1;o>=0;--o)d[o].remove();e.removes=[];for(let o=0;o<n.length;++o){let i=n[o],{parentNode:p,prevNode:g}=i;g?g.after(...te(i)):p.prepend(...te(i))}e.moves=[];for(let o=0;o<s.length;++o)Se(...s[o]);e.nodeUpdates=[];for(let o=0;o<r.length;++o){let{node:i,parentNode:p,prevNode:g}=r[o];g?g.after(i):p.prepend(i)}e.inserts=[];for(let o=0;o<t.length;++o){let i=t[o],p=i.effects;try{for(let g=0;g<p.length;++g){let h=p[g];h.after&&(h.before=h.after(),h.after=void 0)}}catch(g){i.catch(g)}}e.afterEffects=[]},ke=e=>{let t={afterEffects:[],inserts:[],moves:[],nodeUpdates:[],removes:[],updates:[]},r={catch:qe,child:null,contexts:null,depth:0,effects:null,index:0,key:void 0,lastNode:null,node:null,parent:null,parentNode:e,prevNode:e.lastChild,props:{},queues:t,refs:null,sibling:null,state:1,type:ge};return G(r),Y(t),{render:n=>{r.props={children:n},G(r),Y(t)},unmount:()=>{oe(r),Y(t)}}};var{document:z,getComputedStyle:et,Document:Me,ResizeObserver:Re,window:Te,Window:tt}=globalThis,{body:Pe}=z,rt=z.scrollingElement,V=Te.visualViewport??Te,nt=10,ot={x:"clientWidth",y:"clientHeight"},st={x:"innerWidth",y:"innerHeight"},ct={x:"overflowX",y:"overflowY"},se={x:"right",y:"bottom"},ze={x:"width",y:"height"},lt={x:"scrollWidth",y:"scrollHeight"},it={x:"scrollLeft",y:"scrollTop"},ft=({axis:e,el:t})=>{for(;(t&&=t.parentElement)&&!(t===Pe||!Pe.contains(t));){if(t[lt[e]]<=t[ot[e]])continue;let r=et(t)[ct[e]];if(r==="scroll"||r==="auto")return t}return z},je=({axis:e="y",containerRef:t,growBuffer:r=200,length:n=0,minIndex:s=0,shrinkBuffer:d=r+200})=>{let o=k(()=>({cache:{},columns:1,isRendering:!1,observed:null,observer:null,prev:{cache:{},minIndex:s,start:s},scrollParent:null,scrollTarget:null,syncUpdateCount:0,resolve:()=>{o.scrollTarget=null,o.syncUpdateCount=0}})),i=$(()=>{if(o.isRendering)return;let l=t.current,{end:f,start:u}=h;if(!l||u===f||l.children.length!==f-u)return o.resolve();let{cache:a,prev:v,scrollTarget:c}=o,R=h.start,E=[],w,y=1;for(let m of l.children){let ae=m.getBoundingClientRect(),ue=ae[ze[e]];a[R++]=ue,E.push(ue);let de=ae[e];w==null?w=de:de===w&&++y}let Le=E.sort()[Math.floor(E.length/2)];o.columns=y;let N=ft({axis:e,el:l});N!==o.scrollParent&&(o.scrollParent!==z&&o.scrollParent?.removeEventListener("scroll",i),N!==z&&N.addEventListener("scroll",i),o.scrollParent=N);let j=N instanceof Me?rt:N,U=it[e],Q=0,Ke=Math.min(v.minIndex,s),Fe=Math.max(v.start,h.start);for(let m=Ke;m<Fe;m+=y)Q+=(a[m]??0)-(v.cache[m]??0);if(Q&&(j[U]+=Q),o.prev={cache:{...a},minIndex:s,start:h.start},o.syncUpdateCount++>nt)return o.resolve();let Z=l.getBoundingClientRect(),W=Z[e]+h.before,B=Z[se[e]]-h.after,le=N instanceof Me?{[e]:0,[se[e]]:V instanceof tt?V[st[e]]:V[ze[e]]}:N.getBoundingClientRect(),H=le[e],I=le[se[e]],ee=s+n;for(let m=s;m<ee;++m)a[m]??=Le;u-=(u-s)%y;let ie=(f-s)%y;for(ie&&(f+=y-ie);u-y>=s&&W>H-r;)W-=a[u-y],u-=y;for(;u<ee&&W+a[u]<=H-d;)W+=a[u],u+=y;for(;f<ee&&B<I+r;)B+=a[f],f+=y;for(;f-y>=s&&B-a[f-y]>=I+d;)B-=a[f-y],f-=y;let x=g({end:f,start:u});if(x.after!==h.after||x.before!==h.before||x.end!==h.end||x.start!==h.start)return o.isRendering=!0,M(x);if(!c)return o.resolve();let{index:A}=c;A=Math.min(s+n-1,Math.max(A,s)),A-=(A-s)%y;let fe=0;for(let m=s;m<A;m+=y)fe+=a[m];let O=j[U],$e=a[A],D=Z[e]+O-H+fe-c.buffer,_=D-(I-H)+$e+c.buffer*2;c.align==="nearest"&&(D<_?c.align="center":O>D?c.align="start":O<_&&(c.align="end")),c.align==="start"?j[U]=D:c.align==="end"?j[U]=_:c.align==="center"&&(j[U]=(D+_)/2),j[U]===O?o.resolve():i()}),p=$(({align:l="nearest",buffer:f=0,index:u})=>{o.scrollTarget={align:l,buffer:f,index:u},i()}),g=({end:l,start:f})=>{if(r===1/0)return{after:0,before:0,end:s+n,scrollTo:p,start:s};let{cache:u,columns:a}=o,v=s+n;f-=(f-s)%a,f=Math.min(v,Math.max(f,s));let c=(l-s)%a;c&&(l+=a-c),l=Math.min(v,Math.max(l,f)),l-f<=a&&(l<v?l=Math.min(v,l+a):f>s&&(f-=a));let R=0,E=0;for(let w=s;w<v;w+=a)w<f?R+=u[w]??0:w>=l&&(E+=u[w]??0);return{after:E,before:R,end:l,scrollTo:p,start:f}},[h,M]=F({after:0,before:0,end:0,scrollTo:p,start:0});return k(()=>{Object.assign(h,g({end:h.end,start:h.start}))},[n,s]),o.observer??=Re&&new Re(i),P(()=>{let{observed:l,observer:f}=o,u=t.current;f&&l!==u&&(l&&f.unobserve(l),u&&f.observe(u),o.observed=u),o.isRendering=!1,i()}),P(()=>{let{observer:l}=o;return V.addEventListener("resize",i),z.addEventListener("scroll",i),()=>{l?.disconnect(),V.removeEventListener("resize",i),z.removeEventListener("scroll",i),o.scrollParent?.removeEventListener("scroll",i)}},[o,i]),h};var{clearTimeout:Ue,document:xe,setTimeout:Ae,setInterval:at}=globalThis,C=10,ut=({children:e})=>{if(Math.random()<.005)throw new Error("red");return P(()=>{if(Math.random()<.005)throw new Error("blue");return()=>{if(Math.random()<.5)throw new Error("yellow")}}),e},dt=re(()=>L("div",{style:{background:"#fff9",borderRadius:"0.25rem",padding:"1rem"},children:["Portal: ",ne(ce)]})),pt=re(({x:e,y:t})=>{let r=ne(ce)??0,n=k(()=>`rgb(${128+(e-t)/C*128}, ${128+(t-e)/C*128}, ${(e+t)/C/2*256})`),s=K(void 0),[d,o]=F("black"),i=$(()=>{o(n),Ue(s.current),s.current=Ae(()=>o("black"),5e3)});return b(ye,{catch:p=>{o(p.message),Ue(s.current),s.current=Ae(()=>o("black"),5e3)},children:L("div",{onpointerdown:i,onpointermove:i,style:{alignItems:"center",backgroundColor:d,borderRadius:"0.25rem",display:"flex",fontSize:"0.75rem",justifyContent:"center",minWidth:"0",overflow:"hidden",padding:"0.25rem",textAlign:"center",transition:d==="black"?"all 5s":""},children:[d==="red"?"Fake Render Error":d==="blue"?"Fake After Effect Error":d==="yellow"?"Fake Before Effect Error":b(ut,{children:r}),e===0&&t===0&&!!(r%5)&&b(J,{to:xe.getElementById("portal"),children:b(dt,{})})]})})}),ce=me(),ht=()=>{let[e,t]=F(new Date().getSeconds());P(()=>{at(()=>t(new Date().getSeconds()),1e3)},[]);let r=K(null),{start:n,end:s,before:d,after:o}=je({containerRef:r,length:1e4});return L(ce,{value:e,children:[b("div",{style:{cursor:"crosshair",display:"grid",gap:"0.25rem",gridTemplate:`repeat(${C}, 1fr) / repeat(${C}, 1fr)`,height:"100%",padding:"0.25rem"},children:Array.from({length:C*C},(i,p)=>b(pt,{x:p%C,y:Math.floor(p/C)},p))}),b("div",{ref:r,style:{color:"white",paddingTop:`${d}px`,paddingBottom:`${o}px`},children:Array.from({length:s-n},(i,p)=>L("div",{style:{borderTop:"1px solid #222",padding:"1rem"},children:["Item ",p+n+1]},p+n))}),b("button",{onclick:De.unmount,style:{position:"fixed",bottom:"1rem",right:"1rem"},children:"Unmount"})]})},De=ke(xe.getElementById("root"));De.render(b(ht,{}));})();
