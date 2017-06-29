function Game() {

  this.codes = {
    empty: 0,
    ground: 1,
    obstacle: 2,
    limit: 3,
    robot: 4
  }
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
    [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
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
}

Game.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 50);
  }
};

Game.prototype.update = function() {
  
  this.soldier.move();

  var that = this;
  this.arrayRobots.forEach(function(e) {
    e.move();
    e.checkObstacle()
  });
  this.renderObjects();
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


Game.prototype._generateObjects = function(robots) {
  this.arrayRobots = [];
  this.soldier = new Soldier(14, 11);
  //this.arraySprites.push(this.soldier);
  for (i = 0; i < robots; i++) {
    var name = "robot" + i;
    Robot[name] = new Robot(2);
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
  that = this;
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
      case 37:
      case 38:
      case 39:
      case 40:
        this.soldier.directionX = 0;
        this.soldier.directionY = 0;
        break;
    }
  }.bind(this));
}

window.onload = function() {
  game = new Game();
  game.start();
};





/*
window.addEventListener("keyup", function(event) {
  switch (event.keyCode) {
    case UP:
      moveUp = false;
      break;

    case DOWN:
      moveDown = false;
      break;

    case LEFT:
      moveLeft = false;
      break;

    case RIGHT:
      moveRight = false;
      break;
  }
}, false);*/

/*

function buildMap(map) {
  for (var row = 0; row < ROWS; row++) {
    for (var column = 0; column < COLUMNS; column++) {
      var currentTile = levelMap[row][column];

      if (currentTile !== EMPTY) {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE;
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;

        switch (currentTile) {
          case FLOOR:
            var floor = Object.create(spriteObject);
            floor.sourceX = tilesheetX;
            floor.sourceY = tilesheetY;
            floor.x = column * SIZE;
            floor.y = row * SIZE;
            sprites.push(floor);
            break;

          case BOX:
            var box = Object.create(spriteObject);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;

          case WALL:
            var wall = Object.create(spriteObject);
            wall.sourceX = tilesheetX;
            wall.sourceY = tilesheetY;
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            break;

          case BOMB:
            var bomb = Object.create(spriteObject);
            bomb.sourceX = tilesheetX;
            bomb.sourceY = tilesheetY;
            bomb.sourceWidth = 48;
            bomb.sourceHeight = 36;
            bomb.width = 48;
            bomb.height = 36;
            bomb.x = column * SIZE + 10;
            bomb.y = row * SIZE + 16;
            bombs.push(bomb);
            sprites.push(bomb);
            break;

          case ALIEN:
            //Note: "alien" has already been defined in the main
            //program so you don't neeed to preceed it with "var"
            alien = Object.create(spriteObject);
            alien.sourceX = tilesheetX;
            alien.sourceY = tilesheetY;
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
            break;
        }
      }
    }
  }
}
*/
