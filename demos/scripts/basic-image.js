/**
 * Create the game
 */
var game = Pew.createProject({
    title : "image loading",
    resources : ['assets/img/scene.png'],
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
     * Image
     */
    var img = {
        x:0,
        data:'',
    };

    /**
     * Called once when animation start
     */
    scene.init = function() {
        img.data = game.resources.get('assets/img/scene.png');
    };

    /**
     * Update loop
     */
    scene.update = function() {
        if(img.x < -(4096-500)) img.x = 0;
        img.x = img.x - 1;
    };

    /**
     * Draw loop
     */
    scene.draw = function() {
        scene.update();
        layerA.clear();
        layerA.ctx.drawImage(img.data, img.x, 0, img.data.width, img.data.height);
        scene.requestAnim();
    };


    return scene;

})());


game.resources.load(game.conf.resources,

    function() {
        game.start("mainScene");
    },
    function(p) {
        console.log(p.progress);
    }
);