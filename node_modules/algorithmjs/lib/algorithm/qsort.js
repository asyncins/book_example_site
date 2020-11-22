/**
 * default comparer function
 * return true if its in the right order
 *
 * @param ele1
 * @param ele2
 * @return boolean
 */
function _defaultComparer(ele1, ele2) {
    return ele1 < ele2;
}

/**
 * qsort main function
 *
 * @param array
 * @param l
 * @param r
 * @param func
 * @return
 */
function qsort(array, l, r, func) {
    if(l < r) {
        var i = l, j = r;
        var x = array[l];

        while(i < j) {
            while(i < j && func(x, array[j])) j--;
            array[i] = array[j];
            while(i < j && func(array[i], x)) i++;
            array[j] = array[i];
        }
        array[i] = x;

        qsort(array, l, i - 1, func);
        qsort(array, i + 1, r, func);
    }
}

/**
 * quick sort.
 *
 * @param array
 * @param l
 * @param r
 * @param func
 * @return
 */
module.exports = function(array, l, r, func) {
    if(typeof l === "function") {
        func = l;
        l = undefined;
    }
    if(typeof r === "function") {
        func = r;
        r = undefined;
    }
    if(undefined === func) func = _defaultComparer;
    if(undefined === l) l = 0;
    if(undefined === r) r = array.length - 1;

    qsort(array, l, r, func);
};

/**
 * qsort of prototype
 *
 * @param l
 * @param r
 * @param func
 * @return
 */
Object.defineProperty(Array.prototype, "qsort", {
    value: function(l, r, func) {
        module.exports(this, l, r, func);
        return this;
    },
    enumerable: false,
    configurable: true
});
