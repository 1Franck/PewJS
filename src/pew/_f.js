
// Support commonjs wrapper, amd define and plain window.
if (typeof exports == 'object' && typeof module == 'object') {
    module.exports = Pew
} else if (typeof define == 'function' && define.amd) {
    define(function() { return Pew })
} else {
    window.Pew = Pew
}

}(window));