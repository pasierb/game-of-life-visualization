class Cell {
  constructor(coords, state = 0, color) {
    [this.x, this.y] = coords;
    this.state = state;
    this.color = color;
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
      color[i] = color[i] / aliveNeighbours.length;
    }

    return color;
  }

  get key() {
    return Cell.key([this.x, this.y]);
  }
}

export default Cell;
