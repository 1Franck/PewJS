    // Create the game
    var project = Pew.createProject({
        title  : "My Game",
    });

    // Create a scene
    project.createScene('myscene', (function(){

        // Scene properties
        var scene = {};

        // Create layers canvas
        var layerA = project.createLayer('background'),
            layerB = project.createLayer('foreground');
     
        // Start inputs capture
        // Mouse note: to work properly, mouse event must 
        // be associated to the highest zindex canvas which
        // is always the last one created
        project.keyboard.init();
        project.mouse.init(layerB.canvas); 


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
                
            //request animation frame
            //by default scene draw() is called again.
            //Switch to another property callback for 
            //animation frame by specifying with requestAnim().
            //ex: scene.requestAnim("mypropertyname");
            scene.requestAnim();
        };

        // always return scene object
        return scene;

    })());


    // Start scene animation loop
    project.start('myscene');