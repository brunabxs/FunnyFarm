jQuery(document).ready(function() {
  jQuery('#game-action-start-build-chickencoop').on('click', function(event) {
    Game.chickencoop.startBuild();
  });

  jQuery('#game-action-end-build-chickencoop').on('click', function(event) {
    Game.chickencoop.endBuild();
  });

  jQuery('#game-background').on('click', function(event) {
    var position = Game.getPosition(jQuery(this), event);
    
    if (Game.state === Game.states.BUILDING_CHICKENCOOP) {
      Game.chickencoop.placeFloor(position.x, position.y);
    }
  });
});