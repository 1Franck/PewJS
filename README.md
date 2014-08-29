
##PewJS

PewJS is a tiny HTML5 Canvas framework for games and animations.

**Why ?**

I’ve been experimenting a lot with canvas/js lately and found myself writing over and over the same bunch of codes to make it working properly, before even being able to start writing the game/animation codes. I decided to create PewJs mainly because i wanted to reuse easily the same bunch of codes from a project to another and create a straightforward modular structure for my experiments. 

**What it do ?**

- handle animations frame rate and loop inside a scene
- handle multiple canvas layers
- handle loading/storing resources like image or audio
- binds keyboard inputs event, mouse events and cursor position

**What it don't:**

- program a game for you
- your laundry

##Quick Start

Take a look at this boiler plate. **We will use this code as reference for the next paragraphs.**

```javascript
// Create the game
var game = Pew.createGame({
    title  : "My Game",
});

// Create a scene
game.createScene('myscene', (function(){

    // Scene properties
    var scene = {};

    // Create canvas layers 
    var layerA = game.createLayer('background'),
        layerB = game.createLayer('foreground');
 
    // Start inputs capture
    // Mouse note: to work properly, mouse event must 
    // be associated to the highest z-index canvas which 
    // is always the last one created
    game.keyboard.init();
    game.mouse.init(layerB.canvas); 


    // Called once when animation start
    scene.init = function() {
    };

    // Update loop
    scene.update = function() { 
    };

    // Draw loop
    scene.draw = function() {

        scene.update();

        //<!-- your stuff -->
            
        // request animation frame
        // by default scene draw() is called again.
        // Switch to another property callback for 
        // animation frame by specifying it within requestAnim().
        // ex: scene.requestAnim("mypropertyname");
        scene.requestAnim();
    };

    // always return scene object
    return scene;

})());


// Start scene animation loop
game.start('myscene');
```   

##Scenes
Scenes are javascript modules that encapsulate your animation logic and drawing loop. For small project, most of the time, one scene is sufficient, but there is no limit how many scenes you can have.


##Canvas layers
A layer is a canvas. You can have one or many layers. Each time you create a new layer, it create a DOM canvas element with an z-index higher than previous layer.

```javascript
// Create canvas layers
var layerA = game.createLayer('background'),
    layerB = game.createLayer('foreground');
```

By default, layer take all browser window space. 

*Example 1*: 
Change layer configs:
```javascript
var layerA = game.createLayer('platform', {
    full: false,
    autoresize: false, //if true, canvas is resized on window resize
    width: 500,
    height: 300,
});
```


##Draw

*Example 1*: 
Simple drawing can be achieved by using game layer canvas context(**`ctx`**) property which is just a reference to `canvas.getContext('2d')`.

```javascript
layerA.ctx.fillStyle = "#DD0000";
layerA.ctx.font = "14px monospace";
layerA.ctx.fillText(Welcome to my game",10,50);
```
    
##Inputs

###Keyboard

Before you binds some keyboard events, you need to enable keyboard event listener.

```javascript
game.keyboard.init();
```

*Example 1*: 
**Capture letter** "p" keydown event and execute fn callback:

```javascript
game.keyboard.on("p", function() { ... });
// alternatively, you can use the upperchar keycode (80 = P)
game.keyboard.on(80, function() { ... });
```
    
*Example 2*: 
**Capture a group of keys** events and execute fn callback:

```javascript
game.keyboard.on(["space", "ctrl", "alt"], function(key) {

    if(key.code == 32) console.log('You have pressed SPACEBAR');
    // or (note: key.char is always lower case)
    if(key.char === "space") console.log('You have pressed SPACEBAR');
    ...
});
```
    

Note: It is possible to bind special keys like **F1** to **F12**, **Esc**, **Return**, etc.. But remember that it will prevent browser native behavior. Ex: Binding an event for F5 will prevent browser refresh.

    
*Example 3*: 
**Stop capturing** key(s):

```javascript    
game.keyboard.off(80); // 80 = P
game.keyboard.off("a"); 
game.keyboard.off(["space", "ctrl", "alt"]);  
game.keyboard.off();  // unbind everything
```

*Example 4*: 
**Check** a key **manually**:

```javascript
if(game.keyboard.key('space')) {
    console.log('spacebar pressed!');
}
//get an array of all pressed keys at this very moment
var pressed_keys = game.keyboard.keys();
```

*Example 5*: 
**Trigger manually** a key:

```javascript
game.keyboard.trigger("space");
```

###Mouse

Before you binds mouse events, you need to enable mouse event listener.

