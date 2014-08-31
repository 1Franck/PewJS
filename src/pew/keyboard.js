/**
 * Pew / Project / Keyboard
 */
Pew.Project.prototype.keyboard = (function(){

    var keys = [], //curent down keys
        events_cb = {}, //keycode event callback
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
     * @param  string|integer k (keycode or keychar)
     */
    function triggerCallback(k) {

        var code = toKeyCode(k);

        if(events_cb[code]) {
            events_cb[code]({
                "char" : toKeyChar(code).toLowerCase(),
                "code" : code
            });
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
    }
})();
