import { init, initPointer, GameLoop, track, emit, on, onPointerDown, getPointer, randInt } from 'kontra';
import initGameScene from './game-scene';

(async () => {
  let { canvas, context } = init('c');
  context.imageSmoothingEnabled= false;
  // context.filter = 'url(#remove-alpha)';

  const pointer = initPointer();
  const gameScene = initGameScene();

  // track(gameScene);
  onPointerDown(function(e, object) {
    console.log('action!');
    if (window.zzfx) return;
    // ZzFXMicro - Zuper Zmall Zound Zynth 
    window.zzfxV=.3; // volume
    window.zzfx=    // play sound
    (t=1,a=.05,n=220,e=0,f=0,h=.1,M=0,r=1,z=0,o=0,i=0,s=0,u=0,x=0,c=0,d=0,X=0,b=1,m=0,l=44100,B=99+e*l,C=f*l,P=h*l,g=m*l,w=X*l,A=2*Math.PI,D=(t=>0<t?1:-1),I=B+g+C+P+w,S=(z*=500*A/l**2),V=(n*=(1+2*a*Math.random()-a)*A/l),j=D(c)*A/4,k=0,p=0,q=0,v=0,y=0,E=0,F=1,G=[],H=window.zzfxX.createBufferSource(),J=window.zzfxX.createBuffer(1,I,l))=>{for(H.connect(window.zzfxX.destination);q<I;G[q++]=E)++y>100*d&&(y=0,E=k*n*Math.sin(p*c*A/l-j),E=D(E=M?1<M?2<M?3<M?Math.sin((E%A)**3):Math.max(Math.min(Math.tan(E),1),-1):1-(2*E/A%2+2)%2:1-4*Math.abs(Math.round(E/A)-E/A):Math.sin(E))*Math.abs(E)**r*t*window.zzfxV*(q<B?q/B:q<B+g?1-(q-B)/g*(1-b):q<B+g+C?b:q<I-w?(I-q-w)/P*b:0),E=w?E/2+(w>q?0:(q<I-w?1:(q-I)/w)*G[q-w|0]/2):E),k+=1-x+1e9*(Math.sin(q)+1)%2*x,p+=1-x+1e9*(Math.sin(q)**2+1)%2*x,n+=z+=500*o*A/l**3,F&&++F>s*l&&(n+=i*A/l,V+=i*A/l,F=0),u&&++v>u*l&&(n=V,z=S,v=1,F=F||1);return J.getChannelData(0).set(G),H.buffer=J,H.start(),H},window.zzfxX=new(window.AudioContext||webkitAudioContext);
  });

  function resize() {
    emit('resize');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled= false;
  };

  window.addEventListener('resize', resize, false);
  
  resize();
  
  let loop = GameLoop({
    update: function(dt) {
      gameScene.update();
    },
    render: function() {
      gameScene.render();
    }
  });
  
  loop.start();  
})();
