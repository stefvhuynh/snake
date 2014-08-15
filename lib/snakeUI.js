(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var SnakeUI = SnakeGame.SnakeUI = function(display) {
    this.$display = display;
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.bindKeys();
    this.htmlSetup();
  };

  SnakeUI.BOARD_SIZE = 20;

  SnakeUI.prototype.bindKeys = function() {
    var that = this;

    $(document).on("keydown", function(event) {
      switch(event.keyCode) {
        case 32: // Spacebar
          that.start();
          break;
        case 37: // Left-arrow
          that.board.snake.turn(new SnakeGame.Coord(-1, 0));
          break;
        case 39: // Right-arrow
          that.board.snake.turn(new SnakeGame.Coord(1, 0));
          break;
        case 38: // Up-arrow
          that.board.snake.turn(new SnakeGame.Coord(0, -1));
          break;
        case 40: // Down-arrow
          that.board.snake.turn(new SnakeGame.Coord(0, 1));
          break;
      }
    });
  };

  SnakeUI.prototype.start = function() {
    var that = this;
    window.setInterval(function() { that.step() }, 125);
  };

  SnakeUI.prototype.step = function() {
    this.render(this.board.grid);
    this.board.snake.move(this.board);
  };

  SnakeUI.prototype.htmlSetup = function() {
    for (var i = 0; i < SnakeUI.BOARD_SIZE; i ++) {
      $("#game-display").append("<ul></ul>");
      for(var j = 0; j < SnakeUI.BOARD_SIZE; j ++) {
        var currentUl = $("ul").last()[0];
        $(currentUl).append("<li></li>");
      }
    }
  };

  SnakeUI.prototype.render = function(grid) {
    for(var i = 0; i < grid.length; i ++) {
      for(var j = 0; j < grid.length; j ++) {
        var $ul = $($("ul")[j]);
        var $li = $($ul.children()[i]);
        if(grid[i][j] === "S") {
          $li.addClass("snake");
        } else {
          $li.removeClass("snake");
        }
      }
    }
  }

})();





