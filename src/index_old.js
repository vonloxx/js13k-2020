function compose(...fns) {
  return fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );
}

function renderer(props) {
  const { canvas } = props;
  const context = canvas.getContext('2d');

  return {
    clear(){
      context.clearRect(0, 0, canvas.width, canvas.height);
    },

    save() { return context.save() },
    restore() { return context.restore() },

    translate(x, y) {
      context.translate(x, y);
    },
    rotate(r) {
      context.rotate(r);
    },

    drawRect(x, y, w, h, style) {
      const { fill, stroke, lineWidth } = style;
      const path2d = new Path2D();
      path2d.rect(x, y, w, h);
    
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = lineWidth;
    
      stroke && context.stroke(path2d);
      fill && context.fill(path2d);
    }
  }
}

function Game(props) {
  const { renderer=null, scenes=[] } = props;

  function loop() {
    scenes.map(scene => scene.update());
    renderer.clear();
    scenes.map(scene => scene.render());
    requestAnimationFrame(loop);
  }

  return {
    renderer,
    addScene(scene) {
      scene.game = this;
      scenes.push(scene);
    },
    start() {
      requestAnimationFrame(loop);
    },
    stop() {

    },
  }
}

function Scene(props) {
  const { objects=[] } = props;
  return {
    addObject(obj) {
      obj.scene = this;
      objects.push(obj);
    },
    update() {objects.map(obj => obj.update())},
    render() {objects.map(obj => obj.render())},
  }
}

function GameComponent(props) {
  const {
    update,
    render,
    draw,
  } = props;

  return {
    ...props,
    update() {
      update && update();
      this.x += this.dx;
      this.y += this.dy;
    },
    render() {
      const { x = 0, y = 0, dx = 0, dy = 0, rotation = 0, scale = 0 } = this;
      render && render();
      const { renderer } = this.scene.game;
      renderer.save();
      renderer.translate(x, y);
      renderer.rotate(rotation);
      draw && draw(renderer);
      renderer.restore();
    },
  }
}

function Bird(props) {
  const { update, render } = props;
  return compose(
    GameComponent
  )({
    ...props,
    draw(renderer) {
      renderer.drawRect(0, 0, 50, 50, {fill: '#f00'});
    },
  });
}

const player = Bird({
  x: 100,
  y: 100,
  rotation: 1.5,
  dx: .4,
  update() {
    player.rotation += .1;
  }
});

const game = Game({
  renderer: renderer({ canvas: document.getElementById('c')}),
});
const menuScene = Scene({});

menuScene.addObject(player);
game.addScene(menuScene);

game.start();
