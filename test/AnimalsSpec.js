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
