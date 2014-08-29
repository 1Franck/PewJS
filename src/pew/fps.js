/**
 * Pew / Game / fps meter 
 * Original source from AnimationFrame.js
 * modified for Pew
 */
Pew.Game.prototype.fpsmeter = (function(){

    var now = Date.now || function() { 
        return (new Date).getTime(); 
    };
    

    function Meter(opts) {
        opts || (opts = {});
        this.updateRate = opts.updateRate || 1000;
        this._tickCounter = 0;
        this._updateTimeoutId = null;
        this.current = 0;
    }

    Meter.prototype.start = function(callback) {
        var self = this;

        callback = callback || (function(){});

        this._startTime = now();
        this._tickCounter = 0;
        this._updateTimeoutId = setTimeout(function() {
            if (self._tickCounter) {
                self.current = Math.round(1000 / ((now() - self._startTime) / self._tickCounter));
                callback(self.current);
            }
            self.start(callback);
        }, this.updateRate);

        return this;
    };

    Meter.prototype.stop = function() {
        clearTimeout(this._updateTimeoutId);
        return this;
    };

    Meter.prototype.tick = function() {
        ++this._tickCounter;
        return this;
    };


    return new Meter();
})();