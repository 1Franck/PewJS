/**
 * Create the game
 */
var game = Pew.createProject({
    title : "multiple layers",
});


/**
 * Create a scene
 */
game.createScene('mainScene', (function(){

    /**
     * Scene properties
     */
    var scene = {};

    var layers_opts = {
        width: 500,
        height: 300,
        container: '.container',
        class: 'canvas-absolute-box',
    };

    /**
     * Create layers canvas
     */
    var layerA = game.createLayer('layerA', layers_opts);
    var layerB = game.createLayer('layerB', layers_opts);
    var layerC = game.createLayer('layerC', layers_opts);
    var layerD = game.createLayer('layerD', layers_opts);
    var layerE = game.createLayer('layerE', layers_opts);
    var layerF = game.createLayer('layerF', layers_opts);

    layerA.canvas.style.background = "#000";

    function rect(x, y, w, h, layer, color) {
        var color = color || "#3498DB";
        layer.ctx.globalAlpha = 0.8;
        layer.ctx.beginPath();
        layer.ctx.rect(x, y, w, h);
        layer.ctx.fillStyle = color;
        layer.ctx.fill();
        layer.ctx.lineWidth = 2;
        layer.ctx.strokeStyle = '#222';
        layer.ctx.stroke();
    }

    var element = {
        x:0,
        y:120,
        w:150,
        h:40,
    }

    /**
     * Called once when animation start
     */
    scene.start = function() {
        rect(100,60,100,150,layerA);
        rect(80,100,40,100,layerF, "yellow");
        rect(50,75,100,100,layerA, "orange");
        rect(180,130,100,100,layerF, "green");
        rect(260,60,50,180,layerC, "purple");
        rect(300,30,150,120,layerF, "#aa0000");
        rect(280,100,130,160,layerB, "#666");
        rect(380,10,50,200,layerC, "#0E344E");
        rect(325,130,40,40,layerF, "orange");
    };

    /**
     * Update loop
     */
    scene.update = function() {
        element.x = element.x + 2;
        if(element.x > 500) element.x = 0 - element.w;
    };

    /**
     * Draw loop
     */
    scene.draw = function() {
        scene.update();
        layerD.clear();
        rect(element.x,element.y,element.w,element.h, layerD, "#1ABC9C");
        scene.requestAnim();
    };


    return scene;

})());

game.start('mainScene');