To work properly, mouse listener must be associated to the highest z-index canvas which 
is always the last one created by `game.createLayer()`

```javascript
game.mouse.init(layerB.canvas);
```

*Example 1*: 
**Capture mouse click** event and execute fn callback:
    
```javascript
game.mouse.on("click", function() {
    ...
});
```
*Example 2*:     
**Stop capturing** mouse event(s):

```javascript
game.mouse.off("click"); 
```
    
*Example 3*: 
Access to current **cursor position**:
    
```javascript
var x = game.mouse.x();
var y = game.mouse.y();
```    

    
##Resources (images/audio)#
Support image and audio. Resource url are relative.

*Example 1*: 
**Loading resource** like an image and call fn when ready.

```javascript
game.resources.load('img/foobar.jpg', function(){
    ...
});
``` 
    
*Example 2*: 
**Loading a group of resource** and call fn when all resource ready.

```javascript
game.resources.load(['img/sprite1.jpg','img/sprite1.jpg',...], function(){
    game.start("mygame");
});
```
*Example 3*:     
**Retreive** a loaded **resource**.

```javascript
var my_img = game.resources.get('img/foobar.jpg'); 
```
*Example 4*:   
**Use** a loaded **resource**.

```javascript
layerA.ctx.drawImage(game.resources.get('img/foobar.jpg'), 0, 0, 300, 400)
```    


##Scope

Calling Pew.createGame() store a new instance of `Pew.Game` inside Pew and return it so you can use it after. To retreive/access your game object, you can also use `Pew.game()`

*Example 1*:
Create game and stored it into variable `game`: 
```javascript
var game = Pew.createGame({
    title  : "My Game",
});

console.log(game.conf.title); // output in console "My Game"
```
*Example 2:*
Create game and retreive game instance via `Pew.game()`: 
```javascript
Pew.createGame({
    title  : "My Game",
});

console.log(Pew.game().conf.title); // output in console "My Game"
var mygame = Pew.game();
console.log(mygame.conf.title); // output in console "My Game"
```

###Utilities
Utilities can be accessed with `Pew.utils.[fn name]`

Generate a **random number**
`Pew.utils.rand(min, max, interval = 1)`

```javascript
console.log(Pew.utils.rand(1,10)); 
// output a number between 1 and 10

console.log(Pew.utils.rand(0,100, 25)); 
// output a number between 0 and 100 at interval of 25
// so possible value here can be 0,25,50,75 or 100 only
```


Get a **random element from an array** 
`Pew.utils.randIndex(array);`

```javascript
console.log( Pew.utils.randIndex(["aaa","bbb","ccc"]) ); 
// output one random element form array
// in this example, output can be "aaa","bbb" or "ccc"
```

**Extend an object** with another object
`Pew.utils.extend({}, objA, objB)`

```javascript
var objA = { title: "AAA", x: 0, y: 0 };
var objB = { title: "BBB", x: 20 };

// merge objB into objA
console.log( Pew.utils.extend({}, objA, objB) ); 
// output {title: "BBB", x: 20, y: 0}
```

##Extending PewJs

Create your own reusable plugins by extending thoses objects:
`Pew.Game`, `Pew.GameLayer` and `Pew.utils`

*Example 1:*
```javascript
Pew.GameLayer.prototype.circle = function(x, y, rad, fill, stroke, line_w) {

    this.ctx.beginPath();
    this.ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    
    if(stroke) {
        this.ctx.lineWidth = line_w || 1;
        this.ctx.strokeStyle = stroke;
        this.ctx.stroke();
    }
};

// ex in your scene draw loop:
// layerA.circle(100,100,10,"#000");
```
*Example 2:*
```javascript
Pew.GameLayer.prototype.gradient = function(x, y, x2, y2, colors, stops) {
        
    x2 = x2 || this.canvas.width;
    y2 = y2 || this.canvas.height;

    var grd = this.ctx.createLinearGradient(x, y, x2, y2);
    
    for(var i in colors) {
        grd.addColorStop(stop[i]||0, colors[i]);
    }

    return grd; 
};

// layers have now access to this function. ex:
layerA.ctx.fillStyle = layerA.gradient(0,0,100,100,["#000","#111"],[0.5,1]);
```

##License
PewJs is released under the MIT Licence.
Copyright (c) 2014 François Lajoie

PewJs is also bundled with AnimationFrame.js
Copyright (c) 2013 Oleg Slobodskoi - https://github.com/kof/animationFrame

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;


......................PewPew.........Pew.........PewPew...Pew.............