(this["webpackJsonpordinary-sausearch"]=this["webpackJsonpordinary-sausearch"]||[]).push([[0],{15:function(e,t,n){"use strict";n.d(t,"l",(function(){return y})),n.d(t,"k",(function(){return S})),n.d(t,"i",(function(){return C})),n.d(t,"j",(function(){return k})),n.d(t,"h",(function(){return I})),n.d(t,"f",(function(){return R})),n.d(t,"g",(function(){return q})),n.d(t,"e",(function(){return B})),n.d(t,"a",(function(){return L})),n.d(t,"d",(function(){return N})),n.d(t,"b",(function(){return F})),n.d(t,"c",(function(){return z}));var a,r,i,c=n(46),s=n(16),l=n(45),o=n(62),u=n(67),d=(r=0,i=5,function(e){return Math.min(i,Math.max(r,parseInt(e)))}),j="filters/update-query",f="filters/update-min-sausages",b="filters/update-max-sausages",h="filters/update-min-ruffalos",O="filters/update-max-ruffalos",g="filters/update-sausage-disqualified",p="filters/update-will-it-blow-disqualified",x="filters/update-missing-will-it-blow-disqualified",m="filters/reset",v=(a={},Object(s.a)(a,j,{field:"query",defaultValue:""}),Object(s.a)(a,f,{field:"minSausages",converter:d,defaultValue:0}),Object(s.a)(a,b,{field:"maxSausages",converter:d,defaultValue:5}),Object(s.a)(a,h,{field:"minRuffalos",converter:d,defaultValue:0}),Object(s.a)(a,O,{field:"maxRuffalos",converter:d,defaultValue:5}),Object(s.a)(a,g,{field:"includeSausageDisqualified",converter:Boolean,defaultValue:!0}),Object(s.a)(a,p,{field:"includeWillItBlowDisqualified",converter:Boolean,defaultValue:!0}),Object(s.a)(a,x,{field:"includeMissingWillItBlow",converter:Boolean,defaultValue:!0}),a),w=function(e){return function(t){return{type:e,value:t}}},y=w(j),S=w(f),C=w(b),k=w(h),I=w(O),R=w(g),q=w(p),B=w(x),L={type:m},M=Object.fromEntries(Object.values(v).map((function(e){return[e.field,e.defaultValue]}))),D=function(){for(var e=o.parse(window.location.search),t=Object(c.a)(Object(c.a)({},M),e),n=0,a=Object.values(v);n<a.length;n++){var r=a[n];r.converter&&(t[r.field]=r.converter(t[r.field]))}return t}();var P="dataset/load";var W=Object(l.combineReducers)({filters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0,n=t.type;if(n===m)return M;var a=v[n];return a?Object(c.a)(Object(c.a)({},e),{},Object(s.a)({},a.field,(a.converter||function(e){return e})(t.value))):e},dataset:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{loaded:!1,values:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case P:return{loaded:!0,values:t.value};default:return e}}}),N=Object(l.createStore)(W,Object(u.composeWithDevTools)(Object(l.applyMiddleware)((function(e){return function(t){return function(n){var a=t(n),r=new URLSearchParams(o.stringify(e.getState().filters));return window.history.pushState({},document.title,"".concat(window.location.pathname,"?").concat(r)),a}}}))));fetch("/Ordinary-Sausearch/dataset.json").then((function(e){return e.json()})).then((function(e){return N.dispatch({type:P,value:e})}));var V=function(e){return e.replace(/\W/g,"")},F=function(e){return e.filters},z=function(e){return e.dataset.values.filter((function(t){return V(t.name.toLowerCase()).includes(V(e.filters.query.toLowerCase()))})).filter((function(t){return t.tags&&t.tags.includes("sausage-disqualified")?e.filters.includeSausageDisqualified:t.sausages>=e.filters.minSausages&&t.sausages<=e.filters.maxSausages})).filter((function(t){return t.tags&&t.tags.includes("will-it-blow-disqualified")?e.filters.includeWillItBlowDisqualified:!(!e.filters.includeMissingWillItBlow||t.ruffalos)||t.ruffalos>=e.filters.minRuffalos&&t.ruffalos<=e.filters.maxRuffalos}))}},75:function(e,t,n){"use strict";t.a=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,123)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))}},76:function(e,t,n){"use strict";n(97);var a=n(16),r=n(47),i=n(0),c=n(28),s=n(15),l=n(191),o=n(181),u=n(178),d=n(179),j=n(180),f=n(169),b=n(78),h=n(196),O=n(73),g=n.n(O),p=n(71),x=n.n(p),m=n(72),v=n.n(m),w=n(182),y=n(193),S=n(74),C=n.n(S),k=n(70),I=n.n(k),R=n(195),q=n(174),B=n(173),L=n(175),M=n(176),D=n(197),P=n(68),W=n.n(P),N=n(194),V=n(69),F=n(5);function z(e){var t=e.renderButtonChildren,n=e.renderPopupChildren,a=Object(i.useState)(!1),c=Object(r.a)(a,2),s=c[0],l=c[1],o=function(){l(!1)};return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(f.a,{"aria-label":"delete",color:"inherit",onClick:function(){l(!0)},children:t()}),Object(F.jsx)(R.a,{open:s,onClose:o,"aria-labelledby":"draggable-dialog-title",children:n(o)})]})}var E=function(){return Object(F.jsx)(z,{renderButtonChildren:function(){return Object(F.jsx)(I.a,{})},renderPopupChildren:function(e){return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(B.a,{children:"Info"}),Object(F.jsx)(q.a,{children:Object(F.jsxs)(b.a,{children:["Any kind of contribution is welcome, so feel free to reach out to us on ",Object(F.jsx)("a",{href:"https://github.com/TheGrizzlyDev/Ordinary-Sausearch",children:"Github"})]})}),Object(F.jsx)(L.a,{children:Object(F.jsx)(M.a,{onClick:e,color:"primary",children:"Close"})})]})}})};function G(){var e=Object(i.useState)(!1),t=Object(r.a)(e,2),n=t[0],a=t[1];Object(i.useEffect)((function(){a(!!window.navigator.share)}),[]);var c=Object(i.useState)(!1),s=Object(r.a)(c,2),l=s[0],o=s[1];return Object(F.jsxs)(f.a,{"aria-label":"delete",color:"inherit",onClick:function(){var e=window.location.href;n?navigator.share({title:"Ordinary Sausearch",url:e}).catch(console.error):(console.log(e),W()(e),o(!0))},children:[Object(F.jsx)(x.a,{}),Object(F.jsx)(N.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:l,autoHideDuration:4e3,onClose:function(){return o(!1)},message:"URL copied to your clipboard"})]})}function T(){var e=Object(c.c)(s.c),t=Object(i.useState)(!1),n=Object(r.a)(t,2),a=n[0],l=n[1];return Object(F.jsxs)(f.a,{"aria-label":"delete",color:"inherit",onClick:function(){V(JSON.stringify(e),"sausages.json"),l(!0)},children:[Object(F.jsx)(v.a,{}),Object(F.jsx)(N.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:a,autoHideDuration:4e3,onClose:function(){return l(!1)},message:"Search results downloaded"})]})}var A=Object(u.a)((function(e){return{logo:{border:"2px solid #20202050"},grow:{flexGrow:1},title:Object(a.a)({paddingLeft:"1em",display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:{position:"relative",borderRadius:e.shape.borderRadContainer},searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(a.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"}),padding:{height:"calc(56px + ".concat(e.spacing(2),"px)")},filterBox:{padding:"20px"}}}));function J(){var e=A(),t=Object(c.c)(s.b),n=Object(c.b)(),a=function(e,t){return function(n){return t(n.target[e])}},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"value";return a(t,(function(t){return n(e(t))}))},i=function(e){return r(e,"checked")};return Object(F.jsxs)("div",{className:e.grow,children:[Object(F.jsx)("div",{className:e.padding}),Object(F.jsx)(d.a,{position:"fixed",children:Object(F.jsxs)(j.a,{children:[Object(F.jsx)(D.a,{className:e.logo,alt:"Ordinary Sausage logo",src:"/Ordinary-Sausearch/logo.png"}),Object(F.jsx)(b.a,{className:e.title,variant:"h6",noWrap:!0,children:"Ordinary Sausearch"}),Object(F.jsxs)("div",{className:e.search,children:[Object(F.jsx)("div",{className:e.searchIcon,children:Object(F.jsx)(g.a,{})}),Object(F.jsx)(h.a,{placeholder:"Search\u2026",classes:{root:e.inputRoot,input:e.inputInput},inputProps:{"aria-label":"search"},value:t.query,onChange:r(s.l)})]}),Object(F.jsx)(z,{renderButtonChildren:function(){return Object(F.jsx)(C.a,{})},renderPopupChildren:function(a){return Object(F.jsxs)("div",{classes:e.filterBox,children:[Object(F.jsx)(B.a,{children:"Advanced filters"}),Object(F.jsx)(q.a,{children:Object(F.jsxs)(o.a,{column:!0,children:[Object(F.jsx)(l.a,{label:"Min sausage score",type:"number",InputLabelProps:{shrink:!0},value:t.minSausages,onChange:r(s.k)}),Object(F.jsx)(l.a,{label:"Max sausage score",type:"number",InputLabelProps:{shrink:!0},value:t.maxSausages,onChange:r(s.i)}),Object(F.jsx)(l.a,{label:"Min Ruffalos score",type:"number",InputLabelProps:{shrink:!0},value:t.minRuffalos,onChange:r(s.j)}),Object(F.jsx)(l.a,{label:"Max Ruffalos score",type:"number",InputLabelProps:{shrink:!0},value:t.maxRuffalos,onChange:r(s.h)}),Object(F.jsx)(w.a,{control:Object(F.jsx)(y.a,{checked:t.includeSausageDisqualified,onChange:i(s.f),color:"primary"}),label:"Show disqualified sausages"}),Object(F.jsx)(w.a,{control:Object(F.jsx)(y.a,{checked:t.includeWillItBlowDisqualified,onChange:i(s.g),color:"primary"}),label:"Show disqualified 'Will it blow?'"}),Object(F.jsx)(w.a,{control:Object(F.jsx)(y.a,{checked:t.includeMissingWillItBlow,onChange:i(s.e),color:"primary"}),label:"Show missing 'Will it blow?'"})]})}),Object(F.jsxs)(L.a,{children:[Object(F.jsx)(M.a,{onClick:function(){n(s.a),a()},color:"primary",children:"Reset"}),Object(F.jsx)(M.a,{onClick:a,color:"primary",children:"Close"})]})]})}}),Object(F.jsx)("div",{className:e.grow}),Object(F.jsx)(G,{}),Object(F.jsx)(T,{}),Object(F.jsx)(E,{})]})})]})}var H=n(184),U=n(188),Q=n(187),Z=n(183),K=n(185),X=n(186),Y=n(119),$=Object(u.a)({table:{minWidth:650},tableRow:{height:64}}),_=function(e){return function(t){var n=t.rating,a=n%1;return Object(F.jsxs)("span",{children:[!!n&&new Array(parseInt(n)).fill().map((function(){return Object(F.jsx)("img",{alt:"",width:24,src:e})})),a>0&&Object(F.jsx)("img",{alt:"",width:24,height:Math.round(24*a),src:e,style:{objectFit:"cover",objectPosition:"0% 100%"}})]})}},ee=_("".concat("/Ordinary-Sausearch","/sausage.png")),te=_("".concat("/Ordinary-Sausearch","/ruffalo.png"));function ne(){var e=Object(c.c)(s.c),t=$();return Object(F.jsx)(Z.a,{component:Y.a,children:Object(F.jsxs)(H.a,{className:t.table,"aria-label":"simple table",children:[Object(F.jsx)(K.a,{children:Object(F.jsxs)(X.a,{children:[Object(F.jsx)(Q.a,{children:"Name"}),Object(F.jsx)(Q.a,{align:"right",children:"Sausages"}),Object(F.jsx)(Q.a,{align:"right",children:"Ruffalos"})]})}),Object(F.jsx)(U.a,{children:e.map((function(e){return Object(F.jsxs)(X.a,{className:t.tableRow,children:[Object(F.jsx)(Q.a,{component:"th",scope:"row",children:e.name}),Object(F.jsx)(Q.a,{align:"right",children:Object(F.jsx)(ee,{rating:e.sausages})}),Object(F.jsx)(Q.a,{align:"right",children:Object(F.jsx)(te,{rating:e.ruffalos})})]},e.name)}))})]})})}var ae=n(189),re=n(190);t.a=function(){return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(ae.a,{}),Object(F.jsx)(J,{}),Object(F.jsx)(re.a,{children:Object(F.jsx)(ne,{})})]})}},80:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),r=n(12),i=(n(96),n(76)),c=n(75),s=n(28),l=n(15),o=n(5),u=function(){return Object(r.render)(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(s.a,{store:l.d,children:Object(o.jsx)(i.a,{})})}),document.getElementById("root"))};{function d(){window.dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],d("js",new Date),d("config","G-8S3Z9M64CQ")}u(),Object(c.a)()}.call(this,n(91)(e))},96:function(e,t,n){},97:function(e,t,n){}},[[80,1,2]]]);
//# sourceMappingURL=main.8f0258d4.chunk.js.map