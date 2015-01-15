'use strict';

/**
 * @ngdoc service
 * @name mcdatastormApp.yelpAPI
 * @description
 * # yelpAPI
 * Factory in the mcdatastormApp.
 */
angular.module('mcdatastormApp')
  .factory('yelpAPIFactory', function ($http) {
    // Service logic
    // ...

    var jsonCallNum = 0;

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

    var consumerSecret = 'KJHbaDr-KjZ1FiX6DFqPiE4jNZI'; //Consumer Secret
    var tokenSecret = 'GaTyTLFt7LVbHmjDjQkvLujy2MI'; //Token Secret

    // Public API here
    return {
      search: function(name, location, callback) {
        var url = 'http://api.yelp.com/v2/search';
        var method = 'GET';
        var params = {
          callback: 'angular.callbacks._' + jsonCallNum,
          location: location,
          term: name,
          oauth_consumer_key: 'GcB4SngYwGokoEd4vofytQ', //Consumer Key
          oauth_token: 'LOtGHpo-ADbSyql26pdxayChpq7yuIze', //Token
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        };

        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;

        jsonCallNum ++

        return $http.jsonp(url, {params: params}).success(callback);
      },
      searchId: function(name, callback) {

      var url = 'http://api.yelp.com/v2/business/' + name;
      var method = 'GET';
      var params = {
        callback: 'angular.callbacks._' + jsonCallNum,
        oauth_consumer_key: 'GcB4SngYwGokoEd4vofytQ', //Consumer Key
        oauth_token: 'LOtGHpo-ADbSyql26pdxayChpq7yuIze', //Token
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      };

        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;

        jsonCallNum ++;

        return $http.jsonp(url, {params: params}).success(callback);
      },
      searchCoord: function(coordinates, name, callback) {
        var url = 'http://api.yelp.com/v2/search';
        var method = 'GET';
        var params = {
          callback: 'angular.callbacks._' + jsonCallNum,
          ll: coordinates.latitude + ',' + coordinates.longitude,
          term: name,
          oauth_consumer_key: 'GcB4SngYwGokoEd4vofytQ', //Consumer Key
          oauth_token: 'LOtGHpo-ADbSyql26pdxayChpq7yuIze', //Token
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        };
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;

        jsonCallNum ++;

        return $http.jsonp(url, {params: params}).success(callback);
      }
    }
});
