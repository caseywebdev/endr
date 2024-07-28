"use strict";(()=>{var{console:oe,CSSStyleDeclaration:P,document:V,queueMicrotask:se,Text:le}=globalThis,i=(e,t=z,r)=>({type:e,props:t,key:r}),D=i;var U=e=>e.children,A=e=>e.children,B=e=>(a.onError=e.onError,e.children),q=()=>{let e=({value:t,children:r})=>{let n=a,s=E(()=>{let c={deps:new Set,value:t};return n.contexts=new Map(n.contexts).set(e,c),c});if(t!==s.value){s.value=t;for(let c of s.deps){c.state=1;let{parent:o}=c;for(;o&&o!==n&&!o.state;)o.state=2,{parent:o}=o}}return r};return e},F=e=>e==null||e===!1||e==="",z={},_={},ce={type:_,props:z,key:void 0},G={},fe=[],ie="http://www.w3.org/2000/svg",ue=(e,t,r)=>{if(typeof e=="function"||e===_)return null;if(e===G)return V.createTextNode(t.nodeValue);let n=V.createElementNS(e==="svg"?ie:r.namespaceURI,e);return H(n,{},t),n},Q=(e,t)=>t in e&&(e[t]==null||typeof e[t]!="object"),$=(e,t,r)=>{for(let n in t)n in r||(e[n]="");for(let n in r)e[n]=r[n]??""},H=(e,t,r)=>{if(e instanceof le){e.nodeValue=r.nodeValue;return}for(let n in t)n==="children"||n in r||(n==="ref"?t.ref&&(t.ref.current=null):e[n]instanceof P?$(e[n],t[n],{}):Q(e,n)?e[n]="":e.removeAttribute(n));for(let n in r)n==="children"||t[n]===r[n]||(n==="ref"?(t.ref&&(t.ref.current=null),r.ref&&(r.ref.current=e)):e[n]instanceof P?$(e[n],t[n],r[n]):Q(e,n)?e[n]=r[n]??"":r[n]!=null?e.setAttribute(n,r[n]):e.removeAttribute(n))},a=null,J=0,K=0,h=[],m=[],y=[],g=[],w=[],p=[],T=e=>{let t=a;t.refs??=[];let r=t.refs[K++];return r||(r={current:e},t.refs.push(r)),r},N=(e,t)=>{let r=a;r.effects??=[];let n=r.effects[J++];n?(!n.deps||!t||L(n.deps,t))&&(n.after=e,n.deps=t):r.effects.push({before:void 0,after:e,deps:t})},E=(e,t=fe)=>{let r=T(null);return r.current?L(r.current.deps,t)&&(r.current.value=e(),r.current.deps=t):r.current={value:e(),deps:t},r.current.value},v=e=>{let t=a,r=E(()=>[e,n=>{let s=typeof n=="function"?n(r[0]):n;return s===r[0]||(r[0]=s,pe(t)),s}]);return r},L=(e,t)=>{let{length:r}=e;if(r!==t.length)return!0;for(;r--;)if(e[r]!==t[r])return!0;return!1};var ae=(e,t)=>{if(e===t)return!0;for(let r in e)if(e[r]!==t[r])return!1;for(let r in t)if(!(r in e))return!1;return!0},O=(e,t=ae)=>(e.memo=t,e),b=e=>{let t=a,r=t.contexts?.get(e);return N(()=>{if(r)return r.deps.add(t),()=>r.deps.delete(t)},[r,t]),r?.value},de=(e,t)=>{for(;e.depth>t.depth;)if(e=e.parent,e===t)return 1;for(;t.depth>e.depth;)if(t=t.parent,t===e)return-1;for(;e.parent!==t.parent;)e=e.parent,t=t.parent;return e.index-t.index},pe=e=>{e.state===1||e.state===3||(p.length===0&&se(()=>{let t=p.sort(de);p=[];for(let r=0;r<t.length;++r){let n=t[r];n.state===1&&I(n)}Z()}),p.push(e),e.state=1)},he=e=>{let{children:t}=e.props;if(typeof e.type=="function"){a=e,J=0,K=0;try{t=e.type(e.props)}catch(r){t=null,e.onError(r)}}return F(t)?[]:Array.isArray(t)?t:[t]},me=e=>F(e)?ce:Array.isArray(e)?{type:U,props:{children:e},key:void 0}:typeof e!="object"?{type:G,props:{nodeValue:e},key:void 0}:e,W=(e,t,r,n,s,c)=>({child:null,contexts:n?.contexts??null,depth:n?n.depth+1:0,effects:null,index:c,key:r,lastNode:null,node:ue(e,t,s),onError:n?.onError??(o=>oe.error(o)),parent:n,parentNode:s,prevNode:null,props:t,refs:null,sibling:null,state:1,type:e}),X=e=>{let{child:t,state:r}=e;if(r===1)I(e);else if(r===2)for(e.state=0;t;t=t.sibling)X(t)},S=({child:e,node:t})=>{if(t)return[t];let r=[];for(;e;e=e.sibling)r.push(...S(e));return r},I=e=>{if(e.effects)try{for(let o=0;o<e.effects.length;++o){let f=e.effects[o];f.after&&f.before&&(f.before(),f.before=void 0)}}catch(o){e.onError(o)}let t=e.child,r=t&&new Map;for(;t;t=t.sibling)r.set(t.key??t.index,t);let n=e.node??e.parentNode,s=he(e);e.state=0,e.child=null;let c=e.node?null:e.prevNode;for(let o=0,f=null;o<s.length;++o){let{type:k,props:d,key:x}=me(s[o]),l=r?.get(x??o),R=!1,M=null,j=!1;l?.type===k?(r.delete(x??o),l.index=o,l.sibling=null,(typeof l.type!="function"||!l.type.memo?.(l.props,d))&&(l.node&&(M=[l.node,l.props,d]),l.props=d,l.state=1),l.parentNode===n&&l.lastNode&&c!==l.prevNode&&(R=!0)):(l=W(k,d,x,e,k===A?d.to:n,o),l.node&&(j=!0)),l.parentNode===n&&(l.prevNode=c),f?f.sibling=l:e.child=l,X(l),R&&m.push(l),M&&y.push(M),j&&g.push(l),l.parentNode===n&&l.lastNode&&(c=l.lastNode),f=l}if(e.lastNode=e.node??c??null,r)for(let o of r.values())Y(o,!0);e.effects&&w.push(e)},Y=(e,t)=>{e.state=3;let{effects:r,child:n,node:s}=e;if(r)try{for(let o=0;o<r.length;++o){let f=r[o];f.before&&(f.before(),f.before=void 0)}}catch(o){e.onError(o)}let c=t&&!s;for(;n;n=n.sibling)Y(n,c);t&&s&&h.unshift(s)},Z=()=>{for(let e=h.length-1;e>=0;--e)h[e].remove();h=[];for(let e=0;e<m.length;++e){let t=m[e];t.prevNode?t.prevNode.after(...S(t)):t.parentNode.prepend(...S(t))}m=[];for(let e=0;e<y.length;++e)H(...y[e]);y=[];for(let e=0;e<g.length;++e){let t=g[e];t.prevNode?t.prevNode.after(t.node):t.parentNode.prepend(t.node)}g=[];for(let e=0;e<w.length;++e){let t=w[e],r=t.effects;try{for(let n=0;n<r.length;++n){let s=r[n];s.after&&(s.before=s.after(),s.after=void 0)}}catch(n){t.onError(n)}}w=[]},ee=(e,t)=>{I(W(U,{children:e},void 0,null,t,0)),Z()};var{clearTimeout:te,document:ne,setTimeout:re,setInterval:ye}=globalThis,u=10,ge=()=>{if(Math.random()<.01)throw new Error("red");return N(()=>{if(Math.random()<.01)throw new Error("blue");return()=>{if(Math.random()<.01)throw new Error("yellow")}}),b(C)??0},we=O(({x:e,y:t})=>{let r=b(C)??0,n=E(()=>`rgb(${128+(e-t)/u*128}, ${128+(t-e)/u*128}, ${(e+t)/u/2*256})`),s=T(void 0),[c,o]=v("black");return i(B,{onError:f=>{o(f.message),te(s.current),s.current=re(()=>o("black"),5e3)},children:D("div",{onpointermove:()=>{o(n),te(s.current),s.current=re(()=>o("black"),5e3)},ontouchmove:f=>f.preventDefault(),style:{backgroundColor:c,transition:c==="black"?"all 5s":"",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden"},children:[c==="red"?"Render Error":c==="blue"?"After Effect Error":c==="yellow"?"Before Effect Error":i(ge,{}),e===1&&t===1&&!!(r%5)&&i(Ne,{})]})})}),Ne=()=>{let e=b(C);return i(A,{to:ne.getElementById("portal"),children:D("div",{style:{background:"#fff9",borderRadius:"0.25rem",padding:"1rem"},children:["Portal: ",e]})})},C=q(),Ee=()=>{let[e,t]=v(new Date().getSeconds());return N(()=>{ye(()=>t(new Date().getSeconds()),1e3)}),i(C,{value:e,children:i("div",{style:{cursor:"crosshair",display:"grid",gridTemplate:`repeat(${u}, 1fr) / repeat(${u}, 1fr)`,height:"100%"},children:Array.from({length:u*u},(r,n)=>i(we,{x:n%u,y:Math.floor(n/u)},n))})})};ee(i(Ee,{}),ne.getElementById("root"));})();
