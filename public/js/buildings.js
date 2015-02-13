var Buildings = Buildings || {};

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
      if (Floors.isAdjacentRightFloor(floors[i], floors[j])) left++;
      if (Floors.isAdjacentTopFloor(floors[i], floors[j])) left++;
      if (Floors.isAdjacentBottomFloor(floors[i], floors[j])) left++;
    }

    if (top === 0 && right === 0 && bottom === 0 && left === 0 && floors.length > 1)
      throw new Error('Floors must be adjacent.');
    
    Floors.applyFence(floors[i], top, right, bottom, left);
  }
  return building;
};

Buildings.chickencoop = function() {
  var self = this;

  self.minFloors = 4;
  self.floors = [];
};