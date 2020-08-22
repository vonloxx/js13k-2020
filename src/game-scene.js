import { Scene, Text, getPointer, randInt } from 'kontra';
import { collides, drawText } from './lib';
import Bird from './bird';
import Cloud from './cloud';
import Heart from './heart';

export default (props) => {
  const player = new Bird({
    // color: '#fff',
    speed: 30,
  });
  player.setScale(.4);

  const followers = [];
  const nonFollowers = [];
  const haters = [];
  const clouds = [];
  let hearts = [];

  let text = Text({
    text: '',
    font: '48px pulse',
    color: 'black',
    x: 300,
    y: 100,
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
  });

  let score = 0;
  let reputation = 100;
  
  let i;
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud({
      x: randInt(2, 10) * 100,
      y: randInt(1, 4) * 100,
      dx: -randInt(3, 7) / 10,
    }));
  
    clouds[i].setScale(-clouds[i].dx);
    clouds[i].opacity = -clouds[i].dx;
    clouds[i].width = -clouds[i].width;
  }

  return Scene({...props,
    update() {
      const pointer = getPointer();

      clouds.map(cloud => cloud.update());

      player.moveTo(pointer);
      player.update();

      followers.map((follower, i) => {
        const target = i == 0 ? player : followers[i - 1];
        const distance = i == 0 ? 45 : 25;
        target && (
          follower.moveTo({x: target.x - distance, y: target.y}),
          follower.update() 
        );
      });

      nonFollowers.map((follower, i) => {
        follower.update();

        follower.x < -50 && nonFollowers.splice(i, 1);
        // if (collides(follower, player)) {
        //   followers.push(new Bird({
        //     x: follower.x,
        //     y: follower.y,
        //     rotation: 1,
        //     color: follower.color,
        //     speed: 4,
        //   }));
        //   followers[followers.length - 1].setScale(.2);
  
        //   delete nonFollowers[i];
        // }
      });

      haters.map((hater, i) => {
        hater.update();

        hater.x < -50 && haters.splice(i, 1);

        if (hater.x < player.x + 200) {
          hater.target = player;
          hater.moveTo(hater);
        }
        // if (collides(hater, player)) {
        //   reputation -= 1 * followers.length + 1;
        //   delete haters[i];
        // }

        followers.map((follower, j) => {
          // if (collides(hater, follower)) {
          //   reputation -= 1 * followers.length + 1;
          //   delete haters[i];
          //   delete followers[j];
          // }
        });
      });

      hearts.map((heart, i) => {
        heart.update();
        // heart.x < -50 && hearts.splice(i, 1);
        heart.x < -50 && (heart.ttl = 0);
      });

      if (randInt(0, 200) == 0 && followers.length < 10) {
        nonFollowers.push(new Bird({
          x: this.context.canvas.width,
          y: randInt(0, this.context.canvas.width),
          type: 1,
          rotation: 1.57,
          color: ['#f0f', '#ff0', '#0f0'][randInt(0,2)],
        }));
        nonFollowers[nonFollowers.length - 1].setScale(.2, -.2);
      }

      if (randInt(0, 300) == 0 && haters.length < 5) {
        haters.push(new Bird({
          x: this.context.canvas.width + 100,
          y: randInt(100, this.context.canvas.height - 200),
          type: 2,
          rotation: 1.57,
          color: '#f00',
          dx: -randInt(2, 7) / 5,
          // dy: 1.5,
        }));
        haters[haters.length - 1].setScale(.5, -.3);
        player.setCollision(haters[haters.length - 1], (object) => {
          reputation--;
          // delete haters[haters.length - 1];
          // console.log(haters.length);
        });
      }

      if (randInt(0, 100) == 0) {
        hearts.push(new Heart({
          x: this.context.canvas.width,
          y: randInt(0, this.context.canvas.width),
          collected: false,
        }));
        hearts[hearts.length - 1].setScale(.2);

        player.setCollision(hearts[hearts.length - 1], object => {
          if (object.collected) return;
          object.collect();
          score++;
        });

      }

      hearts = hearts.filter(heart => heart.isAlive());

      text.text = 'SCORE ' + score.toString();
      text.text += '\nCRED ' + reputation.toString();
    },

    render() {
      const { context } = this;
      const gradient = context.createLinearGradient(0,0, 0, context.canvas.height);

      // Add three color stops
      gradient.addColorStop(0, '#00ccff');
      gradient.addColorStop(.75, '#cc99ff');
      gradient.addColorStop(1, '#0033cc');
      
      // Set the fill style and draw a rectangle
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      clouds.map(cloud => cloud.render());
      followers.map(follower => follower.render());
      nonFollowers.map(follower => follower.render());
      haters.map(hater => hater.render());
      hearts.map(heart => heart.render());
      player.render();

      // text.render();
      drawText(context, 'Score ' + score, 5, 10, 2, '#000', 3);

      drawText(context, 'You have been', 5, 400, 2, '#fff', 4);
      drawText(context, '404ed!', 5, 440, 2, '#fff', 4);

      drawText(context, 'You have been', 5, 400, 2, '#006', 2);
      drawText(context, '404ed!', 5, 440, 2, '#006', 2);

      // drawText(context, 'Larry', 10, 405, 6, '#fff', 3);
      // drawText(context, 'Larry', 5, 400, 6, '#006', 2);
      // drawText(context, 'the bird', 7, 492, 4, '#fff', 3);
      // drawText(context, 'the bird', 5, 490, 4, '#006', 2);
    }
  });
};