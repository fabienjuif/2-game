(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{206:function(e,t,n){},207:function(e,t,n){},208:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(94),u=n.n(i),c=n(5),o=n(8),s=n(4),l=function(e){var t=e.children,n=e.width,i=e.height,u=e.windowWidth,l=e.windowHeight,f=Object(r.useState)(.4),h=Object(c.a)(f,2),d=h[0],A=h[1],m=Object(r.useState)([(u-n*d)/2,(l-i*d)/2]),g=Object(c.a)(m,2),p=Object(c.a)(g[0],2),v=p[0],O=p[1],w=g[1],b=Object(r.useRef)(null);Object(o.useApp)();return Object(r.useEffect)(function(){b.current.interactive=!0,b.current.hitArea=new s.Rectangle(0,0,n,i),document.body.addEventListener("wheel",function(e){e.preventDefault(),A(function(t){return Math.max(.1,Math.min(3,t-e.deltaY/100))})}),b.current.on("pointerupoutside",function(){b.current.clickStart=void 0,b.current.pinchStart=void 0}),b.current.on("pointerup",function(){b.current.clickStart=void 0,b.current.pinchStart=void 0}),b.current.on("pointermove",function(e){var t=e.data,n=t.global,r=t.buttons;if(e.data.originalEvent.touches&&e.data.originalEvent.touches.length>1){var a=Object(c.a)(e.data.originalEvent.touches,2),i=a[0],u=i.clientX,o=i.clientY,s=a[1],l=s.clientX,f=s.clientY,h=Math.pow(l-u,2)+Math.pow(f-o,2);return b.current.pinchStart&&A(function(e){return Math.max(.1,Math.min(3,e+(h-b.current.pinchStart)/1e5))}),void(b.current.pinchStart=h)}if(0!==r){var d=n.x,m=n.y;if(b.current.clickStart){var g=Object(c.a)(b.current.clickStart,2),p=g[0],v=g[1];w(function(e){var t=Object(c.a)(e,2),n=t[0],r=t[1];return[n+d-p,r+m-v]})}b.current.clickStart=[d,m]}})},[]),a.a.createElement(o.Container,{ref:b,x:v,y:O,scale:d},t)},f=n(97),h=n(12),d=function(e,t){return Math.round(Math.random()*(t-e)+e)},A=function(e){return[e>>16&255,e>>8&255,255&e]},m={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:(4-2*e)*e-1},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},easeInElastic:function(e){return(.04-.04/e)*Math.sin(25*e)+1},easeOutElastic:function(e){return.04*e/--e*Math.sin(25*e)},easeInOutElastic:function(e){return(e-=.5)<0?(.02+.01/e)*Math.sin(90*e):(.02-.01/e)*Math.sin(90*e)+1},easeInSin:function(e){return 1+Math.sin(Math.PI/2*e-Math.PI/2)},easeOutSin:function(e){return Math.sin(Math.PI/2*e)},easeInOutSin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}},g=Object(r.createContext)(),p=function(e){var t=e.children,n=e.width,i=e.height,u=Object(r.useState)(function(e,t){for(var n=[],r=Math.round(d(0,Math.ceil(e/20))),a=Math.round(d(0,Math.ceil(t/15))),i={x:Math.round(d(0,Math.ceil(e/20))),y:Math.round(d(0,Math.ceil(t/15)))};i.x===r;)i.x=d(0,Math.round(e/20));for(var u=0;u<Math.round(e/20);u+=1){var c=[];n.push(c);for(var o=0;o<Math.round(t/15);o+=1){var s=void 0;r===u&&a===o&&(s="player1"),i.x===u&&i.y===o&&(s="player2"),c.push({key:"".concat(u,"-").concat(o),x:20*u+o%2*10,y:15*o,player:s})}}return n}(n,i)),o=Object(c.a)(u,2),s=o[0],l=o[1];return a.a.createElement(g.Provider,{value:{getData:function(){return s},next:function(){l(function(e){return e.map(function(e,t){return e.map(function(e,n){return Object(h.a)({},e,{player:function(){if(e.player)return e.player;var r=function(e,t){return s[e]&&s[e][t]&&s[e][t].player&&s[e][t].player};return r(t-1,n)||r(t+1,n)||r(n%2?t:t-1,n-1)||r(n%2?t+1:t,n-1)||r(n%2?t:t-1,n+1)||r(n%2?t+1:t,n+1)||void 0}()})})})})}}},t)},v=g,O=n(95),w=n.n(O),b=function(e){return a.a.createElement(o.Sprite,Object.assign({image:w.a,anchor:.5},e))},j=function(e){switch(e){case"player1":return 13377568;case"player2":return 2105548;default:return 16777215}},y=function(e){e.width,e.height;var t,n=Object(r.useState)([]),i=Object(c.a)(n,2),u=i[0],s=i[1],l=(Object(r.useContext)(v)||{}).getData;return Object(o.useTick)(function(e){s(l().map(function(t,n){return t.map(function(t,r){if(!u[n]||!u[n][r])return Object(h.a)({},t,{tint:j(t.player)});var a=u[n][r];if(a.player!==t.player){var i=A(j(t.player)),o=Object(c.a)(i,3),s=o[0],l=o[1],f=o[2];return Object(h.a)({},t,{targetR:s,targetG:l,targetB:f,targetFrame:10,currentFrame:0,previousPlayer:a.player})}if(void 0===a.targetFrame)return a;if(a.currentFrame>=a.targetFrame)return a;var d,g,p=(a.currentFrame+e)/a.targetFrame,v=Math.min(1,m.linear(p)),O=A(j(a.previousPlayer)),w=Object(c.a)(O,3),b=w[0],y=w[1],E=w[2],M=function(e,t){var n=t-e;if(0===n)return e;var r=v*n+e;return Math.round(r)},x=(d=M(b,a.targetR),g=M(y,a.targetG),M(E,a.targetB)|g<<8|d<<16);return Object(h.a)({},a,{tint:x,currentFrame:a.currentFrame+e})})}))}),(t=[]).concat.apply(t,Object(f.a)(u.map(function(e){return e.map(function(e){var t=e.key,n=e.x,r=e.y,i=e.tint;return a.a.createElement(b,{key:t,x:n,y:r,tint:i||16777215})})})))},E=function(e){return a.a.createElement(o.ParticleContainer,e,a.a.createElement(y,{width:780,height:580}))},M=n(98),x=n(96),S=n.n(x),B=function(e){var t=e.x,n=e.y,i=e.targetX,u=e.targetY,s=e.speed,l=e.easeTime,f=void 0===l?"linear":l,d=e.easeX,A=void 0===d?"linear":d,g=e.easeY,p=void 0===g?"linear":g,v=Object(M.a)(e,["x","y","targetX","targetY","speed","easeTime","easeX","easeY"]),O=Object(r.useState)(0),w=Object(c.a)(O,2),b=w[0],j=w[1],y=Object(r.useState)({distance:0,frames:0,x:i,y:u}),E=Object(c.a)(y,2),x=E[0],B=E[1],C=Object(r.useState)({x:t,y:n}),k=Object(c.a)(C,2),Q=k[0],I=k[1];return Object(r.useEffect)(function(){var e=Math.sqrt(Math.pow(i-t,2)+Math.pow(u-n,2)),r=e/(s/60);B(Object(h.a)({},x,{distance:e,frames:r})),j(0)},[i,u,t,n,s]),Object(r.useEffect)(function(){if(0!==x.distance){var e=b/x.frames,r=m[f](e)*x.distance/x.distance,a=(x.x-t)*m[A](r)+t,i=(x.y-n)*m[p](r)+n;I({x:a,y:i})}},[b]),Object(o.useTick)(function(e){0!==x.distance&&(x.frames<=b||j(b+e))}),a.a.createElement(o.Sprite,Object.assign({},v,{image:S.a,x:Q.x,y:Q.y,interactive:!1,anchor:.5}))},C=function(e){return Array.from({length:e}).map(function(e,t){return{key:t,x:d(50,750),y:d(50,550),targetX:d(50,750),targetY:d(50,550),speed:d(100,200),scale:d(.5,2),tint:d(5592405,16777215),easeTime:"easeOutCubic",easeX:"easeInCubic",easeY:"easeInQuint"}})},k=function(e){var t=e.count,n=Object(r.useState)([]),i=Object(c.a)(n,2),u=i[0],o=i[1];return Object(r.useEffect)(function(){o(C(t)),setInterval(function(){o(C(t))},3e3)},[]),u.map(function(e){return a.a.createElement(B,e)})},Q=function(e){return a.a.createElement(o.ParticleContainer,null,a.a.createElement(k,{count:10}))},I=(n(206),function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=Object(c.a)(t[0],2),i=n[0],u=n[1],s=t[1];return Object(r.useEffect)(function(){s([window.innerWidth-20,window.innerHeight-20])},[]),!(!i||!u)&&a.a.createElement(v.Consumer,null,function(e){return a.a.createElement(o.Stage,{width:i,height:u,options:{autoResize:!0,transparent:!0,forceFXAA:!0,resolution:window.devicePixelRatio,autoDensity:!0,roundPixel:!1,resizeTo:window}},a.a.createElement(v.Provider,{value:e},a.a.createElement(Q,null),a.a.createElement(l,{windowWidth:i,windowHeight:u,width:800,height:600},a.a.createElement(E,null))))})}),X=(n(207),function(){var e=Object(r.useContext)(v).next;return a.a.createElement("div",{className:"ui"},a.a.createElement("h1",null,"2-game"),a.a.createElement("button",{onClick:e},"next turn"))}),F=function(){return a.a.createElement(p,{width:780,height:480},a.a.createElement(I,null),a.a.createElement(X,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(F,null),document.body),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},95:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQ4y63VPQ6AIAwGUOAmXsDdAQ8vg7sXcHX1BCgkJeWvBGgTY2zsC0LyKQRRhzmFfR+LL9ejStYgvS4W98x1+/vfh2e5640GMeQANJwN1mBZgpIB8hNTWLp9SQd7MVyKEwsgFxaBHJg/FNhDDixa4SwG84oTyw5lFmuCPRi8qzixKjiKBRA3Z7BiOIxiIRxaOdjCivHVCthKeBQDVnD/Aj5qzqRvxuJvXgAAAABJRU5ErkJggg=="},96:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAABY0lEQVR42uxXyw3CMAxtSoEFYALEHalDwApwYAtOwAm4MQUHWAGG4MC5YgKYgI9CHTWldZ0moQVxqCVEZFt+ieM8u4xz7lDCGMsYQl9m6yPFk4v1qRkrJ70b3y88x++wDHioF8rB/MEv2zq5QekjpT+7v4EoaQ1v8fq6a2TsxzMXQfJ8pLjOj+T/gCBNXwM6LOupfygQKAL4wZryUYmn2wkOIAHyfKpiiCW8k49s/3siqgBMbFZVl5cmUxDBgcDemIXzAkhuU5U0EHF7dM8wugcgq3GttLsABsGsDhjk1o8Bd/wuM3rApnRFpk6eUAVme5cidVHgVMTp5inSiU+GGyG1ewDBjc+q6gAk2QhjfdTsdOzuFgHBXbgi1QqoPCAoXdXMBnqTwcX4HUEwXzFElt4mioxcdkABDWTCiW5REJ3N6kS6AYQiYGsgAMHsjiXJ9skuXD3YUoTpvmFV36S2/i8BBgBIxbG+UAC9ywAAAABJRU5ErkJggg=="},99:function(e,t,n){e.exports=n(208)}},[[99,1,2]]]);
//# sourceMappingURL=main.26495914.chunk.js.map