/**
 * Create the game
 */
var game = Pew.createProject({
    title : "mouse input",
});

/**
 * Create a scene
 */
game.createScene('scene1', (function(){

    /**
     * Scene properties
     */
    var scene = {};

    /**
     * Create layers canvas
     */
    var layerA = game.createLayer('keyBg', {
        width: 500,
        height: 300,
        container: '.container',
        class: 'canvas-box',
    });

    /**
     * Listen mouse input
     */
    game.mouse.init(layerA.canvas);

    var log = [];

    game.mouse.on("click", function(e,x,y) {
        log.unshift("Mouse click at " + x + "," + y);
        drawConsole();
    });

    game.mouse.on("dblclick", function(e,x,y) {
        log.unshift("Mouse double-click at " + x + "," + y);
        drawConsole();
    });

    game.mouse.on("mouseup", function(e,x,y) {
        log.unshift("Mouse up at " + x + "," + y);
        drawConsole();
    });

    game.mouse.on("mousedown", function(e,x,y) {
        log.unshift("Mouse down at " + x + "," + y);
        drawConsole();
    });

    function drawConsole() {
        layerA.clear(0,30,500,270);
        for(var i in log) {
            layerA.ctx.fillText(log[i], 10, 50 + (20 * i));;
        }
    }

    /**
     * Called once when animation start
     */
    scene.start = function() {
        layerA.ctx.font = "14px monospace";
        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.fillText('Mouse events', 10, 20);
        layerA.ctx.fillText('------------', 10, 30);
    };

    /**
     * Cursor position
     * @return {[type]} [description]
     */
    scene.draw = function() {

        layerA.clear(400,00,100,50);
        var x = game.mouse.x();
        var y = game.mouse.y();

        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.fillText("X: " + x, 445, 20);
        layerA.ctx.fillText("Y: " + y, 445, 40);

        scene.requestAnim();
    }

    return scene;

})());

game.startScene('scene1');