##Mouse

Before you binds mouse events, you need to enable mouse event listener.

If you have more than one layer, mouse events listener must be associated to the highest z-index canvas which is always the last one created by `createLayer()`


```javascript
proj.mouse.init(layer.canvas);
```

<hr class="sep">

####Events:

 * `click`
 * `dblclick`
 * `mousedown`
 * `mouseup`
 * `mousemove`


<hr class="sep">
**Capture mouse event** and execute fn callback:
    
```javascript
proj.mouse.on("click", function(x, y) {
    ...
});
```
<hr class="sep"> 
**Stop capturing** mouse event(s):

```javascript
proj.mouse.off("click"); 
```
<hr class="sep">
Access to current **cursor position**:
    
```javascript
var x = proj.mouse.x();
var y = proj.mouse.y();
```    