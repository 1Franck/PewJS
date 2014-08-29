Pew.Game.prototype.debug = (function(){
    var position = [];

    //console.log(this);

    return {
        test: function() {
            console.log(this.test2);
            return "OK";
        },
    }
})();