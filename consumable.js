//Renato Scotini, Billiam Palacek
//Multiplayer snake game

//Declare consumable
function Consumable() {
  this.position;
  this.category;
  this.value = 4;
  
  this.pickLocation = function (){
    this.position = createVector(floor(random(cols)), floor(random(rows)));
    this.position.mult(scl);
    this.category = floor(random(0, 1) + 0.1);
    this.value = floor(random(0, 1)*random(0, 1) * 3) + 1;
  };
  
  this.draw = function() {
    if(this.category === food){
      fill(0, 80 + this.value * 5, 50 + this.value * 4);
    }
    else if (this.category === inv) {
      fill(frame, 95, 90);
    }
    rect(this.position.x, this.position.y, scl, scl);
  }
}
