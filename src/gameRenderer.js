import Cell from './Cell';

function createCellElement(cell) {
  const el = document.createElement('div');

  el.className = 'cell';
  el.setAttribute('style', `
    --cell-x: ${cell.x};
    --cell-y: ${cell.y};
    --cell-color: rgb(${(cell.color || []).join(',')});
  `);

  return el;
}

/**
 *
 * @param {HTMLElement} el
 * @param {Game} game
 * @param {object} options
 * @param {number} options.cellSize
 * @param {number} options.interval
 * @return {Void}
 */
function renderer(el, game, options) {
  let isDrawing = false;
  let drawStartCoords;
  let drawItems = {};
  let intervalHandle;
  let isRunning = false;

  function eventCoords(e) {
    const {x, y} = e;

    return [
      Math.floor(x / options.cellSize),
      Math.floor(y / options.cellSize),
    ];
  }

  function onMouseDown(e) {
    isDrawing = true;
    drawStartCoords = eventCoords(e);

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', onMouseUp);
  }

  function onClick(e) {
    const [x, y] = eventCoords(e);

    if (options.seed
      && x === drawStartCoords[0]
      && y === drawStartCoords[1]
    ) {
      drawSeed([x, y], options.seed);
    }
  }

  function onMouseUp(e) {
    const cellItems = Object.values(drawItems);

    if (cellItems.length > 0) {
      cellItems.forEach(({cell, cellEl}) => {
        cellEl.classList.add('live');

        game.add(cell);
      });

      drawItems = {};
    }

    el.removeEventListener('mousemove', onMouseMove);
    el.removeEventListener('mouseup', onMouseUp);
    isDrawing = false;
  }

  function onMouseMove(e) {
    const coords = eventCoords(e);
    const cell = new Cell(coords, 1, options.color);

    if (!drawItems[cell.key]) {
      const cellEl = createCellElement(cell);
      cellEl.classList.add('dry');
      el.appendChild(cellEl);

      drawItems[cell.key] = {cell, cellEl};
    }
  }

  function onVisibilityChange(e) {
    if (isRunning && document.visibilityState === 'visible') {
      start();
    } else {
      stop(isRunning);
    }
  }

  function init() {
    el.style = `--cell-size: ${+options.cellSize}px;`;

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibilityChange, true);
  }

  function update() {
    const fragment = document.createDocumentFragment();

    for (const cell of game) {
      const cellEl = createCellElement(cell);

      cellEl.classList.add('live');
      fragment.appendChild(cellEl);
    }

    el.innerHTML = '';
    el.appendChild(fragment);
  }

  function drawSeed([x, y], seed) {
    seed.forEach(([sX, sY]) => {
      game.add(new Cell([x + sX, y + sY], 1, options.color));
    });
  }

  function start() {
    stop();

    isRunning = true;
    intervalHandle = setInterval(() => {
      if (isDrawing) return;

      game.tick();
      requestAnimationFrame(update);
    }, options.interval);
  }

  function stop(flag = false) {
    isRunning = flag;
    clearInterval(intervalHandle);
    intervalHandle = null;
  }

  function setSpeed(interval) {
    stop();
    start();
  }

  init();
  start();

  return {
    start,
    stop,
    setSpeed,
    drawSeed,
  };
}

export default renderer;
