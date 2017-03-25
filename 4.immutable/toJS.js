var Immutable = require('immutable');

var indexedSeq = Immutable.List.of('A', 'C', 'B');
console.log(indexedSeq.toJS());