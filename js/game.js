function Game() {
  this.state = "pressStart"

  this.codes = {
    empty: 0,
    ground: 1,
    obstacle: 2,
    limit: 3,
    robot: 4
  }
  this.player1Score = 0;
  this.player2Score = 0;
  this.playerLives = 3;
  //Grid construction. Everything is wall
  this.mapScenario = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
    [3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3],
    [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 3],
    [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 3],
    [3, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 3],
    [3, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ];

  this.gameObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  this._renderMap(this.mapScenario);
  this._renderMap(this.gameObjects);
  this._generateObjects(3)
  this._assignControlsToKeys();
  this.checkGameState();
}

Game.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 70);
  }
};

Game.prototype.update = function() {

  this.soldier.move();
  this.soldier.checkLimit();
  for (var i = 0; i < this.arrayRobots.length; i++) {
    var flag = this.chekCollisionSoldierRobot(this.soldier, this.arrayRobots[i]);
    if (flag == true) {

      this.playerLives--;
      clearInterval(this.intervalId);

      if (this.playerLives == 0) {
        if (this.state == "player1") {
          this.state == "player2";
          //this.restart();
          return
        } else if (this.state == "player2") {
          this.state == "gameOver";
          //this.restart();
          return
        }
      } else {
        //this.restart();
        return
      }
    }
  }

var that = this;
this.arrayRobots.forEach(function(e, i) {
  if (i < this.arrayRobots.length - 1) {
    e.move();
    e.checkLimit()
  }
}.bind(this));
this.arrayRobots[2].moveTarget(this.soldier.x, this.soldier.y);
this.arrayRobots[2].checkLimit();
this.renderObjects();
this.checkGameState();
}

Game.prototype.renderObjects = function() {
  $(".soldier").css({
    top: this.soldier.y,
    left: this.soldier.x,
  });
  var that = this;
  var robot = 1;
  this.arrayRobots.forEach(function(e) {
    $(".robot" + robot).css({
      top: e.y,
      left: e.x
    });
    robot++;
  })
}

Game.prototype.checkGameState = function() {
  if (this.state == "pressStart") {
    $(".player").hide();
    $(".score").hide();
    $(".lives").hide();
    $(".intro").show();
    $(".pressStart").show();
    $(".startGame").show();
  }

  if (this.state == "player1") {
    $(".intro").hide();
    $(".pressStart").hide();
    $(".startGame").hide();
    $(".player").html("Player 1");
    $(".player").show();
    $(".score").html("Score: " + this.player1Score);
    $(".score").show();
    $(".lives").show();
    $(".lives").html("Lifes: " + this.playerLives);
  }

  if (this.state == "player2") {
    $(".intro").hide();
    $(".pressStart").hide();
    $(".startGame").hide();
    $(".player").html("Player 2");
    $(".player").show();
    $(".score").html("Score: " + this.player2Score);
    $(".score").show();
  }

  if (this.state == "gameOver") {
    $(".player").hide();
    $(".pressStart").hide();
    $(".score").hide();
    $(".gameOver").show();
    $(".pressStart").show();
  }
}

Game.prototype._generateObjects = function(robots) {
  this.arrayRobots = [];
  this.soldier = new Soldier(14, 11);
  //this.arraySprites.push(this.soldier);
  for (i = 0; i < robots; i++) {
    var name = "robot" + i;
    Robot[name] = new Robot(4);
    this.arrayRobots.push(Robot[name]);
  }
}

Game.prototype._renderMap = function(map) {
  var empty = 0;
  var ground = 1;
  var obstacle = 2;
  var limit = 3;
  var robot = 4;
  var soldier = 5;

  var box = document.querySelector(".box");
  var output = document.querySelector(".output");
  var rows = map.length;
  var columns = this.mapScenario[0].length;

  var size = 50;
  var robotCounter = 1;

  /*if (box.hasChildNodes()) {
    for (var i = 0; i < rows * columns; i++) {
      box.removeChild(box.firstChild);
    }
  };*/

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {

      var cell = document.createElement("img");

      switch (map[i][j]) {
        case ground:
          cell.setAttribute("class", "cell ground");
          box.appendChild(cell);
          cell.src = "img/moonFloor2.png";
          break;
        case obstacle:
          cell.setAttribute("class", "cell obstacle");
          box.appendChild(cell);
          cell.src = "img/boulder.gif";
          cell.style.backgroundImage = "url(img/moonFloor2.png)";
          break;
        case limit:
          cell.setAttribute("class", "cell limit");
          box.appendChild(cell);
          cell.src = "img/mars2.png";
          break;
        case robot:
          cell.setAttribute("class", "cell robot" + "" + robotCounter + "");
          box.appendChild(cell);
          cell.src = "img/robot.png";
          robotCounter++;
          break;
        case soldier:
          cell.setAttribute("class", "cell soldier");
          box.appendChild(cell);
          cell.src = "img/mercenary.gif";
          break;
      }
      //Position the cell
      cell.style.top = i * size + "px";
      cell.style.left = j * size + "px";
    }
  }

}

Game.prototype._assignControlsToKeys = function() {

  $(document).on('keydown', function(e) {
    switch (e.keyCode) {
      case 38:
        this.soldier.directionY = -1;
        break;

      case 40:
        this.soldier.directionY = 1;
        break;

      case 39:
        this.soldier.directionX = 1;
        break;

      case 37:
        this.soldier.directionX = -1;
        break;
    }
  }.bind(this));

  $(document).on('keyup', function(e) {
    switch (e.keyCode) {
      case 38:
        this.soldier.directionY = 0;
        break;

      case 40:
        this.soldier.directionY = 0;
        break;

      case 39:
        this.soldier.directionX = 0;
        break;

      case 37:
        this.soldier.directionX = 0;
        break;
    }
  }.bind(this));
}

Game.prototype.chekCollisionSoldierRobot = function(element1, element2, size1, size2) {
  var vx = element1.centerX - element2.centerX;
  var vy = element1.centerY - element2.centerY;

  var minDistance = (((element1.size + element2.size)/2)-10);
  return (Math.abs(vx) <= minDistance && Math.abs(vy) <= minDistance)
}

window.onload = function() {
  $(".player").hide();
  $(".score").hide();

  $('.start').on('click', function() {
    game = new Game();
    game.state = "player1"
    game.start();
  });
}
