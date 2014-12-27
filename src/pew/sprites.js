/**
 * Pew / Project / Sprites
 */
Pew.Project.prototype.sprites = (function() {

    /**
     * Sprite object
     * 
     * @param  string name
     */
    function Sprite(name) {

        this.name   = name;
        this.frames = [];

        return this;
    };

    /**
     * Add resource
     * 
     * @param object res Resource
     */
    Sprite.prototype.addResource = function(res) {
        if(!Pew.utils.isArray(res)) {
            res = [res];
        }

        return this;
    };

    /**
     * Fetch resource as an array of images
     * Each image will become a frame
     */
    Sprite.prototype.fetchAsArray = function() {

    }


    //public stuff
    return {

        create: function(name) {
            return new Sprite(name);
        },
    }

})();