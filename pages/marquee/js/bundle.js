(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var marquee = require('./marquee');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.Marquee = factory();
  }
})(function () {

  return marquee;
});

},{"./marquee":2}],2:[function(require,module,exports){
'use strict';

var dom = require('./utils/dom');
var guid = require('./utils/guid');
var event = require('./utils/event');
var RAF = require('./utils/requestAnimationFrame.js');
window.requestAnimationFrame = RAF.requestAnimationFrame;
window.cancelAnimationFrame = RAF.cancelAnimationFrame;

module.exports = Marquee;

function Marquee(options) {
  var speed = options.speed || 200;
  var pauseOnHover = options.hasOwnProperty('pauseOnHover') && options.pauseOnHover === false ? options.pauseOnHover : true;
  var element = options.element;
  var $content = createContentElement(element);
  var elementWidth = dom.css($content, 'width');
  var width = options.contentWidth || textWidth(element);
  var pause = false;

  animate();

  if (pauseOnHover) {
    event.bind(element, 'mouseover', function () {
      pause = true;
    });

    event.bind(element, 'mouseout', function () {
      pause = false;
      animate();
    });
  }

  // private method
  function move() {
    var step = speed / 100;
    var x = getTranslateX($content);
    var value = x < -width ? elementWidth : x - step;
    setTranslateX($content, value);
  }

  function animate() {
    if (!pause) {
      move();
      requestAnimationFrame(animate);
    }
  }
}

function textWidth(elem) {
  var width = 0;
  var tmpElem = dom.createElement();
  dom.css(tmpElem, 'display', 'block');

  // text width may be long
  dom.css(tmpElem, 'width', '10000px');

  var text = dom.text(elem);
  var newElem = dom.createElement(text);
  var paddingLeft = dom.css(elem, 'padding-left');
  var paddinRight = dom.css(elem, 'padding-right');

  dom.css(newElem, 'white-space', 'nowrap');
  dom.appendTo(newElem, tmpElem);
  dom.appendTo(tmpElem, elem);
  width = newElem.offsetWidth + paddingLeft + paddinRight;
  elem.removeChild(tmpElem);
  return width;
}

function getTranslateX(element) {
  var key = element.style.transform ? 'transform' : '-webkit-transform';

  if (dom.css(element, key) === 'none') {
    return 0;
  }

  return dom.css(element, key).split(',')[4];
}

function setTranslateX(element, value) {
  var x = 'translateX(' + value + 'px)';
  var key = element.style.transform ? 'transform' : '-webkit-transform';
  dom.css(element, key, x);
}

function createContentElement(element) {
  var inner = element.innerHTML;
  var id = guid();
  element.innerHTML = '<div id="' + id + '"></div>';

  var $content = document.getElementById(id);
  $content.innerHTML = inner;
  return $content;
}

},{"./utils/dom":3,"./utils/event":4,"./utils/guid":5,"./utils/requestAnimationFrame.js":6}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function getCss(element, styleName) {
  var styleValue = window.getComputedStyle(element)[styleName];
  if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
    styleValue = parseInt(styleValue, 10);
  }

  return styleValue;
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }

  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (var key in obj) {
    var styleValue = obj[key];
    if (typeof styleValue === 'number') {
      styleValue = styleValue.toString() + 'px';
    }

    element.style[key] = styleValue;
  }

  return element;
}

var dom = {
  createElement: function createElement(string) {
    var element = document.createElement('span');
    element.innerHTML = string;
    return element;
  },

  text: function text(element) {
    return element.innerHTML.replace(/<[^>]*>/g, '');
  },

  appendTo: function appendTo(child, parent) {
    parent.appendChild(child);
  },

  addClass: function addClass(element, className) {
    var classes = element.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
    }

    element.className = classes.join(' ');
    return element;
  },

  removeClass: function removeClass(element, className) {
    var classes = element.className.split(' ');
    var index = classes.indexOf(className);
    if (index > -1) {
      classes.splice(index, 1);
    }

    element.className = classes.join(' ');
    return element;
  },

  css: function css(element, styleNameOrObject, styleValue) {
    if ((typeof styleNameOrObject === 'undefined' ? 'undefined' : _typeof(styleNameOrObject)) === 'object') {
      return setMultiCss(element, styleNameOrObject);
    } else {
      if (typeof styleValue === 'undefined') {
        return getCss(element, styleNameOrObject);
      } else {
        return setSingleCss(element, styleNameOrObject, styleValue);
      }
    }
  }

};

module.exports = dom;

},{}],4:[function(require,module,exports){
'use strict';

var event = {
  bind: function bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },

  unbind: function unbind(element, name, listener) {
    element.removeEventListener(name, listener, false);
  },

  once: function once(element, name, listener) {
    var that = this;
    var once = function once(e) {
      that.unbind(element, name, once);
      listener(e);
    };

    that.bind(element, name, once);
  }
};

module.exports = event;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

},{}],6:[function(require,module,exports){
'use strict';

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

var prefix;
//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (var i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break;
  }

  prefix = prefixes[i];
  requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
  cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
}

//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function requestAnimationFrame(callback, element) {
    var currTime = new Date().getTime();
    //为了使setTimteout的尽可能的接近每秒60帧的效果
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = function cancelAnimationFrame(id) {
    window.clearTimeout(id);
  };
}

//得到兼容各浏览器的API
module.exports = {
  requestAnimationFrame: requestAnimationFrame,
  cancelAnimationFrame: cancelAnimationFrame
};

},{}]},{},[1]);

'use strict';

var quee = new Marquee({
  element: document.getElementById('container-marquee'),
  speed: 100, // optional, default 200
  pauseOnHover: true, // optional, default true,

  // optional, Marquee 默认的内容宽度是所有文字的宽度
  // 如果容器里面的子元素有margin或者padding，则你要手动计算内容宽度
  contentWidth: 1000
});
