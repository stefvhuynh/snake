(function() {

  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var SnakeUI = SnakeGame.SnakeUI = function(displayId) {
    this.displayId = displayId;
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.setupHtml();
    this._bindSpacebar();
  };

  SnakeUI.BOARD_SIZE = 21;

  SnakeUI.prototype.start = function() {
    var that = this;
    this.gameInterval = window.setInterval(function() { that.step() }, 150);
  };

  SnakeUI.prototype.step = function() {
    this._bindDirKeys();
    this.board.moveOrGrowSnake();
        
    if (this.board.snakeInBounds() && !this.board.snake.hasRunIntoSelf()) {
      this.render(this.board);
    } else {
      this.end();
    }
  };
  
  SnakeUI.prototype.end = function() {
    this.pauseGame();
    alert("Game over...");
  };
  
  SnakeUI.prototype.pauseGame = function() {
    if (this.gameInterval === null) {
      this.start();
    } else {
      window.clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  };
  
  SnakeUI.prototype.displayScore = function() {
    
  };

  SnakeUI.prototype.render = function(board) {
    // The grid is actually one level larger on all sides than what is
    // actually rendered. This is so that the board can check whether
    // the snake is out of bounds. We have to slightly adjust the i and 
    // j indices here.
    for(var i = 0; i < board.grid.length - 1; i++) {
      for(var j = 0; j < board.grid.length - 1; j++) {
        var ul = $('#' + this.displayId + ' ul')[i];
        var li = $(ul).children()[j];
        
        if (board.grid[j + 1][i + 1] === 'S') { 
          $(li).removeClass('apple');
          $(li).addClass('snake'); 
        } else if (board.grid[j + 1][i + 1] === 'A') {
          $(li).addClass('apple');
        } else { 
          $(li).removeClass('snake');
        }
      }
    }
  };
  
  SnakeUI.prototype.setupHtml = function() {
    for (var i = 0; i < SnakeUI.BOARD_SIZE; i++) {
      $('#' + this.displayId).append('<ul></ul>');
      
      for(var j = 0; j < SnakeUI.BOARD_SIZE; j++) {
        var lastUl = $('ul').last()[0];
        $(lastUl).append('<li></li>');
      }
    }
  };
  
  // Private
  
  SnakeUI.prototype._bindDirKeys = function() {
    var that = this;

    $(document).on('keydown', function(event) {
      // If snake turns, then unbind the keys to prevent multiple moves
      // in one step. Only allows the first valid movement for that step.
      switch(event.keyCode) {
        case 37: // Left-arrow
          if (that.board.snake.turn([-1, 0])) { that._unbindDirKeys(); }
          break;
        case 39: // Right-arrow
          if (that.board.snake.turn([1, 0])) { that._unbindDirKeys(); }
          break;
        case 38: // Up-arrow
          if (that.board.snake.turn([0, -1])) { that._unbindDirKeys(); }
          break;
        case 40: // Down-arrow
          if (that.board.snake.turn([0, 1])) { that._unbindDirKeys(); }
          break;
      }
    });
  };
  
  SnakeUI.prototype._unbindDirKeys = function() {
    $(document).unbind('keydown');
    // Re-bind the spacebar since this unbinds all keydowns.
    this._bindSpacebar();
  };
  
  SnakeUI.prototype._bindSpacebar = function() {
    var that = this;
    
    $(document).on('keydown', function(event) {
      if (event.keyCode === 32) { 
        that.pauseGame();
      }
    });
  };

})();




