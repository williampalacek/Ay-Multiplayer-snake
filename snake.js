//Renato Scotini, Billiam Palacek
//Multiplayer snake game

//Declare snake
function Snake() {
  this.id;
  this.color;
  this.x = 1;
  this.y = 1;
  this.xspeed = 0;
  this.yspeed = 0;
  this.speed = 15;
  this.xProgress = 0;
  this.yProgress = 0;
  this.total = 0;
  this.tail = [];
  this.invulnerable = 0;
  this.hue = 0;
  this.hueLossRate = 0;
  let eat = loadSound(
    "https://cdn.glitch.global/c7ac0796-66bf-4ffd-8b6d-a247f058fbae/Eat%20_%20Munch%202%20Sound%20Effect%20(download)%20(mp3cut.net).mp3?v=1651842958023"
  );
  let scream = loadSound(
    "https://cdn.glitch.global/c7ac0796-66bf-4ffd-8b6d-a247f058fbae/Wilhelm%20Scream%20sound%20effect.mp3?v=1651843747028"
  );
  let crash = loadSound(
    "https://cdn.glitch.global/c7ac0796-66bf-4ffd-8b6d-a247f058fbae/Bump%20Sound%20Effect%20HD.mp3?v=1651843975673"
  );
  let music = loadSound(
    "https://cdn.glitch.global/c7ac0796-66bf-4ffd-8b6d-a247f058fbae/Rainbow%20Road%20-%20Mario%20Kart%20Wii%20%5BOST%5D%20(320kbps).mp3?v=1652190763221"
  );

  this.id = function (id) {
    this.id = id;
    if (id === 0) {
      this.color = 100;
    } else if (id === 1) {
      this.color = 0;
    }
  };
  
  this.spawn = function() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
    this.xspeed = 0;
    this.yspeed = 0;
  }

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (consumable) {
    let d = dist(this.x, this.y, consumable.position.x, consumable.position.y);
    if (d < scl / 3) {
      if(consumable.category === food) this.total = this.total + consumable.value;
      else if (consumable.category === inv) {
        this.invulnerable += 120 * consumable.value/(this.invulnerable / 120 + 1);
        if(this.hue > 0) this.hue = min(this.hueLossRate * this.invulnerable, 360);
        else this.hue = 360;
        this.hueLossRate = this.hue / this.invulnerable;
      }
      return true;
    } else {
      return false;
    }
  };

  this.eatSnake = function (tail) {
    for (let i = 0; i < tail.length; i++) {
      let d = dist(this.x, this.y, tail[i].x, tail[i].y);
      if (d < scl / 3) {
        this.total++;

        return true;
      }
    }
    return false;
  };

  this.deathCheck = function () {
    for (let i = 1; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.die();
      }
    }
  };

  this.die = function () {
    scream.play();
    console.log("starting over");
    this.total = 0;
    this.tail = [];
    this.spawn();
  };

  this.shrink = function () {
    scream.play();
    this.total--;
  };

  this.update = function (otherSnake) {
    if (this.invulnerable <= 0) this.deathCheck();
    else {
      this.invulnerable--;
      this.hue -= this.hueLossRate;
    }
    
    this.xProgress = this.xProgress + this.xspeed * this.speed;
    this.yProgress = this.yProgress + this.yspeed * this.speed;

    if (this.xProgress >= 60) {
      this.xProgress -= 60;
      this.checkGrowth(otherSnake);
      this.x = this.x + scl;
    } else if (this.xProgress <= -60) {
      this.xProgress += 60;
      this.checkGrowth(otherSnake);
      this.x = this.x - scl;
    } else if (this.yProgress >= 60) {
      this.yProgress -= 60;
      this.checkGrowth(otherSnake);
      this.y = this.y + scl;
    } else if (this.yProgress <= -60) {
      this.yProgress += 60;
      this.checkGrowth(otherSnake);
      this.y = this.y - scl;
    }
    
    if(this.invulnerable <= 0 && (this.x < 0 || this.x > width - scl || this.y < 0 || this.y > height - scl)){
      this.die();
      crash.play();
    }

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function () {
    if (this.invulnerable > 0) fill(this.hue, 140 - this.color, this.color + 50);
    else if(this.color === 100) {
      fill(0, 0, 100);
    
      stroke(0, 0, 0)
    }
    else {
      fill(0, 0, 0);
    
      stroke(0, 0, 100);
    }
    
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    
    if (this.invulnerable > 0) fill(this.hue, 115 - this.color / 2, this.color / 2 + 75);
    else fill(0, 0, this.color / 2 + 25);
    
    rect(this.x, this.y, scl, scl);
    
    if (this.id === 0) {
      text(this.total, 50, 100);
      text(this.hue, 50, height / 2);
      text(this.invulnerable, 50, height - 100);
    } else if (this.id === 1) {
      text(this.total, width - 50, 100);
      text(this.hue, width - 50, height / 2);
      text(this.invulnerable, width - 50, height - 100);
    }
    
    noStroke();
  };

  this.checkGrowth = function (snake) {
    if(!music.isPlaying() && this.id == 0) {
        music.play();
    }
    if (snake.invulnerable === 0 && this.eatSnake(snake.tail)) {
      snake.shrink();
    }
    if (this.total > this.tail.length) {
      this.tail.push(this.tail[this.tail.length - 1]);
    } else if (this.total < this.tail.length) {
      this.tail.pop();
    }
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = this.tail[i - 1];
    }
    if (this.total >= 1) this.tail[0] = createVector(this.x, this.y);
  };
}
