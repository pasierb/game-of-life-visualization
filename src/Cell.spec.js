import Cell from './Cell';

describe('Cell', function() {
  describe('constructor', function() {
    it('should set state', function() {
      const cell = new Cell([0, 0], 1);

      expect(cell.state).toEqual(1);
    });

    it('should set default state to 0', function() {
      const cell = new Cell([0, 0]);

      expect(cell.state).toEqual(0);
    });
  });

  describe('key', function() {
    it('should return key based on coords', function() {
      expect(Cell.key([4, -5])).toEqual('4:-5');
    });
  });

  describe('colorFrom', function() {
    it('should generate color provided cells', function() {
      expect(Cell.colorFrom([
        new Cell([], 1, [10, 10, 10]),
        new Cell([], 1, [20, 20, 20]),
        new Cell([], 1, [30, 30, 30]),
      ])).toEqual([20, 20, 20]);
    });

    it('should discard dead cells', function() {
      expect(Cell.colorFrom([
        new Cell([], 1, [10, 10, 10]),
        new Cell([], 0, [250, 250, 250]),
        new Cell([], 1, [20, 20, 20]),
        new Cell([], 1, [30, 30, 30]),
      ])).toEqual([20, 20, 20]);
    });
  });

  describe('#key', function() {
    const cell = new Cell([-3, 12]);

    it('should return key based on coords', function() {
      expect(cell.key).toEqual('-3:12');
    });
  });
});
