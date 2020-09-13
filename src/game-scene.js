import { Scene, getPointer, emit } from 'kontra';
import { collides, drawTextWithShadow, drawRect, randInt, sounds } from './lib';
import Barry from './barry';
import Follower from './follower';
import Hater from './hater';
import Shark from './shark';
import Heart from './heart';

export default (props) => {
  const player = new Barry({
    // color: '#fff',
    speed: 15,
    type: 0,
  });
  player.setScale(.4);

  let followers = [];
  let nonFollowers = [];
  let haters = [];
  let sharks = [];
  let hearts = [];

  let score = 0;
  let reputation = 100;
  let timer = 0;
  let followerDistance = 35;
  
  return Scene({...props,
    init() {
      timer = 0;
      score = 0;
      reputation = 100;
      haters = [];
      sharks = [];
      hearts = [];
      followers = [];
      nonFollowers = [];
    },

    update() {
      timer++;
  
      const pointer = getPointer();
      const { context: ctx } = this;

      player.moveTo(pointer);
      player.update();

      reputation -= .02;
      followerDistance += .05;
      followerDistance > 70 && (followerDistance = 70);
      followerDistance < 15 && (followerDistance = 15);

      followers.map((follower, i) => {
        const target = i == 0 ? player : followers[i - 1];
        const distance = i == 0 ? followerDistance : followerDistance;
        target && (
          follower.moveTo({x: target.x - distance, y: target.y}),
          follower.update() 
        );

        follower.x < 0 && !follower.hitten && (
          follower.ttl = 1,
          reputation -= 2,
          follower.hit()
        );

        haters.map(hater => {
          collides(hater, follower) && !follower.hitten && (
            sounds.play('follower_hit'),
            reputation -= 2,
            follower.hit(),
            follower.ttl = 5,
            followerDistance += 15
          );
        });

        sharks.map(shark => {
          collides(shark, follower) && !follower.hitten && (
            sounds.play('follower_hit'),
            reputation -= 2,
            follower.hit(),
            follower.ttl = 5,
            followerDistance += 15
          );
        });
      });

      nonFollowers.map((nonFollower, i) => {
        nonFollower.update();

        collides(player, nonFollower) && (
          nonFollower.ttl = 0,
          followerDistance = 15,
          reputation += 3,
          score += 5,
          (() => {
            followers.push(new Follower({
              x: nonFollower.x,
              y: nonFollower.y,
              type: 0,
              // rotation: 1.57,
              color: nonFollower.color,
            }));

            followers[followers.length - 1].setScale(.2);
            nonFollower.collect();
            sounds.play('follower_pickup');
          })()
        );

        nonFollower.x < -50 && (nonFollower.ttl = 0);
      });

      haters.map((hater, i) => {
        hater.update();
        if (collides(player, hater) && !player.hitten) {
          reputation -= 5;
          sounds.play('player_hit');
          player.hit();
        }

        hater.x < -50 && (hater.ttl = 0);
      });

      sharks.map((shark, i) => {
        shark.x < -50 && (shark.ttl = 0);

        !shark.jumping && shark.x - 100 < player.x && (
          shark.jump()
        );

        if (collides(player, shark) && !player.hitten) {
          reputation = 0;
          sounds.play('player_hit');
          player.hit();
        }

        shark.update();
      });

      hearts.map((heart, i) => {
        heart.update();

        collides(player, heart) && !heart.collected && (
          heart.collect(),
          score += 1 + followers.length,
          reputation++,
          followerDistance--
        );

        heart.x < -50 && (heart.ttl = 0);
      });

      if (randInt(0, 100) == 0 && followers.length < 10) {
        nonFollowers.push(new Follower({
          x: ctx.canvas.width,
          y: randInt(20, ctx.canvas.height / 3),
          type: 1,
          rotation: 1.57,
          color: ['#f0f', '#ff0', '#0f0'][randInt(0,2)],
        }));
        nonFollowers[nonFollowers.length - 1].setScale(.2, -.2);
      }

      if (randInt(0, 300) == 0 && sharks.length < 2 && timer/60 > 30) {
        sharks.push(new Shark({
          x: ctx.canvas.width + 200,
          y: ctx.canvas.height + 30,
          color: '#f00',
          dx: -1.5,
        }));
        sharks[sharks.length - 1].setScale(.5);
      }

      // if (randInt(0, (300 - parseInt(timer/60) < 300 ? parseInt(timer/60): 300)) == 0 && haters.length < parseInt(10 + timer/600) && timer/60 > 10) {
      if(haters.length < parseInt(1 + timer/600) && timer/60 > 10) {
        console.log('frequency', parseInt(3 + timer/600));
        haters.push(new Hater({
          x: ctx.canvas.width + 100,
          y: randInt(-50, ctx.canvas.height / 2),
          rotation: 1.57,
          color: '#f00',
          dx: -randInt(1, 3),// * (1 + timer/60000),
          // dy: 1.5,
        }));
        haters[haters.length - 1].setScale(.4, -.3);
      }

      if (randInt(0, 50) == 0) {
        hearts.push(new Heart({
          x: ctx.canvas.width,
          y: randInt(40, ctx.canvas.height - 40),
          collected: false,
        }));
        hearts[hearts.length - 1].setScale(.2);
      }

      hearts = hearts.filter(heart => heart.isAlive());
      haters = haters.filter(hater => hater.isAlive());
      nonFollowers = nonFollowers.filter(nonFollower => nonFollower.isAlive());
      followers = followers.filter(follower => follower.isAlive());
      sharks = sharks.filter(shark => shark.isAlive());

      reputation > 100 && (reputation = 100);
      reputation < 0 && emit('game-over', score);
    },

    render() {
      const { context } = this;

      followers.map(follower => follower.render());
      nonFollowers.map(follower => follower.render());
      haters.map(hater => hater.render());
      hearts.map(heart => heart.render());
      sharks.map(shark => shark.render());
      player.render();

      if (reputation < 50 && timer % 20 >= 0 && timer % 20 < 10) {
        
      } else {
        drawTextWithShadow(context, 'Reputation', 5, 10, 1, '#fff', 3);
        drawRect(context, 7, 42, 204, 20, '#000', null, 4);
        drawRect(context, 5, 40, 204, 20, '#fff', null, 4);
        drawRect(context, 7, 42, reputation * 2, 16, null, '#f00', null);
      }

      drawTextWithShadow(context, 'Score ' + score, 245, 20, 2, '#fff', 3);

      // drawTextWithShadow(context, 'Timer ' + parseInt(timer/60), 445, 20, 2, '#fff', 3);

      if (timer/60 < 5) {
        drawTextWithShadow(context, 'Move mouse or drag to move Barry', context.canvas.width / 2, context.canvas.height - 20, 1, '#fff', 3, 2);
      }

      if (timer/60 > 5 && timer/60 < 10) {
        drawTextWithShadow(context, 'Here comes the hater-birds... watch out!', context.canvas.width / 2, context.canvas.height - 20, 1, '#fff', 3, 2);
      }

      if (timer/60 > 25 && timer/60 < 30) {
        drawTextWithShadow(context, 'Hater-sharks spotted! Those are really dangerous! ', context.canvas.width / 2, context.canvas.height - 20, 1, '#fff', 3, 2);
      }
      if (timer/60 > 30 && timer/60 < 35) {
        drawTextWithShadow(context, 'One bite, and you\'re dead', context.canvas.width / 2, context.canvas.height - 20, 1, '#fff', 3, 2);
      }
    }
  });
};
