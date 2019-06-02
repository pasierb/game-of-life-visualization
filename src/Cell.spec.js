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

  describe('parse', function() {
    it('should parse single cell', function() {
      const input = '23:30:255,254,253';
      const cell = Cell.parse(input);

      expect(cell.x).toEqual(23);
      expect(cell.y).toEqual(30);
      expect(cell.color).toEqual([255, 254, 253]);
    });

    it('should set default color', function() {
      const defaults = {color: [255, 254, 253]};
      const input = '23:30';
      const cell = Cell.parse(input, defaults);

      expect(cell.x).toEqual(23);
      expect(cell.y).toEqual(30);
      expect(cell.color).toEqual([255, 254, 253]);
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

  describe('#toString', function() {
    const cell = new Cell([12, 21], 1, [123, 124, 125]);

    expect(cell.toString()).toEqual('12:21:123,124,125');
  });
});
