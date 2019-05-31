import Game, { Cell } from './Game';
import render from './gameRenderer';

import './style.scss';

const game = new Game();

render(document.getElementById('plain'), game, {
    cellSize: 20
});
