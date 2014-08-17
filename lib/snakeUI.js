(function() {

  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var SnakeUI = SnakeGame.SnakeUI = function(gameContainerId) {
    this.gameContainerId = gameContainerId;
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.setupHtml();
    this._bindSpacebar();
    this._bindButtons();
  };

  SnakeUI.BOARD_SIZE = 21;

  SnakeUI.prototype.start = function(gameSpeed) {
    var that = this;
    this.gameSpeed = gameSpeed;
    
    this.gameInterval = window.setInterval(function() { 
      that.step();
    }, gameSpeed);
  };

  SnakeUI.prototype.step = function() {
    this._bindDirKeys();
    this.board.moveOrGrowSnake();
    this.displayScore();
        
    if (this.board.snakeInBounds() && !this.board.snake.hasRunIntoSelf()) {
      this.render(this.board);
    } else {
      this.end();
    }
  };
  
  SnakeUI.prototype.end = function() {
    this.stopGame();
    $('#' + this.gameContainerId + ' #end-screen').removeClass('hide');
  };
  
  SnakeUI.prototype.pauseGame = function() {
    $('#' + this.gameContainerId + ' #pause-screen').toggleClass('hide');
    
    if (this.gameInterval === null) {
      this.start(this.gameSpeed);
    } else {
      this.stopGame();
    }
  };
  
  SnakeUI.prototype.restartGame = function() {
    this.wipeBoard(this.board);
    this.board = new SnakeGame.Board(SnakeUI.BOARD_SIZE);
    this.render(this.board);
    
    $('#' + this.gameContainerId + ' #start-screen').removeClass('hide');
    $('#' + this.gameContainerId + ' #pause-screen').addClass('hide');
    $('#' + this.gameContainerId + ' #end-screen').addClass('hide');
  };
  
  SnakeUI.prototype.stopGame = function() {
    window.clearInterval(this.gameInterval);
    this.gameInterval = null;
  };
  
  SnakeUI.prototype.displayScore = function() {
    $('#' + this.gameContainerId + ' .score').html(this.board.score);
  };

  SnakeUI.prototype.render = function(board) {
    // The grid is actually one level larger on all sides than what is
    // actually rendered. This is so that the board can check whether
    // the snake is out of bounds. We have to slightly adjust the i and 
    // j indices here.
    for (var i = 0; i < board.grid.length - 1; i++) {
      for (var j = 0; j < board.grid.length - 1; j++) {
        var ul = $('#' + this.gameContainerId + ' ul')[i];
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
      $('#' + this.gameContainerId + ' #game-display').append('<ul></ul>');
      
      for(var j = 0; j < SnakeUI.BOARD_SIZE; j++) {
        var lastUl = $('ul').last()[0];
        $(lastUl).append('<li></li>');
      }
    }
  };
  
  SnakeUI.prototype.wipeBoard = function(board) {
    for (var i = 0; i < board.grid.length - 1; i++) {
      for (var j = 0; j < board.grid.length - 1; j++) {
        var ul = $('#' + this.gameContainerId + ' ul')[i];
        var li = $(ul).children()[j];
        $(li).removeClass();
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
  
  SnakeUI.prototype._bindButtons = function() {
    var that = this;
    
    $('#' + this.gameContainerId)
      .on('click', 'button', function(event) {
      
      switch($(this).attr('class')) {
        case 'resume-button':
          that.pauseGame();
          break;
        case 'restart-button':
          that.restartGame();
          break;
      }
    });
    
    $('#' + this.gameContainerId + ' #start-screen')
      .on('click', 'button', function(event) {
        
      switch(this.id) {
        case 'slow-button':
          that.start(300);
          break;
        case 'medium-button':
          that.start(150);
          break;
        case 'fast-button':
          that.start(80);
          break;
      }
      
      $(event.delegateTarget).addClass('hide');
    });
  }

})();




