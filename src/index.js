import {GUI} from 'dat.gui';

import Game from './Game';
import Cell from './Cell';
import render from './gameRenderer';
import seeds, {randomSeed} from './seeds';

import './style.scss';

const initialSeedName = randomSeed();
const game = new Game();
const gui = new GUI();
const options = {
  cellSize: 10,
  interval: 300,
  color: [173, 216, 230],
  seedName: initialSeedName,
  seed: seeds[initialSeedName],
};

function updateQuery(game) {
  window.history.replaceState(null, null, `?${game}`);
}

window.addEventListener('load', function() {
  const root = document.getElementById('plain');
  const {
    setSpeed,
    start,
    stop,
    drawSeed,
  } = render(root, game, options, updateQuery);
  const state = {paused: false};

  if (window.location.search) {
    try {
      const cells = Cell.parse(window.location.search.substr(1));
      cells.forEach((cell) => game.add(cell));
    } catch (e) {
      console.error(e);
    }
  } else {
    drawSeed([20, 20], options.seed);
  }

  gui.add(options, 'interval', 100, 1000, 100).onFinishChange(setSpeed);
  gui.add({reset: () => game.reset()}, 'reset');
  gui.add(state, 'paused').onFinishChange((isPaused) => {
    isPaused ? stop() : start();
  });
  gui.addColor(options, 'color');
  gui.add(options, 'seedName', Object.keys(seeds)).onChange((seedName) => {
    options.seed = seeds[seedName];
  });
});
