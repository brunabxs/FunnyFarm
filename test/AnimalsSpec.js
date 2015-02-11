describe('hen object initialization', function() {
  beforeEach(function() {
    Animals.count = 0;
  });

  it('must set hen object attributes', function() {
    // Arrange
    var x = 32;
    var y = 32;

    // Act
    var hen = new Animals.hen(x, y);

    // Assert
    expect(hen.index).toBe(1);
    expect(hen.id).toBe('game-hen-1');
    expect(hen.class).toBe('game-animal game-hen');
    expect(hen.position).toEqual({'x': x, 'y': y});
    expect(hen.size).toEqual({'width': '32px', 'height': '32px'});
  });

  it('must increment Animals.count', function() {
    // Arrange

    // Act
    var hen = new Animals.hen(0, 0);

    // Assert
    expect(Animals.count).toBe(1);
  });
});

describe('cssSelector function', function() {
  beforeEach(function() {
    Animals.count = 0;
  });

  it('must return animal css selector based on animal\'s instance\'s id attribute', function() {
    // Arrange
    var hen = new Animals.hen(0, 0);

    // Act
    var cssSelector = Animals.cssSelector(hen);

    // Assert
    expect(cssSelector).toBe('#game-hen-1');
  });
});

describe('style function', function() {
  it('must return style based on position and size', function() {
    // Arrange
    var size = {width: '12px', height: '13px'};
    var position = {x: 14, y: 15};

    // Act
    var style = Animals.style(size, position);

    // Assert
    expect(style).toBe('position:absolute;width:12px;height:13px;top:15;left:14;');
  });
});

describe('domElement function', function() {
  beforeEach(function() {
    Animals.count = 0;
  });

  it('must return HTML div based with attributes based on animal\'s instance\'s attributes', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);

    // Act
    var domElement = Animals.domElement(hen);

    // Assert
    expect(domElement).toBe('<div id="game-hen-1" class="game-animal game-hen" style="position:absolute;width:32px;height:32px;top:15;left:14;"></div>');
  });
});

describe('appendToDOM function', function() {
  beforeEach(function() {
    Animals.count = 0;
  });

  it('must be called with domElement function\'s result', function() {
    // Arrange
    var spy = spyOn($.fn, 'append');
    var hen = new Animals.hen(14, 15);

    // Act
    Animals.appendToDOM(hen);

    // Assert
    expect(spy).toHaveBeenCalledWith('<div id="game-hen-1" class="game-animal game-hen" style="position:absolute;width:32px;height:32px;top:15;left:14;"></div>');
  });
});