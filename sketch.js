var s;
var scl = 20;
var nom = 1;
var food;
var frame = 0;

function setup() {
  //creating canvas
  createCanvas(600, 600);
  s = new Snake();
  
  
  pickLocation();
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function draw(){
  background(0,0,66);
  frameRate(9+nom);
  if (s.eat(food)){
   pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(60,100,100);
  rect(food.x, food.y,scl,scl);
}

function keyPressed(){
  if (keyCode === UP_ARROW){
    s.dir(0,-1);
  }else if (keyCode === DOWN_ARROW){
    s.dir(0,1);
  }else if (keyCode === RIGHT_ARROW){
    s.dir(1,0);
  }else if (keyCode === LEFT_ARROW){
    s.dir(-1,0);
  }
}
