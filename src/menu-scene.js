import { Scene, emit } from 'kontra';
import { drawTextWithShadow, Button } from './lib';
import initIntroScene from './intro-scene';

export default (props) => {
  const introScene = initIntroScene();

  const startGameButton = new Button({
    text: 'Start Game',
    // x: context.canvas.width / 2,
    y: 190,
    scaleTo: 1,
    scaleFrom: 1,
    onClick() { emit('menu-click') }
  });

  // const creditsButton = new Button({
  //   text: 'Credits',
  //   // x: context.canvas.width / 2,
  //   y: 190,
  //   onClick() { console.log('click credits') }
  // });

  // onPointerUp(e => emit('menu-click'));
  
  return Scene({...props,
    reset() {
      introScene.reset();
    },

    update() {
      startGameButton.x = this.context.canvas.width / 4;
      startGameButton.y = this.context.canvas.height / 2;
      startGameButton.update();

      introScene.update();
    },
    render() {
      const { context } = this;

      const scale = this.context.canvas.width / 1200;
      drawTextWithShadow(context, 'Barry', context.canvas.width / 4, 50, 5 * scale, '#FF0', 3, 2);
      drawTextWithShadow(context, 'The Bird', context.canvas.width / 4, 110 + (scale * 30), 3 * scale, '#FF0', 3, 2);

      startGameButton.render();

      introScene.render();
    },
  })
};