var Immutable = require('immutable');

const data = { a: { b: [1, 2, 3, 4] } };

const immutable = Immutable.fromJS(data, function(key, value) {
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toMap();
});

console.log(immutable);
