(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var niceBar = require('./main');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.niceBar = factory();
  }
})(function () {

  return niceBar;
});

},{"./main":9}],2:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {

  /**
   * get slider's new top
   * @param  {number} offsetY  a property from mouseEvent
   * @return {number} newTop slider's new top
   */
  function getNewTop(offsetY) {
    var newTop;

    if (offsetY < i.sliderY.height / 2) {
      newTop = 0;
    } else if (offsetY > i.railY.height - i.sliderY.height / 2) {
      newTop = i.railY.height - i.sliderY.height;
    } else {
      newTop = offsetY - i.sliderY.height / 2;
    }

    return newTop;
  }

  /**
   * update content box scrollTop
   * @param  {number} newTop      slider's newTop
   * @param  {number} originTop   slider's originTop
   * @return null
   */
  function updateContent(newTop, originTop) {
    var journey = newTop - originTop;
    var scrollTop = journey / i.ratioY;
    i.content.element.scrollTop += scrollTop;
    i.sumDeltaY = i.content.element.scrollTop;
  }

  /**
   * update slider's css top
   * @param  {number} newTop slider's new top
   * @return null
   */
  function updateSlider(newTop) {
    dom.css(i.sliderY.element, 'top', newTop);
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  /**
   * clickRailYHandler
   * @param  {object} e  evnet
   * @return null
   */
  function clickRailYHandler(e) {
    var originTop = dom.css(i.sliderY.element, 'top');
    var newTop = getNewTop(e.offsetY);

    updateSlider(newTop);
    updateContent(newTop, originTop);

    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailYHandler);
};

},{"../util/dom":10,"../util/event":11}],3:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {
  var originPageY;
  var originTop;
  var originScrollTop;
  var differenceHeight = i.railY.height - i.sliderY.height;
  var ratioY = i.ratioY;

  event.bind(i.sliderY.element, 'mousedown', function (e) {
    originPageY = e.pageY;
    originTop = dom.css(i.sliderY.element, 'top');
    originScrollTop = i.content.element.scrollTop;

    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

  /**
   * mouseMoveHandler
   * @param  {object} e event
   * @return null
   */
  function mouseMoveHandler(e) {
    i.showSliderY();

    i.sliderY.deltaY = 0;

    // update slider
    var newTop = e.pageY - originPageY + originTop;

    if (newTop <= 0) {
      newTop = 0;
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }

    i.sliderY.top = newTop;
    dom.css(i.sliderY.element, 'top', newTop);

    // udpate content
    var journey = newTop - originTop;
    var newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.content.element.scrollTop = newScrollTop;
    i.sumDeltaY = i.content.element.scrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    event.unbind(document, 'mousemove', mouseMoveHandler);

    i.hideSliderY();
  }
};

},{"../util/dom":10,"../util/event":11}],4:[function(require,module,exports){
'use strict';

var event = require('../util/event');

module.exports = function (i) {
  event.bind(i.container.element, 'mouseenter', function (e) {
    i.showSliderY();
  });

  event.bind(i.container.element, 'mouseleave', function (e) {
    i.hideSliderY();
  });
};

},{"../util/event":11}],5:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {

  function mouseWheelHandler(e) {
    // update slider
    i.sumDeltaY += e.deltaY;
    var newTop = 0;

    if (i.sumDeltaY * i.ratioY < 0) {
      newTop = 0;
      i.sliderY.deltaY = 0;
      i.sumDeltaY = 0;
    } else if (i.sumDeltaY * i.ratioY > i.railY.height - i.sliderY.height) {
      newTop = i.railY.height - i.sliderY.height;
      i.sumDeltaY = i.content.element.scrollHeight - i.content.element.clientHeight;
    } else {
      newTop = i.sumDeltaY * i.ratioY;
    }

    dom.css(i.sliderY.element, 'top', newTop);

    // update box
    var newScrollTop = 0;
    newScrollTop += i.sumDeltaY;
    i.content.element.scrollTop = newScrollTop;

    // i.content.element.scrollTop = i.content.element.scrollTop +  i.sumDeltaY;

    e.preventDefault();
    e.stopPropagation();
  }

  event.bind(i.content.element, 'wheel', mouseWheelHandler);
};

},{"../util/dom":10,"../util/event":11}],6:[function(require,module,exports){
'use strict';

module.exports = function (i) {
  // todo
};

},{}],7:[function(require,module,exports){
'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');
var hoverContainer = require('./event/hover-container');

module.exports = function (element, options) {
  var i = Object.create(instance);
  i.init(element, options);

  if (i.content.element.scrollHeight > element.clientHeight) {
    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
    hoverContainer(i);
  }
};

},{"./event/click-rail":2,"./event/drag-slider":3,"./event/hover-container":4,"./event/mouse-wheel":5,"./event/press-keyboard":6,"./instance":8}],8:[function(require,module,exports){
'use strict';

var dom = require('./util/dom');
var guid = require('./util/guid');

var instance = {
  init: function init(element, options) {
    if (options) {
      options = { theme: options.theme || 'light' };
    } else {
      options = { theme: 'light' };
    }

    var $content = createContentElement(element);
    var $railY = createRailYElement();
    var $sliderY = createSliderYElement();

    setTheme(element, options);

    dom.appendTo($railY, element);
    dom.appendTo($sliderY, element);

    this.sumDeltaY = 0;

    this.container = {
      element: element,
      width: element.clientWidth,
      height: element.clientHeight
    };

    this.ing = true;

    this.content = {
      deltaY: 0, // 增量
      element: $content,
      width: $content.clientWidth,
      height: $content.scrollHeight,
      scrollTop: $content.scrollTop
    };

    this.ratioX = this.container.width / this.content.width;
    this.ratioY = this.container.height / this.content.height;

    this.railX = { width: 400, height: '' };

    this.railY = {
      element: $railY,
      width: 400,
      height: this.container.height
    };

    this.sliderX = { width: 400, height: '' };

    this.sliderY = {
      deltaY: 0, // 增量
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.container.height * this.ratioY
    };

    dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');

    dom.css(this.container.element, {
      overflow: 'hidden',
      position: 'relative'
    });

    dom.css(this.content.element, {
      overflow: 'hidden',
      height: this.container.height
    });
  },

  showSliderY: function showSliderY() {
    dom.addClass(this.sliderY.element, 'fade-in');
    dom.removeClass(this.sliderY.element, 'fade-out');
  },

  hideSliderY: function hideSliderY() {
    dom.addClass(this.sliderY.element, 'fade-out');
    dom.removeClass(this.sliderY.element, 'fade-in');
  }

};

// ////////////////////////////////////////
function setTheme(element, optopns) {
  dom.addClass(element, 'theme-' + optopns.theme);
  dom.addClass(element, 'nice-bar');
}

function createSliderYElement() {
  return dom.createElement('<div class="nice-bar-slider-y"></div>');
}

function createRailYElement() {
  return dom.createElement('<div class="nice-bar-rail-y"></div>');
}

function createContentElement(element) {
  var inner = element.innerHTML;
  var id = guid();
  element.innerHTML = '<div id="' + id + '"></div>';

  var $content = document.getElementById(id);
  $content.innerHTML = inner;
  return $content;
}

module.exports = instance;

},{"./util/dom":10,"./util/guid":12}],9:[function(require,module,exports){
'use strict';

var init = require('./init');

module.exports = { init: init };

},{"./init":7}],10:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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
    var element = document.createElement('div');
    element.innerHTML = string;
    return element.firstElementChild;
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

},{}]},{},[1]);

