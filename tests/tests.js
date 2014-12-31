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
    game.createScene('mainScene', (function(){})());

    assert.notEqual(game.scenes.mainScene, undefined, 'Scene created');
    assert.notEqual(game.scenes.mainScene.fn, undefined, 'Scene fn ok');

    assert.equal(game.scenes.mainScene.fn._name, "mainScene", 'Scene name ok');

    assert.equal(game.scenes.mainScene.fn._status, "idle", 'Scene is idle');
    assert.strictEqual(game.scenes.mainScene.fn.is('idle'), true, 'Scene is idle (is() func)');

    assert.equal(game.current_scene, "", 'Current scene is not set yet');

    // start empty scene
    game.start('mainScene');

    assert.strictEqual(game.scenes.mainScene.fn.is('idle'), true, 'Scene started but still idle cause no draw func yet');    
    assert.equal(game.current_scene, "mainScene", 'Current scene is set');

    // add draw and request anim and restart the scene
    game.scenes.mainScene.fn.draw = function() {
        game.scenes.mainScene.fn.requestAnim();
    };

    game.start('mainScene');

    assert.strictEqual(game.scenes.mainScene.fn.is('idle'), false, 'Scene started and playing');
    assert.strictEqual(game.scenes.mainScene.fn._status, "playing", 'Scene started and playing');

    // pause toggle scene
    game.scenes.mainScene.fn.toggleAnim();
    assert.strictEqual(game.scenes.mainScene.fn.is('idle'), true, 'Pausing the scene');

    game.scenes.mainScene.fn.toggleAnim();
    assert.strictEqual(game.scenes.mainScene.fn.is('playing'), true, 'Resuming the scene');

    // stop scene
    game.scenes.mainScene.fn.cancelAnim();
    assert.strictEqual(game.scenes.mainScene.fn.is('idle'), true, 'Scene stopped');
});