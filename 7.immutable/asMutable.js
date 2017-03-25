var Immutable = require('immutable');

var array = Immutable.fromJS(["hello", "world"]);
var mutableArray = array.asMutable();
mutableArray.push("!!!");
console.log(mutableArray);

var immutableArray = array.asImmutable();
immutableArray.push("!!!");
console.log(immutableArray);




