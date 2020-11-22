'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollScreen = exports.Event = exports.Link = exports.Element = exports.Parallax = exports.OverPack = undefined;

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _ScrollOverPack = require('./ScrollOverPack');

var _ScrollOverPack2 = _interopRequireDefault(_ScrollOverPack);

var _ScrollParallax = require('./ScrollParallax');

var _ScrollParallax2 = _interopRequireDefault(_ScrollParallax);

var _ScrollLink = require('./ScrollLink');

var _ScrollLink2 = _interopRequireDefault(_ScrollLink);

var _ScrollElement = require('./ScrollElement');

var _ScrollElement2 = _interopRequireDefault(_ScrollElement);

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _ScrollScreen = require('./ScrollScreen');

var _ScrollScreen2 = _interopRequireDefault(_ScrollScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OverPack = exports.OverPack = (0, _reactLifecyclesCompat.polyfill)(_ScrollOverPack2['default']); // export this package's api
var Parallax = exports.Parallax = (0, _reactLifecyclesCompat.polyfill)(_ScrollParallax2['default']);
var Element = exports.Element = (0, _reactLifecyclesCompat.polyfill)(_ScrollElement2['default']);
var Link = exports.Link = _ScrollLink2['default'];
var Event = exports.Event = _EventDispatcher2['default'];
var scrollScreen = exports.scrollScreen = _ScrollScreen2['default'];

exports['default'] = {
  OverPack: OverPack,
  Parallax: Parallax,
  Element: Element,
  Link: Link,
  Event: Event,
  scrollScreen: scrollScreen
};