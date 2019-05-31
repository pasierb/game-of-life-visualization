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
  });

  describe('#getNeighbours', function() {});

  describe('#getNeighboursCount', function() {});

  describe('#tick', function() {});

  describe('iterator', function() {});

  describe('activeCells', function() {});
});
