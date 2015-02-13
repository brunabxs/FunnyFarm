describe('floor object initialization', function() {
  beforeEach(function() {
    Floors.count = 0;
  });

  it('must set floor object attributes', function() {
    // Arrange
    var x = 32;
    var y = 64;

    // Act
    var floor = new Floors.floor(x, y);

    // Assert
    expect(floor.index).toBe(1);
    expect(floor.id).toBe('game-floor-1');
    expect(floor.class).toBe('game-floor');
    expect(floor.position).toEqual({'x': 0, 'y': 64});
    expect(floor.size).toEqual({'width': '64px', 'height': '64px'});
  });

  it('must increment Floors.count', function() {
    // Arrange

    // Act
    var floor = new Floors.floor(0, 0);

    // Assert
    expect(Floors.count).toBe(1);
  });
});

describe('cssSelector function', function() {
  beforeEach(function() {
    Floors.count = 0;
  });

  it('must return floor css selector based on floor\'s instance\'s id attribute', function() {
    // Arrange
    var floor = new Floors.floor(0, 0);

    // Act
    var cssSelector = Floors.cssSelector(floor);

    // Assert
    expect(cssSelector).toBe('#game-floor-1');
  });
});

describe('style function', function() {
  it('must return style based on position and size', function() {
    // Arrange
    var size = {width: '12px', height: '13px'};
    var position = {x: 14, y: 15};

    // Act
    var style = Floors.style(size, position);

    // Assert
    expect(style).toBe('position:absolute;width:12px;height:13px;top:15;left:14;');
  });
});

describe('domElement function', function() {
  beforeEach(function() {
    Floors.count = 0;
  });

  it('must return HTML div based with attributes based on floor\'s instance\'s attributes', function() {
    // Arrange
    var floor = new Floors.floor(0, 0);

    // Act
    var domElement = Floors.domElement(floor);

    // Assert
    expect(domElement).toBe('<div id="game-floor-1" class="game-floor" style="position:absolute;width:64px;height:64px;top:0;left:0;"></div>');
  });
});

describe('appendToDOM function', function() {
  beforeEach(function() {
    Floors.count = 0;
  });

  it('must be called over #game-background element', function() {
    // Arrange
    var spyJQueryAppendFunction = spyOn($.fn, 'append');
    var floor = new Floors.floor(0, 0);

    // Act
    Floors.appendToDOM(floor);

    // Assert
    expect(spyJQueryAppendFunction.calls.mostRecent().object.selector).toEqual('#game-background');
  });

  it('must be called with domElement function\'s result', function() {
    // Arrange
    var spyJQueryAppendFunction = spyOn($.fn, 'append');
    var floor = new Floors.floor(0, 0);

    // Act
    Floors.appendToDOM(floor);

    // Assert
    expect(spyJQueryAppendFunction).toHaveBeenCalledWith('<div id="game-floor-1" class="game-floor" style="position:absolute;width:64px;height:64px;top:0;left:0;"></div>');
  });
});

describe('isAdjacentLeftFloor function', function() {
  it('must return true if second floor is on left side of first floor and both have same y-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(64, 0);
    var floor2 = new Floors.floor(0, 0);

    // Act
    var result = Floors.isAdjacentLeftFloor(floor1, floor2);

    // Assert
    expect(result).toBe(true);
  });

  it('must return false if second floor is on left side of first floor but not the same y-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(64, 0);
    var floor2 = new Floors.floor(0, 64);

    // Act
    var result = Floors.isAdjacentLeftFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });

  it('must return false if second floor is not on left side of first floor', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(64, 0);

    // Act
    var result = Floors.isAdjacentLeftFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });
});

describe('isAdjacentRightFloor function', function() {
  it('must return true if second floor is on right side of first floor and both have same y-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(64, 0);

    // Act
    var result = Floors.isAdjacentRightFloor(floor1, floor2);

    // Assert
    expect(result).toBe(true);
  });

  it('must return false if second floor is on right side of first floor but not the same y-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(64, 64);

    // Act
    var result = Floors.isAdjacentRightFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });

  it('must return false if second floor is not on right side of first floor', function() {
    // Arrange
    var floor1 = new Floors.floor(64, 0);
    var floor2 = new Floors.floor(0, 0);

    // Act
    var result = Floors.isAdjacentRightFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });
});

describe('isAdjacentTopFloor function', function() {
  it('must return true if second floor is over first floor and both have same x-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 64);
    var floor2 = new Floors.floor(0, 0);

    // Act
    var result = Floors.isAdjacentTopFloor(floor1, floor2);

    // Assert
    expect(result).toBe(true);
  });

  it('must return false if second floor is over first floor but not the same x-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(64, 64);

    // Act
    var result = Floors.isAdjacentTopFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });

  it('must return false if second floor is not over first floor', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(0, 64);

    // Act
    var result = Floors.isAdjacentTopFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });
});

