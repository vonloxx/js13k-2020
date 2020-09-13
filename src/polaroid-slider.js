import { GameObject } from 'kontra';
import { drawTextWithShadow, drawRect } from './lib';
import PolaroidSliderItem from './polaroid-slider-item';

export default class PolaroidSlider extends GameObject.class {
  constructor(props) {
    super(props);

    const { slides } = props;

    // build slides
    slides.map(slide => this.addChild(new PolaroidSliderItem({
      ...slide,
      anchor: {x:.5, y:.5},
      show: false,
    })));
  }

  update() {
    super.update();
    const { timer, children } = this;

    this.timer++;

    children.map((slide, i) => {
      slide.show = false;
      (timer/60 > i * 5) && (slide.show = true);
    });

    timer/60 > children.length * 5 + 5 && (this.timer = 0);
  }

  render() {
    super.render();


  }

  draw() {
    const { context, timer, children } = this;

    children.map((slide, i) => {
      (timer/60 > i * 5 + 1) && (timer/60 < i * 5 + 5) && (
        slide.text.map((text, t) => {
          drawTextWithShadow(context, text, this.width / 2, 500 + t * 30, 1.5, '#fff', 2, 2)
        })
      );
    });

    // drawRect(context, 0, 0, 360, 360, '#f00', null, 1);
  }
}