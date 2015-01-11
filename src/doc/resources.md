##Resources (images/audio)#

Resource url are relative.

```javascript
var proj = Pew.createProject({
    //...
    resources : [{
        name: 'mario',
        src:  'assets/img/smb1.png',
    }, {
        name: 'explosion_1',
        src:  'assets/img/explosion_1.png',
    }],
});

``` 

<hr class="sep">
**Loading resource** like an image and call fn when ready.

```javascript
proj.resources.load(proj.conf.resources, function(){ ... });
``` 

<hr class="sep">
**Loading a group of resource** and call fn when all resource ready.

```javascript
proj.resources.load(proj.conf.resources, function(){
    proj.startScene("myproj");
});
```

<hr class="sep">
**Loading a group of resource** with progression callback.  Usefull for stuff like a progress bar.
```javascript
proj.resources.load(proj.conf.resources, function(){
    proj.start("myproj");
}, function(p) {
    console.log(p.progress + " %");
});
//will output:
//5 %
//10 %
// etc...
```
<hr class="sep">
**Retreive** and **use** a loaded **resource**.

```javascript
var my_img = proj.resources.get('mario'); 
layerA.ctx.drawImage(my_img , 0, 0, 300, 400);
```
