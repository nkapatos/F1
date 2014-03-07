'use strict';

/* Services */
angular.module('F1Feed.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};

  ergastAPI.getStandings = function(year,round,standingsFor)
  {

    if (!round)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK'
    else
      var theUrl = 'http://ergast.com/api/f1/'+year+'/'+round+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK'

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  }

  return ergastAPI;
});