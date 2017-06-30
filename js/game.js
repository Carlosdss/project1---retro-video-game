function Game() {

  this.collisionCorrectionX = 0;
  this.collisionCorrectionY = 0;

  this.state = "player1"

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
  this.arrayRocks = []
  this._renderMap(this.mapScenario);
  this._renderMap(this.gameObjects);
  this._generateObjects(3)
  this.checkGameState();
}

Game.prototype.start = function() {
  this._assignControlsToKeys();

    //this.intervalId !== null && clearInterval(this.intervalId)

    if(this.intervalId!==null){clearInterval(this.intervalId)}
    this.intervalId = setInterval(this.update.bind(this), 80);

};

Game.prototype.update = function() {

  this.soldier.move();
  this.soldier.checkLimit();
  this.checkRocksSoldier();
  for (var i = 0; i < this.arrayRobots.length; i++) {
    var flag = false;
    var flag = this.checkCollision(this.soldier, this.arrayRobots[i]);
    if (flag == true) {
      clearInterval(this.intervalId);
      this.playerLives--;

      this.restart();
      return
    }
  }

  var that = this;
  this.arrayRobots.forEach(function(e, i) {
    if (i < this.arrayRobots.length - 1) {
      e.move();
      e.checkLimit()
      this.checkRocksRobot(e);
    }
  }.bind(this));
  this.arrayRobots[2].moveTarget(this.soldier.x, this.soldier.y);
  this.arrayRobots[2].checkLimit();
  this.checkRocksRobot(this.arrayRobots[2]);
  flag = false;
  flag = this.checkCollision(this.soldier, this.arrayRobots[2]);
    if (flag == true) {
      clearInterval(this.intervalId);
      this.playerLives--;


      this.restart();
      return
    }

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
    $(".lives").html("Lifes: " + this.playerLives);
  }

  if (this.state == "gameOver") {
    $(".player").hide();
    $(".pressStart").hide();
    $(".score").hide();
    $(".gameOver").show();
    $(".pressStart").show();
    //$(".pressStart").css("z-index:" 15});
  }
}

Game.prototype._generateObjects = function(robots) {
  this.arrayRobots = [];
  this.soldier = new Soldier(14, 11);
  //this.arraySprites.push(this.soldier);
  for (i = 0; i < robots; i++) {
    var name = "robot" + i;
    Robot[name] = new Robot(3);
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
          var rock = new Rock(j, i);
          this.arrayRocks.push(rock);
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


Game.prototype.checkCollisionSoldier = function(element1, element2) {
  var centerX1 = element1.x + element1.size/2;
  var centerX2 = element2.x + element2.size/2;
  var centerY1 = element1.y + element1.size/2;
  var centerY2 = element2.y + element2.size/2;

  //var vx = Math.abs(centerX1 - centerX2);
  //var vy = Math.abs(centerY1 - centerY2);
  var vx = centerX1 - centerX2;
  var vy = centerY1 - centerY2;
  var minDistance = ((element1.size + element2.size) / 2);
  var check = (Math.abs(vx) < minDistance && Math.abs(vy) < minDistance);

  if(check){

    if((Math.abs(vx) < minDistance) && (Math.abs(element1.directionX) == 1)){
      element1.directionX = 0;
      element1.x += ((minDistance) - Math.abs(vx)) * Math.sign(vx);
    }

    if((Math.abs(vy) < minDistance) && (Math.abs(element1.directionY) == 1)){
      element1.directionY = 0;
      element1.y += ((minDistance) - Math.abs(vy)) * Math.sign(vy);
    }
  }
  return check;
}

Game.prototype.checkCollisionRobot = function(element1, element2) {
  var centerX1 = element1.x + element1.size/2;
  var centerX2 = element2.x + element2.size/2;
  var centerY1 = element1.y + element1.size/2;
  var centerY2 = element2.y + element2.size/2;

  //var vx = Math.abs(centerX1 - centerX2);
  //var vy = Math.abs(centerY1 - centerY2);
  var vx = centerX1 - centerX2;
  var vy = centerY1 - centerY2;
  var minDistance = ((element1.size + element2.size) / 2);
  var check = (Math.abs(vx) < minDistance && Math.abs(vy) < minDistance);

  if(check){
    if((Math.abs(vx) < minDistance) && ((Math.abs(element1.direction) == 0)) || (Math.abs(element1.direction) == 2)){
      element1._randomDirection();
      element1.x += ((minDistance) - Math.abs(vx)) * Math.sign(vx);
    }

    if((Math.abs(vy) < minDistance) && ((Math.abs(element1.direction) == 1)) || (Math.abs(element1.direction) == 3)){
      element1._randomDirection();
      element1.y += ((minDistance) - Math.abs(vy)) * Math.sign(vy);
    }
  }
  return check;
}


Game.prototype.checkCollision = function(element1, element2) {
  var centerX1 = element1.x + element1.size/2;
  var centerX2 = element2.x + element2.size/2;
  var centerY1 = element1.y + element1.size/2;
  var centerY2 = element2.y + element2.size/2;

  var vx = centerX1 - centerX2;
  var vy = centerY1 - centerY2;
  var minDistance = ((element1.size + element2.size) / 2);
  var check = (Math.abs(vx) < minDistance && Math.abs(vy) < minDistance);

  if(check){

    if((Math.abs(vx) < minDistance) && (Math.abs(element1.directionX) == 1)){
      element1.directionX = 0;
      element1.x += ((minDistance) - Math.abs(vx)) * Math.sign(vx);
    }

    if((Math.abs(vy) < minDistance) && (Math.abs(element1.directionY) == 1)){
      element1.directionY = 0;
      element1.y += ((minDistance) - Math.abs(vy)) * Math.sign(vy);
    }
  }
  return check;
}

Game.prototype.checkRocksSoldier = function(){
  for(var i=0; i<this.arrayRocks.length; i++){
    this.checkCollisionSoldier(this.soldier, this.arrayRocks[i]);
  };
}

Game.prototype.checkRocksRobot = function(robot){
  for(var i=0; i<this.arrayRocks.length; i++){
    this.checkCollisionRobot(robot, this.arrayRocks[i]);
  };
}

Game.prototype.restart = function() {
  if (this.playerLives == 0) {
    switch (this.state) {
      case "player1":
        this.state = "player2";
        break;
      case "player2":
        this.state = "gameOver";
    }
    this.playerLives = 3;
  }


  this.soldier.x = 700;
  this.soldier.y = 550;
  this.arrayRobots.forEach(function(e) {
    e._randomPosition();
    e._randomDirection();
  });

  $(document).on('keydown', function(e) {
    switch (e.keyCode) {

    case 37:
    case 38:
    case 39:
    case 40:

    this.renderObjects();
    this.start();
    break;

  }
}.bind(this));

//   $(document).on('keydown', function() {
//     game.start();
// });
}

window.onload = function() {
  $(".player").hide();
  $(".score").hide();
  $(".lives").hide();
  $(".gameOver").hide();

  $('.start').on('click', function() {
    game = new Game();
    game.state = "player1"
    game.start();
  });
}
