/**
 * Create the game
 */
var game = Pew.createProject({
    title : "Crossroad",
});


/**
 * Create a scene
 */
game.createScene('gameplay', (function(){

    /**
     * Scene properties
     */
    var scene = {};


    /**
     * Start inputs capture
     */
    game.keyboard.init();

    //game.ke


    /**
     * Called once when animation start
     */
    scene.init = function() {
        game.fpsmeter.start();
    };

    /**
     * Update loop
     */
    scene.update = function() { 
        game.fpsmeter.tick();
        blocks.moveAll();
    };

    /**
     * Draw loop
     */
    scene.draw = function() {

        scene.update();

        layerA.clear(0, 0);
          
        blocks.drawZone();
        blocks.drawAll();
        player.draw();

        if(player.dead) {
            layerA.ctx.fillStyle = "#DD0000";
            layerA.ctx.font="14px monospace";
            layerA.ctx.fillText("Game over!",10,50);
            layerA.ctx.fillText("Press [SPACE]",10,70);
        }
        else {
            layerA.ctx.fillStyle = "#D98D00";
            layerA.ctx.font="14px monospace";
            layerA.ctx.fillText("Cross to the other side",10,20);
            layerA.ctx.fillText("---------------------->",10,40);

            layerA.ctx.fillText("Use keyboard arrows",10,60);
            layerA.ctx.fillText("or [W] [A] [S] [D]",10,80);


            layerA.ctx.fillText("Level : " + blocks.curLevel(),10,150);
            layerA.ctx.fillText("Death : " + player.death,10,170);
        }

        //fps
        layerA.ctx.font="11px monospace";
        layerA.ctx.fillText('FPS: ' + game.fpsmeter.current, 10, layerA.height - 20)

        scene.requestAnim();
    };


    return scene;

})());




/**
 * Create layers canvas
 */
var layerA = game.createLayer('background'),
    layerB = game.createLayer('foreground');



var player = {

    x: 100, 
    y: layerA.height/2,
    w: 10,
    h: 10,
    speed: 10,
    dead: false,
    death: 0,
    
    die: function() {
      this.dead = true;
      ++this.death;
    },
    
    resurrect: function() {
      this.moveTo(100 , layerA.height/2);
      this.dead = false;
      this.draw();
    },
    
    respawn: function() {
      this.moveTo(100 , layerA.height/2);
      this.draw();
      blocks.nextLevel();
    },

    draw: function() {
      layerA.ctx.fillStyle = "#50BEFA"; 
      layerA.ctx.fillRect(this.x, this.y,this. w, this.h);
    },
    
    moveTo: function(a, b) {
      if(this.dead) return;
      this.x = a;
      this.y = b;
      if(this.y+this.h>layerA.height) {
        this.y = layerA.height - this.h;
      }
      return this;
    },
  
}


