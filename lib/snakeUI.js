(function() {

  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var SnakeUI = SnakeGame.SnakeUI = function(display) {
    this.$display = display;
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.gameInterval;
    
    this.setupHtml();
    this.bindKeys();
  };

  SnakeUI.BOARD_SIZE = 21;

  SnakeUI.prototype.start = function() {
    var that = this;
    this.gameInterval = window.setInterval(function() { that.step() }, 1000);
  };

  SnakeUI.prototype.step = function() {
    if (this.board.snakeHasEatenApple()) {
      this.board.snake.grow(this.board); 
    } else {
      this.board.snake.move(this.board);
    }
    
    if (this.board.snakeInBounds()) {
      this.render(this.board);
    } else {
      this.endGame();
    }
  };
  
  SnakeUI.prototype.endGame = function() {
    window.clearInterval(this.gameInterval);
    alert("Game Over... :(")
  };

  SnakeUI.prototype.render = function(board) {
    // The grid is actually one level larger on all sides than what is
    // actually rendered. This is so that the board can check whether
    // the snake is out of bounds. So, we have to slightly adjust the
    // i and j indices here.
    for(var i = 0; i < board.grid.length - 1; i++) {
      for(var j = 0; j < board.grid.length - 1; j++) {
        var ul = $('ul')[i];
        var li = $(ul).children()[j];
        
        if (board.grid[j + 1][i + 1] === 'S') { 
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
      $('#game-display').append('<ul></ul>');
      
      for(var j = 0; j < SnakeUI.BOARD_SIZE; j++) {
        var currentUl = $('ul').last()[0];
        $(currentUl).append('<li></li>');
      }
    }
  };
  
  SnakeUI.prototype.bindKeys = function() {
    var that = this;

    $(document).on('keydown', function(event) {
      switch(event.keyCode) {
        case 32: // Spacebar
          that.start();
          break;
        case 37: // Left-arrow
          that.board.snake.turn([-1, 0]);
          break;
        case 39: // Right-arrow
          that.board.snake.turn([1, 0]);
          break;
        case 38: // Up-arrow
          that.board.snake.turn([0, -1]);
          break;
        case 40: // Down-arrow
          that.board.snake.turn([0, 1]);
          break;
      }
    });
  };

})();





