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

	angular.module('app', ['ui.router', 'foModal', 'controllers', 'directives', 'services', 'filters']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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
	.controller('AppCtrl', function () {})

	// @ngInject
	.controller('HomeCtrl', function ($scope, $rootScope, foModal, $injector) {

	  $scope.open = function () {
	    foModal.open({
	      templateUrl: 'modal.html',
	      // templateUrl: 'views/modal2.html',
	      controller: 'myModalCtrl as vm'
	    });
	  };

	  // controllerAs: 'vm',
	  // scope: $scope,
	  // id: 'hello',
	  // class: 'hello'
	  // animation: true,
	  // overlay: true,
	  // showClose: false,
	  // closeByOverlay: true,
	  // fixBody: false,
	  $rootScope.close = function () {
	    foModal.close('hello');
	    console.log('close');
	  };
	})

	// @ngInject
	.controller('myModalCtrl', function ($scope) {
	  var vm = this;
	  $scope.yes = function () {
	    console.log('yes!');
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