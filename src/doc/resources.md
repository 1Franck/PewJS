##Resources (images/audio)#
Support image and audio. Resource url are relative.

**Loading resource** like an image and call fn when ready.

```javascript
game.resources.load('img/foobar.jpg', function(){
    ...
});
``` 

**Loading a group of resource** and call fn when all resource ready.

```javascript
game.resources.load(['img/sprite1.jpg','img/sprite1.jpg',...], function(){
    game.start("mygame");
});
```

**Loading a group of resource** with progression callback.  Usefull for stuff like a progress bar.
```javascript
game.resources.load(['img/sprite1.jpg','img/sprite1.jpg',...], function(){
    game.start("mygame");
}, function(p) {
    console.log(p.progress + " %");
});
//will output:
//5 %
//10 %
// etc...
```

**Retreive** and **use** a loaded **resource**.

```javascript
var my_img = game.resources.get('img/foobar.jpg'); 
layerA.ctx.drawImage(my_img , 0, 0, 300, 400);
```
