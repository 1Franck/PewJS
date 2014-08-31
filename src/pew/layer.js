/**
 * Pew / Layer
 */

/**
 * Create canvas
 */
Pew.Layer.prototype.init = function() {

    if(this.canvas == null) {
        this.canvas = document.createElement("canvas");
        this.ctx    = this.canvas.getContext('2d');

        //append canvas to DOM
        document.body.appendChild(this.canvas);
    }

    //default style
    this.canvas.style.display = "block";
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = this._zi.get();

    // set w/h
    if(this.full) this.fullscreen();
    else {
        this.canvas.width  = this.width;
        this.canvas.height = this.height;
    }

    // bind this.fullscreen on window.onresize if autoresize = true
    if(this.autoresize) {
        var self = this;
        window.onresize = window.onresize || function() {
            for(var i in Pew.project().layers) {
                if(Pew.project().layers[i].autoresize) {
                    Pew.project().layers[i].fullscreen();
                }
            }
        }
    }
}

/**
 * Fullscreen
 */
Pew.Layer.prototype.fullscreen = function() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width  = this.canvas.width;
    this.height = this.canvas.height; 
}

/**
 * Context clearRect()
 * 
 * @param  int x  
 * @param  int y  
 * @param  int x2 
 * @param  int y2 
 */
Pew.Layer.prototype.clear = function(x,y,x2,y2) {
    var x = x || 0,
        y = y || 0,
        x2 = x2 || this.canvas.width,
        y2 = y2 || this.canvas.height;

    this.ctx.clearRect(x,y,x2,y2); 
};


/**
 * Auto increment z-index value
 * This function should be used by init() only
 */
Pew.Layer.prototype._zi = (function() {
    var i = 0;
    return {
        get: function(){
            return ++i;
        }
    }
})();