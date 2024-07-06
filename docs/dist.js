"use strict";(()=>{var{CSSStyleDeclaration:M,document:I,queueMicrotask:Z,Text:ee}=globalThis,u=(e,t=$,n)=>({type:e,props:t,key:n});var Q=e=>e.children,R=()=>{let e=({value:t,children:n})=>{let s=a,f=d(()=>{let o={deps:new Set,value:t};return s.contexts=new Map(s.contexts).set(e,o),o});if(t!==f.value){f.value=t;for(let o of f.deps){o.state=1;let{parent:r}=o;for(;r&&r!==s&&!r.state;)r.state=2,{parent:r}=r}}return n};return e},U=e=>e==null||e===!1||e==="",$={},q={},te={type:q,props:$,key:void 0},P={},ne=[],se="http://www.w3.org/2000/svg",re=(e,t,n)=>{if(typeof e=="function"||e===q)return null;if(e===P)return I.createTextNode(t.nodeValue);let s=I.createElementNS(e==="svg"?se:n.namespaceURI,e);return z(s,{},t),s},V=(e,t)=>t in e&&(e[t]==null||typeof e[t]!="object"),j=(e,t,n)=>{for(let s in t)s in n||(e[s]="");for(let s in n)e[s]=n[s]??""},z=(e,t,n)=>{if(e instanceof ee){e.nodeValue=n.nodeValue;return}for(let s in t)s==="children"||s in n||(s==="ref"?t.ref&&(t.ref.current=null):e[s]instanceof M?j(e[s],t[s],{}):V(e,s)?e[s]="":e.removeAttribute(s));for(let s in n)s==="children"||t[s]===n[s]||(s==="ref"?(t.ref&&(t.ref.current=null),n.ref&&(n.ref.current=e)):e[s]instanceof M?j(e[s],t[s],n[s]):V(e,s)?e[s]=n[s]??"":n[s]!=null?e.setAttribute(s,n[s]):e.removeAttribute(s))},a=null,B=0,F=0,N=[],b=[],w=[],C=[],k=[],h=[],g=e=>{let t=a;t.refs??=[];let n=t.refs[F++];return n||(n={current:e},t.refs.push(n)),n},S=(e,t)=>{let n=a;n.effects??=[];let s=n.effects[B++];s?(!s.deps||!t||_(s.deps,t))&&(s.after=e,s.deps=t):n.effects.push({before:void 0,after:e,deps:t})},d=(e,t=ne)=>{let n=g(null);return n.current?_(n.current.deps,t)&&(n.current.value=e(),n.current.deps=t):n.current={value:e(),deps:t},n.current.value},T=e=>{let t=a,n=d(()=>[e,s=>{let f=typeof s=="function"?s(n[0]):s;return f===n[0]||(n[0]=f,le(t)),f}]);return n},_=(e,t)=>{let{length:n}=e;if(n!==t.length)return!0;for(;n--;)if(e[n]!==t[n])return!0;return!1},G=e=>{let t=g(e);return t.current=e,d(()=>(...n)=>t.current(...n))},oe=(e,t)=>{if(e===t)return!0;for(let n in e)if(e[n]!==t[n])return!1;for(let n in t)if(!(n in e))return!1;return!0},H=(e,t=oe)=>(e.memo=t,e),J=e=>{let t=a,n=t.contexts?.get(e);return S(()=>{if(n)return n.deps.add(t),()=>n.deps.delete(t)},[n,t]),n?.value},fe=(e,t)=>{for(;e.depth>t.depth;)if(e=e.parent,e===t)return 1;for(;t.depth>e.depth;)if(t=t.parent,t===e)return-1;for(;e.parent!==t.parent;)e=e.parent,t=t.parent;return e.index-t.index},le=e=>{e.state===1||e.state===3||(h.length===0&&Z(()=>{let t=h.sort(fe);h=[];for(let n=0;n<t.length;++n){let s=t[n];s.state===1&&D(s)}W()}),h.push(e),e.state=1)},ce=e=>{let{children:t}=e.props;return typeof e.type=="function"&&(a=e,B=0,F=0,t=e.type(e.props)),U(t)?[]:Array.isArray(t)?t:[t]},ie=e=>U(e)?te:Array.isArray(e)?{type:Q,props:{children:e},key:void 0}:typeof e!="object"?{type:P,props:{nodeValue:e},key:void 0}:e,K=(e,t,n,s,f,o)=>({child:null,contexts:s?.contexts??null,depth:s?s.depth+1:0,effects:null,index:o,key:n,lastNode:null,node:re(e,t,f),parent:s,parentNode:f,prevNode:null,props:t,refs:null,sibling:null,state:1,type:e}),L=e=>{let{child:t,state:n}=e;if(n===1)D(e);else if(n===2)for(e.state=0;t;t=t.sibling)L(t)},x=({child:e,node:t})=>{if(t)return[t];let n=[];for(;e;e=e.sibling)n.push(...x(e));return n},D=e=>{if(e.effects)for(let r=0;r<e.effects.length;++r){let c=e.effects[r];c.after&&c.before&&(c.before(),c.before=void 0)}let t=e.child,n=t&&new Map;for(;t;t=t.sibling)n.set(t.key??t.index,t);let s=e.node??e.parentNode,f=ce(e);e.state=0,e.child=null;let o=e.node?null:e.prevNode;for(let r=0,c=null;r<f.length;++r){let{type:E,props:p,key:m}=ie(f[r]),l=n?.get(m??r),v=!1,y=null,A=!1;l?.type===E?(n.delete(m??r),l.index=r,l.sibling=null,(typeof l.type!="function"||!l.type.memo?.(l.props,p))&&(l.node&&(y=[l.node,l.props,p]),l.props=p,l.state=1),l.lastNode&&o!==l.prevNode&&(v=!0)):(l=K(E,p,m,e,s,r),l.node&&(A=!0)),l.prevNode=o,c?c.sibling=l:e.child=l,L(l),v&&b.push(l),y&&w.push(y),A&&C.push(l),l.lastNode&&(o=l.lastNode),c=l}if(e.lastNode=e.node??o??null,n)for(let r of n.values())O(r,!0);if(e.effects)for(let r=0;r<e.effects.length;++r){let c=e.effects[r];c.after&&k.push(c)}},O=(e,t)=>{e.state=3;let{effects:n,child:s,node:f}=e;if(n)for(let r=0;r<n.length;++r){let c=n[r];c.before&&(c.before(),c.before=void 0)}let o=t&&!f;for(;s;s=s.sibling)O(s,o);t&&f&&N.unshift(f)},W=()=>{let e=N;N=[];let t=b;b=[];let n=w;w=[];let s=C;C=[];let f=k;k=[];for(let o=e.length-1;o>=0;--o)e[o].remove();for(let o=0;o<t.length;++o){let r=t[o];r.prevNode?r.prevNode.after(...x(r)):r.parentNode.prepend(...x(r))}for(let o=0;o<n.length;++o)z(...n[o]);for(let o=0;o<s.length;++o){let r=s[o];r.prevNode?r.prevNode.after(r.node):r.parentNode.prepend(r.node)}for(let o=0;o<f.length;++o){let r=f[o];r.before=r.after(),r.after=void 0}},X=(e,t)=>{D(K(Q,{children:e},void 0,null,t,0)),W()};var{clearTimeout:ue,setTimeout:ae,setInterval:de}=globalThis,i=10,pe=H(({x:e,y:t})=>{let n=J(Y),s=d(()=>`rgb(${128+(e-t)/i*128}, ${128+(t-e)/i*128}, ${(e+t)/i/2*256})`),f=g(void 0),[o,r]=T("black");return u("div",{onpointermove:G(()=>{r(s),ue(f.current),f.current=ae(()=>r("black"),5e3)}),style:{backgroundColor:o,transition:o==="black"?"all 5s":"",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden"},children:n})}),Y=R(),he=()=>{let[e,t]=T(new Date().getSeconds());return S(()=>{de(()=>t(new Date().getSeconds()),1e3)}),u(Y,{value:e,children:u("div",{style:{cursor:"crosshair",display:"grid",gridTemplate:`repeat(${i}, 1fr) / repeat(${i}, 1fr)`,height:"100%"},children:Array.from({length:i*i},(n,s)=>u(pe,{x:s%i,y:Math.floor(s/i)},s))})})};X(u(he,{}),globalThis.window.document.getElementById("root"));})();