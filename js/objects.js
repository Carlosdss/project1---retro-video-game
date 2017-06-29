function Soldier(x, y) {
  this.size = 50;
  this.row = y;
  this.column = x;
  this.x = this.column * this.size;
  this.y = this.row * this.size;
  this.row =
    this.speed = 5;
  this.directionX = 0;
  this.directionY = 0;
  this.lifes = 3;
}

Soldier.prototype.move = function() {
  this.x += (this.directionX * this.speed);
  this.y += (this.directionY * this.speed);
}

Soldier.prototype.checkRobot = function() {}

/*Soldier.prototype.checkObstacle = function(){
  if (this.directionY == 1){

  }
  this.row =
}*/




function Robot(speed) {
  this.size = 50;
  this.row = (1 + Math.floor(Math.random() * 11));
  this.column = (1 + Math.floor(Math.random() * 14));
  this.x = this.column * this.size;
  this.y = this.row * this.size;
  this.speed = speed;
  this._randomDirection();
}

Robot.prototype._randomDirection = function() {
  var direction = Math.floor(Math.random() * 4) + 1;
  switch (direction) {
    case 1:
      this.direction = "left";
      break;
    case 2:
      this.direction = "up";
      break;
    case 3:
      this.direction = "right";
      break;
    case 4:
      this.direction = "left";
      break;
  }

}

Robot.prototype.move = function() {
  switch (this.direction) {
    case "left":
      this.x -= this.speed
      break;
    case "up":
      this.y -= this.speed
      break;
    case "right":
      this.x += this.speed
      break;
    case "down":
      this.y += this.speed
      break;
  }
}

Robot.prototype.checkObstacle = function() {
    if (this.x <= 50 || this.x >= 700 || this.y <= 50 || this.y >= 550) {
      this._randomDirection();
    }
  };
