##Canvas layers
A layer is a canvas. You can have one or many layers. Each time you create a new layer, it create a DOM canvas element with an z-index higher than previous layer.

```javascript
// Create canvas layers
var layerA = game.createLayer('background'),
    layerB = game.createLayer('foreground');
```

By default, layer take all browser window space. 

Change layer configs:
```javascript
var layerA = game.createLayer('platform', {
    full: false,
    autoresize: false, //if true, canvas is resized on window resize
    width: 500,
    height: 300,
});
```

You can access to layer canvas DOM element with `layerA.canvas` property.

###Draw

Simple drawing can be achieved by using game layer canvas context(**`ctx`**) property which is just a reference to `canvas.getContext('2d')` ([more info](http://www.html5canvastutorials.com/tutorials/html5-canvas-element/)).

```javascript
layerA.ctx.fillStyle = "#DD0000";
layerA.ctx.font = "14px monospace";
layerA.ctx.fillText("Welcome to foobar",10,50);
```