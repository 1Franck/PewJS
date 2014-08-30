/**
 * Pew / Project / Mouse
 */
Pew.Project.prototype.mouse = (function(){

    var events = [], //current mouse events
        events_cb = [], //mouse event callback
        cursor = {
            x : 0,
            y : 0
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
        
        // mouse click events
        el.addEventListener ("click", function (event) {
            events['click'] = true;

            if(events_cb['click'])
                events_cb['click']();

            events['click'] = false;
        });

        // mouse dblclick events
        el.addEventListener ("dblclick", function (event) {
            events['dblclick'] = true;

            if(events_cb['dblclick'])
                events_cb['dblclick']();

            events['dblclick'] = false;
        });


        //mouse mov
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
