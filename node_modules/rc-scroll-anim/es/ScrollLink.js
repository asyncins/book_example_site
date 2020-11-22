import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Created by jljsj on 16/1/13.
 */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { noop, transformArguments, currentScrollTop, windowHeight } from './util';

var scrollLinkLists = [];

var ScrollLink = function (_React$Component) {
  _inherits(ScrollLink, _React$Component);

  function ScrollLink(props) {
    _classCallCheck(this, ScrollLink);

    var _this = _possibleConstructorReturn(this, (ScrollLink.__proto__ || Object.getPrototypeOf(ScrollLink)).call(this, props));

    _this.onClick = function (e) {
      e.preventDefault();
      EventListener.removeAllType('scroll.scrollAnchorEvent');
      _this.elementDom = document.getElementById(_this.props.to);;
      if (_this.rafID !== -1 || !_this.elementDom) {
        return;
      }
      _this.scrollTop = _this.target ? _this.target.scrollTop : currentScrollTop();
      _this.initTime = Date.now();
      _this.rafID = requestAnimationFrame(_this.raf);
      scrollLinkLists.forEach(function (item) {
        if (item !== _this) {
          item.remActive();
        }
      });
      _this.addActive();
    };

    _this.getToTop = function () {
      var elementRect = _this.elementDom && _this.elementDom.getBoundingClientRect();
      _this.clientHeight = _this.target ? _this.target.clientHeight : windowHeight();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var toTop = Math.round(elementRect.top + currentScrollTop()) - _this.props.offsetTop - targetTop;
      var t = transformArguments(_this.props.showHeightActive)[0];
      var toShow = t.match('%') ? _this.clientHeight * parseFloat(t) / 100 : t;
      return _this.props.toShowHeight ? toTop - toShow + 0.5 : toTop;
    };

    _this.cancelRequestAnimationFrame = function () {
      requestAnimationFrame.cancel(_this.rafID);
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
      var easeValue = easingTypes[_this.props.ease](progressTime, _this.scrollTop, _this.getToTop(), duration);
      if (_this.target) {
        _this.target.scrollTop = easeValue;
      } else {
        window.scrollTo(window.scrollX, easeValue);
      }
      if (progressTime === duration) {
        _this.elementDom = null;
        _this.cancelRequestAnimationFrame();
        EventListener.reAllType('scroll.scrollAnchorEvent');
      } else {
        _this.rafID = requestAnimationFrame(_this.raf);
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
      var clientHeight = _this.target ? _this.target.clientHeight : windowHeight();
      var elementRect = elementDom.getBoundingClientRect();
      var elementClientHeight = elementDom.clientHeight;
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var top = Math.round(-elementRect.top + targetTop);
      var showHeightActive = transformArguments(_this.props.showHeightActive);
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

  _createClass(ScrollLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.dom = ReactDOM.findDOMNode(this);
      this.target = this.props.targetId && document.getElementById(this.props.targetId);
      scrollLinkLists.push(this);
      var date = Date.now();
      var length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollAnchorEvent' + date + length;
      EventListener.addEventListener(this.eventType, this.scrollEventListener, this.target);
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
      EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
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
          props = _objectWithoutProperties(_props, ['component', 'onClick', 'duration', 'active', 'showHeightActive', 'ease', 'toShowHeight', 'offsetTop', 'targetId', 'to', 'toHash', 'componentProps']);

      var active = this.state.active ? tagActive : '';
      props.onClick = function (e) {
        onClick(e);
        _this4.onClick(e);
      };
      var reg = new RegExp(active, 'ig');
      var className = props.className || '';
      props.className = className.indexOf(active) === -1 ? (className + ' ' + active).trim() : className.replace(reg, '').trim();
      return createElement(this.props.component, _extends({}, props, componentProps));
    }
  }]);

  return ScrollLink;
}(React.Component);

ScrollLink.propTypes = {
  component: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any,
  offsetTop: PropTypes.number,
  duration: PropTypes.number,
  active: PropTypes.string,
  to: PropTypes.string,
  targetId: PropTypes.string,
  showHeightActive: PropTypes.any,
  toShowHeight: PropTypes.bool,
  ease: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  toHash: PropTypes.bool,
  componentProps: PropTypes.object
};
ScrollLink.defaultProps = {
  component: 'div',
  offsetTop: 0,
  duration: 450,
  active: 'active',
  showHeightActive: '50%',
  ease: 'easeInOutQuad',
  toHash: false,
  onClick: noop,
  onFocus: noop,
  onBlur: noop,
  componentProps: {}
};

ScrollLink.isScrollLink = true;

export default ScrollLink;