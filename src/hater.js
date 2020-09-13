import { angleToTarget } from 'kontra';
import Bird from './bird';

export default class Hater extends Bird {
  constructor(props) {
    super(props);

    this.type = 2;
  }

  update(dt) {
    super.update(dt);

    this.dy = Math.sin(this.counter / 40) * 1.5;
    let angle = angleToTarget(this, {x: this.x + this.dx, y: this.y + this.dy});
    this.rotation = 2.88 + angle;
    this.y += this.dy;
    this.x += this.dx;
  }
}