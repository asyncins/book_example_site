import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import ScrollElement from './ScrollElement';
import { toArrayChildren, noop, windowIsUndefined } from './util';

var ScrollOverPack = function (_ScrollElement) {
  _inherits(ScrollOverPack, _ScrollElement);

  _createClass(ScrollOverPack, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps;

      var nextState = {
        prevProps: props
      };
      if (prevProps && props !== prevProps) {
        nextState.children = toArrayChildren(props.children);
      }
      return nextState;
    }
  }]);

  function ScrollOverPack(props) {
    _classCallCheck(this, ScrollOverPack);

    var _this = _possibleConstructorReturn(this, (ScrollOverPack.__proto__ || Object.getPrototypeOf(ScrollOverPack)).call(this, props));

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
          EventListener.removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
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

    _this.children = toArrayChildren(props.children);
    _this.oneEnter = false;
    _this.enter = false;
    _this.state = {
      show: false,
      children: toArrayChildren(props.children)
    };
    return _this;
  }

  _createClass(ScrollOverPack, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps !== this.props) {
        var always = this.props.always;
        var show = this.state.show;

        var inListener = EventListener._listeners.scroll && EventListener._listeners.scroll.some(function (c) {
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
          props = _objectWithoutProperties(_props, ['playScale', 'replay', 'component', 'always', 'scrollEvent', 'appear', 'location', 'targetId', 'onChange', 'onScroll', 'componentProps']);

      if (windowIsUndefined) {
        return createElement(component, _extends({}, props, componentProps), props.children);
      }
      var childToRender = void 0;
      if (!this.oneEnter) {
        var show = !appear;
        var children = toArrayChildren(props.children).map(function (item) {
          if (!item) {
            return null;
          }
          var key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
          return item.type.isTweenOne ? React.cloneElement(item, _extends({}, item.props, { key: key, paused: !show })) : React.cloneElement(item, _extends({}, item.props, { key: key }), show && item.props.children);
        });
        childToRender = createElement(component, _extends({}, props, componentProps), children);
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
              return React.cloneElement(item, { key: key, reverse: true });
            }
            return React.cloneElement(item, { key: key }, null);
          });
        } else {
          this.children = this.state.children;
        }
        childToRender = createElement(component, _extends({}, props, componentProps), this.children);
      }
      return childToRender;
    }
  }]);

  return ScrollOverPack;
}(ScrollElement);

ScrollOverPack.propTypes = {
  component: PropTypes.any,
  playScale: PropTypes.any,
  always: PropTypes.bool,
  scrollEvent: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any,
  replay: PropTypes.bool,
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  appear: PropTypes.bool,
  componentProps: PropTypes.object
};
ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: noop,
  replay: false,
  onChange: noop,
  onScroll: noop,
  appear: true,
  componentProps: {}
};

ScrollOverPack.isScrollOverPack = true;

export default ScrollOverPack;