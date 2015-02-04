##Quick Start

This is a project boiler plate:

```javascript
// Create the game
var proj = Pew.createProject({
    title  : "My Game",
});

// Create a scene
proj.createScene('myscene', (function(){

    // Scene properties
    var scene = {};

    // Create canvas layers 
    var layerA = proj.createLayer('background'),
        layerB = proj.createLayer('foreground');
 
    // Start inputs capture
    // Mouse note: to work properly, mouse event must 
    // be associated to the highest z-index canvas which 
    // is always the last one created
    proj.keyboard.init();
    proj.mouse.init(layerB.canvas); 


    // Called once when animation start
    scene.start = function() {}

    // Update loop
    scene.update = function() {}

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
proj.start('myscene');
```
