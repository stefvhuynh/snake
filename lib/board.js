(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(size) {
    this.snake = new SnakeGame.Snake();
    this.grid = Board._makeGrid(this.snake, size);
  };

  Board._makeGrid = function(snake, size) {
    var matrix = new Array(size);

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(size);
    }

    snake.segments.forEach(function(segment) {
      matrix[segment.y][segment.x] = "S";
    });

    return matrix;
  };

  Board.prototype.render = function() {
    var rendered = "";

    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid.length; j++) {
        if(this.grid[i][j] === "S") {
          rendered += "S";
        } else {
          rendered += "O";
        }
      }
      rendered += "\n";
    }

    return rendered;
  };

})();

