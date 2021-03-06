import Cell from './Cell';

export default class Game {
  constructor() {
    this.reset();
  }

  add(...cells) {
    return cells.map((cell) => {
      this._plain.set(cell.key, cell);

      return cell;
    });
  }

  remove(cell) {
    this._plain.delete(cell.key);
  }

  reset() {
    this._age = 0;
    this._plain = new Map();
  }

  [Symbol.iterator]() {
    return this._plain.values();
  }

  get activeCells() {
    const map = {};

    for (const cell of this._plain.values()) {
      map[cell.key] = cell;

      this.getNeighbours(cell).forEach((neighbour) => {
        map[neighbour.key] = neighbour;
      });
    }

    return Object.values(map);
  }

  get size() {
    return this._plain.size;
  }

  get age() {
    return this._age;
  }

  getNeighbours(cell, onlyActual) {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].reduce((acc, [offsetX, offsetY]) => {
      const coords = [cell.x + offsetX, cell.y + offsetY];
      const c = this._plain.get(Cell.key(coords));

      if (onlyActual) {
        if (c) acc.push(c);
      } else {
        acc.push(c || new Cell(coords, 0));
      }

      return acc;
    }, []);
  }

  tick() {
    if (!this.activeCells.length) return;

    this._age += 1;

    this.activeCells.map((cell) => {
      const neighbours = this.getNeighbours(cell);

      return {
        cell,
        neighbours,
        count: neighbours.reduce((acc, n) => acc + n.state, 0),
      };
    }).forEach(({cell, neighbours, count}) => {
      if (cell.state === 1 && (count < 2 || count > 3)) {
        this.remove(cell);
      }

      if (cell.state === 0 && count === 3) { // live
        cell.state = 1;
        cell.color = Cell.colorFrom(neighbours);

        this.add(cell);
      }
    });
  }

  toString() {
    const cells = [];

    for (const cell of this) {
      cells.push(cell.toString());
    }

    return [this.age].concat(...this).join('|');
  }

  static parse(input) {
    const [age, ...cellsInput] = input.split('|');
    const cells = cellsInput.map(Cell.parse).filter((c) => c);
    const game = new Game();

    // legacy toString method did not exported age
    if (isNaN(+age)) {
      game.add(Cell.parse(age));
    } else {
      game._age = +age;
    }

    game.add(...cells);

    return game;
  }
}
