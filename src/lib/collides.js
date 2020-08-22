function getWorldRect(obj) {
  let world = obj.world || obj;

  let x = world.x;
  let y = world.y;
  let width = Math.abs(world.width);
  let height = Math.abs(world.height);

  if (obj.anchor) {
    x -= width * obj.anchor.x;
    y -= height * obj.anchor.y;
  }

  if (obj.bound) {
    x += width * obj.bound;
    y += height * obj.bound;
    width = width - (width * obj.bound) * 2;
    height = height - (height * obj.bound) * 2;
  }

  return {
    x,
    y,
    width,
    height
  };
}

export default function collides(obj1, obj2) {
  // if (obj1.rotation || obj2.rotation) return null;

  // @ifdef GAMEOBJECT_SCALE||GAMEOBJECT_ANCHOR
  // destructure results to obj1 and obj2
  [obj1, obj2] = [obj1, obj2].map(obj => getWorldRect(obj));
  // @endif

  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}
