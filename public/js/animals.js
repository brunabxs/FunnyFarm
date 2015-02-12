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

Animals.walk = function(animal) {
  return undefined;
};

Animals.walkSpeed = function(animal) {
  return undefined;
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
};