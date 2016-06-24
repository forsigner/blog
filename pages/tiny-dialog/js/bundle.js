(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var dialog = require('./tiny-dialog');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.TinyDialog = factory();
  }
})(function () {

  return dialog;
});

},{"./tiny-dialog":3}],2:[function(require,module,exports){
'use strict';

var utils = require('./utils');
module.exports = {
  closedCallbacks: [],
  openedCallbacks: [],
  isOpened: false,

  init: function init(options) {
    checkOptions(options);
    this.templateId = options.templateId;
    this.$layer = createLayerElement();
    this.$content = createContentElement();
    this.$dialog = createDialogElement();
    this.$dialog.appendChild(this.$content);
    this.$dialog.appendChild(this.$layer);
  },

  open: function open() {
    var that = this;
    var contentFragment = getContentFragment(this.templateId);
    this.$content.innerHTML = '';
    this.$content.appendChild(contentFragment);
    document.body.appendChild(this.$dialog);

    setPosition(this);

    utils.addClass(this.$dialog, 'tiny-open');
    // utils.removeClass(this.$content, 'animate-close');
    utils.addClass(this.$content, 'tiny-dialog-animate-open');

    var nodeList = document.querySelectorAll('.tiny-dialog-close');
    var $closeBtns = [].slice.call(nodeList);
    utils.forEach($closeBtns, function ($btn) {
      utils.bind($btn, 'click', that.close.bind(that));
    });

    invokeCallbacks(this, 'opened');
  },

  close: function close() {
    if (this.$dialog && utils.hasClass(this.$dialog, 'tiny-open')) {
      utils.removeClass(this.$dialog, 'tiny-open');
      utils.removeClass(this.$content, 'tiny-dialog-animate-open');
      // utils.addClass(this.$content, 'animate-close');
      // setTimeout(function () {
      document.body.removeChild(this.$dialog);
      // }.bind(this), 300);
    }

    invokeCallbacks(this, 'closed');
  },

  on: function on(eventType, cb) {
    var types = ['closed', 'opened'];
    if (types.indexOf(eventType) < 0) {
      return;
    }

    this[eventType + 'Callbacks'].push(cb);
  }
};

function invokeCallbacks(ctx, eventType) {
  utils.forEach(ctx[eventType + 'Callbacks'], function (cb) {
    cb();
  });
}

function getContentFragment(templateId) {
  var $content = document.getElementById(templateId);
  var elem = utils.createElement($content.innerHTML, true);
  var nodes = [].slice.call(elem);
  var docFrag = document.createDocumentFragment();

  nodes.forEach(function (node) {
    if (node.nodeType === 1) {
      docFrag.appendChild(node);
    }
  });

  return docFrag;
}

function createLayerElement() {
  var str = '<div class="tiny-dialog-layer"></div>';
  return utils.createElement(str);
}

function createContentElement() {
  var str = '<div class="tiny-dialog-content"></div>';
  return utils.createElement(str);
}

function createDialogElement() {
  var str = '<div class="tiny-dialog"></div>';
  return utils.createElement(str);
}

function setPosition(ctx) {
  var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var rectContent = ctx.$content.getBoundingClientRect();
  var rectLayer = ctx.$layer.getBoundingClientRect();
  var rectBody = document.body.getBoundingClientRect();
  var left = rectLayer.left + x;
  var top = rectLayer.top + y;
  top = top - rectContent.height / 2 + rectLayer.height / 2;
  left = left - rectContent.width / 2 + rectBody.width / 2;

  ctx.$content.style.position = 'absolute';
  ctx.$content.style.top = top + 'px';
  ctx.$content.style.left = left + 'px';
}

function checkOptions(options) {
  if (!options.templateId) throw new Error('templateId is required');
}

},{"./utils":4}],3:[function(require,module,exports){
'use strict';

var instance = require('./instance');;

module.exports = {
  create: create
};

function create(options) {
  var i = Object.create(instance);
  i.init(options);
  return i;
}

},{"./instance":2}],4:[function(require,module,exports){
'use strict';

var utils = {
  forEach: function forEach(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      fn(arr[i], i);
    }
  },

  map: function map(arr, fn) {
    var rarr = [];
    for (var i = 0; i < arr.length; i++) {
      rarr[i] = fn(arr[i], i);
    }

    return rarr;
  },

  createElement: function createElement(string, isNodes) {
    var div = document.createElement('div');
    div.innerHTML = string;
    return isNodes === true ? div.childNodes : div.firstElementChild;
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

  hasClass: function hasClass(element, className) {
    var classes = element.className.split(' ');
    var index = classes.indexOf(className);
    return index > -1;
  },

  bind: function bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },

  inViewport: function inViewport(elem) {
    var w = window;
    var d = document;
    var winWidth = w.innerWidth || d.documentnode.clientWidth || d.body.clientWidth;
    var winHeight = w.innerHeight || d.documentnode.clientHeight || d.body.clientHeight;

    var box = elem.getBoundingClientRect();
    return box.top < winHeight && box.left > 0 && box.left < winWidth;
  },

  isScrollToBottom: function isScrollToBottom(distance) {
    var html = document.documentElement;
    var body = document.body;
    var scrollTop = body.scrollTop;
    var winHeight = document.documentElement.clientHeight;
    var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return scrollTop + winHeight > docHeight - distance;
  }

};

module.exports = utils;

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $btn = document.getElementById('open');
var i = TinyDialog.create({
  templateId: 'dialog'
});

$btn.addEventListener('click', function () {
  i.open();
}, false);

i.on('closed', function () {
  console.log('closed~~~~~1');
});

i.on('opened', function () {
  console.log('opened~~~~~');
});

},{}]},{},[1]);
