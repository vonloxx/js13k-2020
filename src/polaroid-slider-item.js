import { GameObject } from 'kontra';
import { drawTextWithShadow, drawRect } from './lib';

export default class PolaroidSliderItem extends GameObject.class {
  constructor(props) {
    super(props);

    this.anchor = {x:.5, y:.5};
  }

  draw() {
    if (!this.show) {
      return;
    }
    const { context } = this;
    drawRect(context, 0, 0, 300, 340, '#000', '#fff', 5);
    drawRect(context, 20, 20, 260, 260, '#000', '#eef', 5);
    this.photo();
  }
}