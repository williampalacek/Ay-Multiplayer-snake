class obs {
  constructor(){
    scl=20;
    //test
    let cols = floor(width / scl);
    let rows = floor(height / scl);    
    
    this.x=random(0, windowWidth);
    this.y=random(0, windowHeight);
    let canvasWidth = floor(windowWidth / scl) * scl;
    let canvasLength = floor(windowHeight / scl) * scl;
   // test
  this.location = createVector(floor(random(cols)), floor(random(rows)));
  this.location.mult(scl);
    
    
  }
  
    show(){
     fill('black')
      //noStroke();
      rect(this.location.x,this.location.y,scl,scl)
    }
  
    update(){
      /*if(s.x>this.location.x && s.x<this.location.x+20){
      this.die();
      }

      if(s.y>this.location.y && s.y<this.location.y+20){
      this.die();
      }*/
      
      let d = dist(s.x, s.y, this.location.x, this.location.y);
      
      if (d < scl/3){
        this.die();
      }
    }
  
  die(){
      console.log('starting over');
      s.total=0;
      s.tail=[];
    }
}

/*    let scl=20;

    this.x=floor(random(cols));
    this.y=floor(random(rows));
    
    
    
     this.eat = function (pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < scl / 3) {
      this.total = this.total + food.value;
      eat.play();
      return true;
    } else {
      return false;
    }
  };
    */
