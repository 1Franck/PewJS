/**
 * Pew / Project / Mouse
 */
Pew.Project.prototype.mouse = (function(){

    var events = [], //current mouse events
        events_cb = [], //mouse event callback
        cursor = {
            x : 0,
            y : 0
        },
        event_fn = function(name) {
            return function(event) {
                events[name] = true;

                if(events_cb[name])
                    events_cb[name](event, cursor.x, cursor.y);
                
                events[name] = false;
            }
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
        el.addEventListener ("click", event_fn('click'));

        // mouse dblclick event
        el.addEventListener ("dblclick", event_fn('dblclick'));

        // mousedown event
        el.addEventListener ("mousedown", event_fn('mousedown'));

        // mouseup event
        el.addEventListener ("mouseup", event_fn('mouseup'));

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
