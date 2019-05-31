import { Cell } from './Game';

function createCellElement(cell) {
    const el = document.createElement('div');

    el.className = 'cell';
    el.setAttribute('style', `--cell-x: ${cell.x}; --cell-y: ${cell.y};`);

    return el;
}

const defaultOptions = {
    interval: 300,
    cellSize: 10
};

/**
 * 
 * @param {HTMLElement} el 
 * @param {Game} game 
 * @param {object} options 
 * @param {number} options.cellSize
 * @param {number} options.interval
 */
function renderer(el, game, options = {}) {
    let opts = {...defaultOptions, ...options};
    let isDrawing = false;
    let drawItems = {};
    let intervalHandle;
    let isRunning = false;

    function init() {
        el.style = `--cell-size: ${+opts.cellSize}px;`;

        el.addEventListener('mousedown', function(e) {
            isDrawing = true;
        });

        el.addEventListener('mousemove', function(e) {
            if (!isDrawing) return;

            const {x, y} = e;
            const coords = [Math.floor(x / opts.cellSize), Math.floor(y / opts.cellSize)];
            const cell = new Cell(coords, 1);

            if (!drawItems[cell.key]) {
                const cellEl = createCellElement(cell);
                cellEl.classList.add('dry');
                el.appendChild(cellEl);

                drawItems[cell.key] = { cell, cellEl };
            }
        });

        el.addEventListener('mouseup', function(e) {
            isDrawing = false;

            Object.values(drawItems).forEach(({ cell, cellEl }) => {
                cellEl.classList.add('live');

                game.add(cell)
            });
            drawItems = {};
        });

        document.addEventListener('visibilitychange', function(e) {
            if(isRunning && document.visibilityState === 'visible') {
                start();
            } else {
                stop(isRunning);
            }
        }, true);
    }

    function update() {
        el.querySelectorAll('.cell.live').forEach(child => el.removeChild(child));

        for(let cell of game) {
            const cellEl = createCellElement(cell);

            cellEl.classList.add('live');
            el.appendChild(cellEl);
        }
    }

    function start() {
        stop();

        isRunning = true;
        intervalHandle = setInterval(() => {
            if (isDrawing) return;

            game.tick();
            requestAnimationFrame(update);
        }, opts.interval);
    }

    function stop(flag = false) {
        isRunning = flag;
        clearInterval(intervalHandle);
        intervalHandle = null;
    }

    function setSpeed(interval) {
        opts.interval = interval;

        stop();
        start();
    }

    init();
    start();

    return {
        start,
        stop,
        setSpeed,
    }
}

export default renderer;
