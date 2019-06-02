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

  describe('#tick', function() {
    it.skip('should kill cells due to underpopulation', function() {});
    it.skip('should kill cells due to overpopulation', function() {});
    it.skip('should survive cells', function() {});
    it.skip('should resurect cell', function() {});
  });

  describe('iterator', function() {
    it.skip('should return instance of Iterator', function() {});
  });

  describe('activeCells', function() {
    it.skip('should return all live cells and direct neighbours', function() {
    });
  });

  describe('parse', function() {
    it('should set age', function() {
      const game = Game.parse('34|');

      expect(game.age).toEqual(34);
    });

    it('should parse cells', function() {
      const game = Game.parse('34|34:12:1,2,3|33:34:2,3,4');

      expect(game.size).toEqual(2);
    });

    it('should support legacy format', function() {
      const game = Game.parse('34:12:1,2,3|33:34:2,3,4');

      expect(game.age).toEqual(0);
      expect(game.size).toEqual(2);
    });
  });

  describe('toString', function() {
    it('should serialize age', function() {
      const game = new Game();
      game.add(new Cell([0, 10], 1, [1, 2, 3]));
      game.add(new Cell([20, 10], 1, [3, 4, 5]));

      expect(game.toString()).toEqual('0|0:10:1,2,3|20:10:3,4,5');
    });
  });
});
