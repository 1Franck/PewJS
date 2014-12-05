QUnit.test("Project Creation", function( assert ) {

    var game = Pew.createProject({
        title  : "test",
        version: "1.0",
    });

    assert.equal( game.conf.title, "test", "Project title ok" );
    assert.equal( game.conf.version, "1.0", "Project version ok" );
});



QUnit.test("Setting project FPS", function( assert ) {

    var game = Pew.createProject({ fps  : 30  });

    assert.equal( game.animationFrame.frameRate, 30, "FPS set to 30" );
});