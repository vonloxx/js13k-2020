import { GameObject, angleToTarget } from 'kontra';
import { drawPath, drawCircle } from './lib';

export default class Shark extends GameObject.class {
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
    this.bound = bound || 0.15;
    this.jumping = false;
    this.jumpingFrame = 0;

    // this.image = new Image();
    // this.image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQ4IiBoZWlnaHQ9IjE3NCIgdmlld0JveD0iMCAwIDQ0OCAxNzQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDkuMDE0IDEyMi45ODZMMTEyLjk0MiAxMTcuMjMxTDExMS43NDQgMTE1LjY2OUw2NS41OTI2IDEwOC41NzVMNjYuMjk5NiAxMTQuMzE5TDY5LjI3ODEgMTExLjEwOUw3MS41ODQ2IDExNi4zODRMNzQuNjA4MiAxMTIuMDk3TDc2Ljc5NjEgMTE3LjY5MUw3OS45Mzg0IDExMy4wODZMODIuNzQ4IDExOC45MjJMODcuMjUyNSAxMTQuNDg1TDg5LjIwMyAxMjAuNzE1TDkzLjAxMjIgMTE1LjI3N0w5NS43MDMxIDEyMS40MzJMOTkuODIzMiAxMTYuMTE1TDEwMi4yMDMgMTIyLjE0OEwxMDUuODk0IDExNy4wMjlMMTA5LjAxNCAxMjIuOTg2WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPHBhdGggZD0iTTExMi40MTcgMTIxLjkxOEwxMTcuNDE3IDEyNi43MjRMMTE2LjU1OCAxMjguNTA1TDcyLjgxNjUgMTQ1LjE1NEw3Mi4zNTQ4IDEzOS4zODRMNzUuOTE0NSAxNDEuOUw3Ny4xMTIzIDEzNi4yNTJMODAuOTMyMyAxMzkuODExTDgxLjk1MDEgMTMzLjg3N0w4NS45NTAxIDEzNy43MjJMODcuNTI3NiAxMzEuNDJMOTIuODI3IDEzNC44MTVMOTMuNDg0NyAxMjguMzA4TDk4LjMwNDcgMTMyLjgyOEw5OS43MDIxIDEyNi4yMzlMMTA0LjgwMiAxMzAuNTc1TDEwNS45MiAxMjQuMTdMMTEwLjU1OSAxMjguNDA0TDExMi40MTcgMTIxLjkxOFoiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNTkuOTM1IDczLjcwNzlDMzk2LjM2NyAxMDkuNDY0IDQ2OC41NzcgLTIyLjY2NDUgNDM3LjYzIDM1LjkwNzhDNDIzLjY2OCA2Mi4zMzQgMzk1LjQ4NyA4MS45NDgyIDM5Ni4wMzUgOTYuNTIzMUM0MDQuNjg3IDExNC45MTIgNDc0LjkgMTQxLjEzNCAzOTYuMDM1IDEyNi40OTFDMzE3LjE3IDExMS44NDggMzA1Ljg1NiAxMDQuMzU1IDI1OS45MzUgMTE0LjkxMkMxNTMuNDUgMTc1LjUyOCA5MS45NjAzIDE2Mi43NTMgNzEuOTIzMiAxNDkuNjQ3QzU0Ljg5NTQgMTM4LjUwOSAxNDIuNDU4IDEzMS4yNDEgMTA4LjUyNyAxMTQuOTEyQzU5LjYxMDkgMTA5LjEyMyAtMjAuNzMwNiA5OS41MTE0IDkuNjk2NDQgODYuOTg4NUM0Ni4yODU3IDcxLjkyOTQgMTIwLjI4NiA1Ny4xNDY4IDEyOS45MzYgNTUuNjk3OUMxMzkuNTg3IDU0LjI0ODkgMTkzLjE2MSAzLjM0MjEyIDIxMC40NjUgMy4wMDE1OEMyMjcuNzY5IDIuNjYxMDQgMTg4LjUwMyA1Ny40ODc0IDIxMC40NjUgNjIuNkMyMzIuNDI4IDY3LjcxMjcgMjQyLjA3NyA2OS4wMjc5IDI1OS45MzUgNzMuNzA3OVoiIGZpbGw9IiMzRkFFRkYiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIvPgo8cGF0aCBkPSJNMjU1LjA1NiAxMTUuMDM2QzI1NS43MjEgMTA3LjU0NSAxMzguOTIxIDExMi4zMTIgMTE2LjYyNiAxMjYuMjc0Qzk0LjMzMDcgMTQwLjIzNiA3NS42OTYxIDEzOC4xOTMgNzIuMzY4NCAxNDYuMzY2QzY5LjA0MDggMTU0LjUzOCAxMDcuNjQxIDE2MS42OSAxMzguNTg4IDE1OC45NjVDMTc0LjUyNyAxNTQuODc5IDI1NC4zOSAxMjIuNTI4IDI1NS4wNTYgMTE1LjAzNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04My44NTI5IDkxLjg4MDdDODMuODUyOSAxMDAuODE1IDkxLjE5NTkgMTA4LjExMSAxMDAuMzIgMTA4LjExMUMxMDkuNDQ1IDEwOC4xMTEgMTE2Ljc4OCAxMDAuODE1IDExNi43ODggOTEuODgwN0MxMTYuNzg4IDgyLjk0NjUgMTA5LjQ0NSA3NS42NTA0IDEwMC4zMiA3NS42NTA0QzkxLjE5NTkgNzUuNjUwNCA4My44NTI5IDgyLjk0NjUgODMuODUyOSA5MS44ODA3WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIvPgo8ZWxsaXBzZSByeD0iNy4xODE4OCIgcnk9IjcuMDkyMDUiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDk1LjkwMDkgOTEuODgwNykiIGZpbGw9ImJsYWNrIi8+CjxlbGxpcHNlIHJ4PSIyLjU3ODExIiByeT0iMi41NDU4NiIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgOTMuODc1MiA4OS41MTY3KSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcxLjQ4NiA3Ny4zNTE2TDExMi42NDkgNTEuODA5NUwxMjIuMjk2IDYzLjM4NjJMNzkuODQ1MiA4MS44NjkxTDcxLjQ4NiA3Ny4zNTE2WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTI0Ny4wNDIgMTQ2LjY4N0MyMjAuMzQyIDE0MS4yNTMgMTY1LjQxMyAxMTMuNzAzIDE2NS40MTMgMTEzLjcwM0wyMTYuNzA0IDEwMC4wNTRDMjE2LjcwNCAxMDAuMDU0IDI3My43NDIgMTUyLjEyMSAyNDcuMDQyIDE0Ni42ODdaIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjYiLz4KPHBhdGggZD0iTTI0Ny4wNDIgMTQ2LjY4N0MyMjAuMzQyIDE0MS4yNTMgMTU3LjQxMyAxMDguNjc1IDE1Ny40MTMgMTA4LjY3NUwyMDQuNDAyIDkwLjg5OTJDMjA0LjQwMiA5MC44OTkyIDI3My43NDIgMTUyLjEyMSAyNDcuMDQyIDE0Ni42ODdaIiBmaWxsPSIjM0ZBRUZGIi8+Cjwvc3ZnPgo=';
  }

  moveTo(target) {
    this.targetX = target.x;
    this.targetY = target.y;
  }

  jump() {
    this.jumping = true;
    this.jumpingFrame = 0;
  }

  update(dt) {
    super.update(dt);

    this.counter++

    this.counter % 6 == 0 && this.currentFrame++;

    this.currentFrame > 5 && (this.currentFrame = 0);

    this.jumping && (
      this.jumpingFrame++,
      this.dy = Math.sin((this.jumpingFrame - 90) / 40) * 3.5
    );

    this.jumping && this.jumpingFrame > 200 && (
      this.jumping = false,
      this.jumpingFrame = 0,
      this.dy = 0,
      this.ttl = 0
    );

    // this.dy = Math.sin((this.jumpingFrame - 90) / 40) * 2.5;
    let angle = angleToTarget(this, {x: this.x + this.dx, y: this.y + this.dy});
    this.rotation = 2.88 + angle;
    this.y += this.dy;
    this.x += this.dx;
  }

  render() {
    super.render();
  }

  draw() {    
    const { context: ctx } = this;

    ctx.translate(this.width / 2, this.height / 2);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.translate(-this.width / 2, -this.height / 2);

    // ctx.drawImage(this.image, 0, 0);


    drawPath(ctx, 'M109 123l4-6-1-1-46-7v5l3-3 3 5 3-4 2 6 3-5 3 6 4-5 2 7 4-6 3 6 4-5 2 6 4-5 3 6z', '#000', '#fff');
    drawPath(ctx, 'M112 122l5 5v2l-44 16-1-6 4 3 1-6 4 4 1-6 4 4 2-7 5 4v-7l5 5 2-7 5 5 1-7 5 4 1-6z', '#000', '#fff');
    drawPath(ctx, 'M260 74c136 35 209-97 178-38-14 26-43 46-42 61 9 18 79 44 0 29-79-14-90-22-136-11-107 61-168 48-188 35-17-11 70-19 37-35-49-6-130-15-99-28 36-15 110-30 120-31 10-2 63-53 80-53 18 0-21 54 0 60 22 5 32 6 50 11z', '#000', '#3FAEFF', 5);
    drawPath(ctx, 'M255 115c1-7-116-3-138 11-23 14-41 12-45 20-3 9 36 16 67 13 36-4 115-36 116-44z', null, '#fff');
    drawPath(ctx, 'M84 92c0 9 7 16 16 16s17-7 17-16-8-16-17-16-16 7-16 16z', '#000', '#fff', 5);

    drawCircle(ctx, 96, 92, 7.1, null, '#000');
    drawCircle(ctx, 94, 90, 2.5, null, '#fff');

    drawPath(ctx, 'M71 77l42-25 9 11-42 19-9-5z', null, '#000');
    drawPath(ctx, 'M247 147c-27-6-82-33-82-33l52-14s57 52 30 47z', '#000', null, 6);
    drawPath(ctx, 'M247 147c-27-6-90-38-90-38l47-18s70 61 43 56z', null, '#3FAEFF');

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}