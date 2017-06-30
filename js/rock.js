function Rock(x, y) {
  this.size = 50;
  this.row = y;
  this.column = x;
  this.x = this.column * this.size;
  this.y = this.row * this.size;
  this.centerX= this.x + this.size/2
  this.centerY= this.y + this.size/2
}
