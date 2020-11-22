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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

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

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var scrollLinkLists = []; /**
                           * Created by jljsj on 16/1/13.
                           */

var ScrollLink = function (_React$Component) {
  (0, _inherits3['default'])(ScrollLink, _React$Component);

  function ScrollLink(props) {
    (0, _classCallCheck3['default'])(this, ScrollLink);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (ScrollLink.__proto__ || Object.getPrototypeOf(ScrollLink)).call(this, props));

    _this.onClick = function (e) {
      e.preventDefault();
      _EventDispatcher2['default'].removeAllType('scroll.scrollAnchorEvent');
      _this.elementDom = document.getElementById(_this.props.to);;
      if (_this.rafID !== -1 || !_this.elementDom) {
        return;
      }
      _this.scrollTop = _this.target ? _this.target.scrollTop : (0, _util.currentScrollTop)();
      _this.initTime = Date.now();
      _this.rafID = (0, _raf2['default'])(_this.raf);
      scrollLinkLists.forEach(function (item) {
        if (item !== _this) {
          item.remActive();
        }
      });
      _this.addActive();
    };

    _this.getToTop = function () {
      var elementRect = _this.elementDom && _this.elementDom.getBoundingClientRect();
      _this.clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var toTop = Math.round(elementRect.top + (0, _util.currentScrollTop)()) - _this.props.offsetTop - targetTop;
      var t = (0, _util.transformArguments)(_this.props.showHeightActive)[0];
      var toShow = t.match('%') ? _this.clientHeight * parseFloat(t) / 100 : t;
      return _this.props.toShowHeight ? toTop - toShow + 0.5 : toTop;
    };

    _this.cancelRequestAnimationFrame = function () {
      _raf2['default'].cancel(_this.rafID);
      _this.rafID = -1;
    };

    _this.addActive = function () {
      if (!_this.state.active) {
        var obj = {
          target: _this.dom,
          to: _this.props.to
        };
        _this.props.onFocus(obj);
        _this.setState({
          active: true
        }, function () {
          if (_this.props.toHash) {
            var link = '#' + _this.props.to;
            history.pushState(null, window.title, link); // eslint-disable-line
          }
        });
      }
    };

    _this.raf = function () {
      if (_this.rafID === -1) {
        return;
      }
      var duration = _this.props.duration;
      var now = Date.now();
      var progressTime = now - _this.initTime > duration ? duration : now - _this.initTime;
      // 动画时也会改变高度，动态获取
      var easeValue = _tweenFunctions2['default'][_this.props.ease](progressTime, _this.scrollTop, _this.getToTop(), duration);
      if (_this.target) {
        _this.target.scrollTop = easeValue;
      } else {
        window.scrollTo(window.scrollX, easeValue);
      }
      if (progressTime === duration) {
        _this.elementDom = null;
        _this.cancelRequestAnimationFrame();
        _EventDispatcher2['default'].reAllType('scroll.scrollAnchorEvent');
      } else {
        _this.rafID = (0, _raf2['default'])(_this.raf);
      }
    };

    _this.remActive = function () {
      if (_this.state.active) {
        var obj = {
          target: _this.dom,
          to: _this.props.to
        };
        _this.props.onBlur(obj);
        _this.setState({
          active: false
        });
      }
    };

    _this.scrollEventListener = function () {
      var elementDom = document.getElementById(_this.props.to);
      if (!elementDom) {
        return;
      }
      // 滚动时会改变高度, 动态获取高度
      var clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var elementRect = elementDom.getBoundingClientRect();
      var elementClientHeight = elementDom.clientHeight;
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var top = Math.round(-elementRect.top + targetTop);
      var showHeightActive = (0, _util.transformArguments)(_this.props.showHeightActive);
      var startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[0]) / 100 * clientHeight : parseFloat(showHeightActive[0]);
      var endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[1]) / 100 * clientHeight : parseFloat(showHeightActive[1]);
      if (top >= Math.round(-startShowHeight) && top < Math.round(elementClientHeight - endShowHeight)) {
        _this.addActive();
      } else {
        _this.remActive();
      }
    };

    _this.rafID = -1;
    _this.state = {
      active: false
    };
    return _this;
  }

  (0, _createClass3['default'])(ScrollLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.dom = _reactDom2['default'].findDOMNode(this);
      this.target = this.props.targetId && document.getElementById(this.props.targetId);
      scrollLinkLists.push(this);
      var date = Date.now();
      var length = _EventDispatcher2['default']._listeners.scroll ? _EventDispatcher2['default']._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollAnchorEvent' + date + length;
      _EventDispatcher2['default'].addEventListener(this.eventType, this.scrollEventListener, this.target);
      // 第一次进入；等全部渲染完成后执行;
      setTimeout(function () {
        _this2.scrollEventListener();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      scrollLinkLists = scrollLinkLists.filter(function (item) {
        return item !== _this3;
      });
      _EventDispatcher2['default'].removeEventListener(this.eventType, this.scrollEventListener, this.target);
      this.cancelRequestAnimationFrame();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          component = _props.component,
          onClick = _props.onClick,
          duration = _props.duration,
          tagActive = _props.active,
          showHeightActive = _props.showHeightActive,
          ease = _props.ease,
          toShowHeight = _props.toShowHeight,
          offsetTop = _props.offsetTop,
          targetId = _props.targetId,
          to = _props.to,
          toHash = _props.toHash,
          componentProps = _props.componentProps,
          props = (0, _objectWithoutProperties3['default'])(_props, ['component', 'onClick', 'duration', 'active', 'showHeightActive', 'ease', 'toShowHeight', 'offsetTop', 'targetId', 'to', 'toHash', 'componentProps']);

      var active = this.state.active ? tagActive : '';
      props.onClick = function (e) {
        onClick(e);
        _this4.onClick(e);
      };
      var reg = new RegExp(active, 'ig');
      var className = props.className || '';
      props.className = className.indexOf(active) === -1 ? (className + ' ' + active).trim() : className.replace(reg, '').trim();
      return (0, _react.createElement)(this.props.component, (0, _extends3['default'])({}, props, componentProps));
    }
  }]);
  return ScrollLink;
}(_react2['default'].Component);

ScrollLink.propTypes = {
  component: _propTypes2['default'].any,
  children: _propTypes2['default'].any,
  className: _propTypes2['default'].string,
  style: _propTypes2['default'].any,
  offsetTop: _propTypes2['default'].number,
  duration: _propTypes2['default'].number,
  active: _propTypes2['default'].string,
  to: _propTypes2['default'].string,
  targetId: _propTypes2['default'].string,
  showHeightActive: _propTypes2['default'].any,
  toShowHeight: _propTypes2['default'].bool,
  ease: _propTypes2['default'].string,
  onClick: _propTypes2['default'].func,
  onFocus: _propTypes2['default'].func,
  onBlur: _propTypes2['default'].func,
  toHash: _propTypes2['default'].bool,
  componentProps: _propTypes2['default'].object
};
ScrollLink.defaultProps = {
  component: 'div',
  offsetTop: 0,
  duration: 450,
  active: 'active',
  showHeightActive: '50%',
  ease: 'easeInOutQuad',
  toHash: false,
  onClick: _util.noop,
  onFocus: _util.noop,
  onBlur: _util.noop,
  componentProps: {}
};

ScrollLink.isScrollLink = true;

exports['default'] = ScrollLink;
module.exports = exports['default'];