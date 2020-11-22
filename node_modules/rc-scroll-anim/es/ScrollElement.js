import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import { noop, currentScrollTop, transformArguments, windowHeight, windowIsUndefined } from './util';

var ScrollElement = function (_React$Component) {
  _inherits(ScrollElement, _React$Component);

  _createClass(ScrollElement, null, [{
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
    _classCallCheck(this, ScrollElement);

    var _this = _possibleConstructorReturn(this, (ScrollElement.__proto__ || Object.getPrototypeOf(ScrollElement)).call(this, props));

    _this.getParam = function (e) {
      _this.clientHeight = _this.target ? _this.target.clientHeight : windowHeight();
      var scrollTop = _this.target ? _this.target.scrollTop : currentScrollTop();
      var domRect = _this.dom.getBoundingClientRect();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = domRect.top + scrollTop - targetTop;
      _this.elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var playScale = transformArguments(_this.props.playScale);
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
      EventListener.addEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      var scrollTop = currentScrollTop();
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

  _createClass(ScrollElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (windowIsUndefined) {
        return;
      }
      this.dom = ReactDOM.findDOMNode(this);
      var date = Date.now();
      this.target = this.props.targetId && document.getElementById(this.props.targetId);

      var length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollEvent' + date + length;
      this.addScrollEvent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
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
          props = _objectWithoutProperties(_props, ['component', 'playScale', 'location', 'targetId', 'onScroll', 'onChange', 'replay', 'componentProps']);

      return React.createElement(component, _extends({}, props, componentProps));
    }
  }]);

  return ScrollElement;
}(React.Component);

ScrollElement.propTypes = {
  component: PropTypes.any,
  playScale: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  location: PropTypes.string,
  targetId: PropTypes.string,
  replay: PropTypes.bool,
  componentProps: PropTypes.object
};
ScrollElement.defaultProps = {
  component: 'div',
  onChange: noop,
  onScroll: noop,
  playScale: 0.5,
  replay: false,
  componentProps: {}
};

ScrollElement.isScrollElement = true;
export default ScrollElement;