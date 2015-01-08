##Scope

Calling Pew.createProject() store a new instance of `Pew.Project` inside Pew and return it. The other way to access to your project is going through `Pew.project()`


Create project and stored it into variable `game`: 
```javascript
var game = Pew.createProject({
    title  : "My Game",
});

console.log(game.conf.title); // output "My Game"
console.log(Pew.project().conf.title); // output "My Game"
```

In case your are out of scope, you can always access at most stuff of your current project via `Pew.project()`
```javascript
// access to project config object
Pew.project().conf
// access to a layer object
Pew.project().layers["layer_name"]
// access to a scene module
Pew.project().scenes["scene_name"]
// access to keyboard module
Pew.project().keyboard
// access to mouse module
Pew.project().mouse
// access to resources module
Pew.project().resources
```