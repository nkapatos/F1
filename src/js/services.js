'use strict';

/* Services */
angular.module('F1Feed.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};

  ergastAPI.getStandings = function(year, round, standingsFor)
  {

    if (!round)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK'
    else
      var theUrl = 'http://ergast.com/api/f1/'+year+'/'+round+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK'

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getConstructors = function(year, constructor_id, filter)
  {

    if (!constructor_id)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/constructors.json?callback=JSON_CALLBACK';
    else if(!filter)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/constructors/'+constructor_id+'/status.json?callback=JSON_CALLBACK';
    else
      var theUrl = 'http://ergast.com/api/f1/'+year+'/constructors/'+constructor_id+'/'+filter+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getDrivers = function(year, driverID, filter)
  {
    if (!driverID)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/drivers.json?callback=JSON_CALLBACK';
    else if (!filter)
      var theUrl = 'http://ergast.com/api/f1/'+year+'/drivers/'+driverID+'/status.json?callback=JSON_CALLBACK';
    else
      var theUrl = 'http://ergast.com/api/f1/'+year+'/drivers/'+driverID+'/'+filter+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getDriverWikiLink = function(driverID)
  {
    var theUrl = 'http://ergast.com/api/f1/drivers/'+driverID+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getCircuits = function(year)
  {

    var theUrl = 'http://ergast.com/api/f1/'+year+'/circuits.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getNextEvent = function()
  {

    var theUrl = 'http://ergast.com/api/f1/current/next.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  return ergastAPI;

}).factory('wikiApiService', function($http)
{
  var wikiAPI = {};

  wikiAPI.getDriverInfo = function(link)
  {
    
    var wikiLink = link.split('wiki/');
    var wikiTitleClean = wikiLink[1];
    var theUrl = 'http://en.wikipedia.org/w/api.php?&action=query&titles='+wikiTitleClean+'&prop=revisions&rvprop=content&format=json&callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    })
  }

  return wikiAPI;
});