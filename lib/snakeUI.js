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
    this.gameInterval = window.setInterval(function() { that.step() }, 125);
  };

  SnakeUI.prototype.step = function() {
    this.board.snake.move(this.board);
    
    if (this.board.snakeInBounds()) {
      this.render(this.board);
    } else {
      this.endGame();
    }
  };
  
  SnakeUI.prototype.endGame = function() {
    window.clearInterval(this.gameInterval);
    alert(this.board.snake.segments[0]);
  };

  SnakeUI.prototype.render = function(board) {
    for(var i = 0; i < board.grid.length; i++) {
      for(var j = 0; j < board.grid.length; j++) {
        var ul = $('ul')[j];
        var li = $(ul).children()[i];
        
        if (board.grid[i][j] === true) { 
          $(li).addClass('snake'); 
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





