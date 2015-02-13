describe('BuildingsSpec', function() {
  describe('chickencoop object initialization', function() {
    it('must set object\'s attributes', function() {
      // Arrange

      // Act
      var chickencoop = new Buildings.chickencoop();

      // Assert
      expect(chickencoop.minFloors).toBe(4);
      expect(chickencoop.floors).toEqual([]);
    });
  });

  describe('appendToDOM function', function() {
    it('must throws exception if minimum number of floors requirement is not met', function() {
      // Arrange
      var chickencoop = new Buildings.chickencoop();

      // Act

      // Assert
      expect(function(){ Buildings.appendToDOM(chickencoop); }).toThrow(new Error('Need to place at least 4 adjacent floors.'));
    });

    it('must throws exception if there is at least one floor not adjacent to another one', function() {
      // Arrange
      var chickencoop = new Buildings.chickencoop();
      chickencoop.floors.push(new Floors.floor(0, 0));
      chickencoop.floors.push(new Floors.floor(64, 0));
      chickencoop.floors.push(new Floors.floor(0, 64));
      chickencoop.floors.push(new Floors.floor(128, 64));

      // Act

      // Assert
      expect(function(){ Buildings.appendToDOM(chickencoop); }).toThrow(new Error('Floors must be adjacent.'));
    });

    it('must call Floors.applyFence function for each floor if minimum number of floors requirement is met and all floors have an adjacent floor', function() {
      // Arrange
      spyOn(Floors, 'applyFence');
      var chickencoop = new Buildings.chickencoop();
      chickencoop.floors.push(new Floors.floor(0, 0));
      chickencoop.floors.push(new Floors.floor(64, 0));
      chickencoop.floors.push(new Floors.floor(0, 64));
      chickencoop.floors.push(new Floors.floor(64, 64));

      // Act
      Buildings.appendToDOM(chickencoop);

      // Assert
      expect(Floors.applyFence).toHaveBeenCalled();
      expect(Floors.applyFence.calls.count()).toBe(4);
    });
  });

  describe('allowMovement function', function() {
    it('must return true if each vertex of a square (given by parameters) is inside a building\'s floor', function() {
      // Arrange
      var chickencoop = new Buildings.chickencoop();
      chickencoop.floors.push(new Floors.floor(0, 0));
      chickencoop.floors.push(new Floors.floor(64, 0));
      chickencoop.floors.push(new Floors.floor(0, 64));
      chickencoop.floors.push(new Floors.floor(64, 64));

      // Act
      var result = Buildings.allowMovement(chickencoop, 32, 32, 32, 32);

      // Assert
      expect(result).toBe(true);
    });

    it('must return false if at least one vertex of a square (given by parameters) is not inside a building\'s floor', function() {
      // Arrange
      var chickencoop = new Buildings.chickencoop();
      chickencoop.floors.push(new Floors.floor(0, 0));
      chickencoop.floors.push(new Floors.floor(64, 0));
      chickencoop.floors.push(new Floors.floor(0, 64));
      chickencoop.floors.push(new Floors.floor(64, 64));

      // Act
      var result = Buildings.allowMovement(chickencoop, 32, 32, 128, 128);

      // Assert
      expect(result).toBe(false);
    });
  });
});