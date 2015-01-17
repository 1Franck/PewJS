/**
 * Pew / Project / Audio
 */
Pew.Project.prototype.audio = (function() {

    return {

        /**
         * Play a sound
         * 
         * @param  string  resource
         * @param  bool    loop    
         * @return object         
         */
        play: function(resource, loop) {

            var res  = Pew.project().resources.get(resource),
                snd  = new Audio(),
                loop = loop || false;

            if(!res instanceof Audio) return;
            snd.src = res.src;

            // loop audio
            if(loop === true) {
                snd.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            try {
                snd.play();
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.log("Error:" + e));
            }

            return snd;
        }
    }

    
})();