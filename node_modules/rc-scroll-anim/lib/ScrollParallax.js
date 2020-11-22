'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tweenFunctions = require('tween-functions');

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

var _rcTweenOne = require('rc-tween-one');

var _ticker = require('rc-tween-one/lib/ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var tickerId = 0;

function playScaleToArray(playScale) {
  if (Array.isArray(playScale)) {
    if (playScale.length === 2) {
      return playScale;
    }
    return [playScale[0] || 0, playScale[1] || 1];
  } else if (playScale) {
    return [playScale, 1];
  }
  return [0, 1];
}

var ScrollParallax = function (_React$Component) {
  (0, _inherits3['default'])(ScrollParallax, _React$Component);
  (0, _createClass3['default'])(ScrollParallax, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps,
          $self = _ref.$self;

      var nextState = {
        prevProps: props
      };
      if (prevProps && props !== prevProps) {
        var equal = (0, _util.objectEqual)(prevProps.animation, props.animation);
        if (!equal) {
          $self.setDefaultData(props.animation || {});
          $self.timeline.resetAnimData();
          $self.timeline.setDefaultData($self.defaultTweenData);
        }
      }
      return nextState; // eslint-disable-line
    }
  }]);

  function ScrollParallax(props) {
    (0, _classCallCheck3['default'])(this, ScrollParallax);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (ScrollParallax.__proto__ || Object.getPrototypeOf(ScrollParallax)).call(this, props));

    _this.setDefaultData = function (_vars) {
      var vars = (0, _util.dataToArray)(_vars);
      var varsForIn = function varsForIn(item, i) {
        var playScale = playScaleToArray(item.playScale).map(function (data) {
          return data * _this.clientHeight;
        });
        var aItem = (0, _extends3['default'])({}, item);
        delete aItem.playScale;
        var cItem = (0, _extends3['default'])({}, item);
        delete cItem.playScale;
        cItem.delay = playScale[0];
        aItem.delay = playScale[0];
        cItem.duration = playScale[1] - playScale[0];
        aItem.duration = playScale[1] - playScale[0];
        cItem.onStart = null;
        cItem.onUpdate = null;
        cItem.onComplete = null;
        cItem.onRepeat = null;
        aItem.onStart = aItem.onStart || _util.noop;
        aItem.onComplete = aItem.onComplete || _util.noop;
        aItem.onUpdate = aItem.onUpdate || _util.noop;
        aItem.onStartBack = aItem.onStartBack || _util.noop;
        aItem.onCompleteBack = aItem.onCompleteBack || _util.noop;
        _this.defaultTweenData[i] = cItem;
        _this.defaultData[i] = aItem;
      };
      vars.forEach(varsForIn);
    };

    _this.resizeEventListener = function () {
      if (_this.defaultData[_this.defaultData.length - 1] && _this.defaultData[_this.defaultData.length - 1].onCompleteBool && !_this.props.always) {
        return;
      }
      _this.scrollTop = (0, _util.currentScrollTop)();
      _this.target = _this.props.targetId && document.getElementById(_this.props.targetId);
      _this.clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      _this.setDefaultData(_this.props.animation || {});
      if (_this.timeline) {
        _this.timeline.resetDefaultStyle();
      }
      _this.timeline = new _rcTweenOne.Tween(_this.dom, _this.defaultTweenData);
      _this.timeline.init();
      _this.scrollEventListener();
    };

    _this.scrollEventListener = function () {
      var scrollTop = _this.target ? _this.target.scrollTop : (0, _util.currentScrollTop)();
      _this.clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var dom = _this.props.location ? document.getElementById(_this.props.location) : _this.dom;
      if (!dom) {
        throw new Error('"location" is null');
      }
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = dom.getBoundingClientRect().top + scrollTop - targetTop;
      var elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var currentShow = _this.scrollTop - offsetTop + _this.clientHeight;
      _this.defaultData.forEach(function (item, i) {
        var duration = _this.defaultData.map(function (c, ii) {
          return ii < i && c.delay + c.duration || 0;
        }).reduce(function (a, b) {
          return a + b;
        });
        var noUpdate = void 0;
        if (elementShowHeight <= item.delay + duration) {
          if (!item.onCompleteBackBool && item.onStartBool) {
            item.onCompleteBackBool = true;
            noUpdate = true;
            item.onCompleteBack();
          }
        } else {
          item.onCompleteBackBool = false;
        }
        if (elementShowHeight >= item.delay + duration) {
          if (!item.onStartBool) {
            item.onStartBool = true;
            noUpdate = true;
            item.onStart();
          }
        } else {
          item.onStartBool = false;
        }

        if (elementShowHeight <= item.delay + item.duration + duration) {
          if (!item.onStartBackBool && item.onCompleteBool) {
            item.onStartBackBool = true;
            noUpdate = true;
            item.onStartBack();
          }
        } else {
          item.onStartBackBool = false;
        }

        if (elementShowHeight >= item.delay + item.duration + duration) {
          if (!item.onCompleteBool) {
            item.onCompleteBool = true;
            noUpdate = true;
            item.onComplete();
          }
        } else {
          item.onCompleteBool = false;
        }
        if (elementShowHeight >= item.delay + duration && elementShowHeight <= item.delay + item.duration + duration && !noUpdate) {
          item.onUpdate(elementShowHeight / (item.delay + item.duration + duration));
        }
      });
      _ticker2['default'].clear(_this.tickerId);
      _this.tickerId = 'scrollParallax' + Date.now() + '-' + tickerId;
      tickerId++;
      if (tickerId >= Number.MAX_VALUE) {
        tickerId = 0;
      }
      var startFrame = _ticker2['default'].frame;
      _ticker2['default'].wake(_this.tickerId, function () {
        var moment = (_ticker2['default'].frame - startFrame) * _ticker2['default'].perFrame;
        var ratio = _tweenFunctions2['default'].easeOutQuad(moment, 0.08, 1, 300);
        _this.timeline.frame(currentShow + ratio * (elementShowHeight - currentShow));
        if (moment >= 300) {
          _ticker2['default'].clear(_this.tickerId);
        }
      });

      _this.scrollTop = scrollTop;
      // 如果不一直靠滚动来执行动画，always=false而且动画全执行完了，，删除scrollEvent;
      if (_this.defaultData[_this.defaultData.length - 1].onCompleteBool && _this.eventType && !_this.props.always) {
        _EventDispatcher2['default'].removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      }
    };

    _this.scrollTop = 0;
    _this.defaultTweenData = [];
    _this.defaultData = [];
    _this.state = {
      $self: _this
    };
    return _this;
  }

  (0, _createClass3['default'])(ScrollParallax, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dom = _reactDom2['default'].findDOMNode(this);
      var date = Date.now();
      var length = _EventDispatcher2['default']._listeners.scroll ? _EventDispatcher2['default']._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollEvent' + date + length;
      this.eventResize = 'resize.resizeEvent' + date + length;
      this.resizeEventListener();
      _EventDispatcher2['default'].addEventListener(this.eventResize, this.resizeEventListener, this.target);
      // 预注册;
      this.timeline.frame(0);

      this.scrollEventListener();
      _EventDispatcher2['default'].addEventListener(this.eventType, this.scrollEventListener, this.target);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _EventDispatcher2['default'].removeEventListener(this.eventType, this.scrollEventListener, this.target);
      _EventDispatcher2['default'].removeEventListener(this.eventResize, this.resizeEventListener, this.target);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          always = _props.always,
          component = _props.component,
          location = _props.location,
          targetId = _props.targetId,
          componentProps = _props.componentProps,
          props = (0, _objectWithoutProperties3['default'])(_props, ['animation', 'always', 'component', 'location', 'targetId', 'componentProps']);

      var style = (0, _extends3['default'])({}, props.style);
      Object.keys(style).forEach(function (p) {
        if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
          // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
          var transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];
          for (var i = 0; i < transformArr.length; i++) {
            style[transformArr[i] + 'Filter'] = style[p];
          }
        }
      });
      props.style = style;
      return _react2['default'].createElement(this.props.component, (0, _extends3['default'])({}, props, componentProps));
    }
  }]);
  return ScrollParallax;
}(_react2['default'].Component);

ScrollParallax.propTypes = {
  component: _propTypes2['default'].any,
  animation: _propTypes2['default'].any,
  always: _propTypes2['default'].bool,
  location: _propTypes2['default'].string,
  children: _propTypes2['default'].any,
  className: _propTypes2['default'].string,
  style: _propTypes2['default'].any,
  id: _propTypes2['default'].string,
  targetId: _propTypes2['default'].string,
  componentProps: _propTypes2['default'].object
};
ScrollParallax.defaultProps = {
  component: 'div',
  always: true,
  componentProps: {}
};


ScrollParallax.isScrollParallax = true;
exports['default'] = ScrollParallax;
module.exports = exports['default'];