/**
 * Pew / Game / Resources
 */
Pew.Game.prototype.resources = (function() {

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
        for(property in mimes) {
            for(var j in mimes[property]) {
                if(mimes[property][j] === this.ext)
                    return property;
            }
        }
    }


    /**
     * Load an image url or an array of image urls
     * 
     * @param  array|string res      
     * @param  function     fn_ready           
     */
    function load(resources, fn_ready) {

        fn_ready = fn_ready || (function(){});

        ready_callbacks.push(fn_ready);

        var ready_index = ready_callbacks.length-1;

        if(resources instanceof Array) {
            resources.forEach(function(res) {

                var r = new Resource(res, ready_index);

                if(r.type() === 'image') r.el = new Image();
                else if(r.type() === 'audio') r.el = new Audio();
                else return; // dont load unknow type

                // on ready
                r.el.addEventListener('load', function() {

                    cache[res].el    = r.el;
                    cache[res].ready = true;
                    
                    /**
                     * When all res group are ready, we call fn_ready only once
                     */
                    if(isReady(cache[res].rid)) {
                        fn_ready();
                        //remove current group callback
                        ready_callbacks[cache[res].rid] = (function(){})
                    }
                });

                // load file and cache obj
                r.el.src = res;
                cache[res] = r;
            });
        }
        else {

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
            if(cache[k].ready == false && cache[k].rid == rid) {
                ready = false;
            }
        }
        return ready;
    }


    return {
        load: load,
        get: get,
    }

})();