describe('isAdjacentBottomFloor function', function() {
  it('must return true if second floor is under first floor and both have same x-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(0, 64);

    // Act
    var result = Floors.isAdjacentBottomFloor(floor1, floor2);

    // Assert
    expect(result).toBe(true);
  });

  it('must return false if second floor is under first floor but not the same x-coord', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 0);
    var floor2 = new Floors.floor(64, 64);

    // Act
    var result = Floors.isAdjacentBottomFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });

  it('must return false if second floor is not under first floor', function() {
    // Arrange
    var floor1 = new Floors.floor(0, 64);
    var floor2 = new Floors.floor(0, 0);

    // Act
    var result = Floors.isAdjacentBottomFloor(floor1, floor2);

    // Assert
    expect(result).toBe(false);
  });
});

describe('applyFence function', function() {
  it('must apply top, right, bottom and left classes to DOM element if there is no other floor around', function() {
    // Arrange
    var floor = new Floors.floor(64, 64);
    var spyJQueryAddClassFunction = spyOn($.fn, 'addClass');
    var spyJQueryRemoveClassFunction = spyOn($.fn, 'removeClass');

    // Act
    Floors.applyFence(floor, 0, 0, 0, 0);

    // Assert
    expect(spyJQueryAddClassFunction).toHaveBeenCalled();
    expect(spyJQueryAddClassFunction.calls.count()).toEqual(4);
    expect(spyJQueryRemoveClassFunction).not.toHaveBeenCalled();
  });

  it('must not apply top class to DOM element if there is one floor over it', function() {
    // Arrange
    var floor = new Floors.floor(64, 64);
    var spyJQueryAddClassFunction = spyOn($.fn, 'addClass');
    var spyJQueryRemoveClassFunction = spyOn($.fn, 'removeClass');

    // Act
    Floors.applyFence(floor, 1, 0, 0, 0);

    // Assert
    expect(spyJQueryAddClassFunction).toHaveBeenCalled();
    expect(spyJQueryAddClassFunction.calls.count()).toEqual(4);
    expect(spyJQueryRemoveClassFunction).toHaveBeenCalled();
    expect(spyJQueryRemoveClassFunction.calls.count()).toEqual(1);
    expect(spyJQueryRemoveClassFunction.calls.mostRecent().args[0]).toEqual('top');
  });

  it('must not apply right class to DOM element if there is one floor on its right side', function() {
    // Arrange
    var floor = new Floors.floor(64, 64);
    var spyJQueryAddClassFunction = spyOn($.fn, 'addClass');
    var spyJQueryRemoveClassFunction = spyOn($.fn, 'removeClass');

    // Act
    Floors.applyFence(floor, 0, 1, 0, 0);

    // Assert
    expect(spyJQueryAddClassFunction).toHaveBeenCalled();
    expect(spyJQueryAddClassFunction.calls.count()).toEqual(4);
    expect(spyJQueryRemoveClassFunction).toHaveBeenCalled();
    expect(spyJQueryRemoveClassFunction.calls.count()).toEqual(1);
    expect(spyJQueryRemoveClassFunction.calls.mostRecent().args[0]).toEqual('right');
  });

  it('must not apply bottom class to DOM element if there is one floor under it', function() {
    // Arrange
    var floor = new Floors.floor(64, 64);
    var spyJQueryAddClassFunction = spyOn($.fn, 'addClass');
    var spyJQueryRemoveClassFunction = spyOn($.fn, 'removeClass');

    // Act
    Floors.applyFence(floor, 0, 0, 1, 0);

    // Assert
    expect(spyJQueryAddClassFunction).toHaveBeenCalled();
    expect(spyJQueryAddClassFunction.calls.count()).toEqual(4);
    expect(spyJQueryRemoveClassFunction).toHaveBeenCalled();
    expect(spyJQueryRemoveClassFunction.calls.count()).toEqual(1);
    expect(spyJQueryRemoveClassFunction.calls.mostRecent().args[0]).toEqual('bottom');
  });

  it('must not apply left class to DOM element if there is one floor on its left side', function() {
    // Arrange
    var floor = new Floors.floor(64, 64);
    var spyJQueryAddClassFunction = spyOn($.fn, 'addClass');
    var spyJQueryRemoveClassFunction = spyOn($.fn, 'removeClass');

    // Act
    Floors.applyFence(floor, 0, 0, 0, 1);

    // Assert
    expect(spyJQueryAddClassFunction).toHaveBeenCalled();
    expect(spyJQueryAddClassFunction.calls.count()).toEqual(4);
    expect(spyJQueryRemoveClassFunction).toHaveBeenCalled();
    expect(spyJQueryRemoveClassFunction.calls.count()).toEqual(1);
    expect(spyJQueryRemoveClassFunction.calls.mostRecent().args[0]).toEqual('left');
  });  
});