(function() {
  "use strict";

  var str = '<a id="avatar" class="avatar" href="http://forsigner.com/" target="_blank" style="position: absolute;top: 20px;display: inline-block;left: 50%;margin-left:-30px;">' +
    '<img src="http://forsigner.com/images/avatar.jpg" alt="forsigner" title="go home" style="width: 60px; height: 60px;border-radius: 50%;">' +
    '</a>';

  var $div = document.createElement('div');
  $div.innerHTML = str;
  document.body.appendChild($div);


}());

'use strict';

var data = [{
  html_url: 'https://github.com/forsigner',
  login: 'forsigner',
  avatar_url: 'https://avatars.githubusercontent.com/u/2668081?v=3'
}, {
  login: 'mojombo',
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/mojombo',
  html_url: 'https://github.com/mojombo',
  followers_url: 'https://api.github.com/users/mojombo/followers',
  following_url: 'https://api.github.com/users/mojombo/following{/other_user}',
  gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
  organizations_url: 'https://api.github.com/users/mojombo/orgs',
  repos_url: 'https://api.github.com/users/mojombo/repos',
  events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
  received_events_url: 'https://api.github.com/users/mojombo/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'defunkt',
  id: 2,
  avatar_url: 'https://avatars.githubusercontent.com/u/2?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/defunkt',
  html_url: 'https://github.com/defunkt',
  followers_url: 'https://api.github.com/users/defunkt/followers',
  following_url: 'https://api.github.com/users/defunkt/following{/other_user}',
  gists_url: 'https://api.github.com/users/defunkt/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/defunkt/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/defunkt/subscriptions',
  organizations_url: 'https://api.github.com/users/defunkt/orgs',
  repos_url: 'https://api.github.com/users/defunkt/repos',
  events_url: 'https://api.github.com/users/defunkt/events{/privacy}',
  received_events_url: 'https://api.github.com/users/defunkt/received_events',
  type: 'User',
  site_admin: true
}, {
  login: 'pjhyett',
  id: 3,
  avatar_url: 'https://avatars.githubusercontent.com/u/3?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/pjhyett',
  html_url: 'https://github.com/pjhyett',
  followers_url: 'https://api.github.com/users/pjhyett/followers',
  following_url: 'https://api.github.com/users/pjhyett/following{/other_user}',
  gists_url: 'https://api.github.com/users/pjhyett/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/pjhyett/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/pjhyett/subscriptions',
  organizations_url: 'https://api.github.com/users/pjhyett/orgs',
  repos_url: 'https://api.github.com/users/pjhyett/repos',
  events_url: 'https://api.github.com/users/pjhyett/events{/privacy}',
  received_events_url: 'https://api.github.com/users/pjhyett/received_events',
  type: 'User',
  site_admin: true
}, {
  login: 'wycats',
  id: 4,
  avatar_url: 'https://avatars.githubusercontent.com/u/4?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/wycats',
  html_url: 'https://github.com/wycats',
  followers_url: 'https://api.github.com/users/wycats/followers',
  following_url: 'https://api.github.com/users/wycats/following{/other_user}',
  gists_url: 'https://api.github.com/users/wycats/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/wycats/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/wycats/subscriptions',
  organizations_url: 'https://api.github.com/users/wycats/orgs',
  repos_url: 'https://api.github.com/users/wycats/repos',
  events_url: 'https://api.github.com/users/wycats/events{/privacy}',
  received_events_url: 'https://api.github.com/users/wycats/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'ezmobius',
  id: 5,
  avatar_url: 'https://avatars.githubusercontent.com/u/5?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/ezmobius',
  html_url: 'https://github.com/ezmobius',
  followers_url: 'https://api.github.com/users/ezmobius/followers',
  following_url: 'https://api.github.com/users/ezmobius/following{/other_user}',
  gists_url: 'https://api.github.com/users/ezmobius/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/ezmobius/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/ezmobius/subscriptions',
  organizations_url: 'https://api.github.com/users/ezmobius/orgs',
  repos_url: 'https://api.github.com/users/ezmobius/repos',
  events_url: 'https://api.github.com/users/ezmobius/events{/privacy}',
  received_events_url: 'https://api.github.com/users/ezmobius/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'ivey',
  id: 6,
  avatar_url: 'https://avatars.githubusercontent.com/u/6?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/ivey',
  html_url: 'https://github.com/ivey',
  followers_url: 'https://api.github.com/users/ivey/followers',
  following_url: 'https://api.github.com/users/ivey/following{/other_user}',
  gists_url: 'https://api.github.com/users/ivey/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/ivey/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/ivey/subscriptions',
  organizations_url: 'https://api.github.com/users/ivey/orgs',
  repos_url: 'https://api.github.com/users/ivey/repos',
  events_url: 'https://api.github.com/users/ivey/events{/privacy}',
  received_events_url: 'https://api.github.com/users/ivey/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'evanphx',
  id: 7,
  avatar_url: 'https://avatars.githubusercontent.com/u/7?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/evanphx',
  html_url: 'https://github.com/evanphx',
  followers_url: 'https://api.github.com/users/evanphx/followers',
  following_url: 'https://api.github.com/users/evanphx/following{/other_user}',
  gists_url: 'https://api.github.com/users/evanphx/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/evanphx/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/evanphx/subscriptions',
  organizations_url: 'https://api.github.com/users/evanphx/orgs',
  repos_url: 'https://api.github.com/users/evanphx/repos',
  events_url: 'https://api.github.com/users/evanphx/events{/privacy}',
  received_events_url: 'https://api.github.com/users/evanphx/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'vanpelt',
  id: 17,
  avatar_url: 'https://avatars.githubusercontent.com/u/17?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/vanpelt',
  html_url: 'https://github.com/vanpelt',
  followers_url: 'https://api.github.com/users/vanpelt/followers',
  following_url: 'https://api.github.com/users/vanpelt/following{/other_user}',
  gists_url: 'https://api.github.com/users/vanpelt/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/vanpelt/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/vanpelt/subscriptions',
  organizations_url: 'https://api.github.com/users/vanpelt/orgs',
  repos_url: 'https://api.github.com/users/vanpelt/repos',
  events_url: 'https://api.github.com/users/vanpelt/events{/privacy}',
  received_events_url: 'https://api.github.com/users/vanpelt/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'wayneeseguin',
  id: 18,
  avatar_url: 'https://avatars.githubusercontent.com/u/18?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/wayneeseguin',
  html_url: 'https://github.com/wayneeseguin',
  followers_url: 'https://api.github.com/users/wayneeseguin/followers',
  following_url: 'https://api.github.com/users/wayneeseguin/following{/other_user}',
  gists_url: 'https://api.github.com/users/wayneeseguin/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/wayneeseguin/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/wayneeseguin/subscriptions',
  organizations_url: 'https://api.github.com/users/wayneeseguin/orgs',
  repos_url: 'https://api.github.com/users/wayneeseguin/repos',
  events_url: 'https://api.github.com/users/wayneeseguin/events{/privacy}',
  received_events_url: 'https://api.github.com/users/wayneeseguin/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'brynary',
  id: 19,
  avatar_url: 'https://avatars.githubusercontent.com/u/19?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/brynary',
  html_url: 'https://github.com/brynary',
  followers_url: 'https://api.github.com/users/brynary/followers',
  following_url: 'https://api.github.com/users/brynary/following{/other_user}',
  gists_url: 'https://api.github.com/users/brynary/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/brynary/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/brynary/subscriptions',
  organizations_url: 'https://api.github.com/users/brynary/orgs',
  repos_url: 'https://api.github.com/users/brynary/repos',
  events_url: 'https://api.github.com/users/brynary/events{/privacy}',
  received_events_url: 'https://api.github.com/users/brynary/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'kevinclark',
  id: 20,
  avatar_url: 'https://avatars.githubusercontent.com/u/20?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/kevinclark',
  html_url: 'https://github.com/kevinclark',
  followers_url: 'https://api.github.com/users/kevinclark/followers',
  following_url: 'https://api.github.com/users/kevinclark/following{/other_user}',
  gists_url: 'https://api.github.com/users/kevinclark/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/kevinclark/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/kevinclark/subscriptions',
  organizations_url: 'https://api.github.com/users/kevinclark/orgs',
  repos_url: 'https://api.github.com/users/kevinclark/repos',
  events_url: 'https://api.github.com/users/kevinclark/events{/privacy}',
  received_events_url: 'https://api.github.com/users/kevinclark/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'technoweenie',
  id: 21,
  avatar_url: 'https://avatars.githubusercontent.com/u/21?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/technoweenie',
  html_url: 'https://github.com/technoweenie',
  followers_url: 'https://api.github.com/users/technoweenie/followers',
  following_url: 'https://api.github.com/users/technoweenie/following{/other_user}',
  gists_url: 'https://api.github.com/users/technoweenie/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/technoweenie/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/technoweenie/subscriptions',
  organizations_url: 'https://api.github.com/users/technoweenie/orgs',
  repos_url: 'https://api.github.com/users/technoweenie/repos',
  events_url: 'https://api.github.com/users/technoweenie/events{/privacy}',
  received_events_url: 'https://api.github.com/users/technoweenie/received_events',
  type: 'User',
  site_admin: true
}, {
  login: 'macournoyer',
  id: 22,
  avatar_url: 'https://avatars.githubusercontent.com/u/22?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/macournoyer',
  html_url: 'https://github.com/macournoyer',
  followers_url: 'https://api.github.com/users/macournoyer/followers',
  following_url: 'https://api.github.com/users/macournoyer/following{/other_user}',
  gists_url: 'https://api.github.com/users/macournoyer/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/macournoyer/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/macournoyer/subscriptions',
  organizations_url: 'https://api.github.com/users/macournoyer/orgs',
  repos_url: 'https://api.github.com/users/macournoyer/repos',
  events_url: 'https://api.github.com/users/macournoyer/events{/privacy}',
  received_events_url: 'https://api.github.com/users/macournoyer/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'takeo',
  id: 23,
  avatar_url: 'https://avatars.githubusercontent.com/u/23?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/takeo',
  html_url: 'https://github.com/takeo',
  followers_url: 'https://api.github.com/users/takeo/followers',
  following_url: 'https://api.github.com/users/takeo/following{/other_user}',
  gists_url: 'https://api.github.com/users/takeo/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/takeo/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/takeo/subscriptions',
  organizations_url: 'https://api.github.com/users/takeo/orgs',
  repos_url: 'https://api.github.com/users/takeo/repos',
  events_url: 'https://api.github.com/users/takeo/events{/privacy}',
  received_events_url: 'https://api.github.com/users/takeo/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'Caged',
  id: 25,
  avatar_url: 'https://avatars.githubusercontent.com/u/25?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/Caged',
  html_url: 'https://github.com/Caged',
  followers_url: 'https://api.github.com/users/Caged/followers',
  following_url: 'https://api.github.com/users/Caged/following{/other_user}',
  gists_url: 'https://api.github.com/users/Caged/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/Caged/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/Caged/subscriptions',
  organizations_url: 'https://api.github.com/users/Caged/orgs',
  repos_url: 'https://api.github.com/users/Caged/repos',
  events_url: 'https://api.github.com/users/Caged/events{/privacy}',
  received_events_url: 'https://api.github.com/users/Caged/received_events',
  type: 'User',
  site_admin: true
}, {
  login: 'topfunky',
  id: 26,
  avatar_url: 'https://avatars.githubusercontent.com/u/26?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/topfunky',
  html_url: 'https://github.com/topfunky',
  followers_url: 'https://api.github.com/users/topfunky/followers',
  following_url: 'https://api.github.com/users/topfunky/following{/other_user}',
  gists_url: 'https://api.github.com/users/topfunky/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/topfunky/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/topfunky/subscriptions',
  organizations_url: 'https://api.github.com/users/topfunky/orgs',
  repos_url: 'https://api.github.com/users/topfunky/repos',
  events_url: 'https://api.github.com/users/topfunky/events{/privacy}',
  received_events_url: 'https://api.github.com/users/topfunky/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'anotherjesse',
  id: 27,
  avatar_url: 'https://avatars.githubusercontent.com/u/27?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/anotherjesse',
  html_url: 'https://github.com/anotherjesse',
  followers_url: 'https://api.github.com/users/anotherjesse/followers',
  following_url: 'https://api.github.com/users/anotherjesse/following{/other_user}',
  gists_url: 'https://api.github.com/users/anotherjesse/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/anotherjesse/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/anotherjesse/subscriptions',
  organizations_url: 'https://api.github.com/users/anotherjesse/orgs',
  repos_url: 'https://api.github.com/users/anotherjesse/repos',
  events_url: 'https://api.github.com/users/anotherjesse/events{/privacy}',
  received_events_url: 'https://api.github.com/users/anotherjesse/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'roland',
  id: 28,
  avatar_url: 'https://avatars.githubusercontent.com/u/28?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/roland',
  html_url: 'https://github.com/roland',
  followers_url: 'https://api.github.com/users/roland/followers',
  following_url: 'https://api.github.com/users/roland/following{/other_user}',
  gists_url: 'https://api.github.com/users/roland/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/roland/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/roland/subscriptions',
  organizations_url: 'https://api.github.com/users/roland/orgs',
  repos_url: 'https://api.github.com/users/roland/repos',
  events_url: 'https://api.github.com/users/roland/events{/privacy}',
  received_events_url: 'https://api.github.com/users/roland/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'lukas',
  id: 29,
  avatar_url: 'https://avatars.githubusercontent.com/u/29?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/lukas',
  html_url: 'https://github.com/lukas',
  followers_url: 'https://api.github.com/users/lukas/followers',
  following_url: 'https://api.github.com/users/lukas/following{/other_user}',
  gists_url: 'https://api.github.com/users/lukas/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/lukas/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/lukas/subscriptions',
  organizations_url: 'https://api.github.com/users/lukas/orgs',
  repos_url: 'https://api.github.com/users/lukas/repos',
  events_url: 'https://api.github.com/users/lukas/events{/privacy}',
  received_events_url: 'https://api.github.com/users/lukas/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'fanvsfan',
  id: 30,
  avatar_url: 'https://avatars.githubusercontent.com/u/30?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/fanvsfan',
  html_url: 'https://github.com/fanvsfan',
  followers_url: 'https://api.github.com/users/fanvsfan/followers',
  following_url: 'https://api.github.com/users/fanvsfan/following{/other_user}',
  gists_url: 'https://api.github.com/users/fanvsfan/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/fanvsfan/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/fanvsfan/subscriptions',
  organizations_url: 'https://api.github.com/users/fanvsfan/orgs',
  repos_url: 'https://api.github.com/users/fanvsfan/repos',
  events_url: 'https://api.github.com/users/fanvsfan/events{/privacy}',
  received_events_url: 'https://api.github.com/users/fanvsfan/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'tomtt',
  id: 31,
  avatar_url: 'https://avatars.githubusercontent.com/u/31?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/tomtt',
  html_url: 'https://github.com/tomtt',
  followers_url: 'https://api.github.com/users/tomtt/followers',
  following_url: 'https://api.github.com/users/tomtt/following{/other_user}',
  gists_url: 'https://api.github.com/users/tomtt/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/tomtt/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/tomtt/subscriptions',
  organizations_url: 'https://api.github.com/users/tomtt/orgs',
  repos_url: 'https://api.github.com/users/tomtt/repos',
  events_url: 'https://api.github.com/users/tomtt/events{/privacy}',
  received_events_url: 'https://api.github.com/users/tomtt/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'railsjitsu',
  id: 32,
  avatar_url: 'https://avatars.githubusercontent.com/u/32?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/railsjitsu',
  html_url: 'https://github.com/railsjitsu',
  followers_url: 'https://api.github.com/users/railsjitsu/followers',
  following_url: 'https://api.github.com/users/railsjitsu/following{/other_user}',
  gists_url: 'https://api.github.com/users/railsjitsu/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/railsjitsu/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/railsjitsu/subscriptions',
  organizations_url: 'https://api.github.com/users/railsjitsu/orgs',
  repos_url: 'https://api.github.com/users/railsjitsu/repos',
  events_url: 'https://api.github.com/users/railsjitsu/events{/privacy}',
  received_events_url: 'https://api.github.com/users/railsjitsu/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'nitay',
  id: 34,
  avatar_url: 'https://avatars.githubusercontent.com/u/34?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/nitay',
  html_url: 'https://github.com/nitay',
  followers_url: 'https://api.github.com/users/nitay/followers',
  following_url: 'https://api.github.com/users/nitay/following{/other_user}',
  gists_url: 'https://api.github.com/users/nitay/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/nitay/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/nitay/subscriptions',
  organizations_url: 'https://api.github.com/users/nitay/orgs',
  repos_url: 'https://api.github.com/users/nitay/repos',
  events_url: 'https://api.github.com/users/nitay/events{/privacy}',
  received_events_url: 'https://api.github.com/users/nitay/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'kevwil',
  id: 35,
  avatar_url: 'https://avatars.githubusercontent.com/u/35?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/kevwil',
  html_url: 'https://github.com/kevwil',
  followers_url: 'https://api.github.com/users/kevwil/followers',
  following_url: 'https://api.github.com/users/kevwil/following{/other_user}',
  gists_url: 'https://api.github.com/users/kevwil/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/kevwil/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/kevwil/subscriptions',
  organizations_url: 'https://api.github.com/users/kevwil/orgs',
  repos_url: 'https://api.github.com/users/kevwil/repos',
  events_url: 'https://api.github.com/users/kevwil/events{/privacy}',
  received_events_url: 'https://api.github.com/users/kevwil/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'KirinDave',
  id: 36,
  avatar_url: 'https://avatars.githubusercontent.com/u/36?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/KirinDave',
  html_url: 'https://github.com/KirinDave',
  followers_url: 'https://api.github.com/users/KirinDave/followers',
  following_url: 'https://api.github.com/users/KirinDave/following{/other_user}',
  gists_url: 'https://api.github.com/users/KirinDave/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/KirinDave/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/KirinDave/subscriptions',
  organizations_url: 'https://api.github.com/users/KirinDave/orgs',
  repos_url: 'https://api.github.com/users/KirinDave/repos',
  events_url: 'https://api.github.com/users/KirinDave/events{/privacy}',
  received_events_url: 'https://api.github.com/users/KirinDave/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'jamesgolick',
  id: 37,
  avatar_url: 'https://avatars.githubusercontent.com/u/37?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/jamesgolick',
  html_url: 'https://github.com/jamesgolick',
  followers_url: 'https://api.github.com/users/jamesgolick/followers',
  following_url: 'https://api.github.com/users/jamesgolick/following{/other_user}',
  gists_url: 'https://api.github.com/users/jamesgolick/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/jamesgolick/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/jamesgolick/subscriptions',
  organizations_url: 'https://api.github.com/users/jamesgolick/orgs',
  repos_url: 'https://api.github.com/users/jamesgolick/repos',
  events_url: 'https://api.github.com/users/jamesgolick/events{/privacy}',
  received_events_url: 'https://api.github.com/users/jamesgolick/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'atmos',
  id: 38,
  avatar_url: 'https://avatars.githubusercontent.com/u/38?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/atmos',
  html_url: 'https://github.com/atmos',
  followers_url: 'https://api.github.com/users/atmos/followers',
  following_url: 'https://api.github.com/users/atmos/following{/other_user}',
  gists_url: 'https://api.github.com/users/atmos/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/atmos/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/atmos/subscriptions',
  organizations_url: 'https://api.github.com/users/atmos/orgs',
  repos_url: 'https://api.github.com/users/atmos/repos',
  events_url: 'https://api.github.com/users/atmos/events{/privacy}',
  received_events_url: 'https://api.github.com/users/atmos/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'errfree',
  id: 44,
  avatar_url: 'https://avatars.githubusercontent.com/u/44?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/errfree',
  html_url: 'https://github.com/errfree',
  followers_url: 'https://api.github.com/users/errfree/followers',
  following_url: 'https://api.github.com/users/errfree/following{/other_user}',
  gists_url: 'https://api.github.com/users/errfree/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/errfree/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/errfree/subscriptions',
  organizations_url: 'https://api.github.com/users/errfree/orgs',
  repos_url: 'https://api.github.com/users/errfree/repos',
  events_url: 'https://api.github.com/users/errfree/events{/privacy}',
  received_events_url: 'https://api.github.com/users/errfree/received_events',
  type: 'Organization',
  site_admin: false
}, {
  login: 'mojodna',
  id: 45,
  avatar_url: 'https://avatars.githubusercontent.com/u/45?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/mojodna',
  html_url: 'https://github.com/mojodna',
  followers_url: 'https://api.github.com/users/mojodna/followers',
  following_url: 'https://api.github.com/users/mojodna/following{/other_user}',
  gists_url: 'https://api.github.com/users/mojodna/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/mojodna/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mojodna/subscriptions',
  organizations_url: 'https://api.github.com/users/mojodna/orgs',
  repos_url: 'https://api.github.com/users/mojodna/repos',
  events_url: 'https://api.github.com/users/mojodna/events{/privacy}',
  received_events_url: 'https://api.github.com/users/mojodna/received_events',
  type: 'User',
  site_admin: false
}, {
  login: 'bmizerany',
  id: 46,
  avatar_url: 'https://avatars.githubusercontent.com/u/46?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/bmizerany',
  html_url: 'https://github.com/bmizerany',
  followers_url: 'https://api.github.com/users/bmizerany/followers',
  following_url: 'https://api.github.com/users/bmizerany/following{/other_user}',
  gists_url: 'https://api.github.com/users/bmizerany/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/bmizerany/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/bmizerany/subscriptions',
  organizations_url: 'https://api.github.com/users/bmizerany/orgs',
  repos_url: 'https://api.github.com/users/bmizerany/repos',
  events_url: 'https://api.github.com/users/bmizerany/events{/privacy}',
  received_events_url: 'https://api.github.com/users/bmizerany/received_events',
  type: 'User',
  site_admin: false
}];

// light
(function() {
  var $container = document.getElementById('container-light');

  var content = '';
  var ul = document.getElementById('list-light');

  for (var i = 0, length = data.length; i < length; i++) {
    var li = '<li>' +
      '<a target="_blank" href="' + data[i].html_url + '">' +
      '<img class="avatar" src="' + data[i].avatar_url + '" />' +
      '<span class="nickname">' + data[i].login + '</span>' +
      '</a>' +
      '<li>';
    content += li;
  }

  ul.innerHTML = content;

  niceBar.init($container);
}());


// dark
(function() {
  var $container = document.getElementById('container-dark');

  var content = '';
  var ul = document.getElementById('list-dark');

  for (var i = 0, length = data.length; i < length; i++) {
    var li = '<li>' +
      '<a target="_blank" href="' + data[i].html_url + '">' +
      '<img class="avatar" src="' + data[i].avatar_url + '" />' +
      '<span class="nickname">' + data[i].login + '</span>' +
      '</a>' +
      '<li>';
    content += li;
  }

  ul.innerHTML = content;

  niceBar.init($container, {theme: 'dark'});
}());
