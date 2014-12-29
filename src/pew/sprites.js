/**
 * Pew / Project / Sprites
 */
Pew.Project.prototype.sprites = (function() {

    /**
     * Sprite object
     * 
     * @param  string name
     */
    function Sprite(conf) {

        var def = {
            resource: '',
            clip: {
                w : 0,
                h : 0,
            },
            frameset: [],
        };

        this.conf   = Pew.utils.extend({}, def, conf);
        this.frames = [];

        if(this.conf.clip.w > 0 && this.conf.clip.h > 0) {
            this.clip(this.conf.clip.w, this.conf.clip.h);
        }

        return this;
    }

    /**
     * Cut resource into frames
     * 
     * @param integer fw frame width
     * @param integer fh frame height
     */
    Sprite.prototype.clip = function(fw, fh) {
        
        this.frames = [];
        this.conf.clip.w = fw;
        this.conf.clip.h = fh;

        var w = this.conf.resource.width,
            h = this.conf.resource.height,
            cols = Math.ceil(w/fw),
            rows = Math.ceil(h/fh);

        for(var i=0;i < rows;++i) {
            for(var j=0;j < cols;++j) {
                this.frames.push({
                    x: this.conf.clip.w * j,
                    y: this.conf.clip.h * i,
                    w: fw,
                    h: fh,
                });
            }
        }
    };

    /**
     * Get frame
     * 
     * @param  integer num frame number
     * @return object
     */
    Sprite.prototype.getFrame = function(num) {

        var f = this.frames[num];
        return f;
    };

    /**
     * Get frames with extra data
     * 
     * @param  mixed num frame number
     * @return object
     */
    Sprite.prototype.getFrames = function(range) {

        
    };

    /**
     * Draw sprite frame
     * 
     * @param  integer num   
     * @param  object  layer Pew.Layer instance
     * @param  integer x     
     * @param  integer y           
     */
    Sprite.prototype.drawFrame = function(num, layer, x, y, show_center) {

        var f = this.frames[num];

        if(f !== undefined) {
            layer.ctx.drawImage(this.conf.resource,
                f.x, f.y,
                f.w, f.h,
                x, y,
                f.w, f.h
            );
        }

        return this;
    };

    /**
     * Create animation set
     *      
     */
    Sprite.prototype.createAnim = function(conf) {

        return new Animation(conf);
    };

    /**
     * Animation from a custom set of frames
     * 
     * @param object conf
     */
    function Animation(conf) {

        var def = {
            duration: 500, //ms
            frames: []
        };

        this.conf        = Pew.utils.extend({}, def, conf);
        this.ticks       = Pew.project().animationFrame.frameRate * (this.conf.duration / 1000);
        this.tick_index  = 0;
        this.cur_frame   = 0;
        this.fpt         = Math.round(this.ticks / this.conf.frames.length);
    }

    /**
     * Loop throw the set and return the current frame
     * 
     * @return integer
     */
    Animation.prototype.loop = function() {

        if(this.tick_index > this.fpt) {
            this.tick_index = 0;
            ++this.cur_frame;
        }

        if(this.cur_frame > (this.conf.frames.length - 1)) {
            this.cur_frame = 0;
        }

        ++this.tick_index;

        //console.log(this.conf.frames[this.cur_frame]);

        return this.conf.frames[this.cur_frame];
    };

    //public stuff
    return {

        create: function(conf) {
            return new Sprite(conf);
        },
    }
})();