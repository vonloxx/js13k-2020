const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: 100,
  dx: .5,
  update() {
    this.x += this.dx;
  },
  render() {
    ctx.rect(this.x, this.y, 100, 100);
    ctx.fillStyle = '#fff';
    ctx.fill();  
  }
};

// function updatePlayer() {
//   player.x += player.dx;
// }

// function renderPlayer() {
//   ctx.rect(player.x, player.y, 100, 100);
//   ctx.fillStyle = '#fff';
//   ctx.fill();
// }

function renderGame() {
  player.render();
}

function updateGame() {
  player.update();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update[currentScene]();
  render[currentScene]();
  requestAnimationFrame(loop);
}

const update = [updateGame];
const render = [renderGame];
const currentScene = 0;

function start() {
  loop();
}

start();