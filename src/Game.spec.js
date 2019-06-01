import Game from './Game';
import Cell from './Cell';

describe('Game', function() {
  let game;

  beforeEach(function() {
    game = new Game();
  });

  describe('#add', function() {
    it('should add cell to plain', function() {
      const cell = new Cell([0, 0]);

      game.add(cell);

      expect([...game].indexOf(cell)).toBeGreaterThan(-1);
    });
  });

  describe('#remove', function() {
    const cell = new Cell([9, 8], 1);

    beforeEach(function() {
      game.add(cell);
    });

    it('should remove cell from game', function() {
      game.remove(cell);

      expect([...game].indexOf(cell)).toEqual(-1);
    });
  });

  describe('#reset', function() {
    beforeEach(function() {
      game.add(new Cell([8, 8]));
    });

    it('should clear game from cells', function() {
      game.reset();

      expect([...game].length).toEqual(0);
    });
  });

  describe('#getNeighbours', function() {
    it('should return all virtual neighbouring cells', function() {
      const cells = [
        new Cell([1, 1]),
      ];

      cells.forEach((cell) => game.add(cell));

      const neighbours = game.getNeighbours(cells[0]);

      expect(neighbours.length).toEqual(8);
    });

    it('should return only actual neighbouring cells', function() {
      const cells = [
        new Cell([1, 1]),
        new Cell([0, 0]),
        new Cell([2, 0]),
      ];

      cells.forEach((cell) => game.add(cell));

      const neighbours = game.getNeighbours(cells[0], true);

      expect(neighbours.length).toEqual(2);
    });
  });

  describe('#getNeighboursCount', function() {});

  describe('#tick', function() {});

  describe('iterator', function() {});

  describe('activeCells', function() {});
});
