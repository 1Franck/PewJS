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

        this.conf       = Pew.utils.extend({}, def, conf);
        this.frames     = [];
        this.to_radians = Math.PI/180;

        // get resource if needed
        if(typeof this.conf.resource === "string") {
            this.conf.resource = Pew.project().resources.get(this.conf.resource);
        }

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
        this.conf.clip.w = Math.round(fw);
        this.conf.clip.h = Math.round(fh);

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
                    cx: Math.round(fw/2),
                    cy: Math.round(fh/2)
                });
            }
        }
    };

    /**
     * Show all frames with their index number
     *
     * @param object  layer Pew.Layer instance
     * @param integer x
     * @param integer y
     */
    Sprite.prototype.framesIndexMap = function(layer, x, y) {

        x = x || 0;
        y = y || 0;

        var font = layer.ctx.font;
        layer.ctx.font = "12px monospace";

        for(var i=0;i<this.frames.length;++i) {

            this.drawFrame(i, layer, this.frames[i].x, this.frames[i].y);

            layer.ctx.beginPath();
            layer.ctx.globalAlpha = 0.4;
            layer.ctx.rect(this.frames[i].x, this.frames[i].y + this.frames[i].h/2 - 10, 50, 13);
            layer.ctx.fillStyle = '#fff';
            layer.ctx.fill();

            layer.ctx.globalAlpha = 1;
            layer.ctx.fillStyle = "#000";
            layer.ctx.fillText(i, this.frames[i].x + (this.frames[i].w/2), this.frames[i].y + (this.frames[i].h/2));
        }

        layer.ctx.font = font;
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

        var range = Pew.utils.isRangeStr(range);
        if(range != null) {
            var r = [];
            for(var i=range[1];i <= range[2];++i) {
                r.push(this.frames[i]);
            }
            return r;
        }
        return [];
    };

    /**
     * Draw sprite frame
     * 
     * @param  integer num   
     * @param  object  layer Pew.Layer instance
     * @param  integer x     
     * @param  integer y
     * @param  integer deg           
     */
    Sprite.prototype.drawFrame = function(num, layer, x, y, deg) {

        var f = this.frames[num];

        if(f !== undefined) {

            var res = this.conf.resource;

            // need rotation
            if(deg !== undefined) {
                res = this.preRender(f, deg);
                layer.ctx.drawImage(res, x, y);
            }
            else {
                layer.ctx.drawImage(res,
                    f.x, f.y,
                    f.w, f.h,
                    x+f.cx, y+f.cy,
                    f.w, f.h
                );
            }
        }

        return this;
    };

    /**
     * Pre render a frame that need rotation
     * 
     * @param  object  frame  
     * @param  integer degree 
     * @return object  Image object
     */
    Sprite.prototype.preRender = function(frame, deg) {

        var canvas = document.createElement('canvas'),
            ctx    = canvas.getContext('2d'),
            img    = new Image(),
            radian = deg * this.to_radians;

        canvas.width  = frame.w*2;
        canvas.height = frame.h*2;

        ctx.translate(frame.w, frame.h);
        ctx.rotate(radian);
        ctx.drawImage(this.conf.resource, 
            frame.x, frame.y, 
            frame.w, frame.h, 
            frame.cx*-1, frame.cy*-1, 
            frame.w, frame.h
        );

        img.src = canvas.toDataURL('image/png');
        return img;
    }

    /**
     * Create animation set
     *
     * @param  object conf
     * @return object
     */
    Sprite.prototype.createAnim = function(conf) {

        return new Animation(conf, this.frames.length);
    };

    /**
     * Animation from a custom set of frames
     * 
     * @param object  conf
     * @param integer total
     */
    function Animation(conf, total) {

        var def = {
            duration: 500, //ms
            frames: [],
            loop: true,
        };

        this.conf = Pew.utils.extend({}, def, conf);

        if(this.conf.frames === 'all') {
            this.conf.frames = [];
            for(var i=0;i<total;++i) this.conf.frames.push(i);
        }

        this.ticks       = Pew.project().anim_frame.frameRate * (this.conf.duration / 1000);
        this.tick_index  = 0;
        this.cur_frame   = 0;
        this.fpt         = Math.round(this.ticks / this.conf.frames.length);
    }

    /**
     * Loop throw the set and return the current frame
     */
    Animation.prototype.loop = function() {

        if(this.tick_index > this.fpt) {
            this.tick_index = 0;
            ++this.cur_frame;
        }

        if(this.cur_frame > (this.conf.frames.length - 1)) {
            if(this.conf.loop === false) {
                --this.cur_frame;
            }
            else {
                this.cur_frame = 0;
            }
        }

        ++this.tick_index;        
    };

    /**
     * Get frame
     * 
     * @return integer
     */
    Animation.prototype.getFrame = function() {
        this.loop();
        return this.conf.frames[this.cur_frame];
    };

    /**
     * Public stuff
     */
    return {

        create: function(conf) {
            return new Sprite(conf);
        },
    }
})();