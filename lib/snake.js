(function(){
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function(boardSize) {
    var halfBoard = Math.floor(boardSize / 2);
    
    // this.dir = new SnakeGame.Coord(0, -1);
    this.dir = [0, -1];
    // this.segments = [
    //   new SnakeGame.Coord(halfBoard, halfBoard),
    //   new SnakeGame.Coord(halfBoard, halfBoard + 1),
    //   new SnakeGame.Coord(halfBoard, halfBoard + 2)
    // ];
    
    this.segments = [
      [halfBoard, halfBoard],
      [halfBoard, halfBoard + 1],
      [halfBoard, halfBoard + 2]
    ];
  };

  Snake.prototype.move = function(board) {
    var oldTail = this.segments.pop();
    // var newHead = this.segments[0].plus(this.dir);
    
    var newHead = [
      this.segments[0][0] + this.dir[0], 
      this.segments[0][1] + this.dir[1]
    ];
    
    this.segments.unshift(newHead);

    // board.grid[oldTail.y][oldTail.x] = false;
    // board.grid[newHead.y][newHead.x] = true;  
    
    board.grid[oldTail[1]][oldTail[0]] = false;
    board.grid[newHead[1]][newHead[0]] = true;
  };

  Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };

})();
