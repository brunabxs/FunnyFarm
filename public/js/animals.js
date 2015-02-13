var Animals = Animals || {};

Animals.cssSelector = function(animal) {
  return '#' + animal.id;
};

Animals.style = function(size, position) {
  return 'position:absolute;width:' + size.width + ';height:' + size.height + ';top:' + position.y + ';left:' + position.x + ';';
};

Animals.domElement = function(animal) {
  return '<div id="' + animal.id + '" class="' + animal.class + '" style="' + Animals.style(animal.size, animal.position) + '"></div>';
};

Animals.appendToDOM = function(animal) {
  jQuery('#game-background').append(Animals.domElement(animal));
};

Animals.newPosition = function(x, y, direction, step) {
  if (direction === 'up') y = y - step;
  if (direction === 'left') x = x - step;
  if (direction === 'right') x = x + step;
  if (direction === 'down') y = y + step;

  return {x: x, y: y};
};

Animals.newDir = function(animal) {
  var newDir = (Math.floor(Math.random() * 31) % 4) + 1;
  while (newDir === animal.direction) newDir = (Math.floor(Math.random() * 31) % 4) + 1;
  animal.direction = newDir;
};

Animals.walk = function(animal) {
  var sprite = jQuery(Animals.cssSelector(animal)).spState(animal.direction);

  var top = parseInt(sprite.css('top'), 10) || 0;
  var left = parseInt(sprite.css('left'), 10) || 0;
  var position = Animals.newPosition(left, top, animal.directions[animal.direction], animal.walkStep);

  // change direction randomly with prob 0.05
  if (Math.random() < 0.05) {
    Animals.newDir(animal);
  }

  animal.position.y = position.y;
  sprite.css('top', position.y + 'px');
  
  animal.position.x = position.x;
  sprite.css('left', position.x + 'px');
};

Animals.walkSpeed = function(animal) {
  return 1000 * animal.walkSpeed / animal.fps;
};

Animals.createSprite = function(animal) {
  Animals.appendToDOM(animal);

  jQuery(Animals.cssSelector(animal)).sprite({
    fps: animal.fps,
    no_of_frames: animal.frames
  });

  self.interval = setInterval(function(){ Animals.walk(animal); }, Animals.walkSpeed(animal));
};

Animals.destroySprite = function(animal) {
  jQuery(Animals.cssSelector(animal)).destroy();
  clearInterval(animal.interval);
};

Animals.hen = function(x, y) {
  var self = this;

  self.index = ++Animals.count;
  self.id = 'game-hen-' + self.index;
  self.class = 'game-animal game-hen';
  self.position = {'x': x, 'y': y};
  self.size = {'width': '32px', 'height': '32px'};
  self.fps = 10;
  self.frames = 4;
  self.interval = undefined;
  self.walkSpeed = 1;
  self.walkStep = 1;
  self.direction = 4;
  self.directions = { 4:'up', 3:'right', 1:'bottom', 2:'left' };
};