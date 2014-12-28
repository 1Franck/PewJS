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
    };

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
            cols = Math.floor(w/fw),
            rows = Math.floor(h/fh);

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

        //console.log(this.frames);
    };

    /**
     * Get frame with extra data
     * 
     * @param  integer num frame number
     * @return object
     */
    Sprite.prototype.getFrame = function(num) {

        var f = this.frames[num];
        return {
            x:f.x, 
            y:f.y,
            w:this.conf.clip.w,
            h:this.conf.clip.h,
        };
    };

    /**
     * Draw sprite frame
     * 
     * @param  integer num   
     * @param  object  layer Pew.Layer instance
     * @param  integer x     
     * @param  integer y           
     */
    Sprite.prototype.drawFrame = function(num, layer, x, y) {

        layer.ctx.drawImage(this.conf.resource,
            this.frames[num].x,
            this.frames[num].y,
            this.conf.clip.w,
            this.conf.clip.h,
            x,
            y,
            this.conf.clip.w,
            this.conf.clip.h
        );
    };


    function SpriteAnimation(name) {
        this.name = name;
    }


    //public stuff
    return {

        create: function(conf) {
            return new Sprite(conf);
        },
    }

})();