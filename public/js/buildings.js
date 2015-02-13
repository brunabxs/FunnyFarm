var Buildings = Buildings || {};

Buildings.appendToDOM = function(building) {
  if (building.minFloors && building.floors.length < building.minFloors)
    throw new Error('Need to place at least ' + building.minFloors + ' adjacent floors.');
  
  var floors = building.floors;
  for (var i = 0; i < floors.length; i++) {
    var left   = floors.filter(function(f){ return Floors.isAdjacentLeftFloor(floors[i], f); });
    var right  = floors.filter(function(f){ return Floors.isAdjacentRightFloor(floors[i], f); });
    var top    = floors.filter(function(f){ return Floors.isAdjacentTopFloor(floors[i], f); });
    var bottom = floors.filter(function(f){ return Floors.isAdjacentBottomFloor(floors[i], f); });

    if (left.length === 0 && right.length === 0 && top.length === 0 && bottom.length === 0 && floors.length > 1)
      throw new Error('Floors must be adjacent.');
    
    Floors.applyFence(floors[i], top.length, right.length, bottom.length, left.length);
  }
  return building;
};

Buildings.chickencoop = function() {
  var self = this;

  self.minFloors = 4;
  self.floors = [];
};