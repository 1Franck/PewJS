/**
 * Project creation
 */
QUnit.test("Project Creation", function(assert) {

    var game = Pew.createProject({
        title  : "test",
        version: "1.0",
        test: "This a test conf"
    });

    assert.equal( game.conf.title, "test", "Project title ok");
    assert.equal( game.conf.version, "1.0", "Project version ok");
    assert.equal( game.conf.test, "This a test conf", "Project custom conf ok");
    assert.deepEqual( game, Pew.project(), "Ref ok")
});


/**
 * FPS option
 */
QUnit.test("Project FPS", function(assert) {
    var game = Pew.createProject({ fps  : 30  });
    assert.equal( game.anim_frame.frameRate, 30, "FPS set to 30");
});

/**
 * Scene creation / playing
 */
QUnit.test("Scene creation / playing", function(assert) {

    var game = Pew.createProject();

    assert.deepEqual(game.scenes, { }, 'Not created yet');

    // create empty scene
    game.createScene('scene1', (function(){})());

    assert.notEqual(game.scenes.scene1, undefined, 'Scene created');
    assert.notEqual(game.scenes.scene1.fn, undefined, 'Scene fn ok');

    assert.equal(game.scenes.scene1.fn._name, "scene1", 'Scene name ok');

    assert.equal(game.scenes.scene1.fn._status, "idle", 'Scene is idle');
    assert.strictEqual(game.scenes.scene1.fn.is('idle'), true, 'Scene is idle (is() func)');

    // start empty scene
    game.startScene('scene1');

    assert.strictEqual(game.scenes.scene1.fn.is('idle'), true, 'Scene started but still idle cause no draw func yet');    

    // add draw and request anim and restart the scene
    game.scenes.scene1.fn.draw = function() {
        game.scenes.scene1.fn.requestAnim();
    };

    //alternative start syntax
    game.scenes.scene1.start();

    assert.strictEqual(game.scenes.scene1.fn.is('idle'), false, 'Scene started and playing');
    assert.strictEqual(game.scenes.scene1.fn._status, "playing", 'Scene started and playing');

    // pause toggle scene
    game.scenes.scene1.fn.toggleAnim();
    assert.strictEqual(game.scenes.scene1.fn.is('idle'), true, 'Pausing the scene');

    game.scenes.scene1.fn.toggleAnim();
    assert.strictEqual(game.scenes.scene1.fn.is('playing'), true, 'Resuming the scene');

    // stop scene
    game.scenes.scene1.fn.cancelAnim();
    assert.strictEqual(game.scenes.scene1.fn.is('idle'), true, 'Scene stopped');

    // stop alernative
    game.startScene('scene1');
    game.stopScene('scene1');
    assert.strictEqual(game.scenes.scene1.fn.is('idle'), true, 'Scene stopped');
});

/**
 * Layers
 */
QUnit.test("Layers", function(assert) {

    var game = Pew.createProject();

    var layerA = game.createLayer('main', {
        width: 500,
        height: 300,
        //container: '.container',
        class: 'canvas-box',
    });

    var layerB = game.createLayer('second');

    assert.strictEqual(layerA, game.layers['main'], 'Layer reference');

    assert.strictEqual(layerA.width, 500, 'Canvas width');  
    assert.strictEqual(layerA.height, 300, 'Canvas height'); 

    assert.strictEqual(layerA.canvas.width, 500, 'Canvas width');  
    assert.strictEqual(layerA.canvas.height, 300, 'Canvas height'); 

    assert.equal(layerA.canvas.style.zIndex, 1, 'Canvas z-index'); 
    assert.equal(layerB.canvas.style.zIndex, 2, 'Second Canvas z-index'); 

    assert.strictEqual(layerA.canvas.getAttribute('class'), 'canvas-box', 'Element Class');
});


/**
 * Sprites
 */
QUnit.test("Sprites", function(assert) {

    var game = Pew.createProject();

    assert.equal(1, 1, 'prevent fail'); 

    game.resources.load({
        name: 'mario',
        src:  'assets/mario.png',
    }, function() {

        mario = game.sprites.create({
            resource: 'mario',
            clip: { w: 39.64, h: 39.36 }
        });

        assert.equal(typeof mario, "object", "Sprite creation");

        var frame = mario.getFrame(1);
        assert.equal(frame.cx, 20, 'frame 1 ok');

        var frame = mario.getFrame(10000);
        assert.equal(frame, undefined, 'unknow frame');

        var frames = mario.getFrames("6..20");
        assert.equal(frames.length, 15, 'Frames ranges');
    });


});