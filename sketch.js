// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

let s;
let scl = 20;
let food;
let willsmart = true;
let frame = 0;
let r;
let g;
let b;
let rectangle=[];

function setup() {
  createCanvas(floor(windowWidth / scl) * scl, floor(windowHeight / scl) * scl);
  s = new Snake();
  n = new Snake();
  o = new obs();
  frameRate(20);
  pickLocation();

for(let i=0;i<5;i++){
    rectangle[i] = new obs();    
  }

  
}



function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed() {
  s.total++;
}


function draw() {
  

  frame++;
  if (frame >= 360)
    {
      /*g = random(255);
      r = random(255);
      b = random(255);
      frame=0;*/
      frame -= 360
    }
  colorMode(HSB);
  background(frame, 90, 100);
  stroke(frame - 180, 90, 100);
  //stroke(0, 0, 0);
  //text(frame, 80, 200);
  if (s.eat(food)) {
    pickLocation();
  }
  if (n.eat(food)) {
    pickLocation();
  }
 

for(let i=0;i<5;i++){
  fill('black')

    rectangle[i].show();    
      rectangle[i].update();    
  }


  s.death();
  n.death();
  s.update();
  n.update();
  o.update();
  s.show();
  n.show();
  o.show();
  

  
  fill('red');
  rect(food.x, food.y, scl, scl);
  
  
  
  if (keyIsDown(17))
    {
      frame++;
      s.speed = 20;
    }
  else
    {
      s.speed = 10;
    }
  if (keyIsDown(SHIFT))
    {
      frame++;
      n.speed = 20;
    }
  else
    {
      n.speed = 10;
  }
  //   stroke(100,100,100);
  //   rect(100,100,100,100);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
  if (keyCode === 87) {
    n.dir(0, -1);
  } else if (keyCode === 83) {
    n.dir(0, 1);
  } else if (keyCode === 68) {
    n.dir(1, 0);
  } else if (keyCode === 65) {
    n.dir(-1, 0);
  }
   if(keyCode===32){
   o.die(); 
    frame = 0;
  }
  
}
