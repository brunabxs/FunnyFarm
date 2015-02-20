var menus = [];
jQuery(document).ready(function() {
  menus.push(new Menus.menu('construction'));

  Menus.addItem(menus[0], 'chickencoop', function(){ Game.chickencoop.startBuild(); });
  Menus.addItem(menus[0], 'endchickencoop', function(){ Game.chickencoop.endBuild(); });

  Menus.appendToDOM(menus[0]);

  jQuery('#game-background').on('click', function(event) {
    var position = Game.getPosition(jQuery(this), event);

    if (Game.state === Game.states.BUILDING_CHICKENCOOP) {
      Game.chickencoop.placeFloor(position.x, position.y);
    }
  });
});
