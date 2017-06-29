function Robot(speed) {
  this.size = 50;
  this.row = (1 + Math.floor(Math.random() * 11));
  this.column = (1 + Math.floor(Math.random() * 14));
  this._randomPosition();
  this.speed = speed;
  this._randomDirection();
  this.centerX= this.x + this.size/2;
  this.centerY= this.y + this.size/2;
}

Robot.prototype._randomPosition = function(){
  this.x = (1 + Math.floor(Math.random() * 14)) * this.size;
  this.y = (1 + Math.floor(Math.random() * 11)) * this.size;
}

Robot.prototype._randomDirection = function() {
  var direction = Math.floor(Math.random() * 4);
  switch (direction) {
    case 0:
      this.direction = 0;
      break;
    case 1:
      this.direction = 1;
      break;
    case 2:
      this.direction = 2;
      break;
    case 3:
      this.direction = 3;
      break;
  }

}

Robot.prototype.move = function() {
  switch (this.direction) {
    case 0:
      this.x -= this.speed
      break;
    case 1:
      this.y -= this.speed
      break;
    case 2:
      this.x += this.speed
      break;
    case 3:
      this.y += this.speed
      break;
  }
  this.centerX= this.x + this.size/2;
  this.centerY= this.y + this.size/2;
}

Robot.prototype.moveTarget = function(x, y){
 if (this.x < x){this.x += this.speed}
 if (this.x > x){this.x -= this.speed}
 if (this.y < y){this.y += this.speed}
 if (this.y > y){this.y -= this.speed}
}
this.centerX= this.x + this.size/2;
this.centerY= this.y + this.size/2;


Robot.prototype.checkLimit = function() {
  var difX1 = this.x - 50;
  var difX2 = this.x - 700;
  var difY1 = this.y - 50;
  var difY2 = this.y - 550;
  var random = Math.floor(Math.random() * 3) + 1;
  if (difX1 < 0){
    this.x -= difX1
    this.direction = (this.direction + random) % 4;
    }
  if (difX2 > 0){
    this.x -= difX2
    this.direction = (this.direction + random) % 4;
  };
  if (difY1 < 0){
    this.y -= difY1
    this.direction = (this.direction + random) % 4;
  };
  if (difY2 > 0){
    this.y -= difY2
    this.direction = (this.direction + random) % 4;
  }
};
