/**
 * Pew.js 
 * 
 * Lightweight canvas framework experiment for games and animations
 *
 * @copyright Francois Lajoie 
 * @license   MIT
 * 
 * Bundled with AnimationFrame.js
 * @copyright 2013 Oleg Slobodskoi > https://github.com/kof/animationFrame
 */

"use strict";

var Pew = (function(){

    // current project instance
    var project_obj;
  
    /**
     * Auto increment unique id starting at 1000
     */
    var uid = (function() {
        var i = 1000;
        return {
            get: function(){
                return ++i;
            }
        }
    })();

    /**
     * Project object
     */
    function Project(conf) {

        // settings
        var def_settings = {

            title     : "My Project",
            fps       : 60,
            resources : [],
            vars      : {},
        };

        // merge default setting with current game settings
        this.conf  = Pew.utils.extend({}, def_settings, conf);

        // scenes / layers and animation frame
        this.scenes = {};
        this.layers = {};
        this.animationFrame = new AnimationFrame(this.conf.fps);

        return this;
    }

    /**
     * Canvas Layer object
     * 
     * @param object opts layer options
     */
    function Layer(opts) {
        var o = opts || {};

        this.fullscreen = (o.fullscreen === undefined) ? false : o.fullscreen;
        this.autoresize = (o.autoresize === undefined) ? false : o.autoresize,

        // misc opt
        this.container = o.container || "document";
        this.class     = o.class || "";

        // take all browser space if not specified
        this.width  = o.width  || window.innerWidth; 
        this.height = o.height || window.innerHeight;


        // canvas el and conttext
        this.canvas = o.canvas || null;
        this.ctx    = o.ctx    || null;

        this.init();

        return this;
    }

    /**
     * Scene object
     * 
     * @param string   name 
     * @param function fn   
     */
    function Scene(name, fn) {

        this.fn = fn || (function(){});

        (function(){ 

            this._name   = name,   //scene name
            this._fid    = 0,      //frame id
            this._status = 'idle', //animation status : "idle" or "playing"

            this.is = function(status) {
                return (this._status === status) ? true : false;
            };

            this.requestAnim = function(callback) {
                var callback = callback || this.draw;
                this._fid    = Pew.project().animationFrame.request(callback);
                this._status = 'playing';
            };

            this.cancelAnim = function() {
                Pew.project().animationFrame.cancel(this._fid);
                this._status = 'idle';
            };

            this.toggleAnim = function(callback) {
                if(this.is('idle')) {
                    var callback = callback || this.draw;
                    callback();
                }
                else this.cancelAnim();
            };

        }).apply( this.fn );

        return this;
    }

    /**
     * Public pew method
     */
    return {

        //reference to priv func Project() so we can extends it outside
        //like this: Pew.Project.prototype.myFunc = function(){...}
        Project: Project, 
        Scene:   Scene, 
        Layer:   Layer, 

        //current project object instance stored in Pew
        project: function() {
            return project_obj;
        },

        //create a new Project() object
        //will overwrite the current project if exists
        createProject: function(settings) {
            project_obj = new Project(settings);
            return project_obj;
        },
    }
})(); ;/**
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

    if(scene.draw) scene.draw();
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
};;/**
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
        this.canvas.setAttribute('class', this.class);
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
})();;/**
 * Pew / Utils
 */
Pew.utils = function(){}


/**
 * Deep object extends
 * ex: Pew.utils.deepExtend({}, objA, objB);
 */
Pew.utils.deepExtend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if(!obj) continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    Pew.utils.extend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }

    return out;
};

/**
 * object extends
 * ex: Pew.utils.extend({}, objA, objB);
 */
Pew.utils.extend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if(!obj) continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                out[key] = obj[key];
            }
        }
    }

    return out;
};


/**
 * Random interger
 * 
 * @param  integer min      
 * @param  integer max      
 * @param  integer interval 
 * @return integer          
 */
Pew.utils.rand = function(min, max, interval) {
    interval = interval || 1;
    return Math.round((Math.floor(Math.random() * (max - min + 1)) + min) / interval) *interval;
};

/**
 * Random element from an array
 * 
 * @param  array a
 * @return misc  
 */
Pew.utils.randIndex = function(a) {
    return a[this.rand(1, a.length) - 1];
};

/**
 * Return a range of elements from an array
 * @see: _.range from underscore.js - http://underscorejs.org/
 * @dont work
 */
