##Utilities
Utilities can be accessed with `Pew.utils.[fn name]`

<hr class="sep">
####`rand(min, max, interval = 1)`
Generate a **random number**


```javascript
console.log(Pew.utils.rand(1,10)); 
// output a number between 1 and 10

console.log(Pew.utils.rand(0,100, 25)); 
// output a number between 0 and 100 at interval of 25
// so possible value here can be 0,25,50,75 or 100 only
```

<hr class="sep">
####`randIndex(array);`
Get a **random element from an array** 

```javascript
console.log( Pew.utils.randIndex(["aaa","bbb","ccc"]) ); 
// output one random element form array
// in this example, output can be "aaa","bbb" or "ccc"
```

<hr class="sep">
####`extend({}, objA, objB)`
**Extend an object** with another object

```javascript
var objA = { title: "AAA", x: 0, y: 0 };
var objB = { title: "BBB", x: 20 };

// merge objB into objA
console.log( Pew.utils.extend({}, objA, objB) ); 
// output {title: "BBB", x: 20, y: 0}
```

<hr class="sep">
####`isRangeStr(data);`
Check if a string describe a range
```javascript
Pew.utils.isRangeStr('5..18'); //true
```

<hr class="sep">
####`isArray(data);`
Check if the variable is an array
```javascript
Pew.utils.isArray([2,3,4]); //true
```

