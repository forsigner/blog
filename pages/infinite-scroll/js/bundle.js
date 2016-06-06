(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

exports = module.exports = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var infiniteScroll = require('./infinite-scroll');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.InfiniteScroll = factory();
  }
})(function () {

  return infiniteScroll;
});

},{"./infinite-scroll":3}],3:[function(require,module,exports){
'use strict';

var merge = require('utils-merge');
var utils = require('./utils');

module.exports = InfiniteScroll;

function InfiniteScroll(opt) {
  var defaultConfig = {
    distance: 100,
    scrollTarget: window,
    itemKey: 'item',
    fetching: true, // data fetching
    noMore: false,
    initalRender: true
  };

  var newOpt = merge(defaultConfig, opt);

  for (var i in newOpt) {
    if (newOpt.hasOwnProperty(i)) {
      this[i] = newOpt[i];
    }
  }

  this.tpl = this.containerElement.innerHTML;
}

InfiniteScroll.prototype.loadMore = function (fn) {
  var that = this;
  that.fetching = true;

  checkLoading(that.loadingElement, this.fetching, this.noMore);

  var cb = function cb(result) {
    that.noMore = result.noMore;
    render(result.data, that);
    var lastElement = that.containerElement.lastChild;
    if (utils.inViewport(lastElement)) {
      fn(cb);
    }
  };

  fn(cb);

  // scroll
  utils.bind(this.scrollTarget, 'scroll', handler.bind(this));

  function handler() {
    var that = this;
    checkLoading(this.loadingElement, this.fetching, this.noMore);

    if (!utils.isScrollToBottom(this.distance) || this.fetching || this.noMore) {
      return;
    }

    that.fetching = true;

    fn(function (result) {
      that.noMore = result.noMore;
      render(result.data, that);
    });
  }

  return this;
};

/**
 * private method
 */
function render(data, that) {
  that.fetching = false;

  if (that.noMore && data.length === 0) {
    checkLoading(that.loadingElement, that.fetching, that.noMore);
    return;
  }

  checkLoading(that.loadingElement, that.fetching, that.noMore);
  checkNoMore(that.noMoreElement, that.noMore);

  var content = renderTpl(data, that.tpl);
  var elem = utils.createElement(content);
  var nodes = [].slice.call(elem);

  if (that.initalRender) {
    that.containerElement.innerHTML = '';
    that.containerElement.style.display = 'block';
  }

  appendNodes(nodes, that);
  that.initalRender = false;
}

function checkLoading(loadingElement, fetching, noMore) {
  if (noMore) {
    return loadingElement.style.display = 'none';
  }

  loadingElement.style.display = fetching ? 'block' : 'none';
}

function checkNoMore(noMoreElement, noMore) {
  noMoreElement.style.display = noMore ? 'block' : 'none';
}

function getKeys(tpl) {
  var reg = /\{\{([^}]+)\}\}/g;
  var result = tpl.match(reg);

  return utils.map(result, function (item) {
    item = item.replace(/[({{)|(}})]/g, '');
    return item;
  });
}

function getValue(item, key) {
  key = key.replace(/(.*)\./, 'item.');
  return eval(key) ? eval(key) : '';
}

function renderTpl(data, tpl) {
  var content = '';
  var keys = getKeys(tpl);

  utils.forEach(data, function (item) {
    var itemTpl = tpl;

    utils.forEach(keys, function (key) {
      var reg = new RegExp('{{' + key + '}}', 'g');
      var value = getValue(item, key);
      itemTpl = itemTpl.replace(reg, value);
    });

    content += itemTpl;
  });

  return content;
}

function appendNodes(nodes, that) {
  var docFrag = document.createDocumentFragment();
  nodes.forEach(function (node) {
    if (node.nodeType === 1) {
      docFrag.appendChild(node);
    }
  });

  that.containerElement.appendChild(docFrag);
}

},{"./utils":4,"utils-merge":1}],4:[function(require,module,exports){
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

  createElement: function createElement(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    return div.childNodes;
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

},{}]},{},[2]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var page = 1;
var perPage = 30;

var i = new InfiniteScroll({
  distance: 100,
  scrollTarget: window,
  itemKey: 'i',
  containerElement: document.getElementById('container'),
  loadingElement: document.getElementById('loading'),
  noMoreElement: document.getElementById('no-more')
});

i.loadMore(function (cb) {
  var url = 'https://api.github.com/users/forsigner/repos?page=' + page + '&per_page=' + perPage;

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    page++;
    setTimeout(function () {
      var noMore = data.length < perPage ? true : false;
      cb({ data: data, noMore: noMore });
    }, 1000);
  });
});

},{}]},{},[1]);
