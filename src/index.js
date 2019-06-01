import {GUI} from 'dat.gui';

import Game from './Game';
import render from './gameRenderer';

import './style.scss';

const game = new Game();
const gui = new GUI();
const options = {
  cellSize: 10,
  interval: 300,
  color: [173, 216, 230],
};

window.addEventListener('load', function() {
  const root = document.getElementById('plain');
  const {setSpeed, start, stop} = render(root, game, options);
  const state = {paused: false};

  gui.add(options, 'interval', 100, 1000, 100).onFinishChange(setSpeed);
  gui.add({reset: () => game.reset()}, 'reset');
  gui.add(state, 'paused').onFinishChange((isPaused) => {
    isPaused ? stop() : start();
  });
  gui.addColor(options, 'color');
});
