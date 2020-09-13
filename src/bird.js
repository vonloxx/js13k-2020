import { GameObject, angleToTarget  } from 'kontra';
import { drawPath, drawCircle } from './lib';

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
    const t = this;

    t.width = 205;
    t.height = 142;
    t.anchor = {x:.5, y:.5};
    t.currentFrame = 0;
    t.counter = 0;
    // t.target = target;
    t.speed = speed || 10;
    t.color = color || '#3FAEFF';
    t.type = type || 0;
    t.hitten = false;
    t.hitFrame = 0;
    t.dx = dx || -1.5;
    t.dy = dy || 0;
    // t.collidingObjects = [];
    // t.colliding = false;
    t.collected = false,
    t.bound = bound || 0.15;
  }

  moveTo(target) {
    const t = this;
    t.targetX = target.x;
    t.targetY = target.y;
  }

  collect() {
    if (this.collected) return;
    this.collected = true;
    // this.ttl = 0;
  }

  hit() {
    this.hitFrame = 0;
    this.hitten = true;
  }

  update(dt) {
    super.update(dt);
    const t = this;

    t.counter++;
    t.hitFrame++;

    t.counter % 6 == 0 && t.currentFrame++;

    t.currentFrame > 5 && (t.currentFrame = 0);

    if (t.type == 0) {
      move(this);
      t.dy = 0;
    } else if (t.type == 2) {
      // t.dy = Math.sin(t.counter / 40) * 1.5;
      // let angle = angleToTarget(this, {x: t.x + t.dx, y: t.y + t.dy});
      // t.rotation = 2.88 + angle;
      // t.y += t.dy;
      // t.x += t.dx;
    } else if (t.type == 1) {
      t.x += t.dx;
    }

    if (t.hitFrame > 60) {
      t.hitten = false;
    }
  }

  // render() {
  //   super.render();
  // }

  draw() {
    const { context: ctx, currentFrame: f, width, height, type, counter, hitten, color } = this;

    let wingTrust = 0;
    f == 0 && (wingTrust = 0);
    f == 1 && (wingTrust = 2);
    f == 2 && (wingTrust = 4);
    f == 3 && (wingTrust = 7);
    f == 4 && (wingTrust = 4);
    f == 5 && (wingTrust = 2);

    ctx.translate(width / 2, height / 2);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.translate(-width / 2, -height / 2 + wingTrust);

    // legs
    drawPath(ctx, 'M79 117s-2 9-10 12m0 0s-7 3-15 3m15-3c1 2 0 3-7 11', '#FFA63D', null, 5);
    drawPath(ctx, 'M97 117s-2 9-9 12m0 0s-8 3-15 3m15-3c0 2-1 3-8 11', '#FFA63D', null, 5);

    // beak
    ctx.save();
    type == 2 && counter % 20 < 10 && ctx.rotate(-5 * Math.PI / 180);
    type == 0 && hitten && ctx.rotate(1 * Math.PI / 180);
    drawPath(ctx, 'M189 99l-17 8 5-13 12 5z', '#000', '#FFA63D', 10);
    type == 2 && counter % 20 < 10 && ctx.rotate(10 * Math.PI / 180);
    type == 0 && hitten && ctx.rotate(-4 * Math.PI / 180);
    drawPath(ctx, 'M198 89l-21-16 1 18 20-2z', '#000', '#FFA63D', 10);
    ctx.restore();

    // top feather
    drawPath(ctx, 'M126 25s-8-19-6-19 11 8 18 18 4 10 4 10l-21-2s-17-13-16-14 13 7 13 7-8-12-5-13c2 0 13 13 13 13z', '#000', '#000', 5);

    // back feathers
    drawPath(ctx, 'M40 77S7 73 7 75c-1 2 13 10 30 14 17 5 16 3 16 3l1-22S33 55 31 57c-2 1 10 11 10 11s-20-5-21-2c-2 3 20 11 20 11z', '#000', '#000', 5);

    // body
    drawPath(ctx, 'M166 47c-14-21-86-16-103 0-16 17-11 51 0 64 12 12 89 10 103 0 14-11 15-43 0-64z', '#000', color, 15);
    drawPath(ctx, 'M124 99c-16-6-68-13-68-13s0 7 4 14c4 8 4 9 9 12 5 2 15 4 28 5 19 1 40-1 40-1s3-12-13-17z', null, '#fff', null);

    // eye
    drawCircle(ctx, 143.6, 75.6, 19.1, '#000', '#fff', 10);
    drawCircle(ctx, 148.6, 75.6, 8.2, null, '#000', null);
    drawCircle(ctx, 150.9, 72.8, 2.9, null, '#fff', null);

    // eyebrow
    drawPath(ctx, 'M152 48l-23-2-1 7 21-1 3-4z', null, '#000', null);

    // wing
    f == 0 && ctx.scale(1, 1);
    f == 1 && (ctx.translate(0, 40), ctx.scale(1, .5));
    f == 2 && (ctx.translate(0, 130), ctx.scale(1, -.5));
    f == 3 && (ctx.translate(0, 160), ctx.scale(1, -1));
    f == 4 && (ctx.translate(0, 130), ctx.scale(1, -.5));
    f == 5 && (ctx.translate(0, 40), ctx.scale(1, .5));

    drawPath(ctx, 'M93 82s8 4-4 17c-12 14-26 24-28 23-3-1 13-28 13-28s-18 17-21 15 10-18 10-18-17 8-18 6 25-17 25-17', '#000', null, 10);
    drawPath(ctx, 'M74 94s-16 27-13 28c2 1 16-9 28-23s4-17 4-17l-23-2S44 95 45 97s18-6 18-6-13 16-10 18 21-15 21-15z', null, color, null);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}