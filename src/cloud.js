import { GameObject } from 'kontra';
import { drawPath, drawCircle, randInt } from './lib';

export default class Cloud extends GameObject.class {
  constructor(props) {
    super(props);
  }

  update() {
    super.update();

    this.x += this.dx;

    this.x < -350 && (
      this.x = this.context.canvas.width + randInt(0, 2) * 100,
      this.y = randInt(0, 2) * 100
    );
  }

  draw() {
    const { context: ctx } = this;
    drawPath(ctx, 'M177 46s8-52-37-41c-27 6-30 17-27 25-7-10-21-23-44-18-26 5-15 26-8 34-6-6-20-17-41-8-28 12 8 29 8 29S11 62 4 78c-8 17 38 22 38 22h142s74 0 53-33-60-21-60-21z', null, '#fff', 5);
  }
}