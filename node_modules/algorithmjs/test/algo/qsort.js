var algojs = require("../../");

var array = [ 2, 3, 1, 4, 5, 9, 6, 8, 7, 0 ];
algojs.algorithm.qsort(array);

console.log(array);

algojs.algorithm.qsort(array, function(a, b) {
    if(a % 2 && !(b % 2)) return true;
    if(b % 2 && !(a % 2)) return false;
    return a < b;
});

console.log(array);

var names = [
    { name: "abc", age: 10, func: function() { return 20; } },
    { name: "foo", age: 5, func: function() { return 10; } },
    { name: "foobar", age: 1, func: function() { return 15 } }
];

algojs.algorithm.qsort(names, function(a, b) {
    return a.age < b.age;
});
console.log(names);

algojs.algorithm.qsort(names, function(a, b) {
    return a.func() < b.func();
});
console.log(names);

console.log(names.qsort(function(a, b) {
    return a.name < b.name;
}));

