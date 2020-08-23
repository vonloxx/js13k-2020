import { GameObject, Text, angleToTarget, track, on, getPointer, randInt } from 'kontra';
import { drawPath, drawCircle, drawRect, collides } from './lib';

function move(object, target) {
  let
    distance = 0,
    xDistance = 0,
    yDistance = 0,
    rDistance = 0;

  xDistance = object.targetX - object.x;
  yDistance = object.targetY - object.y;
  distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

  object.targetR = angleToTarget(object, {x: object.targetX, y: object.targetY});

  if (object.targetR > 2.2) {
    object.targetR = 2.2;
  }

  if (object.targetR < 0.88) {
    object.targetR = 0.88;
  }

  if (distance < 100) {
    object.targetR = 1.57;
  }

  if (distance > 1) {
    object.x += parseInt(xDistance / object.speed);
    object.y += parseInt(yDistance / object.speed);
  }

  rDistance = object.targetR - object.rotation;

  if (target) {
    let angle = angleToTarget(object, target);
    if (angle < 0.88) {
      angle = 0.88;
    }

    if (angle > 2.2) {
      angle = 2.2;
    }

    object.rotation = angle; //Math.atan2(target.y - object.y, target.x - object.x);
  } else {
    object.rotation += rDistance / object.speed || 20;
  }
}

export default class Bird extends GameObject.class {
  constructor(props) {
    super(props);

    const { color, speed, type, dx, dy, bound } = props;

    this.width = 205;
    this.height = 142;
    this.anchor = {x:.5, y:.5};
    this.currentFrame = 0;
    this.counter = 0;
    // this.target = target;
    this.speed = speed || 10;
    this.color = color || '#3FAEFF';
    this.type = type || 0;
    this.dx = dx || -1.5;
    this.dy = dy || 0;
    this.collidingObjects = [];
    this.colliding = false;
    this.collected = false,
    this.bound = bound || 0.15;
  }

  moveTo(target) {
    this.targetX = target.x;
    this.targetY = target.y;
  }

  collect() {
    if (this.collected) return;
    this.collected = true;
    // this.ttl = 0;

  }

  setCollision(object, callback) {
    this.collidingObjects.push({object, callback});
  }

  update(dt) {
    super.update(dt);

    this.counter++

    this.counter % 6 == 0 && this.currentFrame++;

    this.currentFrame > 5 && (this.currentFrame = 0);

    if (this.type == 0) {
      move(this);
      this.dy = 0;
    } else if (this.type == 2) {
      this.dy = Math.sin(this.counter / 40) * 2.5;
      let angle = angleToTarget(this, {x: this.x + this.dx, y: this.y + this.dy});
      this.rotation = 2.88 + angle;
      this.y += this.dy;
      this.x += this.dx;
    } else {
      this.x += this.dx;
    }

    this.colliding = false;
    this.collidingObjects.map(({object, callback}) => {
      if (collides(object, this)) {
        callback = callback || (() => {});
        this.colliding = true;
        callback(object, this);
        // console.log('collided');
      }
      // collides(this, obj) && (this.colliding = true);
    });
  }

  render() {
    super.render();

    // const bound = {
    //   x: this.world.x,
    //   y: this.world.y,
    //   width: this.world.width,
    //   height: this.world.height,
    // }
    // if (this.anchor) {
    //   bound.x -= bound.width * this.anchor.x;
    //   bound.y -= bound.height * this.anchor.y;
    // }

    // if (this.type == 0 || this.type == 2) {
    //   this.text.x = this.type == 0 ? 300 : 600;
    //   this.text.text = 'x:' + bound.x;
    //   this.text.text += '\ny:' + bound.y;
    //   this.text.text += '\nw:' + bound.width;
    //   this.text.text += '\nh:' + bound.height;
    //   this.text.render();        
    // }
  }

  draw() {
    const { context: ctx } = this;

    ctx.translate(this.width / 2, this.height / 2);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.translate(-this.width / 2, -this.height / 2);

    // legs
    drawPath(ctx, 'M79 117s-2 9-10 12m0 0s-7 3-15 3m15-3c1 2 0 3-7 11', '#FFA63D', null, 5);
    drawPath(ctx, 'M97 117s-2 9-9 12m0 0s-8 3-15 3m15-3c0 2-1 3-8 11', '#FFA63D', null, 5);

    // beak
    ctx.save();
    this.type == 2 && this.counter % 20 < 10 && ctx.rotate(-5 * Math.PI / 180);
    drawPath(ctx, 'M189 99l-17 8 5-13 12 5z', '#000', '#FFA63D', 10);
    this.type == 2 && this.counter % 20 < 10 && ctx.rotate(10 * Math.PI / 180);
    drawPath(ctx, 'M198 89l-21-16 1 18 20-2z', '#000', '#FFA63D', 10);
    ctx.restore();

    // top feather
    drawPath(ctx, 'M126 25s-8-19-6-19 11 8 18 18 4 10 4 10l-21-2s-17-13-16-14 13 7 13 7-8-12-5-13c2 0 13 13 13 13z', '#000', '#000', 5);

    // back feathers
    drawPath(ctx, 'M40 77S7 73 7 75c-1 2 13 10 30 14 17 5 16 3 16 3l1-22S33 55 31 57c-2 1 10 11 10 11s-20-5-21-2c-2 3 20 11 20 11z', '#000', '#000', 5);

    // body
    drawPath(ctx, 'M166 47c-14-21-86-16-103 0-16 17-11 51 0 64 12 12 89 10 103 0 14-11 15-43 0-64z', '#000', this.color, 15);
    drawPath(ctx, 'M124 99c-16-6-68-13-68-13s0 7 4 14c4 8 4 9 9 12 5 2 15 4 28 5 19 1 40-1 40-1s3-12-13-17z', null, '#fff', null);

    // eye
    drawCircle(ctx, 143.6, 75.6, 19.1, '#000', '#fff', 10);
    drawCircle(ctx, 148.6, 75.6, 8.2, null, '#000', null);
    drawCircle(ctx, 150.9, 72.8, 2.9, null, '#fff', null);

    // eyebrow
    drawPath(ctx, 'M152 48l-23-2-1 7 21-1 3-4z', null, '#000', null);

    // wing
    switch (this.currentFrame) {
      case 0:
        // ctx.translate(0, 40);
        ctx.scale(1, 1);
        break;
      case 1:
        ctx.translate(0, 40);
        ctx.scale(1, .5);
        break;
      case 2:
        ctx.translate(0, 130);
        ctx.scale(1, -.5);
        break;
      case 3:
        ctx.translate(0, 160);
        ctx.scale(1, -1);
        break;
      case 4:
        ctx.translate(0, 130);
        ctx.scale(1, -.5);
        break;
      case 5:
        ctx.translate(0, 40);
        ctx.scale(1, .5);        
        break;
              
      default:
        break;
    }

    drawPath(ctx, 'M93 82s8 4-4 17c-12 14-26 24-28 23-3-1 13-28 13-28s-18 17-21 15 10-18 10-18-17 8-18 6 25-17 25-17', '#000', null, 10);
    drawPath(ctx, 'M74 94s-16 27-13 28c2 1 16-9 28-23s4-17 4-17l-23-2S44 95 45 97s18-6 18-6-13 16-10 18 21-15 21-15z', null, this.color, null);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}