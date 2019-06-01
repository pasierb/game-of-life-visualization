import glider from './glider';
import lwss from './lwss';

const seeds = {
  glider,
  lwss,
};

export function randomSeed() {
  const names = Object.keys(seeds);

  return names[Math.floor(Math.random() * names.length)];
}

export default seeds;
