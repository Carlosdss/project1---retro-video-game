function Game() {
  //Grid construction. Everything is wall
  this.mapScenario = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 2, 2, 2, 1, 2, 1, 2, 1, 3],
    [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 2, 1, 1, 2, 1, 3],
    [3, 1, 2, 1, 2, 2, 1, 2, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ];

  this.gameObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

}

Game.prototype.renderMapScenario = function() {
  var empty = 0;
  var ground = 1;
  var obstacle = 2;
  var limit = 3;
  var robot = 4;

  var box = document.querySelector(".box");
  var output = document.querySelector(".output");
  var rows = this.mapScenario.length;
  var columns = this.mapScenario[0].length;

  var size = 64;

  if (box.hasChildNodes()) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      stage.removeChild(stage.firstChild);
    }
  };

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      var cell = document.createElement("img");
      cell.setAttribute("class", "cell");
      stage.appendChild(cell);

      switch (map[row][column]) {
        case empty:
          cell.src = "../images/water.png";
          break;
          Making Maps
          259
        case ISLAND:
          cell.src = "../images/island.png";
          break;
        case PIRATE:
          cell.src = "../images/pirate.png";
          break;
        case HOME:
          cell.src = "../images/home.png";
          break;
      }
      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

}








}




}





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
