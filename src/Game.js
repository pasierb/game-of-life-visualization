import Cell from './Cell';

export default class Game {
  constructor() {
    this.reset();
  }

  add(cell) {
    this._plain.set(cell.key, cell);
  }

  remove(cell) {
    this._plain.delete(cell.key);
  }

  reset() {
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

  getNeighbours(cell) {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].map(([offsetX, offsetY]) => {
      const coords = [cell.x + offsetX, cell.y + offsetY];

      return this._plain.get(Cell.key(coords)) || new Cell(coords, 0);
    });
  }

  getNeighboursCount(cell) {
    return this.getNeighbours(cell).reduce((sum, c) => c.state + sum, 0);
  }

  tick() {
    this.activeCells.map((cell) => {
      return {
        cell,
        neighboursCount: this.getNeighboursCount(cell),
      };
    }).forEach(({cell, neighboursCount: count}) => {
      if (cell.state === 1 && (count < 2 || count > 3)) {
        cell.state = 0;

        this.remove(cell);
      }

      if (cell.state === 0 && count === 3) { // live
        cell.state = 1;

        this.add(cell);
      }
    });
  }
}
