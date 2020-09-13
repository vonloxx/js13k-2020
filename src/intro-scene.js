import { Scene } from 'kontra';
import Bird from './bird';
import Heart from './heart';
import Shark from './shark';
import { drawTextWithShadow, drawRect } from './lib';
import PolaroidSlider from './polaroid-slider';

export default (props) => {
  const player = new Bird({
    speed: 15,
    x: 130,
    y: 140,
    dx: 0,
    type: 0,
    rotation: 1.17,
    hit: true,
  });
  player.setScale(1.1);

  const heart = new Heart({
    x: 100,
    y: 100,
    dx: 0,
  });
  heart.setScale(1.1);

  const follower1 = new Bird({
    speed: 15,
    x: 160,
    y: 140,
    dx: 0,
    type: 0,
    rotation: 1.17,
    hit: true,
    color: '#f0f',
  });
  follower1.setScale(.7);
  const follower2 = new Bird({
    speed: 15,
    x: 130,
    y: 220,
    dx: 0,
    type: 0,
    rotation: 1.27,
    hit: true,
    color: '#ff0',
  });
  follower2.setScale(.7, -.7);

  const hater = new Bird({
    speed: 15,
    x: 130,
    y: 70,
    dx: 0,
    type: 0,
    rotation: 1.27,
    hit: true,
    color: '#f00',
  });
  hater.setScale(.8, -.7);

  const shark = new Shark({
    speed: 15,
    x: 195,
    y: 190,
    dx: 0,
    type: 0,
    rotation: 1.67,
    hit: true,
    color: '#f00',
  });
  shark.setScale(.5, -.5);

  let timer = 0;

  const polaroid = new PolaroidSlider({
    x: 200,
    y: 100,
    anchor:{x:.5, y:.5},
    timer: 0,
    slides: [
      {
        x: 0,
        rotation: .2,
        text: [
          'Barry the bird, a social',
          'influencer wannabe',
        ],
        photo() {
          // const { context } = this;
          player.render();
        },
      },
      {
        x: -200,
        y: 60,
        rotation: -.2,
        text: [
          'must collect likes and',
          'followers as many as he can',
        ],
        photo() {
          // const { context } = this;
          heart.render();
          follower1.render() ;
          follower2.render() ;
        },
      },
      {
        x: -80,
        y: 130,
        rotation: .1,
        text: [
          'But avoid haters or',
          'you\'ll loose reputation',
        ],
        photo() {
          // const { context } = this;
          // heart.render();
          hater.render();
          shark.render();
        },
      },
      {
        x: -260,
        y: 30,
        rotation: -.3,
        text: [
          'Without reputation',
          'you\'ll be 404ed',
        ],
        photo() {
          const { context } = this;
          // heart.render();
          context.save();
          context.translate(150, 60);
          drawTextWithShadow(context, '404', 0, 0, 4, '#f00', 2, 2);
          drawTextWithShadow(context, 'User', 0, 100, 2, '#000', 2, 2);
          drawTextWithShadow(context, 'not found', 0, 150, 2, '#000', 2, 2);
          context.restore();
        },
      },
    ]
  });

  polaroid.setScale(.7,.7);

  return Scene({...props,
    reset() {
      timer = 0;
      polaroid.timer = 0;
    },

    update() {
      timer++;

      polaroid_scale = this.context.canvas.width / 1200;
      polaroid_scale = polaroid_scale * .7;
      polaroid.setScale(polaroid_scale,polaroid_scale);

      polaroid.x = this.context.canvas.width - this.context.canvas.width / 4;
      polaroid.update();
    },

    render() {
      const { context } = this;

      polaroid.render();
    },
  })
};