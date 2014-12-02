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
        if(this.container === "document") {
            document.body.appendChild(this.canvas);
        }
        else {
            document.querySelector(this.container).appendChild(this.canvas);
        }
    }

    //class(es) attr
    if(this.class.length > 0) {
        var classes = this.class.split(" ");
        for(var i in classes) {
            this.canvas.classList.add(classes[i]);
        }
    }

    //default style
    this.canvas.style.display = "block";
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = this._zi.get();

    // set w/h
    if(this.fullscreen === true) this.requestFullscreen();
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
                    
                    Pew.project().layers[i].canvas.width  = window.innerWidth;
                    Pew.project().layers[i].canvas.height = window.innerHeight;

                    Pew.project().layers[i].width  = Pew.project().layers[i].canvas.width;
                    Pew.project().layers[i].height = Pew.project().layers[i].canvas.height;
                }
            }
        }
    }
}

/**
 * Fullscreen // dont work
 */
Pew.Layer.prototype.requestFullscreen = function() {

    var doc_el = document.documentElement;

    if (doc_el.requestFullscreen) {
        doc_el.requestFullscreen();
    } else if (doc_el.webkitRequestFullscreen) {
        doc_el.webkitRequestFullscreen();
    } else if (doc_el.mozRequestFullScreen) {
        doc_el.mozRequestFullScreen();
    } else if (doc_el.msRequestFullscreen) {
        doc_el.msRequestFullscreen();
    }

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