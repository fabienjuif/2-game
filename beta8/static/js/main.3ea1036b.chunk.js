(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{206:function(e,t,n){},207:function(e,t,n){},208:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(95),c=n.n(i),u=n(3),o=n(8),l=n(5),s=n(13),f=function(e){var t=e.children,n=e.width,i=e.height,c=e.windowWidth,f=e.windowHeight,h=Object(s.a)(e,["children","width","height","windowWidth","windowHeight"]),d=Object(r.useState)(.4),p=Object(u.a)(d,2),O=p[0],g=p[1],b=Object(r.useState)([(c-n*O)/2,(f-i*O)/2]),m=Object(u.a)(b,2),A=Object(u.a)(m[0],2),v=A[0],w=A[1],j=m[1],y=Object(r.useRef)(null);return Object(r.useEffect)(function(){y.current.interactive=!0,y.current.hitArea=new l.Rectangle(0,0,n,i),document.body.addEventListener("wheel",function(e){e.preventDefault(),g(function(t){return Math.max(.1,Math.min(3,t-e.deltaY/100))})}),y.current.on("pointerupoutside",function(){y.current.clickStart=void 0,y.current.pinchStart=void 0}),y.current.on("pointerup",function(){y.current.clickStart=void 0,y.current.pinchStart=void 0}),y.current.on("pointermove",function(e){var t=e.data,n=t.global,r=t.buttons;if(e.data.originalEvent.touches&&e.data.originalEvent.touches.length>1){var a=Object(u.a)(e.data.originalEvent.touches,2),i=a[0],c=i.clientX,o=i.clientY,l=a[1],s=l.clientX,f=l.clientY,h=Math.pow(s-c,2)+Math.pow(f-o,2);return y.current.pinchStart&&g(function(e){return Math.max(.1,Math.min(3,e+(h-y.current.pinchStart)/1e5))}),void(y.current.pinchStart=h)}if(0!==r){var d=n.x,p=n.y;if(y.current.clickStart){var O=Object(u.a)(y.current.clickStart,2),b=O[0],m=O[1];j(function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return[n+d-b,r+p-m]})}y.current.clickStart=[d,p]}})},[]),a.a.createElement(o.Container,Object.assign({},h,{ref:y,x:v,y:w,scale:O}),t)},h=n(98),d=n(11),p=function(e,t){return Math.round(Math.random()*(t-e)+e)},O=function(e){return[e>>16&255,e>>8&255,255&e]},g=function(e,t,n){return n|t<<8|e<<16},b=function(e){var t=O(e),n=Object(u.a)(t,3),r=n[0],a=n[1],i=n[2];return g(3*r/4,3*a/4,3*i/4)},m={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:(4-2*e)*e-1},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},easeInElastic:function(e){return(.04-.04/e)*Math.sin(25*e)+1},easeOutElastic:function(e){return.04*e/--e*Math.sin(25*e)},easeInOutElastic:function(e){return(e-=.5)<0?(.02+.01/e)*Math.sin(90*e):(.02-.01/e)*Math.sin(90*e)+1},easeInSin:function(e){return 1+Math.sin(Math.PI/2*e-Math.PI/2)},easeOutSin:function(e){return Math.sin(Math.PI/2*e)},easeInOutSin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}},A=Object(r.createContext)(),v=function(e){var t=e.children,n=e.width,i=e.height,c=Object(r.useState)(function(e,t){for(var n=[],r=Math.round(p(0,Math.ceil(e/20))),a=Math.round(p(0,Math.ceil(t/15))),i={x:Math.round(p(0,Math.ceil(e/20))),y:Math.round(p(0,Math.ceil(t/15)))};i.x===r;)i.x=p(0,Math.round(e/20));for(var c=0;c<Math.round(e/20);c+=1){var u=[];n.push(u);for(var o=0;o<Math.round(t/15);o+=1){var l=void 0;r===c&&a===o&&(l="player1"),i.x===c&&i.y===o&&(l="player2"),u.push({key:"".concat(c,"-").concat(o),x:c,y:o,player:l})}}return n}(n,i)),o=Object(u.a)(c,2),l=o[0],s=o[1],f=Object(r.useState)("player1"),h=Object(u.a)(f,2),O=h[0],g=h[1],b=Object(r.useState)(2),m=Object(u.a)(b,2),v=m[0],w=m[1];return a.a.createElement(A.Provider,{value:{getData:function(){return l},getPlayer:function(){return O},next:function(){g(function(e){return"player1"===e?"player2":"player1"}),w(2),"player1"!==O&&s(function(e){return e.map(function(e,t){return e.map(function(e,n){return Object(d.a)({},e,{player:function(){if(e.player)return e.player;var r=function(e,t){return l[e]&&l[e][t]&&l[e][t].player&&l[e][t].player};return r(t-1,n)||r(t+1,n)||r(n%2?t:t-1,n-1)||r(n%2?t+1:t,n-1)||r(n%2?t:t-1,n+1)||r(n%2?t+1:t,n+1)||void 0}()})})})})},ownTile:function(e,t){v<=0||(w(function(e){return e-1}),s(function(n){return n.map(function(n,r){return n.map(function(n,a){return r===e&&a===t?Object(d.a)({},n,{player:O}):n})})}))}}},t)},w=A,j=n(96),y=n.n(j),E=function(e){var t=e.x,n=e.y,i=e.tint,c=Object(s.a)(e,["x","y","tint"]),l=Object(r.useContext)(w).ownTile,f=Object(r.useState)(!1),h=Object(u.a)(f,2),d=h[0],p=h[1],O=Object(r.useRef)(void 0);return a.a.createElement(o.Sprite,Object.assign({},c,{image:y.a,anchor:.5,interactive:!0,x:20*t+n%2*10,y:15*n,tint:d?b(i):i,pointerdown:function(e){O.current=Date.now()},pointerup:function(e){O.current&&(O.current>Date.now()-200&&l(t,n),O.current=void 0)},pointerover:function(){p(!0)},pointerout:function(){p(!1)}}))},M=function(e){switch(e){case"player1":return 13377568;case"player2":return 2105548;default:return 16777215}},x=function(){var e,t=Object(r.useState)([]),n=Object(u.a)(t,2),i=n[0],c=n[1],l=(Object(r.useContext)(w)||{}).getData;return Object(o.useTick)(function(e){c(l().map(function(t,n){return t.map(function(t,r){if(!i[n]||!i[n][r])return Object(d.a)({},t,{tint:M(t.player)});var a=i[n][r];if(a.player!==t.player){var c=O(M(t.player)),o=Object(u.a)(c,3),l=o[0],s=o[1],f=o[2];return Object(d.a)({},t,{targetR:l,targetG:s,targetB:f,targetFrame:10,currentFrame:0,previousPlayer:a.player})}if(void 0===a.targetFrame)return a;if(a.currentFrame>=a.targetFrame)return a;var h=(a.currentFrame+e)/a.targetFrame,p=Math.min(1,m.linear(h)),b=O(M(a.previousPlayer)),A=Object(u.a)(b,3),v=A[0],w=A[1],j=A[2],y=function(e,t){var n=t-e;if(0===n)return e;var r=p*n+e;return Math.round(r)},E=g(y(v,a.targetR),y(w,a.targetG),y(j,a.targetB));return Object(d.a)({},a,{tint:E,currentFrame:a.currentFrame+e})})}))}),(e=[]).concat.apply(e,Object(h.a)(i.map(function(e){return e.map(function(e){var t=e.key,n=e.x,r=e.y,i=e.tint;return a.a.createElement(E,{key:t,x:n,y:r,tint:i||16777215})})})))},S=function(e){return a.a.createElement(o.Container,e,a.a.createElement(x,null))},B=n(97),C=n.n(B),k=function(e){var t=e.x,n=e.y,i=e.targetX,c=e.targetY,l=e.speed,f=e.easeTime,h=void 0===f?"linear":f,p=e.easeX,O=void 0===p?"linear":p,g=e.easeY,b=void 0===g?"linear":g,A=Object(s.a)(e,["x","y","targetX","targetY","speed","easeTime","easeX","easeY"]),v=Object(r.useState)(0),w=Object(u.a)(v,2),j=w[0],y=w[1],E=Object(r.useState)({distance:0,frames:0,x:i,y:c}),M=Object(u.a)(E,2),x=M[0],S=M[1],B=Object(r.useState)({x:t,y:n}),k=Object(u.a)(B,2),I=k[0],Q=k[1];return Object(r.useEffect)(function(){var e=Math.sqrt(Math.pow(i-t,2)+Math.pow(c-n,2)),r=e/(l/60);S(Object(d.a)({},x,{distance:e,frames:r})),y(0)},[i,c,t,n,l]),Object(r.useEffect)(function(){if(0!==x.distance){var e=j/x.frames,r=m[h](e)*x.distance/x.distance,a=(x.x-t)*m[O](r)+t,i=(x.y-n)*m[b](r)+n;Q({x:a,y:i})}},[j]),Object(o.useTick)(function(e){0!==x.distance&&(x.frames<=j||y(j+e))}),a.a.createElement(o.Sprite,Object.assign({},A,{image:C.a,x:I.x,y:I.y,interactive:!1,anchor:.5}))},I=function(e){return Array.from({length:e}).map(function(e,t){return{key:t,x:p(50,750),y:p(50,550),targetX:p(50,750),targetY:p(50,550),speed:p(100,200),scale:p(.5,2),tint:p(5592405,16777215),easeTime:"easeOutCubic",easeX:"easeInCubic",easeY:"easeInQuint"}})},Q=function(e){var t=e.count,n=Object(r.useState)([]),i=Object(u.a)(n,2),c=i[0],o=i[1];return Object(r.useEffect)(function(){o(I(t)),setInterval(function(){o(I(t))},3e3)},[]),c.map(function(e){return a.a.createElement(k,e)})},F=function(e){return a.a.createElement(o.ParticleContainer,null,a.a.createElement(Q,{count:10}))},R=function(e){var t=e.width,n=e.height,i=Object(s.a)(e,["width","height"]),c=Object(r.useState)(),f=Object(u.a)(c,2),h=f[0],d=f[1],p=Object(o.useApp)();return Object(r.useEffect)(function(){var e=l.RenderTexture.create(t,n),r=new l.Graphics;r.clear(),r.beginFill(0,.5),r.drawRect(0,0,t,n),r.endFill(),r.beginFill(16777215,1),r.drawCircle(t/2,n/2,100),r.endFill(),p.renderer.render(r,e),d(e)},[t,n]),h?a.a.createElement(o.Sprite,Object.assign({},i,{texture:h,width:t,height:n,x:0,y:0})):null},X=(n(206),function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=Object(u.a)(t[0],2),i=n[0],c=n[1],s=t[1],h=Object(r.useState)(null),d=Object(u.a)(h,2),p=d[0],O=d[1],g=Object(r.useRef)(void 0);return Object(r.useEffect)(function(){s([window.innerWidth-20,window.innerHeight-20])},[]),Object(r.useLayoutEffect)(function(){p!==g.current&&O(g.current)}),!(!i||!c)&&a.a.createElement(w.Consumer,null,function(e){return a.a.createElement(o.Stage,{width:i,height:c,options:{autoResize:!0,transparent:!0,forceFXAA:!0,resolution:window.devicePixelRatio,autoDensity:!0,roundPixel:!1,resizeTo:window}},a.a.createElement(w.Provider,{value:e},a.a.createElement(F,null),a.a.createElement(f,{windowWidth:i,windowHeight:c,width:800,height:600},a.a.createElement(S,null)),a.a.createElement(R,{width:i,height:c,blendMode:l.BLEND_MODES.MULTIPLY})))})}),Y=(n(207),function(){var e=Object(r.useContext)(w),t=e.next,n=e.getPlayer;return a.a.createElement("div",{className:"ui"},a.a.createElement("h1",null,"2-game"),a.a.createElement("h3",null,"".concat(n()," turn!")),a.a.createElement("button",{onClick:t},"player1"===n()?"To player 2":"Next turn"))}),T=function(){return a.a.createElement(v,{width:780,height:480},a.a.createElement(X,null),a.a.createElement(Y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(T,null),document.body),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},96:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQ4y63VPQ6AIAwGUOAmXsDdAQ8vg7sXcHX1BCgkJeWvBGgTY2zsC0LyKQRRhzmFfR+LL9ejStYgvS4W98x1+/vfh2e5640GMeQANJwN1mBZgpIB8hNTWLp9SQd7MVyKEwsgFxaBHJg/FNhDDixa4SwG84oTyw5lFmuCPRi8qzixKjiKBRA3Z7BiOIxiIRxaOdjCivHVCthKeBQDVnD/Aj5qzqRvxuJvXgAAAABJRU5ErkJggg=="},97:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAABY0lEQVR42uxXyw3CMAxtSoEFYALEHalDwApwYAtOwAm4MQUHWAGG4MC5YgKYgI9CHTWldZ0moQVxqCVEZFt+ieM8u4xz7lDCGMsYQl9m6yPFk4v1qRkrJ70b3y88x++wDHioF8rB/MEv2zq5QekjpT+7v4EoaQ1v8fq6a2TsxzMXQfJ8pLjOj+T/gCBNXwM6LOupfygQKAL4wZryUYmn2wkOIAHyfKpiiCW8k49s/3siqgBMbFZVl5cmUxDBgcDemIXzAkhuU5U0EHF7dM8wugcgq3GttLsABsGsDhjk1o8Bd/wuM3rApnRFpk6eUAVme5cidVHgVMTp5inSiU+GGyG1ewDBjc+q6gAk2QhjfdTsdOzuFgHBXbgi1QqoPCAoXdXMBnqTwcX4HUEwXzFElt4mioxcdkABDWTCiW5REJ3N6kS6AYQiYGsgAMHsjiXJ9skuXD3YUoTpvmFV36S2/i8BBgBIxbG+UAC9ywAAAABJRU5ErkJggg=="},99:function(e,t,n){e.exports=n(208)}},[[99,1,2]]]);
//# sourceMappingURL=main.3ea1036b.chunk.js.map