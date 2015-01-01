/**
 * Pew / Scene
 */

/**
 * Scene animation start loop
 */
Pew.Scene.prototype.start = function() {

    if(this.fn.start) this.fn.start();
    if(this.fn.draw)  this.fn.draw();
};


/**
 * Scene animation stop loop
 */
Pew.Scene.prototype.stop = function() {
    this.fn.cancelAnim();
};