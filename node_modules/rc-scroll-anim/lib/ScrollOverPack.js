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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _ScrollElement2 = require('./ScrollElement');

var _ScrollElement3 = _interopRequireDefault(_ScrollElement2);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ScrollOverPack = function (_ScrollElement) {
  (0, _inherits3['default'])(ScrollOverPack, _ScrollElement);
  (0, _createClass3['default'])(ScrollOverPack, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps;

      var nextState = {
        prevProps: props
      };
      if (prevProps && props !== prevProps) {
        nextState.children = (0, _util.toArrayChildren)(props.children);
      }
      return nextState;
    }
  }]);

  function ScrollOverPack(props) {
    (0, _classCallCheck3['default'])(this, ScrollOverPack);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (ScrollOverPack.__proto__ || Object.getPrototypeOf(ScrollOverPack)).call(this, props));

    _this.scrollEventListener = function (e) {
      _this.getParam(e);
      var show = _this.state.show;
      var _this$props = _this.props,
          always = _this$props.always,
          replay = _this$props.replay;

      var isTop = _this.elementShowHeight > _this.clientHeight + _this.leavePlayHeight;
      if (_this.enter || !replay && isTop) {
        if (!show) {
          _this.setState({
            show: true
          });
        }
        if (!always && _this.eventType) {
          _EventDispatcher2['default'].removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
        }
      } else if (always) {
        var bottomLeave = _this.elementShowHeight < _this.playHeight;
        // 设置往上时的出场点...
        var topLeave = replay ? isTop : null;
        if (topLeave || bottomLeave) {
          if (show) {
            _this.setState({
              show: false
            });
          }
        }
      }
    };

    _this.children = (0, _util.toArrayChildren)(props.children);
    _this.oneEnter = false;
    _this.enter = false;
    _this.state = {
      show: false,
      children: (0, _util.toArrayChildren)(props.children)
    };
    return _this;
  }

  (0, _createClass3['default'])(ScrollOverPack, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps !== this.props) {
        var always = this.props.always;
        var show = this.state.show;

        var inListener = _EventDispatcher2['default']._listeners.scroll && _EventDispatcher2['default']._listeners.scroll.some(function (c) {
          return c.n === _this2.eventType.split('.')[1];
        });
        if (always && !inListener) {
          this.addScrollEvent();
        } else if (!always && !show) {
          this.scrollEventListener();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          playScale = _props.playScale,
          replay = _props.replay,
          component = _props.component,
          always = _props.always,
          scrollEvent = _props.scrollEvent,
          appear = _props.appear,
          location = _props.location,
          targetId = _props.targetId,
          onChange = _props.onChange,
          onScroll = _props.onScroll,
          componentProps = _props.componentProps,
          props = (0, _objectWithoutProperties3['default'])(_props, ['playScale', 'replay', 'component', 'always', 'scrollEvent', 'appear', 'location', 'targetId', 'onChange', 'onScroll', 'componentProps']);

      if (_util.windowIsUndefined) {
        return (0, _react.createElement)(component, (0, _extends3['default'])({}, props, componentProps), props.children);
      }
      var childToRender = void 0;
      if (!this.oneEnter) {
        var show = !appear;
        var children = (0, _util.toArrayChildren)(props.children).map(function (item) {
          if (!item) {
            return null;
          }
          var key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
          return item.type.isTweenOne ? _react2['default'].cloneElement(item, (0, _extends3['default'])({}, item.props, { key: key, paused: !show })) : _react2['default'].cloneElement(item, (0, _extends3['default'])({}, item.props, { key: key }), show && item.props.children);
        });
        childToRender = (0, _react.createElement)(component, (0, _extends3['default'])({}, props, componentProps), children);
        this.oneEnter = true;
      } else {
        if (!this.state.show) {
          this.children = this.children.map(function (item) {
            if (!item) {
              return null;
            }
            var key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
            // 判断 TweenOne;
            if (item.type.isTweenOne) {
              return _react2['default'].cloneElement(item, { key: key, reverse: true });
            }
            return _react2['default'].cloneElement(item, { key: key }, null);
          });
        } else {
          this.children = this.state.children;
        }
        childToRender = (0, _react.createElement)(component, (0, _extends3['default'])({}, props, componentProps), this.children);
      }
      return childToRender;
    }
  }]);
  return ScrollOverPack;
}(_ScrollElement3['default']);

ScrollOverPack.propTypes = {
  component: _propTypes2['default'].any,
  playScale: _propTypes2['default'].any,
  always: _propTypes2['default'].bool,
  scrollEvent: _propTypes2['default'].func,
  children: _propTypes2['default'].any,
  className: _propTypes2['default'].string,
  style: _propTypes2['default'].any,
  replay: _propTypes2['default'].bool,
  onChange: _propTypes2['default'].func,
  onScroll: _propTypes2['default'].func,
  appear: _propTypes2['default'].bool,
  componentProps: _propTypes2['default'].object
};
ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: _util.noop,
  replay: false,
  onChange: _util.noop,
  onScroll: _util.noop,
  appear: true,
  componentProps: {}
};

ScrollOverPack.isScrollOverPack = true;

exports['default'] = ScrollOverPack;
module.exports = exports['default'];