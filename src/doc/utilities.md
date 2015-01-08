##Utilities
Utilities can be accessed with `Pew.utils.[fn name]`

Generate a **random number**
`Pew.utils.rand(min, max, interval = 1)`

```javascript
console.log(Pew.utils.rand(1,10)); 
// output a number between 1 and 10

console.log(Pew.utils.rand(0,100, 25)); 
// output a number between 0 and 100 at interval of 25
// so possible value here can be 0,25,50,75 or 100 only
```


Get a **random element from an array** 
`Pew.utils.randIndex(array);`

```javascript
console.log( Pew.utils.randIndex(["aaa","bbb","ccc"]) ); 
// output one random element form array
// in this example, output can be "aaa","bbb" or "ccc"
```

**Extend an object** with another object
`Pew.utils.extend({}, objA, objB)`

```javascript
var objA = { title: "AAA", x: 0, y: 0 };
var objB = { title: "BBB", x: 20 };

// merge objB into objA
console.log( Pew.utils.extend({}, objA, objB) ); 
// output {title: "BBB", x: 20, y: 0}
```
