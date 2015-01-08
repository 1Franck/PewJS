##Extending PewJS

Create your own reusable plugins by extending thoses objects:
`Pew.Project`, `Pew.Layer` and `Pew.utils`

*Example 1:*
```javascript
Pew.Layer.prototype.circle = function(x, y, rad, fill, stroke, line_w) {

    this.ctx.beginPath();
    this.ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    
    if(stroke) {
        this.ctx.lineWidth = line_w || 1;
        this.ctx.strokeStyle = stroke;
        this.ctx.stroke();
    }
};

// ex in your scene draw loop:
// layerA.circle(100,100,10,"#000");
```
*Example 2:*
```javascript
Pew.Layer.prototype.gradient = function(x, y, x2, y2, colors, stops) {
        
    x2 = x2 || this.canvas.width;
    y2 = y2 || this.canvas.height;

    var grd = this.ctx.createLinearGradient(x, y, x2, y2);
    
    for(var i in colors) {
        grd.addColorStop(stop[i]||0, colors[i]);
    }

    return grd; 
};

// layers have now access to this function. ex:
// layerA.ctx.fillStyle = layerA.gradient(0,0,100,100,["#000","#111"],[0.5,1]);
```
