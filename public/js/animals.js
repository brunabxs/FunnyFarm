var Animals = Animals || {};

Animals.hen = function(x, y) {
  var self = this;

  self.index = ++Animals.count;
  self.id = 'game-hen-' + self.index;
  self.class = 'game-animal game-hen';
  self.position = {'x': x, 'y': y};
  self.size = {'width': '32px', 'height': '32px'};
};