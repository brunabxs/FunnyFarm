var Animals = Animals || {};

Animals.cssSelector = function(animal) {
  return '#' + animal.id;
};

Animals.style = function(size, position) {
  return 'position:absolute;'
       + 'width:' + size.width + ';'
       + 'height:' + size.height + ';'
       + 'top:' + position.y + ';'
       + 'left:' + position.x + ';';
};

Animals.domElement = function(animal) {
  return '<div'
       + ' id="' + animal.id + '"'
       + ' class="' + animal.class + '"'
       + ' style="' + Animals.style(animal.size, animal.position) + '"'
       + '></div>';
};

Animals.appendToDOM = function(animal) {
  jQuery('#game-background').append(Animals.domElement(animal));
};

Animals.hen = function(x, y) {
  var self = this;

  self.index = ++Animals.count;
  self.id = 'game-hen-' + self.index;
  self.class = 'game-animal game-hen';
  self.position = {'x': x, 'y': y};
  self.size = {'width': '32px', 'height': '32px'};
};