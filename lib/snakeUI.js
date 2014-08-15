(function() {

  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var SnakeUI = SnakeGame.SnakeUI = function(displayId) {
    this.displayId = displayId;
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.setupHtml();
    this.bindSpacebar();
  };

  SnakeUI.BOARD_SIZE = 21;

  SnakeUI.prototype.start = function() {
    var that = this;
    this.gameInterval = window.setInterval(function() { that.step() }, 150);
  };

  SnakeUI.prototype.step = function() {
    this.bindKeys();
    this.board.moveOrGrowSnake();
    
    if (this.board.snakeInBounds()) {
      this.render(this.board);
    } else {
      this.endGame();
    }
  };
  
  SnakeUI.prototype.endGame = function() {
    this.pauseGame();
    alert("Game Over... :(")
  };
  
  SnakeUI.prototype.pauseGame = function() {
    if (this.gameInterval === null) {
      this.start();
    } else {
      window.clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  };

  SnakeUI.prototype.render = function(board) {
    // The grid is actually one level larger on all sides than what is
    // actually rendered. This is so that the board can check whether
    // the snake is out of bounds. So, we have to slightly adjust the
    // i and j indices here.
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
        var currentUl = $('ul').last()[0];
        $(currentUl).append('<li></li>');
      }
    }
  };
  
  SnakeUI.prototype.bindKeys = function() {
    var that = this;

    $(document).on('keydown', function(event) {
      // If snake turns, then unbind the keys to prevent multiple moves
      // in one step. Only allow the first valid movement for that step.
      switch(event.keyCode) {
        case 37: // Left-arrow
          if (that.board.snake.turn([-1, 0])) { that.unbindKeys(); }
          break;
        case 39: // Right-arrow
          if (that.board.snake.turn([1, 0])) { that.unbindKeys(); }
          break;
        case 38: // Up-arrow
          if (that.board.snake.turn([0, -1])) { that.unbindKeys(); }
          break;
        case 40: // Down-arrow
          if (that.board.snake.turn([0, 1])) { that.unbindKeys(); }
          break;
      }
    });
  };
  
  SnakeUI.prototype.unbindKeys = function() {
    $(document).unbind('keydown.key37');
    $(document).unbind('keydown.key39');
    $(document).unbind('keydown.key38');
    $(document).unbind('keydown.key40');
  };
  
  SnakeUI.prototype.bindSpacebar = function() {
    var that = this;
    
    $(document).on('keydown', function(event) {
      if (event.keyCode === 32) {
        that.pauseGame();
      }
    });
  };

})();




