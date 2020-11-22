'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ScrollElement = function (_React$Component) {
  (0, _inherits3['default'])(ScrollElement, _React$Component);
  (0, _createClass3['default'])(ScrollElement, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps,
          $self = _ref.$self;

      var nextState = {
        prevProps: props
      };
      if (prevProps && props !== prevProps) {
        $self.scrollEventListener();
      }
      return nextState; // eslint-disable-line
    }
  }]);

  function ScrollElement(props) {
    (0, _classCallCheck3['default'])(this, ScrollElement);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (ScrollElement.__proto__ || Object.getPrototypeOf(ScrollElement)).call(this, props));

    _this.getParam = function (e) {
      _this.clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var scrollTop = _this.target ? _this.target.scrollTop : (0, _util.currentScrollTop)();
      var domRect = _this.dom.getBoundingClientRect();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = domRect.top + scrollTop - targetTop;
      _this.elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var playScale = (0, _util.transformArguments)(_this.props.playScale);
      var playScaleEnterArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[0])); // eslint-disable-line
      if (!playScaleEnterArray[2]) {
        _this.playHeight = _this.clientHeight * parseFloat(playScale[0]);
      } else if (playScaleEnterArray[2] === 'px') {
        _this.playHeight = parseFloat(playScaleEnterArray[1]);
      } else {
        _this.playHeight = _this.clientHeight * parseFloat(playScaleEnterArray[1]) / 100;
      }
      var leaveHeight = domRect.height;
      var playScaleLeaveArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[1])); // eslint-disable-line
      if (!playScaleLeaveArray[2]) {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScale[1]);
      } else if (playScaleLeaveArray[2] === 'px') {
        _this.leavePlayHeight = parseFloat(playScaleLeaveArray[1]);
      } else {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScaleLeaveArray[1]) / 100;
      }
      var enter = _this.props.replay ? _this.elementShowHeight >= _this.playHeight && _this.elementShowHeight <= _this.clientHeight + _this.leavePlayHeight : _this.elementShowHeight >= _this.playHeight;
      var enterOrLeave = enter ? 'enter' : 'leave';
      var mode = _this.enter !== enter || typeof _this.enter !== 'boolean' ? enterOrLeave : null;
      if (mode) {
        _this.props.onChange({ mode: mode, id: _this.props.id });
      }
      _this.props.onScroll({
        domEvent: e,
        scrollTop: scrollTop,
        showHeight: _this.elementShowHeight,
        offsetTop: offsetTop,
        id: _this.props.id
      });
      _this.enter = enter;
    };

    _this.addScrollEvent = function () {
      _EventDispatcher2['default'].addEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      var scrollTop = (0, _util.currentScrollTop)();
      if (!scrollTop) {
        _this.scrollEventListener();
      }
    };

    _this.scrollEventListener = function (e) {
      _this.getParam(e);
    };

    _this.state = {
      $self: _this
    };
    return _this;
  }

  (0, _createClass3['default'])(ScrollElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_util.windowIsUndefined) {
        return;
      }
      this.dom = _reactDom2['default'].findDOMNode(this);
      var date = Date.now();
      this.target = this.props.targetId && document.getElementById(this.props.targetId);

      var length = _EventDispatcher2['default']._listeners.scroll ? _EventDispatcher2['default']._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollEvent' + date + length;
      this.addScrollEvent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _EventDispatcher2['default'].removeEventListener(this.eventType, this.scrollEventListener, this.target);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          playScale = _props.playScale,
          location = _props.location,
          targetId = _props.targetId,
          onScroll = _props.onScroll,
          onChange = _props.onChange,
          replay = _props.replay,
          componentProps = _props.componentProps,
          props = (0, _objectWithoutProperties3['default'])(_props, ['component', 'playScale', 'location', 'targetId', 'onScroll', 'onChange', 'replay', 'componentProps']);

      return _react2['default'].createElement(component, (0, _extends3['default'])({}, props, componentProps));
    }
  }]);
  return ScrollElement;
}(_react2['default'].Component);

ScrollElement.propTypes = {
  component: _propTypes2['default'].any,
  playScale: _propTypes2['default'].any,
  id: _propTypes2['default'].string,
  onChange: _propTypes2['default'].func,
  onScroll: _propTypes2['default'].func,
  location: _propTypes2['default'].string,
  targetId: _propTypes2['default'].string,
  replay: _propTypes2['default'].bool,
  componentProps: _propTypes2['default'].object
};
ScrollElement.defaultProps = {
  component: 'div',
  onChange: _util.noop,
  onScroll: _util.noop,
  playScale: 0.5,
  replay: false,
  componentProps: {}
};

ScrollElement.isScrollElement = true;
exports['default'] = ScrollElement;
module.exports = exports['default'];