QUnit.test("Project Creation", function( assert ) {

    var game = Pew.createProject({
        title  : "test",
        version: "1.0",
    });

    assert.equal( game.conf.title, "test", "Project title ok" );
    assert.equal( game.conf.version, "1.0", "Project version ok" );
});