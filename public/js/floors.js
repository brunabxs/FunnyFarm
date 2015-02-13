var Floors = Floors || {};

Floors.count = 0;

Floors.cssSelector = function(floor) {
  return '#' + floor.id;
};

Floors.style = function(size, position) {
  return 'position:absolute;width:' + size.width + ';height:' + size.height + ';top:' + position.y + ';left:' + position.x + ';';
};

Floors.domElement = function(floor) {
  return '<div id="' + floor.id + '" class="' + floor.class + '" style="' + Floors.style(floor.size, floor.position) + '"></div>';
};

Floors.appendToDOM = function(floor) {
  jQuery('#game-background').append(Floors.domElement(floor));
};

Floors.isAdjacentLeftFloor = function(floor1, floor2) {
  return floor1.position.x - parseInt(floor2.size.width, 10) === floor2.position.x && floor1.position.y === floor2.position.y;
};

Floors.isAdjacentRightFloor = function(floor1, floor2) {
  return floor1.position.x + parseInt(floor1.size.width, 10) === floor2.position.x && floor1.position.y === floor2.position.y;
};

Floors.isAdjacentTopFloor = function(floor1, floor2) {
  return floor1.position.y - parseInt(floor2.size.height, 10) === floor2.position.y && floor1.position.x === floor2.position.x;
};

Floors.isAdjacentBottomFloor = function(floor1, floor2) {
  return floor1.position.y + parseInt(floor1.size.height, 10) === floor2.position.y && floor1.position.x === floor2.position.x;
};

Floors.applyFence = function(floor, floorsAtTop, floorsAtRight, floorsAtBottom, floorsAtLeft) {
  var selector = Floors.cssSelector(floor);
  jQuery(selector).addClass('top');
  jQuery(selector).addClass('right');
  jQuery(selector).addClass('bottom');
  jQuery(selector).addClass('left');
  if (floorsAtTop === 1) jQuery(selector).removeClass('top');
  if (floorsAtRight === 1) jQuery(selector).removeClass('right');
  if (floorsAtBottom === 1) jQuery(selector).removeClass('bottom');
  if (floorsAtLeft === 1) jQuery(selector).removeClass('left');
};

Floors.floor = function(x, y) {
  var self = this;

  self.index = ++Floors.count;
  self.id = 'game-floor-' + self.index;
  self.class = 'game-floor';
  self.position = {'x': Math.floor(x/64)*64, 'y': Math.floor(y/64)*64};
  self.size = {'width': '64px', 'height': '64px'};
};