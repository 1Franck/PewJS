/**
 * Pew.js 
 * 
 * Lightweight canvas framework experiment for games and animations
 *
 * @copyright François Lajoie 
 * @license   MIT
 * 
 * Bundled with AnimationFrame.js
 * @copyright 2013 Oleg Slobodskoi - https://github.com/kof/animationFrame
 */

"use strict";

var Pew = (function(){

    // current project instance
    var project_obj;
  
    /**
     * Auto increment unique id starting at 1000
     */
    var uid = (function() {
        var i = 1000;
        return {
            get: function(){
                return ++i;
            }
        }
    })();

    /**
     * Project object
     */
    function Project(conf) {

        // settings
        var def_settings = {

            title     : "My Project",
            fps       : 60,
            resources : [],
            vars      : {},
        };

        // merge default setting with current game settings
        this.conf  = Pew.utils.extend({}, def_settings, conf);

        // scenes / layers and animation frame
        this.scenes = {};
        this.layers = {};
        this.animationFrame = new AnimationFrame(this.conf.fps);

        return this;
    }

    /**
     * Canvas Layer object
     * 
     * @param object opts layer options
     */
    function Layer(opts) {
        var o = opts || {};

        this.full   = o.full || true;
        this.autoresize = o.autoresize || true,
        this.width  = o.width || "480";
        this.height = o.height || "320";
        this.canvas = o.canvas || null;
        this.ctx    = o.ctx || null;

        this.init();

        return this;
    }

    /**
     * Scene object
     * 
     * @param string   name 
     * @param function fn   
     */
    function Scene(name, fn) {

        this.fn = fn || (function(){});

        (function(){ 

            this._name   = name,   //scene name
            this._fid    = 0,      //frame id
            this._status = 'idle', //animation status : "idle" or "playing"

            this.is = function(status) {
                return (this._status === status) ? true : false;
            };

            this.requestAnim = function(callback) {
                var callback = callback || this.draw;
                this._fid    = Pew.project().animationFrame.request(callback);
                this._status = 'playing';
            };

            this.cancelAnim = function() {
                Pew.project().animationFrame.cancel(this._fid);
                this._status = 'idle';
            };

            this.toggleAnim = function(callback) {
                if(this.is('idle')) {
                    var callback = callback || this.draw;
                    callback();
                }
                else this.cancelAnim();
            };

        }).apply( this.fn );

        return this;
    }

    /**
     * Public pew method
     */
    return {

        //reference to priv func Project() so we can extends it outside
        //like this: Pew.Project.prototype.myFunc = function(){...}
        Project: Project, 
        Scene:   Scene, 
        Layer:   Layer, 

        //current project object instance stored in Pew
        project: function() {
            return project_obj;
        },

        //create a new Project() object
        //will overwrite the current project if exists
        createProject: function(settings) {
            project_obj = new Project(settings);
            return project_obj;
        },
    }
})(); 