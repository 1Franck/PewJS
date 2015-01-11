##Scenes
Scenes are javascript modules that encapsulate your animation logic and drawing loop. For small project, most of the time, one scene is sufficient, but there is no limit how many scenes you can have.

<hr class="sep">
**Create a new scene:** (see [Quick Start](#quick-start) boiler plate for more details)
```javascript
game.createScene('scene_name', (function(){ ... })());
```

<hr class="sep">
**Request next animation frame**. By default, scene.draw is used
```javascript
scene.draw = function() {
    ...
    // recall scene.draw()
    scene.requestAnim(); 
}
```

<hr class="sep">
**Change** animation **loop** frame **callback**
```javascript
scene.draw = function() {
    ...
    if(foo === "bar") {
        return scene.draw2();
    }
    scene.requestAnim();
}

scene.draw2 = function() {
    ...
    scene.requestAnim(scene.draw2);
}
```

<hr class="sep">
**Pause** the animation loop
```javascript
scene.draw = function() {
    ...
    if(foo === "bar") {
        return scene.cancelAnim();
    }
    scene.requestAnim();
}
```

<hr class="sep">
**Toggle** the loop (request/cancel)
```javascript
// example of pause toggle button
game.keyboard.on("p", function(){
    scene.toggleAnim();
});
```

<hr class="sep">
**Check** the loop status (idle/playing)
```javascript
if(scene.is('idle')) { ... }
...
if(scene.is('playing')) { ... }
```
