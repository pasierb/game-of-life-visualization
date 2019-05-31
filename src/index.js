import { GUI } from 'dat.gui';

import Game, { Cell } from './Game';
import render from './gameRenderer';

import './style.scss';

const game = new Game();
const gui = new GUI();
const options = {
    cellSize: 10,
    interval: 300
}

window.addEventListener('load', function() {
    const root = document.getElementById('plain');
    const { setSpeed } = render(root, game, options);

    gui.add(options, 'interval', 100, 1000, 100).onFinishChange(setSpeed);
    gui.add({ reset: () => game.reset() }, 'reset');
});
