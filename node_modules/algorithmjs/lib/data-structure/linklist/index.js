/**
 * Created by XadillaX on 2014/5/24.
 */
/**
 * Linklist node.
 * @constructor
 */
var LinklistNode = function(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
};

/**
 * Linklist
 * @constructor
 */
var Linklist = function() {
    this._head = new LinklistNode(null);
    this._tail = new LinklistNode(null);

    this._head.next = this._tail;
    this._tail.prev = this._head;
};

Linklist.prototype.length = 0;

/**
 * to string.
 * @returns {string}
 */
Linklist.prototype.toString = function() {
    var str = "[";
    var first = true;
    for(var node = this._head.next; node !== this._tail; node = node.next) {
        if(!first) {
            str += " -> \n  ";
        } else {
            str += " ";
            first = false;
        }

        if(typeof node.value === "string") {
            str += '"' + node.value + '"';
        } else if(typeof node.value === "object") {
            if(node.value === null) {
                str += "null";
            } else {
                str += node.value.toString();
            }
        } else {
            str += node.value;
        }
    }
    str += " ]";

    return str;
};

/**
 * console.log()...
 * @type {Function}
 */
Linklist.prototype.inspect = Linklist.prototype.toString;

/**
 * node at a certain position
 * @param pos
 * @returns {*}
 */
Linklist.prototype.nodeAt = function(pos) {
    // out of range
    if(pos < 0 || pos >= this.length) {
        return null;
    }

    // from start to end...
    if(this.length << 1 > pos) {
        var i = 0;
        for(var node = this._head.next;
            node !== this._tail;
            node = node.next) {
            if(i++ === pos) {
                return node;
            }
        }
    }

    // from end to start...
    var i = this.length - 1;
    for(var node = this._tail.prev;
        node !== this._head;
        node = node.prev) {
        if(i-- === pos) {
            return node;
        }
    }
};

/**
 * value at a certain position
 * @param pos
 * @returns {*}
 */
Linklist.prototype.valueAt = function(pos) {
    var node = this.nodeAt(pos);
    if(null === node) {
        return undefined;
    }

    return node.value;
};

/**
 * remove a certain position element.
 * @param pos
 * @returns {*}
 */
Linklist.prototype.removeAt = function(pos) {
    var node = this.nodeAt(pos);
    if(null === node) {
        return undefined;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
    var value = node.value;
    node = undefined;

    this.length--;
    return value;
};

/**
 * insert an element at the position of `pos`.
 * @param pos
 * @param value
 */
Linklist.prototype.insert = function(pos, value) {
    var node = this.nodeAt(pos);

    // two special position.
    if(pos < 0) {
        node = this._head;
    } else if(node === null) {
        node = this._tail;
    }

    if(!(value instanceof LinklistNode)) {
        value = new LinklistNode(value);
    }

    value.prev = node.prev;
    value.next = node;
    node.prev.next = value;
    node.prev = value;

    this.length++;
};

/**
 * pop the back element.
 * @returns {*}
 */
Linklist.prototype.popBack = function() {
    if(!this.length) {
        return undefined;
    }

    var back = this._tail.prev;
    if(back === this._head) return undefined;

    this._tail.prev = back.prev;
    this._tail.prev.next = this._tail;

    var value = back.value;
    back = undefined;

    this.length--;

    return value;
};

/**
 * pop the front element.
 * @returns {*}
 */
Linklist.prototype.popFront = function() {
    if(!this.length) {
        return undefined;
    }

    var front = this._head.next;
    if(front === this._tail) return undefined;

    this._head.next = front.next;
    this._head.next.prev = this._head;

    var value = front.value;
    front = undefined;

    this.length--;

    return value;
};

/**
 * Push an element to the end of the linklist.
 * @param value
 */
Linklist.prototype.pushBack = function(value) {
    if(!(value instanceof LinklistNode)) {
        value = new LinklistNode(value);
    }

    value.next = this._tail;
    value.prev = this._tail.prev;
    this._tail.prev.next = value;
    this._tail.prev = value;

    this.length++;
};

/**
 * Push an element to the front of the linklist.
 * @param value
 */
Linklist.prototype.pushFront = function(value) {
    if(!(value instanceof LinklistNode)) {
        value = new LinklistNode(value);
    }

    value.next = this._head.next;
    value.prev = this._head;
    this._head.next.prev = value;
    this._head.next = value;

    this.length++;
};

module.exports = Linklist;
module.exports.LinklistNode = LinklistNode;
