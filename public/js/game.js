var Game = Game || {};

Game.animals = [];
Game.buildings = [];

Game.states = {'IDLE':0, 'BUILDING_CHICKENCOOP':1};
Game.state = Game.states.IDLE;

Game.getPosition = function(target, event) {
  var offset = jQuery(target).offset();
  var x = event.clientX - offset.left;
  var y = event.clientY - offset.top;
  return {x: x, y: y};
};

Game.chickencoop = {};
Game.chickencoop.selected = undefined;

Game.chickencoop.startBuild = function() {
  if (Game.state !== Game.states.IDLE)
    throw new Error('Game.state must be Game.states.IDLE');

  Game.state = Game.states.BUILDING_CHICKENCOOP;
  Game.chickencoop.selected = new Buildings.chickencoop();
};

Game.chickencoop.endBuild = function() {
  if (Game.state !== Game.states.BUILDING_CHICKENCOOP)
    throw new Error('Game.state must be Game.states.BUILDING_CHICKENCOOP');

  Buildings.appendToDOM(Game.chickencoop.selected);
  Game.buildings.push(Game.chickencoop.selected);
  Game.chickencoop.selected = undefined;
  Game.state = Game.states.IDLE;
};

Game.chickencoop.placeFloor = function(x, y) {
  if (Game.state !== Game.states.BUILDING_CHICKENCOOP)
    throw new Error('Game.state must be Game.states.BUILDING_CHICKENCOOP');

  var floor = new Floors.floor(x, y);
  Floors.appendToDOM(floor);
  Game.chickencoop.selected.floors.push(floor);
  
  var chickencoop = Game.chickencoop.selected;

  jQuery(Floors.cssSelector(floor)).on('click', function(event) {
    var position = Game.getPosition(jQuery(this).parent(), event);
    Game.chickencoop.placeHen(position.x, position.y, chickencoop);
    return false;
  });
};

Game.chickencoop.placeHen = function(x, y, chickencoop) {
  var hen = new Animals.hen(x, y, chickencoop);
  Animals.createSprite(hen);
  Game.animals.push(hen);
};