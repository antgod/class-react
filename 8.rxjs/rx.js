var Rx = require('rxjs');
 require('rxjs/add/observable/of');
 require('rxjs/add/operator/map');


var numbers = Rx.Observable.of(10, 20, 30);
var letters = Rx.Observable.of('a', 'b', 'c');
var interval = Rx.Observable.interval(1000);
var result = numbers.concat(letters).concat(interval);
result.subscribe(x => console.log(x));