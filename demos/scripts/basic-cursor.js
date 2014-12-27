/**
 * Create the game
 */
var game = Pew.createProject({
    title : "Cursor demo",
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
        class: 'canvas-box no-cursor'
    });

    game.mouse.init(layerA.canvas); 

    /**
     * Called once when animation start
     */
    scene.start = function() {
        layerA.ctx.font = "14px monospace";
    };

    /**
     * Update loop
     */
    scene.update = function() {
    };

    /**
     * Draw loop
     */
    scene.draw = function() {
        scene.update();

        var x = game.mouse.x();
        var y = game.mouse.y();

        layerA.clear();

        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.fillText("X: " + x,10,20);
        layerA.ctx.fillText("Y: " + y,10,40);

        layerA.ctx.beginPath();
        layerA.ctx.arc(x, y, 10, 0, 2 * Math.PI, "#fff");
        layerA.ctx.fillStyle = "#CCC";
        layerA.ctx.fill();

        scene.requestAnim();
    };


    return scene;

})());


game.start('mainScene');