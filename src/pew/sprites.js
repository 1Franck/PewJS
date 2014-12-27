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
        this.name = name;
        this.res;
    };

    /**
     * Add resource
     * 
     * @param object res Resource
     */
    Sprite.prototype.addResource = function(res) {

    };


    //public stuff
    return {

        create: function(name) {
            return new Sprite(name);
        },
    }

})();