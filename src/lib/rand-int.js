import seedrandom from './seedrandom';
const rng = seedrandom('js13k');

export default function randInt(min, max) {
  return parseInt(min + rng() * max);
}