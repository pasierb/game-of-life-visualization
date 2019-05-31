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

  describe('#key', function() {
    const cell = new Cell([-3, 12]);

    it('should return key based on coords', function() {
      expect(cell.key).toEqual('-3:12');
    });
  });
});
