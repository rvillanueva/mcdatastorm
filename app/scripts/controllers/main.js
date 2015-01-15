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
    $scope.location = 'Chicago';
    $scope.businesses = [];
    $scope.comparedBusinesses = [];

    $scope.chartConfig = {
      title: 'Store Comparison',
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        //could be 'left, right'
        position: 'right'
      }
    };

    $scope.chartData = {
      series: ['Store Rating', 'Local Average', 'Difference'],
      data: []
    };


    $scope.search = function(){
      yelpAPIFactory.search('McDonalds', $scope.location, function(data) {
        $scope.businesses = data.businesses;
        console.log($scope.businesses)
      });
    }

    $scope.comparedNum = 1;

    $scope.compare = function(target){
      console.log(target.location)
      var coordinates = target.location.coordinate;
      var avgRating = 0;
      yelpAPIFactory.searchCoord(coordinates, 'fast food', function(info) {
        $scope.comparisons = info.businesses;
        console.log($scope.comparisons);
        var totalRating = 0;
        for(var i=0; i<$scope.comparisons.length; i++){
          totalRating += $scope.comparisons[i]['rating'];
        }
        var avgRating = totalRating/$scope.comparisons.length;
        console.log(avgRating);
        var pushed = {
          x: $scope.comparedNum + '. ' + target.location.city,
          // Normalize Yelp score
          y: [target.rating, avgRating, Math.floor((target.rating-avgRating)*1000)/1000]
        }


        $scope.chartData.data.push(pushed);
        $scope.comparedNum ++;
        console.log($scope.chartData);
      });

    }
  });
