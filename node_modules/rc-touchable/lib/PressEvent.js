'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.shouldFirePress = shouldFirePress;
function PressEvent(nativeEvent) {
    var _this = this;

    this.nativeEvent = nativeEvent;
    ['type', 'currentTarget', 'target', 'touches', 'changedTouches'].forEach(function (m) {
        _this[m] = nativeEvent[m];
    });
    if (!nativeEvent.$pressSeq) {
        nativeEvent.$pressSeq = 1;
    } else {
        nativeEvent.$pressSeq += 1;
    }
    this.$pressSeq = nativeEvent.$pressSeq;
}
PressEvent.prototype = _extends({}, PressEvent.prototype, {
    preventDefault: function preventDefault() {
        this.nativeEvent.preventDefault();
    },
    stopPropagation: function stopPropagation() {
        var nativeEvent = this.nativeEvent,
            $pressSeq = this.$pressSeq;

        if (nativeEvent.$stopPressSeq) {
            return;
        }
        nativeEvent.$stopPressSeq = $pressSeq;
    }
});
// because of setTimeout, can not depend on fire order
function shouldFirePress(e) {
    var nativeEvent = e.nativeEvent,
        $pressSeq = e.$pressSeq;

    if (!nativeEvent.$stopPressSeq) {
        return true;
    }
    return nativeEvent.$stopPressSeq >= $pressSeq;
}
exports['default'] = PressEvent;