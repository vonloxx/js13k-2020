import { Scene, emit, onPointerDown, initPointer } from 'kontra';
import { drawTextWithShadow, Button } from './lib';

export default (props) => {
  const pointer = initPointer();

  onPointerDown(function(e, object) {
    emit('menu-scene');
  })
  return Scene({...props,
    update() {
    },
    render() {
      const { context } = this;
      const scale = this.context.canvas.width / 1200;
      const score = localStorage.getItem('score');

      drawTextWithShadow(context, 'Game Over', context.canvas.width / 2, 50, 5 * scale, '#F00', 3, 2);
      drawTextWithShadow(context, 'Score: ' + score + '', context.canvas.width / 2, 50 + scale * 100, 4 * scale, '#FF0', 3, 2);
    },
  })
};