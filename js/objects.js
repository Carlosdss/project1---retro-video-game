function Soldier(x, y) {
  this.size = 50;
  this.row = y;
  this.column = x;
  this.x = this.column * this.size;
  this.y = this.row * this.size;
  this.row =
    this.speed = 10;
  this.directionX = 0;
  this.directionY = 0;
  this.centerX= this.x + this.size/2
  this.centerY= this.y + this.size/2
}

Soldier.prototype.move = function() {
  this.x += (this.directionX * this.speed);
  this.y += (this.directionY * this.speed);
  this.centerX= this.x + this.size/2;
  this.centerY= this.y + this.size/2;
}

Soldier.prototype.checkRobot = function(x, y) {

}

Soldier.prototype.checkLimit = function(){
  var difX1 = this.x - 50;
  var difX2 = this.x - 700;
  var difY1 = this.y - 50;
  var difY2 = this.y - 550;
  if (difX1 < 0){this.x -= difX1};
  if (difX2 > 0){this.x -= difX2};
  if (difY1 < 0){this.y -= difY1};
  if (difY2 > 0){this.y -= difY2};
  }
