(function() {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(boardSize) {
    this.boardSize = boardSize;
    this.snake = new SnakeGame.Snake(boardSize);
    this.grid = Board._makeGrid(boardSize, this.snake);
  };
  
  Board.prototype.snakeInBounds = function() {    
    if (this._snakeXInBounds() && this._snakeYInBounds()) {
      return true;
    } else {
      return false;
    }
  };

  // This is for rendering in the console. Use SnakeUI#render 
  // to render to browser.
  
  Board.prototype.render = function() {
    var rendered = '';

    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid.length; j++) {
        
        if(this.grid[i][j] === true) {
          rendered += 'S';
        } else {
          rendered += '_';
        }
      }
      rendered += '\n';
    }

    return rendered;
  };
  
  // Private
  
  Board._makeGrid = function(size, snake) {
    var matrix = new Array(size);

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(size);
    }

    snake.segments.forEach(function(segment) {
      matrix[segment[1]][segment[0]] = true;
    });

    return matrix;
  };
  
  Board.prototype._snakeXInBounds = function() {
    return (this.snake.segments[0][0] > -1 && 
      this.snake.segments[0][0] < this.boardSize);
  };
  
  Board.prototype._snakeYInBounds = function() {
    return (this.snake.segments[0][1] > -1 && 
      this.snake.segments[0][1] < this.boardSize);
  };

})();

