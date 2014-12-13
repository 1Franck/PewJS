/**
 * Create the game
 */
var game = Pew.createProject({
    title : "keyboard input",
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
    var layerA = game.createLayer('keyBg', {
        width: 500,
        height: 300,
        container: '.container',
        class: 'canvas-box',
    });

    /**
     * Listen keyboard input
     */
    game.keyboard.init();

    /**
     * Bind on all keyboard input
     */
    game.keyboard.onAll(function(event, key) {
        layerA.clear(0,120,500,40);
        layerA.ctx.fillText("You have pressed: " + key.char,165,140);
        event.preventDefault();
    });

    /**
     * Bind specific keys
     */
    game.keyboard.on(["space", "ctrl", "alt"], function(key) {
        if(key.code === 32) {
            console.log('You have pressed ' + key.char + '(' + key.code + ')');
        }
    });

    /**
     * Called once when animation start
     */
    scene.init = function() {
        layerA.ctx.font = "14px monospace";
        layerA.ctx.fillStyle = "#D98D00";
        layerA.ctx.fillText('Press any key', 10, 20);
    };

    return scene;

})());

game.start('mainScene');