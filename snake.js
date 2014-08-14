(function(){
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function() {
    this.dir = new SnakeGame.Coord(0, -1);
    this.segments = [
      new SnakeGame.Coord(13, 13),
      new SnakeGame.Coord(13, 14),
      new SnakeGame.Coord(13, 15)
    ];
  };

  Snake.prototype.move = function(board) {
    var oldTail = this.segments.pop();
    var newHead = this.segments[0].plus(this.dir);
    this.segments.unshift(newHead);

    board.grid[oldTail.y][oldTail.x] = "O";
    board.grid[newHead.y][newHead.x] = "S";
  };

  Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };

})();
