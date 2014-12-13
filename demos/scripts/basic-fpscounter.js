/**
 * Create the game
 */
var game = Pew.createProject({
    title : "FPS counter",
    fps: 60,
});

/**
 * Create a scene
 */
game.createScene('mainScene', (function(){

    /**
     * Scene properties
     */
    var scene = {};

    /**
     * Create layers canvas
     */
    var layerA = game.createLayer('main', {
        width: 500,
        height: 300,
        container: '.container',
        class: 'canvas-box',
    });

    /**
     * Called once when animation start
     */
    scene.init = function() {
        game.fpsmeter.start();
    
        layerA.ctx.font = "14px monospace";
    };

    /**
     * Update loop
     */
    scene.update = function() {
        game.fpsmeter.tick();
    };

    /**
     * Draw loop
     */
    scene.draw = function() {
        scene.update();

        layerA.clear();
        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.fillText('FPS: ' + game.fpsmeter.current, 10, 20);

        cube.draw(layerA);

        scene.requestAnim();
    };


    return scene;

})());

game.start('mainScene');



