(function() {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(boardSize) {
    this.boardSize = boardSize;
    this.snake = new SnakeGame.Snake(boardSize);
    this.grid = Board._makeGrid(boardSize, this.snake);
    this.generateApple();
  };
  
  Board.prototype.snakeInBounds = function() {    
    if (this._snakeXInBounds() && this._snakeYInBounds()) {
      return true;
    } else {
      return false;
    }
  };
  
  Board.prototype.generateApple = function() {
    this.foodCoord = this._randomCoord();
    this.grid[this.foodCoord[1]][this.foodCoord[0]] = 'A';
  };
  
  Board.prototype.removeEatenApple = function() {
    this.grid[this.foodCoord[1]][this.foodCoord[0]] = 'S';
  };
  
  Board.prototype.snakeHasEatenApple = function() {
    if (this.snake.segments[0][0] === this.foodCoord[0] &&
      this.snake.segments[0][1] === this.foodCoord[1]) {
      
      this.removeEatenApple();
      this.generateApple();
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
        
        if(this.grid[i][j] === 'S') {
          rendered += 'S';
        } else if (this.grid[i][j] === 'A') {
          rendered += 'A';
        } else {
          rendered += '_';
        }
      }
      rendered += '\n';
    }

    return rendered;
  };
  
  // Private
  
  Board._makeGrid = function(boardSize, snake) {
    // Make the grid two rows and two columns larger than the rendered 
    // board size to allow for bounds-checking.
    var matrix = new Array(boardSize + 2);

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(boardSize + 2);
    }

    snake.segments.forEach(function(segment) {
      matrix[segment[1]][segment[0]] = 'S';
    });

    return matrix;
  };
  
  Board.prototype._snakeXInBounds = function() {
    return (this.snake.segments[0][0] > 0 && 
      this.snake.segments[0][0] < this.boardSize + 1);
  };
  
  Board.prototype._snakeYInBounds = function() {
    return (this.snake.segments[0][1] > 0 && 
      this.snake.segments[0][1] < this.boardSize + 1);
  };
  
  Board.prototype._randomCoord = function() {
    return [
      Math.round(Math.random() * this.boardSize + 1), 
      Math.round(Math.random() * this.boardSize + 1)
    ];
  };

})();