var blocks = (function() {
 
  var blocks = [],
      level = 0,
      level_factor = 1.20,
      start = {
        n : 10,
        x1 : 210,
        x2 : 700,
        h_min : 15,
        h_max : 100,
        speed_min : 0.5,
        speed_max : 5,
        direction : ['up','down']
      };
  
  
  function Block(direction) {
    this.w = 10;
    this.h = Pew.utils.rand(start.h_min, start.h_max);
    this.x = Pew.utils.rand(start.x1,start.x2,10);
    this.y = 0;
    this.speed = Pew.utils.rand(start.speed_min,start.speed_max);
    this.direction = direction;
    if(direction === "up") {
      this.y = layerA.height + Pew.utils.rand(5, 350);
    }
    else {
      this.y -= Pew.utils.rand(5, 350);
    }
  }

  return {
    
    curLevel: function() {
      return level;  
    },
    
    nextLevel: function() {
      
      ++level;
      blocks = [];
      
      var n = Math.ceil(start.n + (level*level_factor));
      
      //console.log(n);
      
      this.createXBlocks(n);
    },
    
    draw: function(b) {
      if(player.dead) layerA.ctx.fillStyle = "#800000";
      else layerA.ctx.fillStyle = "#D98D00";
      layerA.ctx.fillRect(b.x, b.y, b.w, b.h);
    },
    
    drawZone: function() {
      layerA.ctx.fillStyle = "#111111";
      layerA.ctx.fillRect(start.x1, 0, start.x2-start.x1+10, layerA.canvas.height);
    },
    
    createXBlocks: function(n) { 
      for(i=0;i<n;++i) {
        blocks.push(new Block(Pew.utils.randIndex(start.direction)));
      }
    },
    
    moveAll: function() {
            
      //if(pause) return;
      
      var px = player.x,
          py = player.y,
          pw = player.w,
          ph = player.h;
      
      if(player.dead) return;
      else if(px > start.x2) {      
        //level pass
        ctrl.x = 0;
        ctrl.y = layerA.height/2;
        ctrl.velX = 0;
        ctrl.velY = 0;
        player.respawn();
        return;
      }
      
      var len = blocks.length;
      for(i=0;i < len;++i) {
        if(blocks[i].direction === 'up') {
          blocks[i].y -= blocks[i].speed;
          if((blocks[i].y + blocks[i].h) < 0) {
            blocks[i].y = layerA.height + Pew.utils.rand(10, 350);
          }
        }
        else {
          blocks[i].y += blocks[i].speed;
          if(blocks[i].y > layerA.height) {
            blocks[i].y = 0;
            blocks[i].y -= Pew.utils.rand(10, 350);
          }
        } 
        
        //colission detection
        if(((px > blocks[i].x) && (px < (blocks[i].x + blocks[i].w))) && 
           ((py > blocks[i].y) && py < (blocks[i].y + blocks[i].h) )) {
          player.die();
        }  
        else if(((px+pw < (blocks[i].x + blocks[i].w)) && (px+pw > blocks[i].x)) && 
           ((py+ph < (blocks[i].y + blocks[i].h)) && py+ph > blocks[i].y)) {
          player.die();
        }  

      }
    },
    
    drawAll: function() {
      for(var i in blocks) {
        this.draw(blocks[i]);
      }
    },
    
  }
})();

var ctrl = {
  x : 100,  //initial x
  y : (layerA.height/2),  // initial y
  velY : 0,
  velX : 0,
  speed : 1400, // max speed
  //friction : 0.68, // friction
  friction : 0.68,
}

function updateCtrl() {
  
  
  // restart
  if(game.keyboard.key(32)) {
    if(player.dead) {
      ctrl.x = 0;
      ctrl.y = layerA.height/2;
      ctrl.velX = 0;
      ctrl.velY = 0;
      player.resurrect();
    }
  }

  // check the keys and do the movement.
  if (game.keyboard.key(38) || game.keyboard.key(87)) {
    if (ctrl.velY > -ctrl.speed) {
      ctrl.velY--;
    }
  }

  if (game.keyboard.key(40) || game.keyboard.key(83)) {
    if (ctrl.velY < ctrl.speed) {
      ctrl.velY++;
    }
  }
  if (game.keyboard.key(39) || game.keyboard.key(68)) {
    if (ctrl.velX < ctrl.speed) {
      ctrl.velX++;
    }
  }
  if (game.keyboard.key(37) || game.keyboard.key(65)) {
    if (ctrl.velX > -ctrl.speed) {
      ctrl.velX--;
    }
  }
  

  // apply some friction to y velocity.
  ctrl.velY *= ctrl.friction;
  ctrl.y += ctrl.velY;

  // apply some friction to x velocity.
  ctrl.velX *= ctrl.friction;
  ctrl.x += ctrl.velX;

  // bounds checking
  if (ctrl.x >= layerA.width) {
    ctrl.x = layerA.width;
  } else if (ctrl.x <= 5) {
    ctrl.x = 5;
  }

  if (ctrl.y > layerA.height) {
    ctrl.y = layerA.height;
  } else if (ctrl.y <= 5) {
    ctrl.y = 5;
  }

  player.moveTo(ctrl.x, ctrl.y);

  setTimeout(updateCtrl, 10);
}

updateCtrl();



blocks.nextLevel();
game.start('gameplay');
