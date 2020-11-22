/**
 * Created by XadillaX on 2014/5/24.
 */
var Linklist = require("../../").ds.Linklist;

var linklist = new Linklist();
linklist.pushBack(1);
linklist.pushBack(2);
linklist.pushBack("abc");
linklist.pushBack(new Object()); // jshint ignore: line
linklist.pushBack(null);
linklist.pushBack(undefined);
linklist.pushBack(NaN);
linklist.pushBack(12.3);
linklist.pushBack(true);
linklist.pushBack(new Date());
linklist.pushFront(new Linklist.LinklistNode(false));

linklist.insert(0, "I'm the first queue jumper!");
linklist.insert(linklist.length, "I'm the second queue jumper!");
linklist.insert(linklist.length - 1, "I'm the third queue jumper!");

console.log("popping front: " + linklist.popFront());
console.log("popping back: " + linklist.popBack());
console.log("removing the 4th element: " + linklist.removeAt(4));

console.log(linklist);
