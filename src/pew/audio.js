/**
 * Pew / Project / Audio
 */
Pew.Project.prototype.audio = (function() {

    function Audio(resource) {

    }

    return {
        play: function(resource) {

            var el = Pew.project().resources.get(resource);

            if(!el instanceof Audio) return;
            if(!el.paused) return;
            
            try {
                el.play();
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.error("Error:" + e));
            }
        }
    }
})();