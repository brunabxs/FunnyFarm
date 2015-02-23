describe('MenusSpec', function() {
  describe('menu object initialization', function() {
    it('must set object\'s attributes', function() {
      // Arrange
      var name = 'name';

      // Act
      var menu = new Menus.menu(name);

      // Assert
      expect(menu.id).toBe('game-menu-name');
      expect(menu.handler).toBe('game-menu-name-handler');
      expect(menu.closed).toBe(false);
      expect(menu.items).toEqual({});
    });
  });

  describe('cssSelector function', function() {
    it('must return menu css selector based on parameter\'s id attribute', function() {
      // Arrange
      var name = 'name';
      var menu = new Menus.menu(name);

      // Act
      var cssSelector = Menus.cssSelector(menu);

      // Assert
      expect(cssSelector).toBe('#game-menu-name');
    });
  });

  describe('addItem function', function() {
    it('must add to instance\'s items attribute the itemName parameter', function() {
      // Arrange
      var name = 'name';
      var menu = new Menus.menu(name);
      var onClick = function(){};

      // Act
      Menus.addItem(menu, 'item', onClick);

      // Assert
      expect(menu.items).toEqual({'item': onClick});
    });
  });

  describe('totalItems function', function() {
    it('must count items', function() {
      // Arrange
      var name = 'name';
      var menu = new Menus.menu(name);
      Menus.addItem(menu, 'item1');
      Menus.addItem(menu, 'item2');

      // Act
      var totalItems = Menus.totalItems(menu);

      // Assert
      expect(totalItems).toBe(2);
    });

    it('must return zero if there is no item', function() {
      // Arrange
      var name = 'name';
      var menu = new Menus.menu(name);

      // Act
      var totalItems = Menus.totalItems(menu);

      // Assert
      expect(totalItems).toBe(0);
    });
  });

  describe('domElement function', function() {
    it('must return HTML div based on parameters\'s attributes', function() {
      // Arrange
      var menu = new Menus.menu('name');
      Menus.addItem(menu, 'item');

      // Act
      var domElement = Menus.domElement(menu);

      // Assert
      expect(domElement).toBe('<section id="game-menu-name" style="width:96px"><a href="#" id="game-menu-name-handler"><span></span></a></section>');
    });
  });

  describe('appendToDOM function', function() {
    var menu;
    beforeEach(function(){
      menu = new Menus.menu('name');
    });

    it('must be called over #game-menu element', function() {
      // Arrange
      var spyJQueryAppendFunction = spyOn($.fn, 'append');

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(spyJQueryAppendFunction.calls.mostRecent().object.selector).toBe('#game-menu');
    });

    it('must be called with domElement function\'s result', function() {
      // Arrange
      var spyJQueryAppendFunction = spyOn($.fn, 'append');

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(spyJQueryAppendFunction).toHaveBeenCalledWith('<section id="game-menu-name" style="width:48px"><a href="#" id="game-menu-name-handler"><span></span></a></section>');
    });

    it('must close menu', function() {
      // Arrange
      var spyJQueryCssFunction = spyOn($.fn, 'css');
      var onClick = function(){};
      Menus.addItem(menu, 'item', onClick);

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(menu.closed).toBe(true);
      expect(spyJQueryCssFunction).toHaveBeenCalledWith('left', -48);
      expect(spyJQueryCssFunction.calls.mostRecent().object.selector).toEqual('#game-menu-name');
    });

    it('must set click event over menu handler', function() {
      // Arrange
      var spyJQueryClickFunction = spyOn($.fn, 'click');

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(spyJQueryClickFunction.calls.mostRecent().object.selector).toBe('#game-menu-name-handler');
    });

    it('must append to menu parameter a link', function() {
      // Arrange
      var spyJQueryPrependFunction = spyOn($.fn, 'prepend');
      var onClick = function(){};
      Menus.addItem(menu, 'item', onClick);

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(spyJQueryPrependFunction.calls.mostRecent().object.selector).toBe('#game-menu-name');
      expect(spyJQueryPrependFunction).toHaveBeenCalledWith('<a href="#" id="game-menu-name-item"></a>');
    });

    it('must set click event over menu item', function() {
      // Arrange
      var spyJQueryClickFunction = spyOn($.fn, 'click');
      var onClick = function(){};
      Menus.addItem(menu, 'item', onClick);

      // Act
      Menus.appendToDOM(menu);

      // Assert
      expect(spyJQueryClickFunction.calls.mostRecent().object.selector).toBe('#game-menu-name-item');
      expect(spyJQueryClickFunction).toHaveBeenCalledWith(onClick);
    });
  });
});