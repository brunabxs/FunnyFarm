var Buildings = Buildings || {};

Buildings.allowMovement = function(building, top, left, width, height) {
  var topLeft = building.floors.filter(function(floor) { if (Floors.containsCoord(floor, left, top)) return floor; });
  if (topLeft.length === 0) return false;
  
  var topRight = building.floors.filter(function(floor) { if (Floors.containsCoord(floor, left+width, top)) return floor; });
  if (topRight.length === 0) return false;
  
  var bottomLeft = building.floors.filter(function(floor) { if (Floors.containsCoord(floor, left, top+height)) return floor; });
  if (bottomLeft.length === 0) return false;
  
  var bottomRight = building.floors.filter(function(floor) { if (Floors.containsCoord(floor, left+width, top+height)) return floor; });
  if (bottomRight.length === 0) return false;
  
  return true;
};

Buildings.appendToDOM = function(building) {
  if (building.minFloors && building.floors.length < building.minFloors)
    throw new Error('Need to place at least ' + building.minFloors + ' adjacent floors.');
  
  var floors = building.floors;
  for (var i = 0; i < floors.length; i++) {
    var top = 0;
    var right = 0;
    var left = 0;
    var bottom = 0;
    for (var j = 0; j < floors.length; j++) {
      if (Floors.isAdjacentLeftFloor(floors[i], floors[j])) left++;
      if (Floors.isAdjacentRightFloor(floors[i], floors[j])) right++;
      if (Floors.isAdjacentTopFloor(floors[i], floors[j])) top++;
      if (Floors.isAdjacentBottomFloor(floors[i], floors[j])) bottom++;
    }

    if (top === 0 && right === 0 && bottom === 0 && left === 0 && floors.length > 1)
      throw new Error('Floors must be adjacent.');
    
    Floors.applyFence(floors[i], top, right, bottom, left);
  }

  building.finished = true;
  return building;
};

Buildings.chickencoop = function() {
  var self = this;

  self.finished = false;
  self.minFloors = 4;
  self.floors = [];
};