Pew.utils.range = function(start, stop, step) {

    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
        range[idx++] = start;
        start += step;
    }

    return range;
};

/**
 * Check if the variable is an array
 * 
 * @param  mixed  ar
 * @return boolean
 */
Pew.utils.isArray = function(ar) {
    return Object.prototype.toString.call(ar) == "[object Array]";
};;/**
 * Pew / Project / Mouse
 */
Pew.Project.prototype.mouse = (function(){

    var events = [], //current mouse events
        events_cb = [], //mouse event callback
        cursor = {
            x : 0,
            y : 0
        };

    /**
     * Cursor coord
     * 
     * @param  object el
     * @return array
     */
    function leftTopScreen(el) {
        var x = el.offsetLeft;
        var y = el.offsetTop;

        var element = el.offsetParent;

        while (element !== null) {
            x = parseInt (x) + parseInt (element.offsetLeft);
            y = parseInt (y) + parseInt (element.offsetTop);

            element = element.offsetParent;
        }
        return new Array (x, y);
    }

    /**
     * Bind mouse events
     */
    function bindEvent(el) {

        var el = el || null;
        if(el == null) return;
        
        // mouse click event
        el.addEventListener ("click", function (event) {
            events['click'] = true;

            if(events_cb['click'])
                events_cb['click'](event);

            events['click'] = false;
        });

        // mouse dblclick event
        el.addEventListener ("dblclick", function (event) {
            events['dblclick'] = true;

            if(events_cb['dblclick'])
                events_cb['dblclick'](event);

            events['dblclick'] = false;
        });

        // mousedown event
        el.addEventListener ("mousedown", function (event) {
            events['mousedown'] = true;

            if(events_cb['mousedown'])
                events_cb['mousedown'](event);

            events['mousedown'] = false;
        });

        // mouseup event
        el.addEventListener ("mouseup", function (event) {
            events['mouseup'] = true;

            if(events_cb['mouseup'])
                events_cb['mouseup'](event);

            events['mouseup'] = false;
        });

        //mouse move event
        el.addEventListener ("mousemove", function (event) {

            var xy = leftTopScreen(el);

            cursor.x = event.clientX - xy[0];
            cursor.y = event.clientY - xy[1];
        });
    }

    /**
     * Public
     */
    return {

        init: bindEvent,
        cursor: cursor,

        /**
         * Get/Set current cursor x position
         * 
         * @param  integer n 
         * @return integer 
         */
        x: function(n) {
            cursor.x = n || cursor.x;
            return cursor.x;
        },

        /**
         * Get/Set current cursor y position
         * 
         * @param  integer n 
         * @return integer 
         */
        y: function(n) {
            cursor.y = n || cursor.y;
            return cursor.y;
        },

        /**
         * Bind mouse event
         * 
         * @param  string   k event name, ex: click, dblclick, ... 
         * @param  function c 
         */
        on: function(k, c) {
            events_cb[k] = c;
        },

        /**
         * Unbind mouse event
         * 
         * @param  string   k 
         * @param  function c 
         */
        off: function(k) {
            events_cb.splice(k,1);
        },
    

    }
})();
;/**
 * Pew / Project / Keyboard
 */
