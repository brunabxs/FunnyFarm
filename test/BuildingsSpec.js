describe('chickencoop object initialization', function() {
  it('must set building object attributes', function() {
    // Arrange

    // Act
    var chickencoop = new Buildings.chickencoop();

    // Assert
    expect(chickencoop.minFloors).toBe(4);
    expect(chickencoop.floors).toEqual([]);
  });
});

describe('appendToDOM function', function() {
  it('must throws exception if minimum number of floors has not been reached', function() {
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
  
  it('must call Floors.applyFence for each floor if minimum number of floor has been reached and all floors have an adjacent floor', function() {
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
    expect(Floors.applyFence.calls.count()).toEqual(4);
  });
});