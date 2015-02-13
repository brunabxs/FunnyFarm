describe('GameSpec', function() {
  describe('chickencoop.startBuild function', function() {
    beforeEach(function() {
      Game.state = Game.states.IDLE;
      Game.chickencoop.selected = undefined;
    });

    it('must set Game.state to Game.states.BUILDING_CHICKENCOOP', function() {
      // Arrange

      // Act
      Game.chickencoop.startBuild();

      // Assert
      expect(Game.state).toBe(Game.states.BUILDING_CHICKENCOOP);
    });

    it('must set Game.chickencoop.selected', function() {
      // Arrange

      // Act
      Game.chickencoop.startBuild();

      // Assert
      expect(Game.chickencoop.selected).toBeDefined();
    });

    it('must throw error if Game.state is not Game.states.IDLE', function() {
      // Arrange
      Game.state = Game.states.BUILDING_CHICKENCOOP;

      // Act

      // Assert
      expect(function(){ Game.chickencoop.startBuild(); }).toThrow(new Error('Game.state must be Game.states.IDLE'));
    });
  });

  describe('chickencoop.endBuild function', function() {
    beforeEach(function() {
      Game.buildings = [];
      Game.state = Game.states.IDLE;
      Game.chickencoop.selected = undefined;
      Game.chickencoop.startBuild();
      spyOn(Buildings, 'appendToDOM');
    });

    it('must set Game.state to Game.states.IDLE', function() {
      // Arrange

      // Act
      Game.chickencoop.endBuild();

      // Assert
      expect(Game.state).toBe(Game.states.IDLE);
    });

    it('must append to Game.buildings Game.chickencoop.selected', function() {
      // Arrange
      var chickencoop = Game.chickencoop.selected;

      // Act
      Game.chickencoop.endBuild();

      // Assert
      expect(Game.buildings.length).toBe(1);
      expect(Game.buildings[0]).toEqual(chickencoop);
    });

    it('must unset Game.chickencoop.selected', function() {
      // Arrange
      var chickencoop = Game.chickencoop.selected;

      // Act
      Game.chickencoop.endBuild();

      // Assert
      expect(Game.chickencoop.selected).toBeUndefined();
    });

    it('must call Buildings.appendToDOM with Game.chickencoop.selected', function() {
      // Arrange
      var chickencoop = Game.chickencoop.selected;

      // Act
      Game.chickencoop.endBuild();

      // Assert
      expect(Buildings.appendToDOM).toHaveBeenCalledWith(chickencoop);
    });

    it('must throw error if Game.state is not Game.states.BUILDING_CHICKENCOOP', function() {
      // Arrange
      Game.state = Game.states.IDLE;

      // Act

      // Assert
      expect(function(){ Game.chickencoop.endBuild(); }).toThrow(new Error('Game.state must be Game.states.BUILDING_CHICKENCOOP'));
    });
  });

  describe('chickencoop.placeFloor function', function() {
    beforeEach(function() {
      Game.buildings = [];
      Game.state = Game.states.IDLE;
      Game.chickencoop.selected = undefined;
      Game.chickencoop.startBuild();
      spyOn(Floors, 'appendToDOM');
    });

    it('must append to Game.chickencoop.selected.floors a floor', function() {
      // Arrange
      var x = 0;
      var y = 0;

      // Act
      Game.chickencoop.placeFloor(x, y);

      // Assert
      expect(Game.chickencoop.selected.floors.length).toBe(1);
    });

    it('must call Floors.appendToDOM function', function() {
      // Arrange
      var x = 0;
      var y = 0;

      // Act
      Game.chickencoop.placeFloor(x, y);

      // Assert
      expect(Floors.appendToDOM).toHaveBeenCalled();
      expect(Floors.appendToDOM.calls.count()).toBe(1);
    });

    it('must throw error if Game.state is not Game.states.BUILDING_CHICKENCOOP', function() {
      // Arrange
      Game.state = Game.states.IDLE;
      var x = 0;
      var y = 0;

      // Act

      // Assert
      expect(function(){ Game.chickencoop.placeFloor(x, y); }).toThrow(new Error('Game.state must be Game.states.BUILDING_CHICKENCOOP'));
    });
  });

  describe('chickencoop.placeHen function', function() {
    beforeEach(function() {
      Game.animals = [];
      spyOn(Animals, 'createSprite');
    });

    it('must append to Game.animals a hen', function() {
      // Arrange
      Animals.count = 0;
      var x = 0;
      var y = 0;
      var chickencoop = {};

      // Act
      Game.chickencoop.placeHen(x, y, chickencoop);

      // Assert
      expect(Game.animals.length).toBe(1);
      expect(Game.animals[0].id).toBe('game-hen-1');
    });

    it('must call Animals.createSprite function', function() {
      // Arrange
      var x = 0;
      var y = 0;
      var chickencoop = {};

      // Act
      Game.chickencoop.placeHen(x, y, chickencoop);

      // Assert
      expect(Animals.createSprite).toHaveBeenCalled();
      expect(Animals.createSprite.calls.count()).toBe(1);
    });
  });
});