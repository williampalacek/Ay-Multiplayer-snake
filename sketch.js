//Renato Scotini, Billiam Palacek
//Multiplayer snake game

//Declare variables
let s;
let scl = 20;
let cols;
let rows;
let consumables = [];
let frame = 0;
const willsmart = true;
const food = 0;
const inv = 1;
let warning;
let message = true;

//Create Canvas and snakes
function setup() {
  warning = loadImage(
    "https://cdn.glitch.global/c7ac0796-66bf-4ffd-8b6d-a247f058fbae/Warnign forr dumb?v=1652707792321"
  );
  noStroke();
  //Create canvas, 100% width, 100% height
  createCanvas(floor(windowWidth / scl) * scl, floor(windowHeight / scl) * scl);

  image(warning, 0, 0);
  
  //Make 2 snakes
  s = new Snake();
  n = new Snake();

  //Give easily identifiable ids to snakes
  s.id(0);
  n.id(1);

  s.spawn();
  n.spawn();

  //Set Frame rate
  frameRate(60);

  cols = floor(width / scl);

  rows = floor(height / scl);

  consumables.push(new Consumable());

  consumables.push(new Consumable());

  for (var i = 0; i < consumables.length; i++) {
    consumables[i].pickLocation();
  }

  //Make obstacle(s)
  //obstacle = new Obstacle();
  //obstacle.pickLocation();
}

//Testing increase size via mouse click
function mousePressed() {
  s.total++;
  n.total++;
}

//Draw game every frame
function draw() {
 
  //Hue color for background and food
  //frame counter
  frame += 0.5;

  //Reset frame
  if (frame >= 360) {
    frame -= 360;
  }

  //Set colour mode
  colorMode(HSB);

  if (s.invulnerable > 0) {
    if (n.invulnerable > 0) {
      background(hueInverter(n.hue + s.hue) / 2, 90, 90);
    } else {
      background(hueInverter(s.hue), 70, 90);
    }
  } else if (n.invulnerable > 0) {
    background(hueInverter(n.hue), 90, 70);
  } else {
    background(0, 0, (100 * (s.total + 1)) / (s.total + n.total + 2));
  }
  
  if(message){
   image(warning, 0, 0,windowWidth,windowHeight);
  }
  
  for (var i = 0; i < consumables.length; i++) {
    if (s.eat(consumables[i]) || n.eat(consumables[i])) {
      consumables[i].pickLocation();
    }
  }
  //Activate update, draw food and show variables
  s.update(n);
  n.update(s);
  s.show();
  n.show();
  for (var i = 0; i < consumables.length; i++) {
    consumables[i].draw();
  }
  //obstacle.draw();

  keyChecker();
}

//Key press direction changer
keyChecker = function () {
  //First player
  //Up direction change
  if (keyIsDown(UP_ARROW)) {
    s.dir(0, -1);
    message = false;
    //Down direction change
  } else if (keyIsDown(DOWN_ARROW)) {
    s.dir(0, 1);
    message = false;
    //Right direction change
  } else if (keyIsDown(RIGHT_ARROW)) {
    s.dir(1, 0);
    message = false;
    //Left direction change
  } else if (keyIsDown(LEFT_ARROW)) {
    s.dir(-1, 0);
    message = false;
  }

  //Second player
  //Up direction change
  if (keyIsDown(87)) {
    n.dir(0, -1);
    message = false;
    //Down direction change
  } else if (keyIsDown(83)) {
    n.dir(0, 1);
    message = false;
    //Right direction change
  } else if (keyIsDown(68)) {
    n.dir(1, 0);
    message = false;
    //Left direction change
  } else if (keyIsDown(65)) {
    n.dir(-1, 0);
    message = false;
  }

  //Speed boost | space
  if (keyIsDown(32)) {
    frame++;
    s.speed = 30;
    //Default speed
  } else {
    s.speed = 15;
  }

  //Speed boost | shift
  if (keyIsDown(SHIFT)) {
    frame++;
    n.speed = 30;
    //default speed
  } else {
    n.speed = 15;
  }
};

hueInverter = function (hue) {
  if (hue > 180) return hue - 180;
  else return hue + 180;
};
