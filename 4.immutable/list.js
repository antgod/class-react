var Immutable = require('immutable');

var data = [0, 1, 2, [3, 4]];

var list1 = Immutable.fromJS(data).deleteIn([3, 1]);

// params: index, value
var list2 = Immutable.fromJS(data).insert(4, 6);

console.log(list1);

var list3= list1.merge(list2);

console.log(list3);