Pew.Project.prototype.keyboard = (function(){

    var keys = [], //curent down keys
        events_cb = {}, //keycode event callback(s)
        global_cb = (function(){}), //global callback
        aliases = { // aliases for special key
            'SHIFT'     : 16,
            'TAB'       : 9,
            'CTRL'      : 17,
            'ALT'       : 18,
            'SPACE'     : 32,
            'BACKSPACE' : 8,
            'ENTER'     : 13,
            'ESC'       : 27,
            'LEFT'      : 37,
            'RIGHT'     : 39,
            'UP'        : 38,
            'DOWN'      : 40,
        };

    // add f1 to f12 keycode to aliases, the art of laziness
    for(var i=1;i<13;++i) aliases["F"+i] = 111 + i;

    /**
     * Bind event keydown and keypress over document
     */
    function bindEvent() {

        // keyboard events
        document.body.addEventListener("keydown", function (e) {

            keys[e.keyCode] = true;

            // global callback - if return false, we stop propagation
            var r = global_cb(e, toKeyObject(e.keyCode)); 
            if(r === false) return;

            // default callback(s) + prevent default
            if(events_cb[e.keyCode]) {
                triggerCallback(e.keyCode);
                e.preventDefault();
            }
        });

        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        }); 
    }

    /**
     * Trigger manually an event
     * 
     * @param string|integer k (keycode or keychar)
     */
    function triggerCallback(k) {

        var code = toKeyCode(k);

        if(events_cb[code]) {
            events_cb[code](toKeyObject(code));
        } 
    }

    /**
     * Transform char/string to keycode.
     * 
     * @param  string str 
     * @return integer
     */
    function toKeyCode(str) {
        if(isNaN(str)) {
            var str = aliases[str.toUpperCase()] || str;
            if(isNaN(str)) {
                str = str.toUpperCase().charCodeAt(0);
            }
        }
        return str;
    }

    /**
     * Transform code to char/alias string.
     * 
     * @param  integer str 
     * @return string
     */
    function toKeyChar(code) {

        if(isNaN(code)) return code;

        for(var key in aliases) {
            if(aliases[key] == code) {
                return key;
            }
        }
        return String.fromCharCode(code);
    }

    /**
     * Transform key code to object literal
     * 
     * @param  integer code 
     * @return object
     */
    function toKeyObject(code) {
        return {
            "char" : toKeyChar(code).toLowerCase(),
            "code" : code
        }
    }

    /**
     * Public
     */
    return {

        init: bindEvent,
        toKeyCode: toKeyCode,
        toKeyChar: toKeyChar,
        trigger: triggerCallback,

        /**
         * Check for keyboard keycode input key code.
         * 
         * @param  integer code 
         * @return bool      
         */
        key: function(code) {

            code = toKeyCode(code);

            if(keys[code] === undefined) 
                keys[code] = false;

            return keys[code];
        },

        /**
         * Return an array of current keydown keycodes
         * @return array
         */
        keys: function() {

            var result = [];
            
            for(var key in keys) {
                if(keys[key] != false) 
                    result.push(key);
            }
            // return current keys
            return result;
        },

        /**
         * Bind key(s) event
         * 
         * @param  mixed    k   keycode/keyalias or an array of keycode/keyalias
         * @param  function c 
         */
        on: function(k, c) {

            if(Object.prototype.toString.call(k) === '[object Array]') {
                for(var i in k) {
                    events_cb[toKeyCode(k[i])] = c;
                }
            }
            else {
                events_cb[toKeyCode(k)] = c;
            }
        },

        /**
         * Unbind "on" event(s), or unbind all events if no arg
         * 
         * @param mixed k 
         */
        off: function(k) {

            if(k === undefined) {
                for(var k in events_cb) delete events_cb[k];
                return;
            }

            if(Object.prototype.toString.call(k) === '[object Array]') {
                for(var i in k) {
                    delete events_cb[toKeyCode(k[i])];
                }
            }
            else {
                delete events_cb[toKeyCode(k)];
            }
        },

        /**
         * Bind a global callback over any keys
         * 
         * @param  integer c
         */
        onAll: function(c) {
            global_cb = c;
        },
        
        /**
         * Unbind a global callback over any keys
         *
         * This function do not clean events setted by on()
         */
        offAll: function() {
            global_cb = (function(){});
        },
    }
})();
;/**
 * Pew / Project / Resources
 */
