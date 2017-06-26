
function Game(){
    //Grid construction. Everything is wall
    this.map = [
     [3,3,3,3,3,3,3,3,3,3,3],
     [3,1,1,1,1,1,1,1,1,1,3],
     [3,1,2,2,2,1,2,1,2,1,3],
     [3,1,1,2,1,1,1,1,1,1,3],
     [3,1,1,1,1,2,1,1,2,1,3],
     [3,1,2,1,2,2,1,2,2,1,3],
     [3,1,1,1,1,1,2,1,1,1,3],
     [3,3,3,3,3,3,3,3,3,3,3]
      ];

    this.gameObjects = [
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,5,0],
      [0,0,0,0,0,4,0,0,0,0,0],
      [0,0,5,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,5,0,0,0,0],
      [0,0,0,0,5,0,0,5,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]
    ];
          
    }

/*
function map(x, y) {
var grid = []
for (i=0; i < x; i++){
  var grid2 = [];
  for (var j = 0; j<25; j++){
    grid2[j] = 3;
  }
  grid.push(grid2);
}
return grid;
}

//function to create a given "number" of random objects
function mapEmpty(number){
 for (var i=0; i<number; i++){
   var x = Math.floor((Math.random()) * 24); //Random coordinates to create obstacles through the grid;
   var y = Math.floor((Math.random()) * 14);
   grid [x][y] = 0;
 }
}
*/
