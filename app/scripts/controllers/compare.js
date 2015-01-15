'use strict';

/**
 * @ngdoc function
 * @name mcdatastormApp.controller:CompareCtrl
 * @description
 * # CompareCtrl
 * Controller of the mcdatastormApp
 */
angular.module('mcdatastormApp')
  .controller('CompareCtrl', function ($scope, $routeParams, yelpAPIFactory) {
    $scope.params = $routeParams
    $scope.targetId = $scope.params.id
    $scope.target = {
      location: {
        coordinate: {
          latitude: 41.0298805,
          longitude: -73.7616272
        }
      }
    }
    $scope.avgRating;
    $scope.comparisons = []
    $scope.compare = function(){
      yelpAPIFactory.searchCoord($scope.target.location.coordinate, 'fast food', function(info) {
        $scope.comparisons = info.businesses;
        console.log($scope.comparisons);
        var totalRating = 0;
        for(var i=0; i<$scope.comparisons.length; i++){
          totalRating += $scope.comparisons[i]['rating'];
        }
        $scope.avgRating = totalRating/$scope.comparisons.length;
        console.log(totalRating);
      });



    }
    $scope.searchId = function(){
      yelpAPIFactory.searchId($scope.params.id, function(data) {
        $scope.target = data;
        console.log($scope.target);
        $scope.compare();
      });
    };



    $scope.searchId();
  });
