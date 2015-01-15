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
    $scope.comparedBusinesses = [];

    $scope.chartConfig = {
      title: 'Products',
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
      series: ['Store Rating', 'Local Average', 'CSO'],
      data: []
    };


    $scope.search = function(){
      yelpAPIFactory.search('McDonalds', $scope.location, function(data) {
        $scope.businesses = data.businesses;
        console.log($scope.businesses)
      });
    }
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
          x: target.location.city,
          // Normalize Yelp score
          y: [target.rating, avgRating, Math.floor(400*Math.random())/100],
        }

        $scope.chartData.data.push(pushed);
        console.log($scope.chartData);
      });

    }
  });
