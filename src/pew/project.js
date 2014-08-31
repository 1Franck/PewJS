/**
 * Pew / Project
 */

/**
 * Create a new layer canvas
 * 
 * @param  string name Layer name. ex: bg, fg, background, topmenu, etc...
 * @param  object opts Options @see GameLayer
 */
Pew.Project.prototype.createLayer = function(name, opts) {

    var def = new Pew.Layer(opts);
    this.layers[name] = def;
    return def;
};

/**
 * Project animation start loop
 */
Pew.Project.prototype.start = function(name){

    var scene = this.scenes[name].fn;

    if(scene.init)
        scene.init();

    scene.draw();
};

/**
 * Create a new scene
 * 
 * @param  string  name 
 * @param  function fn   
 * @return object        
 */
Pew.Project.prototype.createScene = function(name, fn) {

    this.scenes[name] = new Pew.Scene(name, fn);
    return this.scenes[name];
};