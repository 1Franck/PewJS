/**
 * Pew / Project / Audio
 */
Pew.Project.prototype.audio = (function() {

    return {

        play: function(resource) {

            var res = Pew.project().resources.get(resource),
                snd = new Audio();

            if(!res instanceof Audio) return;
            snd.src = res.src;

            try {
                snd.play();
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.log("Error:" + e));
            }
        }
    }
})();