'use strict';

/**
 * @ngdoc overview
 * @name mcdatastormApp
 * @description
 * # mcdatastormApp
 *
 * Main module of the application.
 */
angular
  .module('mcdatastormApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/compare/:id', {
        templateUrl: 'views/compare.html',
        controller: 'CompareCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
