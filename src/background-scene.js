import { Scene } from 'kontra';
import Cloud from './cloud';
import Waves from './waves';
import { randInt } from './lib';

export default (props) => {
  const clouds = [];
  let i;
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud({
      x: randInt(2, 10) * 100,
      y: randInt(1, 2) * 100,
      dx: -randInt(3, 7) / 10,
    }));
  
    clouds[i].setScale(clouds[i].dx * 2 * (randInt(0,1) == 0 ? -1 : 1), -clouds[i].dx * 2);
    clouds[i].opacity = -clouds[i].dx + .3;
    clouds[i].width = -clouds[i].width;
  }

  const waves = [];
  waves.push(new Waves({
    x: 0,
    y: 580,
    dx: -.5,
    height: 25,
    color: '#009',
    // dx: -randInt(3, 7) / 10,
  }));
  waves.push(new Waves({
    x: 0,
    y: 590,
    dx: -.75,
    height: 20,
    color: '#00c',
    // dx: -randInt(3, 7) / 10,
  }));

  return Scene({...props,
    update() {
      clouds.map(cloud => cloud.update());
      waves.map((wave, i) => {
        wave.y = this.context.canvas.height - 20 + 5 * i;
        wave.update();
      });
    },

    render() {
      const { context } = this;
      const gradient = context.createLinearGradient(0,0, 0, context.canvas.height);

      // Add three color stops
      gradient.addColorStop(0, '#00ccff');
      gradient.addColorStop(.75, '#cc99ff');
      // gradient.addColorStop(1, '#0033cc');
      
      // Set the fill style and draw a rectangle
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      clouds.map(cloud => cloud.render());
      waves.map(wave => wave.render());
    },
  })
};