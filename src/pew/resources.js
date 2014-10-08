/**
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

})();