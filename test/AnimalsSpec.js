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
    expect(hen.fps).toEqual(10);
    expect(hen.frames).toEqual(4);
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

  it('must be called over #game-background element', function() {
    // Arrange
    var spy = spyOn($.fn, 'append');
    var hen = new Animals.hen(14, 15);

    // Act
    Animals.appendToDOM(hen);

    // Assert
    expect(spy.calls.mostRecent().object.selector).toEqual('#game-background');
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

describe('createSprite function', function() {
  beforeEach(function() {
    Animals.count = 0;
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  
  it('must be called over cssSelector function\'s result', function() {
    // Arrange
    var spy = spyOn($.fn, 'sprite');
    var hen = new Animals.hen(14, 15);

    // Act
    Animals.createSprite(hen);

    // Assert
    expect(spy.calls.mostRecent().object.selector).toEqual('#game-hen-1');
  });

  it('must be called with animal\'s instance\'s fps and frames atributes', function() {
    // Arrange
    var spy = spyOn($.fn, 'sprite');
    var hen = new Animals.hen(14, 15);

    // Act
    Animals.createSprite(hen);

    // Assert
    expect(spy).toHaveBeenCalledWith({ fps: 10, no_of_frames: 4 });
  });

  it('must use walkSpeed return value to measure interval calls', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);
    spyOn(Animals, 'walk');
    spyOn(Animals, 'walkSpeed');

    // Act
    Animals.createSprite(hen);
    
    // Assert
    expect(Animals.walkSpeed).toHaveBeenCalledWith(hen);
  });
  
  it('must call walk function after each walkSpeed function\'s result', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);
    spyOn(Animals, 'walk');
    spyOn(Animals, 'walkSpeed').and.returnValue(1000);

    // Act
    Animals.createSprite(hen);
    
    // Assert
    expect(Animals.walk).not.toHaveBeenCalled();
    
    jasmine.clock().tick(1001);
    expect(Animals.walk).toHaveBeenCalled();
    
    jasmine.clock().tick(500);
    expect(Animals.walk.calls.count()).toBe(1);
    
    jasmine.clock().tick(500);
    expect(Animals.walk.calls.count()).toBe(2);
  });

  it('must set animal\'s instance\'s interval attribute', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);
    spyOn(Animals, 'walk');

    // Act
    Animals.createSprite(hen);
    
    // Assert
    expect(self.interval).not.toEqual(undefined);
  });
  
  it('must call appendToDOM function with animal\'s instance', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);
    spyOn(Animals, 'appendToDOM');

    // Act
    Animals.createSprite(hen);
    
    // Assert
    expect(Animals.appendToDOM).toHaveBeenCalledWith(hen);
  });
});

describe('destroySprite function', function() {
  beforeEach(function() {
    Animals.count = 0;
  });
  
  it('must be called over cssSelector function\'s result', function() {
    // Arrange
    var spy = spyOn($.fn, 'destroy');
    var hen = new Animals.hen(14, 15);

    // Act
    Animals.destroySprite(hen);

    // Assert
    expect(spy.calls.mostRecent().object.selector).toEqual('#game-hen-1');
  });
  
  it('must unset animal\'s instance\'s interval attribute', function() {
    // Arrange
    var hen = new Animals.hen(14, 15);
    spyOn(Animals, 'walk');

    // Act
    Animals.destroySprite(hen);
    
    // Assert
    expect(hen.interval).toEqual(undefined);
  });
});