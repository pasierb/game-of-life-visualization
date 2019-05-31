export class Cell {
    /**
     * 
     * @param {Array<number>} coords 
     * @param {number} state 
     */
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

export default class Game {
    constructor() {
        this._plain = new Map();
    }

    add(cell) {
        this._plain.set(cell.key, cell);
    }

    remove(cell) {
        this._plain.delete(cell.key);
    }

    [Symbol.iterator]() {
        return this._plain.entries();
    }

    get activeCells() {
        const map = {};

        for(let cell of this._plain.values()) {
            map[cell.key] = cell;

            this.getNeighbours(cell).forEach(neighbour => {
                map[neighbour.key] = neighbour;
            })
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
            [1, 1]
        ].map(([offsetX, offsetY]) => {
            const coords = [cell.x + offsetX, cell.y + offsetY];

            return this._plain.get(Cell.key(coords)) || new Cell(coords, 0);
        })
    }

    getNeighboursCount(cell) {
        return this.getNeighbours(cell).reduce((sum, c) => c.state + sum, 0);
    }

    tick() {
        this.activeCells.map((cell) => {
            return {
                cell,
                neighboursCount: this.getNeighboursCount(cell)
            }
        }).forEach(({ cell, neighboursCount: count }) => {
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
