!function(){"use strict";let t,e,i={};function s(t,...e){(i[t]||[]).map(t=>t(...e))}function h(){return t}function n(){return e}function a(i){if(t=document.getElementById(i)||i||document.querySelector("canvas"),!t)throw Error("You must provide a canvas element for the game");return e=t.getContext("2d"),e.imageSmoothingEnabled=!1,s("init"),{canvas:t,context:e}}const o=()=>{};function r(t,e){let i=e.parentNode;if(t.setAttribute("data-kontra",""),i){let s=i.querySelector("[data-kontra]:last-of-type")||e;i.insertBefore(t,s.nextSibling)}else document.body.appendChild(t)}function c(t){let e=t.world||t,i=e.x,s=e.y,h=e.width,n=e.height;return t.anchor&&(i-=h*t.anchor.x,s-=n*t.anchor.y),{x:i,y:s,width:h,height:n}}function l(t,e){return Math.atan2(e.y-t.y,e.x-t.x)+Math.PI/2}function d(t,e){return Math.floor(Math.random()*(e-t+1))+t}function u(t,e,i){return(i-t)/(e-t)}function x(t,e,i){return Math.min(Math.max(t,i),e)}function p(t,e){return t.rotation||e.rotation?null:([t,e]=[t,e].map(t=>c(t)),t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y)}class f{constructor(t=0,e=0,i={}){this.x=t,this.y=e,i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e)}add(t){return new f(this.x+t.x,this.y+t.y,this)}subtract(t){return new f(this.x-t.x,this.y-t.y,this)}scale(t){return new f(this.x*t,this.y*t)}normalize(t=this.length()){return new f(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?x(this._a,this._d,t):t}set y(t){this._y=this._c?x(this._b,this._e,t):t}}function y(){return new f(...arguments)}y.prototype=f.prototype,y.class=f;class _ extends class{constructor(t){return this.init(t)}init(t={}){this.position=y(),this.velocity=y(),this.acceleration=y(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}{init({width:t=0,height:e=0,context:i=n(),render:s=this.draw,update:h=this.advance,children:a=[],anchor:o={x:0,y:0},sx:r=0,sy:c=0,opacity:l=1,rotation:d=0,scaleX:u=1,scaleY:x=1,...p}={}){this.children=[],super.init({width:t,height:e,context:i,anchor:o,sx:r,sy:c,opacity:l,rotation:d,scaleX:u,scaleY:x,...p}),this._di=!0,this._uw(),a.map(t=>this.addChild(t)),this._rf=s,this._uf=h}render(t){let e=this.context;e.save(),(this.x||this.y)&&e.translate(this.x,this.y),this.rotation&&e.rotate(this.rotation),(this.sx||this.sy)&&e.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||e.scale(this.scaleX,this.scaleY);let i=-this.width*this.anchor.x,s=-this.height*this.anchor.y;(i||s)&&e.translate(i,s),this.context.globalAlpha=this.opacity,this._rf(),(i||s)&&e.translate(-i,-s);let h=this.children;t&&(h=h.filter(t)),h.map(t=>t.render&&t.render()),e.restore()}draw(){}_pc(t,e){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wr:s=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=i*this.opacity,this._wr=s+this.rotation;let{x:a,y:o}=function(t,e){let i=Math.sin(e),s=Math.cos(e);return{x:t.x*s-t.y*i,y:t.x*i+t.y*s}}({x:this.x,y:this.y},s);this._wx=a,this._wy=o,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this.x*h,this._wy=this.y*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:e=!1}={}){this.children.push(t),t.parent=this,t._pc=t._pc||o,t._pc()}removeChild(t){let e=this.children.indexOf(t);-1!==e&&(this.children.splice(e,1),t.parent=null,t._pc())}update(t){this._uf(t),this.children.map(t=>t.update&&t.update())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function w(){return new _(...arguments)}w.prototype=_.prototype,w.class=_;let g=/(\d+)(\w+)/;class m extends w.class{init({text:t="",textAlign:e="",lineHeight:i=1,font:s=n().font,...h}={}){super.init({text:t,textAlign:e,lineHeight:i,font:s,...h}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){let e=t.match(g),i=+e[1];return{size:i,unit:e[2],computed:i}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let e=this.text.split(" "),i=0,s=2;for(;s<=e.length;s++){let h=e.slice(i,s).join(" ");t.measureText(h).width>this._fw&&(this._s.push(e.slice(i,s-1).join(" ")),i=s-1)}this._s.push(e.slice(i,s).join(" "))}if(!this._s.length&&this.text.includes("\n")){let e=0;this.text.split("\n").map(i=>{this._s.push(i),e=Math.max(e,t.measureText(i).width)}),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,i=this.context;e=this.textAlign||("rtl"===i.canvas.dir?"right":"left"),t="right"===e?this.width:"center"===e?this.width/2|0:0,this._s.map((s,h)=>{i.textBaseline="top",i.textAlign=e,i.fillStyle=this.color,i.font=this.font,i.fillText(s,t,this._fs*this.lineHeight*h)})}}function v(){return new m(...arguments)}v.prototype=m.prototype,v.class=m;let M=new WeakMap,b={},S={},z={0:"left",1:"middle",2:"right"};function A(t,e){let{x:i,y:s,width:h,height:n}=c(t),a=e.x-Math.max(i,Math.min(e.x,i+h)),o=e.y-Math.max(s,Math.min(e.y,s+n));return a*a+o*o<e.radius*e.radius}function X(t){let e=t._lf.length?t._lf:t._cf;for(let i=e.length-1;i>=0;i--){let s=e[i];if(s.collidesWithPointer?s.collidesWithPointer(t):A(s,t))return s}}function C(t){S[void 0!==t.button?z[t.button]:"left"]=!0,E(t,"onDown")}function k(t){S[void 0!==t.button?z[t.button]:"left"]=!1,E(t,"onUp")}function Y(t){E(t,"onOver")}function F(t){M.get(t.target)._oo=null,S={}}function E(t,e){t.preventDefault();let i=t.target,s=M.get(i),h=i.height/i.offsetHeight,n=i.getBoundingClientRect();if(-1!==["touchstart","touchmove","touchend"].indexOf(t.type)){s.touches={};for(var a=0;a<t.touches.length;a++)s.touches[t.touches[a].identifier]={id:t.touches[a].identifier,x:(t.touches[a].clientX-n.left)*h,y:(t.touches[a].clientY-n.top)*h,changed:!1};for(a=t.changedTouches.length;a--;){const i=t.changedTouches[a].identifier;void 0!==s.touches[i]&&(s.touches[i].changed=!0);let o=t.changedTouches[a].clientY;s.x=(t.changedTouches[a].clientX-n.left)*h,s.y=(o-n.top)*h;let r=X(s);r&&r[e]&&r[e](t),b[e]&&b[e](t,r)}}else{s.x=(t.clientX-n.left)*h,s.y=(t.clientY-n.top)*h;let i=X(s);i&&i[e]&&i[e](t),b[e]&&b[e](t,i),"onOver"==e&&(i!=s._oo&&s._oo&&s._oo.onOut&&s._oo.onOut(t),s._oo=i)}}function O(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}function T(t){let e=[];return t._dn?e.push(t._dn):t.children&&t.children.map(t=>{e=e.concat(T(t))}),e}class j extends w.class{init({id:t,name:e=t,cullObjects:i=!0,cullFunction:s=p,...h}){const n=this._dn=document.createElement("section");n.tabIndex=-1,n.style="position:absolute;left:-9999px",n.id=t,n.setAttribute("aria-label",e),super.init({id:t,name:e,cullObjects:i,cullFunction:s,...h}),r(n,this.context.canvas);let a=this.context.canvas;this.camera=w({x:a.width/2,y:a.height/2,width:a.width,height:a.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera),this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;let t=this.children.find(t=>t.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,e){super.addChild(t,e),T(t).map(t=>{this._dn.appendChild(t)})}removeChild(t){super.removeChild(t),T(t).map(t=>{r(t,this.context.canvas)})}destroy(){this._dn.remove(),this.children.map(t=>t.destroy&&t.destroy())}update(t){this.hidden||super.update(t)}lookAt(t){let e=(t=t.world||t).x,i=t.y;t.scaleX&&(e/=t.scaleX,i/=t.scaleY),this.camera.x=e,this.camera.y=i,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){let{x:t,y:e,width:i,height:s}=this.camera;this.sx=t*this.scaleX-i/2,this.sy=e*this.scaleY-s/2,this.hidden||super.render(t=>!this.cullObjects||this.cullFunction(t,this.camera))}onShow(){}onHide(){}}function D(){return new j(...arguments)}function P(t,e,i,s,h){let n=new Path2D(e);t.strokeStyle=i,t.fillStyle=s,t.lineWidth=h,i&&t.stroke(n),s&&t.fill(n)}function R(t,e,i,s,h,n,a){let o=new Path2D;o.ellipse(e,i,s,s,Math.PI/4,0,2*Math.PI),t.strokeStyle=h,t.fillStyle=n,t.lineWidth=a,h&&t.stroke(o),n&&t.fill(o)}D.prototype=j.prototype,D.class=j;const I=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","5 0 5 9 M5 12 5 14","","","","1 5 1 2 4 2 4 5Z M2 15 9 0 M7 10 10 10 10 13 7 13Z","","","","","","","6 12 4 15","3 6 8 6","","2 15 8 0","6 0 11 7 6 14 1 7Z M6 6 6 8","2 4 6 1 6 14","0 4 6 0 10 4 1 13 11 13","2 0 10 3 6 7 10 11 2 13","6 1 1 11 10 11 M6 7 6 15","10 1 3 1 1 7 10 7 8 13 0 13","11 1 6 1 1 13 10 13 10 7 4 7","3 1 11 1 6 14","2 4 6 0 10 4 2 10 6 14 10 10Z","1 13 6 13 11 1 2 1 2 7 9 7","","","10 4 2 8 10 12","2 6 10 6 M2 10 10 10","2 4 10 8 2 12","","","1 14 5 2 10 14 M3 9 8 9","3 13 3 0 10 3 4 7 10 10Z","9 1 5 1 3 3 3 11 5 13 9 13","3 13 3 1 7 1 9 4 9 10 7 13Z","9 13 3 13 3 1 9 1 M3 7 7 7","3 14 3 1 9 1 M3 7 7 7","7 1 2 4 2 11 6 13 9 9 5 9","2 14 2 0 M9 14 9 0 M2 8 9 8","3 13 9 13 M3 1 9 1 M6 13 6 1","2 11 6 14 9 11 9 1 4 1","3 14 3 0 M9 2 4 8 9 14","4 0 4 13 9 13","2 14 2 2 6 6 10 2 10 14","2 14 2 2 9 12 9 0","6 0 11 7 6 14 1 7Z","3 14 3 1 10 1 9 7 3 7","5 1 10 7 5 13 0 7Z M9 13 5 8","3 14 3 1 10 1 9 7 4 7 10 13","10 1 3 1 1 7 10 7 8 13 0 13","6 14 6 1 M2 1 10 1","3 0 3 12 6 14 9 12 9 0","3 1 3 7 6 13 9 7 9 1","1 0 3 12 6 5 9 12 11 0","2 0 10 14 M10 0 2 14","6 14 6 8 M2 1 6 8 10 1","1 1 9 1 2 13 10 13","8 0 4 0 4 14 8 14","8 15 2 0","3 0 7 0 7 14 3 14"].map(t=>new Path2D("M"+t));function H(t,e,i,s,h,n,a){t.save(),t.translate(i,s),t.scale(h,h),t.strokeStyle=n,t.lineWidth=a,[...e].forEach((e,i)=>{let s=I[e.toUpperCase().charCodeAt(0)];s&&t.stroke(s),t.translate((i+2)%15==1?-182:13,(i+2)%15==1?24:0)}),t.restore()}class L extends w.class{constructor(t){super(t);const{color:e,speed:i,type:s,dx:h,dy:n,bound:a}=t;this.width=205,this.height=142,this.anchor={x:.5,y:.5},this.currentFrame=0,this.counter=0,this.speed=i||10,this.color=e||"#3FAEFF",this.type=s||0,this.dx=h||-1.5,this.dy=n||0,this.collidingObjects=[],this.colliding=!1,this.text=v({text:"",font:"32px Arial",color:"black",x:300,y:200,anchor:{x:.5,y:.5},textAlign:"center"}),this.bound=a||.15}moveTo(t){this.targetX=t.x,this.targetY=t.y}setCollision(t,e){this.collidingObjects.push({object:t,callback:e})}update(t){super.update(t),this.counter++,this.counter%6==0&&this.currentFrame++,this.currentFrame>5&&(this.currentFrame=0),0==this.type?(function(t,e){let i=0,s=0,h=0,n=0;if(s=t.targetX-t.x,h=t.targetY-t.y,i=Math.sqrt(s*s+h*h),t.targetR=l(t,{x:t.targetX,y:t.targetY}),t.targetR>2.2&&(t.targetR=2.2),t.targetR<.88&&(t.targetR=.88),i<100&&(t.targetR=1.57),i>1&&(t.x+=parseInt(s/t.speed),t.y+=parseInt(h/t.speed)),void(n=t.targetR-t.rotation)){let e=l(t,void 0);e<.88&&(e=.88),e>2.2&&(e=2.2),t.rotation=e}else t.rotation+=n/t.speed||20}(this),this.dy=0):(this.dy=0,this.x+=this.dx),this.colliding=!1,this.collidingObjects.map(({object:t,callback:e})=>{var i,s;i=t,s=this,[i,s]=[i,s].map(t=>function(t){let e=t.world||t,i=e.x,s=e.y,h=Math.abs(e.width),n=Math.abs(e.height);return t.anchor&&(i-=h*t.anchor.x,s-=n*t.anchor.y),t.bound&&(i+=h*t.bound,s+=n*t.bound,h-=h*t.bound*2,n-=n*t.bound*2),{x:i,y:s,width:h,height:n}}(t)),i.x<s.x+s.width&&i.x+i.width>s.x&&i.y<s.y+s.height&&i.y+i.height>s.y&&(e=e||(()=>{}),this.colliding=!0,e(t))})}render(){super.render()}draw(){const{context:t}=this;switch(t.translate(this.width/2,this.height/2),t.rotate(-90*Math.PI/180),t.translate(-this.width/2,-this.height/2),P(t,"M79 117s-2 9-10 12m0 0s-7 3-15 3m15-3c1 2 0 3-7 11","#FFA63D",null,5),P(t,"M97 117s-2 9-9 12m0 0s-8 3-15 3m15-3c0 2-1 3-8 11","#FFA63D",null,5),t.save(),2==this.type&&this.counter%20<10&&t.rotate(-5*Math.PI/180),P(t,"M189 99l-17 8 5-13 12 5z","#000","#FFA63D",10),2==this.type&&this.counter%20<10&&t.rotate(10*Math.PI/180),P(t,"M198 89l-21-16 1 18 20-2z","#000","#FFA63D",10),t.restore(),P(t,"M126 25s-8-19-6-19 11 8 18 18 4 10 4 10l-21-2s-17-13-16-14 13 7 13 7-8-12-5-13c2 0 13 13 13 13z","#000","#000",5),P(t,"M40 77S7 73 7 75c-1 2 13 10 30 14 17 5 16 3 16 3l1-22S33 55 31 57c-2 1 10 11 10 11s-20-5-21-2c-2 3 20 11 20 11z","#000","#000",5),P(t,"M166 47c-14-21-86-16-103 0-16 17-11 51 0 64 12 12 89 10 103 0 14-11 15-43 0-64z","#000",this.color,15),P(t,"M124 99c-16-6-68-13-68-13s0 7 4 14c4 8 4 9 9 12 5 2 15 4 28 5 19 1 40-1 40-1s3-12-13-17z",null,"#fff",null),R(t,143.6,75.6,19.1,"#000","#fff",10),R(t,148.6,75.6,8.2,null,"#000",null),R(t,150.9,72.8,2.9,null,"#fff",null),P(t,"M152 48l-23-2-1 7 21-1 3-4z",null,"#000",null),this.currentFrame){case 0:t.scale(1,1);break;case 1:t.translate(0,40),t.scale(1,.5);break;case 2:t.translate(0,130),t.scale(1,-.5);break;case 3:t.translate(0,160),t.scale(1,-1);break;case 4:t.translate(0,130),t.scale(1,-.5);break;case 5:t.translate(0,40),t.scale(1,.5)}P(t,"M93 82s8 4-4 17c-12 14-26 24-28 23-3-1 13-28 13-28s-18 17-21 15 10-18 10-18-17 8-18 6 25-17 25-17","#000",null,10),P(t,"M74 94s-16 27-13 28c2 1 16-9 28-23s4-17 4-17l-23-2S44 95 45 97s18-6 18-6-13 16-10 18 21-15 21-15z",null,this.color,null),t.setTransform(1,0,0,1,0,0)}}class Z extends w.class{constructor(t){super(t)}update(){super.update(),this.x+=this.dx,this.x<-200&&(this.x=this.context.canvas.width+100*d(0,2),this.y=100*d(0,4))}draw(){const{context:t}=this;P(t,"M177 46s8-52-37-41c-27 6-30 17-27 25-7-10-21-23-44-18-26 5-15 26-8 34-6-6-20-17-41-8-28 12 8 29 8 29S11 62 4 78c-8 17 38 22 38 22h142s74 0 53-33-60-21-60-21z","#000","#fff",5)}}class W extends w.class{constructor(t){super(t);const{dx:e,bound:i}=t;this.width=106,this.height=87,this.oX=0,this.oY=0,this.anchor={x:.5,y:.5},this.dx=e||-1.8,this.timer=0,this.colliding=!1,this.text=v({text:"",font:"32px Arial",color:"black",x:300,y:100,anchor:{x:.5,y:.5},textAlign:"center"}),this.bound=i||.15}update(t){if(super.update(t),this.collected){var e=100-this.x,i=40-this.y;Math.sqrt(e*e+i*i)>1&&(this.x+=e/20,this.y+=i/20),this.opacity=u(40,this.oX,this.x),this.setScale(u(40,this.oX,this.x))}else this.dy=1.5*Math.sin(this.timer/20),this.setScale((Math.sin(this.timer/10)+1)/10+.3),this.x+=this.dx,this.y+=this.dy;this.timer++}collect(){this.collected||(window.zzfx&&window.zzfx(null,null,537,.02,.02,.22,1,1.59,-6.98,4.97),this.timer=0,this.collected=!0,this.oX=this.x,this.oY=this.y,this.ttl=60,this.setScale(1))}draw(){const{context:t}=this;P(t,"M53 28S53 3 28 3C2 3-2 22 8 38c9 16 45 45 45 45s36-27 47-45c11-19-7-35-22-35S53 28 53 28z","#000","#F00",5),t.setTransform(1,0,0,1,0,0)}render(){super.render()}}var q=t=>{const e=new L({speed:30});e.setScale(.4);const i=[],s=[],n=[],a=[];let o=[],r=v({text:"",font:"48px pulse",color:"black",x:300,y:100,anchor:{x:.5,y:.5},textAlign:"center"}),c=0,l=100;for(let t=0;t<5;t++)a.push(new Z({x:100*d(2,10),y:100*d(1,4),dx:-d(3,7)/10})),a[t].setScale(-a[t].dx),a[t].opacity=-a[t].dx,a[t].width=-a[t].width;return D({...t,update(){const t=function(t=h()){return M.get(t)}();a.map(t=>t.update()),e.moveTo(t),e.update(),i.map((t,s)=>{const h=0==s?e:i[s-1];h&&(t.moveTo({x:h.x-(0==s?45:25),y:h.y}),t.update())}),s.map((t,e)=>{t.update(),t.x<-50&&s.splice(e,1)}),n.map((t,i)=>{t.update(),t.x<-50&&n.splice(i,1),t.x<e.x+200&&(t.target=e,t.moveTo(t))}),o.map((t,e)=>{t.update(),t.x<-50&&(t.ttl=0)}),0==d(0,200)&&i.length<10&&(s.push(new L({x:this.context.canvas.width,y:d(0,this.context.canvas.width),type:1,rotation:1.57,color:["#f0f","#ff0","#0f0"][d(0,2)]})),s[s.length-1].setScale(.2,-.2)),0==d(0,300)&&n.length<5&&(n.push(new L({x:this.context.canvas.width+100,y:d(100,this.context.canvas.height-200),type:2,rotation:1.57,color:"#f00",dx:-d(2,7)/5})),n[n.length-1].setScale(.5,-.3),e.setCollision(n[n.length-1],t=>{l--})),0==d(0,100)&&(o.push(new W({x:this.context.canvas.width,y:d(0,this.context.canvas.width),collected:!1})),o[o.length-1].setScale(.2),e.setCollision(o[o.length-1],t=>{t.collected||(t.collect(),c++)})),o=o.filter(t=>t.isAlive()),r.text="SCORE "+c,r.text+="\nCRED "+l},render(){const{context:t}=this,h=t.createLinearGradient(0,0,0,t.canvas.height);h.addColorStop(0,"#00ccff"),h.addColorStop(.75,"#cc99ff"),h.addColorStop(1,"#0033cc"),t.fillStyle=h,t.fillRect(0,0,t.canvas.width,t.canvas.height),a.map(t=>t.render()),i.map(t=>t.render()),s.map(t=>t.render()),n.map(t=>t.render()),o.map(t=>t.render()),e.render(),H(t,"Score "+c,5,10,2,"#000",3),H(t,"You have been",5,400,2,"#fff",4),H(t,"404ed!",5,440,2,"#fff",4),H(t,"You have been",5,400,2,"#006",2),H(t,"404ed!",5,440,2,"#006",2)}})};(async()=>{let{canvas:t,context:e}=a("c");e.imageSmoothingEnabled=!1,function(t=h()){let e=M.get(t);var s;e||(e={x:0,y:0,radius:5,touches:{},canvas:t,_cf:[],_lf:[],_o:[],_oo:null},M.set(t,e)),t.addEventListener("mousedown",C),t.addEventListener("touchstart",C),t.addEventListener("mouseup",k),t.addEventListener("touchend",k),t.addEventListener("touchcancel",k),t.addEventListener("blur",F),t.addEventListener("mousemove",Y),t.addEventListener("touchmove",Y),e._t||(e._t=!0,s=()=>{e._lf.length=0,e._cf.map(t=>{e._lf.push(t)}),e._cf.length=0},i.tick=i.tick||[],i.tick.push(s))}();const r=q();function c(){s("resize"),t.width=window.innerWidth,t.height=window.innerHeight,e.imageSmoothingEnabled=!1}b.onDown=function(t,e){console.log("action!"),window.zzfx||(window.zzfxV=.3,window.zzfx=(t=1,e=.05,i=220,s=0,h=0,n=.1,a=0,o=1,r=0,c=0,l=0,d=0,u=0,x=0,p=0,f=0,y=0,_=1,w=0,g=44100,m=99+s*g,v=h*g,M=n*g,b=w*g,S=y*g,z=2*Math.PI,A=(t=>0<t?1:-1),X=m+b+v+M+S,C=(r*=500*z/g**2),k=(i*=(1+2*e*Math.random()-e)*z/g),Y=A(p)*z/4,F=0,E=0,O=0,T=0,j=0,D=0,P=1,R=[],I=window.zzfxX.createBufferSource(),H=window.zzfxX.createBuffer(1,X,g))=>{for(I.connect(window.zzfxX.destination);O<X;R[O++]=D)++j>100*f&&(j=0,D=F*i*Math.sin(E*p*z/g-Y),D=A(D=a?1<a?2<a?3<a?Math.sin((D%z)**3):Math.max(Math.min(Math.tan(D),1),-1):1-(2*D/z%2+2)%2:1-4*Math.abs(Math.round(D/z)-D/z):Math.sin(D))*Math.abs(D)**o*t*window.zzfxV*(O<m?O/m:O<m+b?1-(O-m)/b*(1-_):O<m+b+v?_:O<X-S?(X-O-S)/M*_:0),D=S?D/2+(S>O?0:(O<X-S?1:(O-X)/S)*R[O-S|0]/2):D),F+=1-x+1e9*(Math.sin(O)+1)%2*x,E+=1-x+1e9*(Math.sin(O)**2+1)%2*x,i+=r+=500*c*z/g**3,P&&++P>d*g&&(i+=l*z/g,k+=l*z/g,P=0),u&&++T>u*g&&(i=k,r=C,T=1,P=P||1);return H.getChannelData(0).set(R),I.buffer=H,I.start(),I},window.zzfxX=new(window.AudioContext||webkitAudioContext))},window.addEventListener("resize",c,!1),c(),function({fps:t=60,clearCanvas:e=!0,update:i=o,render:h,context:a=n()}={}){if(!h)throw Error("You must provide a render() function");let r,c,l,d,u,x=0,p=1e3/t,f=1/t,y=e?O:o;function _(){if(c=requestAnimationFrame(_),l=performance.now(),d=l-r,r=l,!(d>1e3)){for(s("tick"),x+=d;x>=p;)u.update(f),x-=p;y(a),u.render()}}return u={update:i,render:h,isStopped:!0,start(){r=performance.now(),this.isStopped=!1,requestAnimationFrame(_)},stop(){this.isStopped=!0,cancelAnimationFrame(c)},_frame:_,set _last(t){r=t}},u}({update:function(t){r.update()},render:function(){r.render()}}).start()})()}();