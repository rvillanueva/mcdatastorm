'use strict';

/**
 * @ngdoc function
 * @name mcdatastormApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mcdatastormApp
 */
angular.module('mcdatastormApp')
  .controller('MainCtrl', function ($scope, yelpAPIFactory) {
    $scope.location = 'White Plains';
    $scope.businesses = [];
    $scope.search = function(){
      yelpAPIFactory.search('McDonalds', $scope.location, function(data) {
        $scope.businesses = data.businesses;
        console.log($scope.businesses)
      });
    }
  });
