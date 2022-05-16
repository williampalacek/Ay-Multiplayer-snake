function Snake(){
  //setting initial x and y starting point
  this.x = 0; 
  this.y = 0;
  //setting starting speed to x=1 
  this.xspeed = 1;
  this.yspeed = 0;
  //total tail/snake arrays and storage
  this.total = 0;
  this.tail= [];
   
  //snake eat function
  this.eat = function(pos){
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      nom+= 1;
      console.log("speed level : " + nom + " !! ");
      return true;
    } else{
      return false;
    }
  }
  //direction function with key press
  this.dir = function (x,y){
    this.xspeed = x;
    this.yspeed = y;
  }
 //death function
  this.death = function(){
    for(var i = 0;i<this.tail.length;i++){
      var pos = this.tail[i];
      var d = dist(this.x,this.y,pos.x,pos.y);
      //game lose message
      if(d<1){
        console.log('game reset :)');
        this.total=0;
        this.tail=[];
        nom = 1;
        }
      }
    }




  //update function
  this.update = function(){
    if (this.total === this.tail.length){
      for (var i = 0; i < this.tail.length-1; i++){
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
  
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
  }

  this.show = function(){
     frame++;
  if (frame >= 360)
    {
      frame -= 360;
    }
  colorMode(HSB);
fill(frame,90,100);
  for (var i = 0; i < this.tail.length; i++){
    rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
    rect(this.x,this.y,scl,scl);

  }
}