Pew.Project.prototype.resources = (function() {

    /**
     * Stored resources
     */
    var cache = {};

    /**
     * On ready callbacks
     */
    var ready_callbacks = [];

    /**
     * Mimes categories
     * @type object
     */
    var mimes = {
        "audio" : ["mp3","m4a","ogg","oga","webma","wav"],
        "image" : ["jpg","jpeg","png","gif"],
    }

    /**
     * Resource object
     * 
     * @param string  url 
     * @param integer rid 
     */
    function Resource(url, rid) {

        this.url   = url;  // file url
        this.rid   = rid;   // ready group id
        this.ready = false; // state
        this.el    = false; // resource element (Image, Audio, etc)

        //file ext
        var a = url.split(".");
        if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
            this.ext = "";
        }
        else this.ext = a.pop();
    }

    /**
     * Determine mime category
     * 
     * @return string
     */
    Resource.prototype.type = function() {
        for(var property in mimes) {
            for(var j in mimes[property]) {
                if(mimes[property][j] === this.ext)
                    return property;
            }
        }
    }

    /**
     * Onload event
     *
     * @param  function     fn_ready      
     * @param  function     fn_not_ready 
     * 
     * @return string
     */
    Resource.prototype.onLoad = function(fn_ready, fn_not_ready) {

        var self = this;

        // on ready
        this.el.addEventListener('load', function() {

            self.ready = true;
            var progress = groupProgress(self.rid);
            
            //when all resource group are ready, we call fn_ready only once
            if(isReady(self.rid)) {

                fn_not_ready(progress); // for the 100%
                fn_ready();

                //remove current group callback
                ready_callbacks[self.rid] = (function(){})
            }
            else {
                fn_not_ready(progress);
            }
        });

        
    }


    /**
     * Load an image url or an array of image urls
     * 
     * @param  array|string res      
     * @param  function     fn_ready      
     * @param  function     fn_not_ready       
     */
    function load(resources, fn_ready, fn_not_ready) {

        fn_ready = fn_ready || (function(){});
        fn_not_ready = fn_not_ready || (function(){});

        ready_callbacks.push(fn_ready);   

        var ready_index = ready_callbacks.length-1;

        if(resources instanceof Array) {

            fn_not_ready(groupProgress(ready_index)); // for the 0%

            resources.forEach(function(res) {

                var r = new Resource(res, ready_index);

                if(r.type() === 'image') r.el = new Image();
                else if(r.type() === 'audio') r.el = new Audio();
                else return; // dont load unknow type

                r.onLoad(fn_ready, fn_not_ready);

                // load file and cache obj
                r.el.src = res;
                cache[res] = r;
            });
        }
    }

    /**
     * Get resource element
     * 
     * @param  string res [description]
     * @return mixed     
     */
    function get(res) {
        return cache[res].el;
    }

    /**
     * Check if group of resources is ready
     * 
     * @param  integer  rid ready callback id
     * @return boolean
     */
    function isReady(rid) {
        var ready = true;
        for(var k in cache) {
            if(cache[k].ready === false && cache[k].rid === rid) {
                ready = false;
            }
        }
        return ready;
    }

    /**
     * Get the current progression status of a group of resources
     * 
     * @param  integer rid
     * @return object    
     */
    function groupProgress(rid) {
        var r = 0, nr = 0;
        for(var k in cache) {
            if(cache[k].rid === rid) {
                if(cache[k].ready === false) ++nr;
                else ++r;
            }            
        }
        return {
            total: (r+nr),
            ready: r,
            not_ready: nr,
            progress: (Math.round((r*100)/(r+nr)) || 0)
        }
    }


    //public stuff
    return {
        load: load,
        get: get,
    }

})();;/**
 * Pew / Project / fps meter 
 * Original source from AnimationFrame.js
 * modified for Pew
 */
Pew.Project.prototype.fpsmeter = (function(){

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
})();;

/**
 * An even better animation frame.
 *
 * @copyright Oleg Slobodskoi 2013
 * @website https://github.com/kof/animationFrame
 * @license MIT
 */

