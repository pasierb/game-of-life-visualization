class Cell {
  constructor(coords, state = 0, color) {
    [this.x, this.y] = coords;
    this.state = state;
    this.color = color;
  }

  static parse(q, defaults = {}) {
    const {
      color = [173, 216, 230],
    } = defaults;

    const [x, y, c] = q.split(':');
    return new Cell([+x, +y], 1, c ? c.split(',').map(Number) : color);
  }

  static key([x, y]) {
    return `${x}:${y}`;
  }

  static colorFrom(neighbours) {
    const aliveNeighbours = neighbours.filter((n) => n.state === 1);
    const color = aliveNeighbours.reduce((acc, n) => {
      for (let i=0; i<acc.length; i++) {
        acc[i] += n.color[i];
      }

      return acc;
    }, [0, 0, 0]);

    for (let i=0; i<color.length; i++) {
      color[i] = Math.floor(color[i] / aliveNeighbours.length);
    }

    return color;
  }

  get key() {
    return Cell.key([this.x, this.y]);
  }

  toString() {
    return `${this.x}:${this.y}:${this.color.toString()}`;
  }
}

export default Cell;
