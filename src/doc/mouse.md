##Mouse

Before you binds mouse events, you need to enable mouse event listener.

If you have more than one layer, mouse events listener must be associated to the highest z-index canvas which is always the last one created by `createLayer()`

```javascript
game.mouse.init(layerB.canvas);
```

**Capture mouse click** event and execute fn callback:
    
```javascript
game.mouse.on("click", function() {
    ...
});
```
 
**Stop capturing** mouse event(s):

```javascript
game.mouse.off("click"); 
```

Access to current **cursor position**:
    
```javascript
var x = game.mouse.x();
var y = game.mouse.y();
```    