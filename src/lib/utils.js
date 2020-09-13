function getQuinticEase(currentProgress, start, distance, steps) {
  currentProgress /= steps/2;
  if (currentProgress < 1) {
    return (distance/2)*(Math.pow(currentProgress, 5)) + start;
  }
  currentProgress -= 2;
  return distance/2*(Math.pow(currentProgress, 5) + 2) + start;
}


function getQuadraticEase(currentProgress, start, distance, steps) {
  currentProgress /= steps/2;
  if (currentProgress <= 1) {
    return (distance/2)*currentProgress*currentProgress + start;
  }
  currentProgress--;
  return -1*(distance/2) * (currentProgress*(currentProgress-2) - 1) + start;
}

function getEaseValue(params) {
  let distance = params.to - params.from;
  let steps = params.frames;
  let currentProgress = params.frame;
  return getQuadraticEase(currentProgress, params.from, distance, steps, 3);
}

export default { getEaseValue };