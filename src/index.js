import {GUI} from 'dat.gui';

import Game from './Game';
import Cell from './Cell';
import render from './gameRenderer';
import seeds, {randomSeed} from './seeds';

import './style.scss';

const initialSeedName = randomSeed();
const gui = new GUI();
const options = {
  cellSize: 10,
  interval: 300,
  color: [173, 216, 230],
  seedName: initialSeedName,
  seed: seeds[initialSeedName],
};


const updateQuery = function(timeout) {
  let handle;

  return function(game) {
    if (handle) return;

    handle = setTimeout(() => {
      window.history.replaceState(null, null, `?${game}`);

      handle = clearTimeout(handle);
    }, timeout);
  };
};

window.addEventListener('load', function() {
  let game = new Game();
  let drawRandomSeed = false;

  if (window.location.search) {
    try {
      game = Game.parse(window.location.search.substr(1));
    } catch (e) {
      console.error(e);
    }
  } else {
    drawRandomSeed = true;
  }

  const debouncedUpdateQuery = updateQuery(3000);
  const statAgesEl = document.getElementById('stats-ages');
  const statLivesEl = document.getElementById('stats-lives');
  const root = document.getElementById('plain');
  const {
    setSpeed,
    start,
    stop,
    drawSeed,
  } = render(root, game, options, onTick);
  const state = {paused: false};

  if (drawRandomSeed) {
    drawSeed([20, 20], options.seed);
  }

  function onTick(game) {
    debouncedUpdateQuery(game);

    requestAnimationFrame(function() {
      statLivesEl.innerText = game.size;
      statAgesEl.innerText = game.age;
    });
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
