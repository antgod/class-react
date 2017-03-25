var Immutable = require('immutable');

var map1 = Immutable.Map({a:1, b:1, c:1});
var map2 = Immutable.Map({a:1, b:1, c:1});
console.log(map1 !== map2);
console.log(Object.is(map1, map2) === true);
console.log(Immutable.is(map1, map2) === true);