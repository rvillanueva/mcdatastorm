"use strict";angular.module("mcdatastormApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/compare/:id",{templateUrl:"views/compare.html",controller:"CompareCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("mcdatastormApp").controller("MainCtrl",["$scope","yelpAPIFactory",function(a,b){a.location="White Plains",a.businesses=[],a.search=function(){b.search("McDonalds",a.location,function(b){a.businesses=b.businesses,console.log(a.businesses)})}}]),angular.module("mcdatastormApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("mcdatastormApp").factory("yelpAPIFactory",["$http",function(a){function b(a,b){for(var c="",d=a;d>0;--d)c+=b[Math.round(Math.random()*(b.length-1))];return c}var c="KJHbaDr-KjZ1FiX6DFqPiE4jNZI",d="GaTyTLFt7LVbHmjDjQkvLujy2MI";return{search:function(e,f,g){var h="http://api.yelp.com/v2/search",i="GET",j={callback:"angular.callbacks._0",location:f,term:e,oauth_consumer_key:"GcB4SngYwGokoEd4vofytQ",oauth_token:"LOtGHpo-ADbSyql26pdxayChpq7yuIze",oauth_signature_method:"HMAC-SHA1",oauth_timestamp:(new Date).getTime(),oauth_nonce:b(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")},k=oauthSignature.generate(i,h,j,c,d,{encodeSignature:!1});return j.oauth_signature=k,a.jsonp(h,{params:j}).success(g)},searchId:function(e,f){var g="http://api.yelp.com/v2/business/"+e,h="GET",i={callback:"angular.callbacks._0",oauth_consumer_key:"GcB4SngYwGokoEd4vofytQ",oauth_token:"LOtGHpo-ADbSyql26pdxayChpq7yuIze",oauth_signature_method:"HMAC-SHA1",oauth_timestamp:(new Date).getTime(),oauth_nonce:b(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")},j=oauthSignature.generate(h,g,i,c,d,{encodeSignature:!1});return i.oauth_signature=j,a.jsonp(g,{params:i}).success(f)},searchCoord:function(e,f,g){var h="http://api.yelp.com/v2/search",i="GET",j={callback:"angular.callbacks._0",cll:e.latitude+","+e.longitude,term:f,oauth_consumer_key:"GcB4SngYwGokoEd4vofytQ",oauth_token:"LOtGHpo-ADbSyql26pdxayChpq7yuIze",oauth_signature_method:"HMAC-SHA1",oauth_timestamp:(new Date).getTime(),oauth_nonce:b(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")},k=oauthSignature.generate(i,h,j,c,d,{encodeSignature:!1});return j.oauth_signature=k,a.jsonp(h,{params:j}).success(g)}}}]),angular.module("mcdatastormApp").controller("CompareCtrl",["$scope","$routeParams","yelpAPIFactory",function(a,b,c){a.params=b,a.targetId=a.params.id,a.target,a.businesses=[],c.searchId(a.params.id,function(b){a.target=b,console.log(a.target)}),a.compare=function(){c.searchId(a.params.id,function(b){a.target=b,console.log(a.target)}),c.searchCoord(a.target.location.coordinate,"fast food",function(b){a.businesses=b.business,console.log(a.businesses)})}}]);