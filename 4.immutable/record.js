var Immutable = require('immutable');

var ABRecord = Immutable.Record({a:1, b:2});
var myRecord = new ABRecord({b:3});
console.log(myRecord.size, myRecord.get('a'), myRecord.get('b'));
myRecordWithoutB = myRecord.remove('b');
console.log(myRecordWithoutB.get('b')); // 2
console.log(myRecordWithoutB.size); // 2