;(function(window) {
'use strict'

var nativeRequestAnimationFrame,
    nativeCancelAnimationFrame

// Grab the native request and cancel functions.
;(function() {
    var i,
        vendors = ['webkit', 'moz', 'ms', 'o'],
        top

    // Test if we are within a foreign domain. Use raf from the top if possible.
    try {
        // Accessing .name will throw SecurityError within a foreign domain.
        window.top.name
        top = window.top
    } catch(e) {
        top = window
    }

    nativeRequestAnimationFrame = top.requestAnimationFrame
    nativeCancelAnimationFrame = top.cancelAnimationFrame || top.cancelRequestAnimationFrame


    // Grab the native implementation.
    for (i = 0; i < vendors.length && !nativeRequestAnimationFrame; i++) {
        nativeRequestAnimationFrame = top[vendors[i] + 'RequestAnimationFrame']
        nativeCancelAnimationFrame = top[vendors[i] + 'CancelAnimationFrame'] ||
            top[vendors[i] + 'CancelRequestAnimationFrame']
    }

    // Test if native implementation works.
    // There are some issues on ios6
    // http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
    // https://gist.github.com/KrofDrakula/5318048
    nativeRequestAnimationFrame && nativeRequestAnimationFrame(function() {
        AnimationFrame.hasNative = true
    })
}())

/**
 * Animation frame constructor.
 *
 * Options:
 *   - `useNative` use the native animation frame if possible, defaults to true
 *   - `frameRate` pass a custom frame rate
 *
 * @param {Object|Number} options
 */
function AnimationFrame(options) {
    if (!(this instanceof AnimationFrame)) return new AnimationFrame(options)
    options || (options = {})

    // Its a frame rate.
    if (typeof options == 'number') options = {frameRate: options}
    options.useNative != null || (options.useNative = true)
    this.options = options
    this.frameRate = options.frameRate || AnimationFrame.FRAME_RATE
    this._frameLength = 1000 / this.frameRate
    this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE
    this._timeoutId = null
    this._callbacks = {}
    this._lastTickTime = 0
    this._tickCounter = 0
}

/**
 * Default frame rate used for shim implementation. Native implementation
 * will use the screen frame rate, but js have no way to detect it.
 *
 * If you know your target device, define it manually.
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.FRAME_RATE = 60

/**
 * Replace the globally defined implementation or define it globally.
 *
 * @param {Object|Number} [options]
 * @api public
 */
AnimationFrame.shim = function(options) {
    var animationFrame = new AnimationFrame(options)

    window.requestAnimationFrame = function(callback) {
        return animationFrame.request(callback)
    }
    window.cancelAnimationFrame = function(id) {
        return animationFrame.cancel(id)
    }

    return animationFrame
}

/**
 * Crossplatform Date.now()
 *
 * @return {Number} time in ms
 * @api public
 */
AnimationFrame.now = Date.now || function() {
    return (new Date).getTime()
}

/**
 * Replacement for PerformanceTiming.navigationStart for the case when
 * performance.now is not implemented.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming.navigationStart
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.navigationStart = AnimationFrame.now()

/**
 * Crossplatform performance.now()
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
 *
 * @return {Number} relative time in ms
 * @api public
 */
AnimationFrame.perfNow = function() {
    if (window.performance && window.performance.now) return window.performance.now()
    return AnimationFrame.now() - AnimationFrame.navigationStart
}

/**
 * Is native animation frame implemented. The right value is set during feature
 * detection step.
 *
 * @type {Boolean}
 * @api public
 */
AnimationFrame.hasNative = false

/**
 * Request animation frame.
 * We will use the native RAF as soon as we know it does works.
 *
 * @param {Function} callback
 * @return {Number} timeout id or requested animation frame id
 * @api public
 */
AnimationFrame.prototype.request = function(callback) {
    var self = this,
        delay

    // Alawys inc counter to ensure it never has a conflict with the native counter.
    // After the feature test phase we don't know exactly which implementation has been used.
    // Therefore on #cancel we do it for both.
    ++this._tickCounter

    if (AnimationFrame.hasNative && self.options.useNative && !this._isCustomFrameRate) {
        return nativeRequestAnimationFrame(callback)
    }

    if (!callback) throw new TypeError('Not enough arguments')

    if (this._timeoutId == null) {
        // Much faster than Math.max
        // http://jsperf.com/math-max-vs-comparison/3
        // http://jsperf.com/date-now-vs-date-gettime/11
        delay = this._frameLength + this._lastTickTime - AnimationFrame.now()
        if (delay < 0) delay = 0

        this._timeoutId = window.setTimeout(function() {
            var id

            self._lastTickTime = AnimationFrame.now()
            self._timeoutId = null
            ++self._tickCounter

            for (id in self._callbacks) {
                if (self._callbacks[id]) {
                    if (AnimationFrame.hasNative && self.options.useNative) {
                        nativeRequestAnimationFrame(self._callbacks[id])
                    } else {
                        self._callbacks[id](AnimationFrame.perfNow())
                    }
                    delete self._callbacks[id]
                }
            }
        }, delay)
    }

    this._callbacks[this._tickCounter] = callback
    return this._tickCounter
}

/**
 * Cancel animation frame.
 *
 * @param {Number} timeout id or requested animation frame id
 *
 * @api public
 */
AnimationFrame.prototype.cancel = function(id) {
    if (AnimationFrame.hasNative && this.options.useNative) nativeCancelAnimationFrame(id)
    delete this._callbacks[id]
}


// Support commonjs wrapper, amd define and plain window.
if (typeof exports == 'object' && typeof module == 'object') {
    module.exports = AnimationFrame
} else if (typeof define == 'function' && define.amd) {
    define(function() { return AnimationFrame })
} else {
    window.AnimationFrame = AnimationFrame
}

}(window));
