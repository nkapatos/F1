'use strict';

/* Services */
angular.module('F1Feed.services', []).
factory('ergastAPIservice', function($http) {

  var ergastAPI = {};

  ergastAPI.getDrivers = function() {
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK'
    });
  }

  return ergastAPI;
});