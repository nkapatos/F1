'use strict';

/* Services */
angular.module('F1Feed.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};
  var theUrl;

  ergastAPI.getStandings = function(year, round, standingsFor)
  {
    if (!round)
      theUrl = 'http://ergast.com/api/f1/'+year+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK';
    else
      theUrl = 'http://ergast.com/api/f1/'+year+'/'+round+'/'+standingsFor+'Standings.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getConstructors = function(year, constructor_id, filter)
  {

    if (!constructor_id)
      theUrl = 'http://ergast.com/api/f1/'+year+'/constructors.json?callback=JSON_CALLBACK';
    else if(!filter)
      theUrl = 'http://ergast.com/api/f1/'+year+'/constructors/'+constructor_id+'/status.json?callback=JSON_CALLBACK';
    else
      theUrl = 'http://ergast.com/api/f1/'+year+'/constructors/'+constructor_id+'/'+filter+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getDrivers = function(year, driverID, filter)
  {
    if (!driverID)
      theUrl = 'http://ergast.com/api/f1/'+year+'/drivers.json?callback=JSON_CALLBACK';
    else if (!filter)
      theUrl = 'http://ergast.com/api/f1/'+year+'/drivers/'+driverID+'/status.json?callback=JSON_CALLBACK';
    else
      theUrl = 'http://ergast.com/api/f1/'+year+'/drivers/'+driverID+'/'+filter+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getDriverWikiLink = function(driverID)
  {
    theUrl = 'http://ergast.com/api/f1/drivers/'+driverID+'.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getCircuits = function(year)
  {

    theUrl = 'http://ergast.com/api/f1/'+year+'/circuits.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getNextEvent = function()
  {

    theUrl = 'http://ergast.com/api/f1/current/next.json?callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getPrevEventResults = function()
  {

    theUrl = 'http://ergast.com/api/f1/current/last/results.json?limit=3&callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getTopTwoConstructors = function()
  {

    theUrl = 'http://ergast.com/api/f1/current/constructorstandings.json?limit=2&callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  ergastAPI.getTopTwoDrivers = function()
  {

    theUrl = 'http://ergast.com/api/f1/current/driverstandings.json?limit=2&callback=JSON_CALLBACK';

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
    var theUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=content&rvlimit=1&rvparse=&rvsection=0&rvcontentformat=text%2Fplain&titles='+wikiTitleClean+'&callback=JSON_CALLBACK';

    return $http({
      method: 'JSONP',
      url: theUrl
    });
  };

  return wikiAPI;
});