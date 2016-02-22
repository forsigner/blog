/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	angular.module('app', ['ui.router', 'foPopover', 'controllers', 'directives', 'services', 'filters']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise('/');
	  $stateProvider.state('home', {
	    url: '/',
	    templateUrl: 'views/home.html',
	    controller: 'HomeCtrl'
	  });
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = window.angular;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.ngRoute;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * @description  controllers
	 */

	'use strict';

	module.exports = window.angular.module('controllers', [])

	// @ngInject
	.controller('AppCtrl', function ($scope) {})

	// @ngInject
	.controller('HomeCtrl', function ($rootScope, $scope, $timeout, foPopover) {

	  $scope.open = function () {
	    debugger;
	    foPopover.open({
	      target: document.querySelector('#open'),
	      template: 'open.html',
	      position: 'bottom center',
	      scope: $scope
	    });
	  };

	  $scope.open2 = function () {
	    foPopover.open({
	      target: document.querySelector('#delete2'),
	      template: 'delete2.heml',
	      position: 'top center'
	    });
	  };

	  $scope.yes = function () {
	    console.log(1111111);
	    foPopover.close();
	  };

	  $scope.types = [
	  // {
	  //   name: 'Top Left',
	  //   position: 'top left'
	  //  },
	  {
	    name: 'Top Center',
	    position: 'top center'
	  }, {
	    name: 'Top Right',
	    position: 'top right'
	  }, {
	    name: 'Right Top',
	    position: 'right top'
	  }, {
	    name: 'Right Center',
	    position: 'right center'
	  }, {
	    name: 'Right Bottom',
	    position: 'right bottom'
	  }, {
	    name: 'Bottom Left',
	    position: 'bottom left'
	  }, {
	    name: 'Bottom Center',
	    position: 'bottom center'
	  }, {
	    name: 'Bottom Right',
	    position: 'bottom right'
	  }, {
	    name: 'Left Top',
	    position: 'left top'
	  }, {
	    name: 'Left Center',
	    position: 'left center'
	  }, {
	    name: 'Left Bottom',
	    position: 'left bottom'
	  }, {
	    name: 'Top Left Diagonal',
	    position: 'top left diagonal'
	  }, {
	    name: 'Top Right Diagonal',
	    position: 'top right diagonal'
	  }, {
	    name: 'Bottom Left Diagonal',
	    position: 'bottom left diagonal'
	  }, {
	    name: 'Bottom Right Diagonal',
	    position: 'bottom right diagonal'
	  }];

	  $timeout(function () {
	    new Select({
	      el: document.querySelector('.drop-select'),
	      className: 'select-theme-default'
	    });
	  }, 2);

	  $scope.select = function () {
	    console.log($scope.type);
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = angular.module('directives', [])

	// @ngInject
	.directive('test', function () {
	  return {};
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = window.angular.module('services', []).factory('test', function () {});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = window.angular.module('filters', []).filter('testFilter', function () {
	  return function () {
	    return 'filter';
	  };
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map