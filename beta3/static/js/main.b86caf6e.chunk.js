(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{206:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(94),u=n.n(i),c=n(8),o=n(4),s=n(97),A=n(9),f=n(21),l=function(e,t){return Math.random()*(t-e)+e},g=function(e){return[e>>16&255,e>>8&255,255&e]},m={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:(4-2*e)*e-1},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},easeInElastic:function(e){return(.04-.04/e)*Math.sin(25*e)+1},easeOutElastic:function(e){return.04*e/--e*Math.sin(25*e)},easeInOutElastic:function(e){return(e-=.5)<0?(.02+.01/e)*Math.sin(90*e):(.02-.01/e)*Math.sin(90*e)+1},easeInSin:function(e){return 1+Math.sin(Math.PI/2*e-Math.PI/2)},easeOutSin:function(e){return Math.sin(Math.PI/2*e)},easeInOutSin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}},h=n(95),p=n.n(h),d=function(e){return r.a.createElement(c.Sprite,Object.assign({image:p.a,anchor:.5},e))},y=function(e){switch(e){case"player1":return 13377568;case"player2":return 2105548;default:return 16777215}},O=function(e){var t,n=e.width,i=e.height,u=Object(a.useState)(function(e,t){for(var n=[],a=Math.round(l(0,Math.ceil(e/20))),r=Math.round(l(0,Math.ceil(t/15))),i={x:Math.round(l(0,Math.ceil(e/20))),y:Math.round(l(0,Math.ceil(t/15)))};i.x===a;)i.x=l(0,Math.floor(e/20));for(var u=0;u<Math.floor(e/20);u+=1){var c=[];n.push(c);for(var o=0;o<Math.floor(t/15);o+=1){var s=void 0;a===u&&r===o&&(s="player1"),i.x===u&&i.y===o&&(s="player2"),c.push({key:"".concat(u,"-").concat(o),x:20*u+o%2*10,y:15*o,player:s,tint:y(s)})}}return n}(n,i)),o=Object(A.a)(u,2),h=o[0],p=o[1],O=Object(a.useState)(Date.now()),M=Object(A.a)(O,2),v=M[0],w=M[1];return Object(c.useTick)(function(e){p(function(e,t,n){return Date.now()-t<500?e:(n(Date.now()),e.map(function(t,n){return t.map(function(a,r){var i=a.player?a.player:e[n-1]&&e[n-1][r]&&e[n-1][r].player?e[n-1][r].player:e[n+1]&&e[n+1][r]&&e[n+1][r].player?e[n+1][r].player:t[r-1]&&t[r-1].player?t[r-1].player:t[r+1]&&t[r+1].player?t[r+1].player:void 0,u=Object(f.a)({},a);if(a.player!==i){var c=y(i),o=g(c),s=Object(A.a)(o,3),l=s[0],m=s[1],h=s[2];u.player=i,u.currentFrame=0,u.targetFrame=20,u.previousTint=a.tint||16777215,u.targetTint=c,u.targetR=l,u.targetG=m,u.targetB=h,u.tint=16777215}return u})}))}(h,v,w).map(function(t,n){return t.map(function(t,n){if(void 0===t.targetFrame)return t;if(t.currentFrame>=t.targetFrame)return t;var a,r,i=(t.currentFrame+e)/t.targetFrame,u=Math.min(1,m.linear(i)),c=g(t.previousTint),o=Object(A.a)(c,3),s=o[0],l=o[1],h=o[2],p=function(e,t){var n=t-e;if(0===n)return e;var a=u*n+e;return Math.round(a)},d=(a=p(s,t.targetR),r=p(l,t.targetG),p(h,t.targetB)|r<<8|a<<16);return Object(f.a)({},t,{tint:d,currentFrame:t.currentFrame+e})})}))}),(t=[]).concat.apply(t,Object(s.a)(h.map(function(e){return e.map(function(e){var t=e.key,n=e.x,a=e.y,i=e.tint;return r.a.createElement(d,{key:t,x:n,y:a,tint:i})})})))},M=function(e){return r.a.createElement(c.ParticleContainer,e,r.a.createElement(O,{width:780,height:580}))},v=n(98),w=n(96),E=n.n(w),b=function(e){var t=e.x,n=e.y,i=e.targetX,u=e.targetY,o=e.speed,s=e.easeTime,l=void 0===s?"linear":s,g=e.easeX,h=void 0===g?"linear":g,p=e.easeY,d=void 0===p?"linear":p,y=Object(v.a)(e,["x","y","targetX","targetY","speed","easeTime","easeX","easeY"]),O=Object(a.useState)(0),M=Object(A.a)(O,2),w=M[0],b=M[1],j=Object(a.useState)({distance:0,frames:0,x:i,y:u}),x=Object(A.a)(j,2),B=x[0],C=x[1],Q=Object(a.useState)({x:t,y:n}),I=Object(A.a)(Q,2),S=I[0],k=I[1];return Object(a.useEffect)(function(){var e=Math.sqrt(Math.pow(i-t,2)+Math.pow(u-n,2)),a=e/(o/60);C(Object(f.a)({},B,{distance:e,frames:a})),b(0)},[i,u,t,n,o]),Object(a.useEffect)(function(){if(0!==B.distance){var e=w/B.frames,a=m[l](e)*B.distance/B.distance,r=(B.x-t)*m[h](a)+t,i=(B.y-n)*m[d](a)+n;k({x:r,y:i})}},[w]),Object(c.useTick)(function(e){0!==B.distance&&(B.frames<=w||b(w+e))}),r.a.createElement(c.Sprite,Object.assign({},y,{image:E.a,x:S.x,y:S.y,interactive:!1,anchor:.5}))},j=function(e){return Array.from({length:e}).map(function(e,t){return{key:t,x:l(50,750),y:l(50,550),targetX:l(50,750),targetY:l(50,550),speed:l(100,200),scale:l(.5,2),tint:l(5592405,16777215),easeTime:"easeOutCubic",easeX:"easeInCubic",easeY:"easeInQuint"}})},x=function(e){var t=e.count,n=Object(a.useState)([]),i=Object(A.a)(n,2),u=i[0],c=i[1];return Object(a.useEffect)(function(){c(j(t)),setInterval(function(){c(j(t))},3e3)},[]),u.map(function(e){return r.a.createElement(b,e)})},B=function(e){return r.a.createElement(c.ParticleContainer,e,r.a.createElement(x,{count:10}))};o.settings.SCALE_MODE=o.SCALE_MODES.NEAREST,o.settings.CAN_UPLOAD_SAME_BUFFER=!0;var C=function(){return r.a.createElement(c.Stage,{width:800,height:600,options:{backgroundColor:16777215,antialias:!1,roundPixel:!1,clearBeforeRender:!0,preserveDrawingBuffer:!0}},r.a.createElement(M,{x:10,y:10}),r.a.createElement(B,{interactive:!1,interactiveChildren:!1}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(C,null),document.body),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},95:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQ4y63VPQ6AIAwGUOAmXsDdAQ8vg7sXcHX1BCgkJeWvBGgTY2zsC0LyKQRRhzmFfR+LL9ejStYgvS4W98x1+/vfh2e5640GMeQANJwN1mBZgpIB8hNTWLp9SQd7MVyKEwsgFxaBHJg/FNhDDixa4SwG84oTyw5lFmuCPRi8qzixKjiKBRA3Z7BiOIxiIRxaOdjCivHVCthKeBQDVnD/Aj5qzqRvxuJvXgAAAABJRU5ErkJggg=="},96:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAABY0lEQVR42uxXyw3CMAxtSoEFYALEHalDwApwYAtOwAm4MQUHWAGG4MC5YgKYgI9CHTWldZ0moQVxqCVEZFt+ieM8u4xz7lDCGMsYQl9m6yPFk4v1qRkrJ70b3y88x++wDHioF8rB/MEv2zq5QekjpT+7v4EoaQ1v8fq6a2TsxzMXQfJ8pLjOj+T/gCBNXwM6LOupfygQKAL4wZryUYmn2wkOIAHyfKpiiCW8k49s/3siqgBMbFZVl5cmUxDBgcDemIXzAkhuU5U0EHF7dM8wugcgq3GttLsABsGsDhjk1o8Bd/wuM3rApnRFpk6eUAVme5cidVHgVMTp5inSiU+GGyG1ewDBjc+q6gAk2QhjfdTsdOzuFgHBXbgi1QqoPCAoXdXMBnqTwcX4HUEwXzFElt4mioxcdkABDWTCiW5REJ3N6kS6AYQiYGsgAMHsjiXJ9skuXD3YUoTpvmFV36S2/i8BBgBIxbG+UAC9ywAAAABJRU5ErkJggg=="},99:function(e,t,n){e.exports=n(206)}},[[99,1,2]]]);
//# sourceMappingURL=main.b86caf6e.chunk.js.map