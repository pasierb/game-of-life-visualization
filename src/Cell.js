class Cell {
  constructor(coords, state = 0) {
    [this.x, this.y] = coords;
    this.state = state;
  }

  static key([x, y]) {
    return `${x}:${y}`;
  }

  get key() {
    return Cell.key([this.x, this.y]);
  }
}

export default Cell;
