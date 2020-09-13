import { GameObject } from 'kontra';
import { randInt } from './lib'

export default class Waves extends GameObject.class {
  constructor(props) {
    super(props);
  }

  update() {
    super.update();

    this.x += this.dx;


    this.x < -150 && (this.x = 0);

    // this.x < -350 && (
    //   this.x = this.context.canvas.width + randInt(0, 2) * 100,
    //   this.y = randInt(0, 2) * 100
    // );
  }

  draw() {
    const { context: ctx } = this;

    ctx.beginPath();
    ctx.moveTo(0,this.height);
    ctx.lineTo(0,0);
    for (let i = 0; i < 10; i++) {
      ctx.bezierCurveTo(50 + (i*150),this.height,100 + (i*150),-this.height,150 + (i*150),0);
    }
    ctx.lineTo((10*150),this.height);
    ctx.lineTo(0,this.height);

    ctx.fillStyle = this.color;
    ctx.fill();
  }
}