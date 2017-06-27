function Soldier(x, y){
this.size = 60;
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

Soldier.prototype.move = function(){
      this.x += (this.directionX * this.speed);
      this.y += (this.directionY * this.speed);
}

Soldier.prototype.checkRobot = function(){
}

Soldier.prototype.checkObstacle = function(){
}




function Robot(speed){
  this.size = 60;
  this.row = (1 + Math.floor(Math.random()* 11));
  this.column = (1 + Math.floor(Math.random()* 14));
  this.x = this.column * this.size;
  this.y = this.row * this.size;
  this.speed = 5;
  this._randomDirection();
}

Robot.prototype._randomDirection = function(){
  this.directionX = Math.floor(Math.random() * 2);
  this.directionY = Math.floor(Math.random() * 2);
}

Robot.prototype.move = function(){
      this.x += (this.directionX * this.speed);
      this.y += (this.directionY * this.speed);
}
