import { init, initPointer, GameLoop, track, emit, on, onPointerDown, getPointer } from 'kontra';
import initBackgroundScene from './background-scene';
import initGameScene from './game-scene';
import initMenuScene from './menu-scene';
import initGameOverScene from './game-over-scene';

// ZzFXmicro - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force, hacked to add a pan node by @dhmstark
zzfxV=.3    // volume
zzfx=       // play sound
(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);q=zzfxX.createBuffer(1,h,zzfxR);q.getChannelData(0).set(Z);c=zzfxX.createBufferSource();c.buffer=q;c.connect(zzfxX.destination);c.start();return c};zzfxX=new(window.AudioContext||webkitAudioContext);zzfxR=44100;
//! ZzFXM (v2.0.1) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
// zzfxM=(f,n,o,t=125)=>{let z,e,l,r,g,h,x,a,u,c,d,i,m,p,G,M,R=[],b=[],j=[],k=0,q=1,s={},v=zzfxR/t*60>>2;for(;q;k++)R=[q=a=d=m=0],o.map((t,d)=>{for(x=n[t][k]||[0,0,0],q|=!!n[t][k],G=m+(n[t][0].length-2-!a)*v,e=2,r=m;e<x.length+(d==o.length-1);a=++e){for(g=x[e],u=c!=(x[0]||0)|g|0,l=0;l<v&&a;l++>v-99&&u?i+=(i<1)/99:0)h=(1-i)*R[p++]/2||0,b[r]=(b[r]||0)+h*M-h,j[r]=(j[r++]||0)+h*M+h;g&&(i=g%1,M=x[1]||0,(g|=0)&&(R=s[[c=x[p=0]||0,g]]=s[[c,g]]||(z=[...f[c]],z[2]*=2**((g-12)/12),zzfxG(...z))))}m=G});return[b,j]};

// const buffer = zzfxM(...songData);    // Generate the sample data
let node, musicPlaying;

// async function startMusic() {
//   if (node) {
//     return;
//   }
//   node = zzfxP(...buffer);
//   node.loop = true;
//   await zzfxX.resume();
//   musicPlaying = true;
//   // songStatusElem.textContent = 'Playing...';
// }

// async function stopMusic() {
//   if (!node) {
//     return
//   }
//   await zzfxX.suspend();
//   node.stop();
//   node.disconnect();
//   node = null;
//   musicPlaying = false;
// }

// startMusic();

(async () => {
  let { canvas, context } = init('c');
  context.imageSmoothingEnabled= false;
  // context.filter = 'url(#remove-alpha)';

  const pointer = initPointer();
  const gameScene = initGameScene();
  const menuScene = initMenuScene();
  const backgroundScene = initBackgroundScene();
  const gameOverScene = initGameOverScene();
  const scenes = [menuScene, gameScene, gameOverScene];

  let currentScene = 0;

  function resize() {
    emit('resize');
    // canvas.width = window.innerWidth;
    canvas.width = window.innerWidth > 1200 ? 1200 : window.innerWidth < 600 ? 600 : window.innerWidth;
    canvas.height = window.innerHeight > 600 ? 600 : window.innerHeight < 300 ? 300 : window.innerHeight;
    context.imageSmoothingEnabled= false;
  };

  on('menu-click', () => currentScene = 1);
  on('game-over', (score) => {
    localStorage.setItem('score', score);
    const high_score = localStorage.getItem('high_score');
    score > high_score && (localStorage.setItem('high_score', score));

    gameScene.init();
    menuScene.reset();
    currentScene = 2;
  });

  on('menu-scene', () => {
    currentScene == 2 && (
      gameScene.init(),
      menuScene.reset(),
      currentScene = 0
    );
  });

  on('toggle-music', () => {
    musicPlaying && stopMusic();
    !musicPlaying && startMusic();
  });

  window.addEventListener('resize', resize, false);
  
  resize();
  
  let loop = GameLoop({
    update: function(dt) {
      backgroundScene.update();
      scenes[currentScene].update();
      // settingsScene.update();
    },
    render: function() {
      backgroundScene.render();
      scenes[currentScene].render();
      // settingsScene.render();
    }
  });
  
  loop.start();  
})();
