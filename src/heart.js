import { GameObject, inverseLerp } from 'kontra';
import { drawPath, sounds } from './lib';

export default class Heart extends GameObject.class {
  constructor(props) {
    super(props);

    const { dx, bound } = props;

    this.width = 106;
    this.height = 87;
    this.oX = 0;
    this.oY = 0;
    this.anchor = {x:.5, y:.5};
    this.dx = dx || -1.8;
    this.timer = 0;
    this.colliding = false;
    this.bound = bound || 0.15;
  }

  update(dt) {
    super.update(dt);

    if (!this.collected) {
      this.dy = Math.sin(this.timer / 20) * 1.5;
      this.setScale((Math.sin(this.timer / 10) + 1) / 10 + .3);
  
      // console.log(Math.sin(this.timer / 100));
  
      this.x += this.dx;
      this.y += this.dy;
    } else {
      var xDistance = 100 - this.x;
      var yDistance = 40 - this.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance > 1) {
          this.x += xDistance / 20;
          this.y += yDistance / 20;
      }
      this.opacity = inverseLerp(40, this.oX, this.x);
      this.setScale(inverseLerp(40, Math.abs(this.oX), Math.abs(this.x)));
      // console.log(inverseLerp(40, this.oY, this.y));
      // console.log(inverseLerp(100, this.oX, this.x));
    }

    this.timer++;
  }

  collect() {
    if (this.collected) return;

    sounds.play('pickup');
    this.timer = 0;
    this.collected = true;
    this.oX = this.x;
    this.oY = this.y;
    this.ttl = 60;
    this.setScale(1);
  }

  draw() {
    const { context: ctx } = this;

    // heart
    drawPath(ctx, 'M53 28S53 3 28 3C2 3-2 22 8 38c9 16 45 45 45 45s36-27 47-45c11-19-7-35-22-35S53 28 53 28z', '#000', '#F00', 5);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  render() {
    super.render();

    // this.text.render();
  }
}