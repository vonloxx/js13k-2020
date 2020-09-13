import { Scene, emit, on } from 'kontra';
import { Button, drawTextWithShadow } from './lib';

export default (props) => {
  const toggleMusicButton = new Button({
    off: false,
    text: '$',
    x: 700,
    y: 40,
    onClick: () => emit('toggle-music'),
  });

  on('toggle-music', () => {
    console.log('toggle');
    toggleMusicButton.off = !toggleMusicButton.off;
  });

  return Scene({...props,
    update() {
      toggleMusicButton.update();
    },

    render() {
      const { context } = this;

      toggleMusicButton.render();
      !toggleMusicButton.off && drawTextWithShadow(this.context, 'BAH' + toggleMusicButton.off, 700, 80, 2, '#fff', 2, 2);
    },
  })
};