###Keyboard

Before you binds some keyboard events, you need to enable keyboard event listener.

```javascript
game.keyboard.init();
```

**Capture a key** event and execute fn callback:

```javascript
game.keyboard.on("p", function() { ... });
// alternatively, you can use the upperchar keycode (80 = P)
game.keyboard.on(80, function() { ... });
```
    
**Capture a group of keys** events and execute fn callback:

```javascript
game.keyboard.on(["space", "ctrl", "alt"], function(key) {

    if(key.code === 32) console.log('You have pressed SPACEBAR');
    // or (note: key.char is always lower case)
    if(key.char === "space") console.log('You have pressed SPACEBAR');
    ...
});
```
    

Note: Binding key(s) with on() always prevent event default. It is possible to bind special keys like **F1** to **F12**, **Esc**, **Return**, etc.. But remember that it will prevent browser native behavior. Ex: Binding an event for F5 will prevent browser refresh.

    
**Stop capturing** key(s):

```javascript    
game.keyboard.off(80); // 80 = P
game.keyboard.off("a"); 
game.keyboard.off(["space", "ctrl", "alt"]);  
game.keyboard.off();  // unbind everything
```

**Check** a key **manually**:

```javascript
if(game.keyboard.key('space')) {
    console.log('spacebar pressed!');
}
//get an array of all pressed keys at this very moment
var pressed_keys = game.keyboard.keys();
```

**Trigger manually** a key:

```javascript
game.keyboard.trigger("space");
```

**Capturing all keys** nonobstructive way. 

Important: This is a global callback, and it won't prevent other callbacks(defined with on()) from being triggered and won't prevent native browser behavior by default. 


To stop propagation, you need to add `return false` to your onAll() callback. To prevent native behavior, you need to add `event.preventDefault()` to your onAll() callback.

```javascript

game.keyboard.on("p", function() {
    console.log("pressed 1");
});
game.keyboard.onAll(function(event, key) {
    if(key.char === "p") console.log("pressed 2");
});

// when pressing "p", output will be
// "pressed 2"
// "pressed 1"

...

game.keyboard.on("space", function() {
    console.log("pressed 1");
});
game.keyboard.onAll(function(event, key) {
    if(key.char === "space") console.log("pressed 2");
    return false;
});

// when pressing "space", output will be
// "pressed 2"

...

game.keyboard.onAll(function(event, key) {
    if(key.char === "backspace") 
        //...
        event.preventDefault(); // prevent browser behavior
    }
});
```
**Stop capturing all keys**. It will remove global callback only, but not other callbacks defined with on().
```javascript
game.keyboard.offAll();
```
