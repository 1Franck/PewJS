/**
 * Create the game
 */
var game = Pew.createProject({
    title : "single layer",
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

    var spinner = [
            ".",".",".",".",".",".",".",".",".",".",".",".",
            "..","..","..","..","..","..","..","..","..","..","..","..",
            "...","...","...","...","...","...","...","...","...","...","...","...",
            ],
        spinner_index = 0;

    /**
     * Called once when animation start
     */
    scene.start = function() {
    };

    /**
     * Update loop
     */
    scene.update = function() {
        ++spinner_index;
        if(spinner_index > (spinner.length-1)) spinner_index = 0;
    };

    /**
     * Draw loop
     */
    scene.draw = function() {
        scene.update();

        layerA.clear();

        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.font = "14px monospace";
        layerA.ctx.fillText("500 x 300 canvas",190,145);

        layerA.ctx.fillText(spinner[spinner_index],240,165);

        scene.requestAnim();
    };


    return scene;

})());

game.start('mainScene');