'use strict';

describe('Service: yelpAPI', function () {

  // load the service's module
  beforeEach(module('mcdatastormApp'));

  // instantiate service
  var yelpAPI;
  beforeEach(inject(function (_yelpAPI_) {
    yelpAPI = _yelpAPI_;
  }));

  it('should do something', function () {
    expect(!!yelpAPI).toBe(true);
  });

});
