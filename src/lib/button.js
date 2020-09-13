import { GameObject, track } from 'kontra';
import { drawRect, drawTextWithShadow } from './draw';
import sounds from './sounds';

function getQuinticEase(currentProgress, start, distance, steps) {
  currentProgress /= steps/2;
  if (currentProgress < 1) {
    return (distance/2)*(Math.pow(currentProgress, 5)) + start;
  }
  currentProgress -= 2;
  return distance/2*(Math.pow(currentProgress, 5) + 2) + start;
}


function getQuadraticEase(currentProgress, start, distance, steps) {
  currentProgress /= steps/2;
  if (currentProgress <= 1) {
    return (distance/2)*currentProgress*currentProgress + start;
  }
  currentProgress--;
  return -1*(distance/2) * (currentProgress*(currentProgress-2) - 1) + start;
}

function getScale(params) {
  let distance = params.to - params.from;
  let steps = params.frames;
  let currentProgress = params.frame;
  return getQuadraticEase(currentProgress, params.from, distance, steps, 3);
}


class Button extends GameObject.class {
  constructor(properties) {
    const { onClick, text } = properties;
    super(properties);
    this.onClick = onClick;
    this.text = text;
    this.width = text.length * 13 * 2 + 40;
    this.height = 30 + 40;
    this.state = 0;
    this.anchor = {x:.5, y:.5};
    this.scale = 1;
    this.scaleFrom = 1;
    this.scaleTo = 1;
    this.frame = 0;
    this.frames = 100;
    track(this);
  }

  update() {
    if (this.frame < this.frames) {
      this.scale = getScale({
        to: this.scaleTo,
        from: this.scaleFrom,
        frame: this.frame,
        frames: this.frames
      });

      this.setScale(this.scale);

      this.frame++;
    }
  }

  setSmoothScale(to) {
    this.frame = 0;
    this.frames = 10;
    this.scaleFrom = this.scale;
    this.scaleTo = to;
  }

  onDown() {
    this.setSmoothScale(1.2);
  }

  onUp() {
    this.setSmoothScale(1);
    this.onClick();
  }

  onOver() {
    this.state != 1 && (
      this.setSmoothScale(1.2),
      sounds.play('pickup2')
      // zzfx && zzfx(1,.05,368,0,.05,.18,1,1.19,0,0,957,.05,0,0,0,0,.03,.63,.03,0) // Pickup 13    // console.log(window.zzfx(...[null,null,537,.02,.02,.22,1,1.59,-6.98,4.97]));
    );
    this.state = 1;
  }

  onOut() {
    this.state != 0 && this.setSmoothScale(1);
    this.state = 0;
  }

  draw() {
    drawRect(this.context, 2, 2, this.width, this.height, '#000', null, 5);
    drawRect(this.context, 0, 0, this.width, this.height, '#fff', null, 5);
    drawTextWithShadow(this.context, this.text, this.width / 2, 20, 2, '#fff', 3, 2);
  }
}

export default Button;