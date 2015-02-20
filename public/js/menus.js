var Menus = Menus || {};

Menus.addItem = function(menu, itemName, onClick) {
  menu.items[itemName] = onClick;
};

Menus.cssSelector = function(menu) {
  return '#' + menu.id;
};

Menus.totalItems = function(menu) {
  var items = 0;
  for (var itemName in menu.items) {
    items++;
  }
  return items;
};

Menus.domElement = function(menu) {
  return '<section id="' + menu.id + '" style="width:' + (48 * Menus.totalItems(menu) + 48) + 'px"><a href="#" id="' + menu.handler + '"><span></span></a></section>';
};

Menus.appendToDOM = function(menu) {
  jQuery('#game-menu').append(Menus.domElement(menu));

  jQuery(Menus.cssSelector(menu)).css('left', (Menus.totalItems(menu) * -48));
  menu.closed = true;

  jQuery('#' + menu.handler).click(function() {
    if (!menu.closed) {
      jQuery(Menus.cssSelector(menu)).animate({left:-48 * Menus.totalItems(menu)}, 250, function(){ menu.closed = true; });
    }
    else {
      jQuery(Menus.cssSelector(menu)).animate({left:0}, 250, function(){ menu.closed = false; });
    }
  });

  for (var itemName in menu.items) {
    var itemId = menu.id + '-' + itemName;
    var item = '<a href="#" id="' + itemId + '"></a>';

    jQuery(Menus.cssSelector(menu)).prepend(item);
    jQuery('#' + itemId).click(menu.items[itemName]);
  }
};

Menus.menu = function(name) {
  var self = this;

  self.id = 'game-menu-' + name;
  self.handler = self.id + '-handler';
  self.closed = false;
  self.items = {};
};