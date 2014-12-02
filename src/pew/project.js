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
 * Delete a layer and its canvas dom element
 * 
 * @param  string name
 */
Pew.Project.prototype.destroyLayer = function(name) {
    if(this.layers.hasOwnProperty(name)) {
        if(this.layers[name].canvas.remove == undefined) {
            this.layers[name].canvas.style.display = "none"; //hack fo IE
        }
        else {
            this.layers[name].canvas.remove(); // dont work in IE
        }

        delete this.layers[name];
    }
};

/**
 * Delete all layers (use destroyLayer())
 */
Pew.Project.prototype.destroyLayers = function() {
    for(var key in this.layers) {
        this.destroyLayer(key);
    }
};


/**
 * Project animation start loop
 */
Pew.Project.prototype.start = function(name){

    var scene = this.scenes[name].fn;

    if(scene.init) scene.init();

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