/**
 * Pew / Utils
 */
Pew.utils = function(){}


/**
 * Deep object extends
 * ex: Pew.utils.deepExtend({}, objA, objB);
 */
Pew.utils.deepExtend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if(!obj) continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    Pew.utils.extend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }

    return out;
};

/**
 * object extends
 * ex: Pew.utils.extend({}, objA, objB);
 */
Pew.utils.extend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if(!obj) continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                out[key] = obj[key];
            }
        }
    }

    return out;
};


/**
 * Random interger
 * 
 * @param  integer min      
 * @param  integer max      
 * @param  integer interval 
 * @return integer          
 */
Pew.utils.rand = function(min, max, interval) {
    interval = interval || 1;
    return Math.round((Math.floor(Math.random() * (max - min + 1)) + min) / interval) *interval;
};

/**
 * Random element from an array
 * 
 * @param  array a
 * @return misc  
 */
Pew.utils.randIndex = function(a) {
    return a[this.rand(1, a.length) - 1];
};

/**
 * Return a range of elements from an array
 * @see: _.range from underscore.js - http://underscorejs.org/
 * @dont work
 */
Pew.utils.range = function(start, stop, step) {

    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
        range[idx++] = start;
        start += step;
    }

    return range;
};

/**
 * Check if a string describe a range
 * ex: 5..18 or 1..59
 * 
 * @param  string   str
 * @return false or array
 */
Pew.utils.isRangeStr = function(str) {
    var regex = /([0-9]+)..([0-9]+)/gi;
    return regex.exec(str);
}

/**
 * Check if the variable is an array
 * 
 * @param  mixed  ar
 * @return boolean
 */
Pew.utils.isArray = function(ar) {
    return Object.prototype.toString.call(ar) == "[object Array]";
};