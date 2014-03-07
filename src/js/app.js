'use strict';

// Declare app level module which depends on filters, and services
angular.module('F1Feed', [
  'ngRoute',
  'F1Feed.controllers',
  'F1Feed.services'
]).
config(['$routeProvider', function($routeProvider)
{
  /*
    Get Standings
    Structure = /year/round/standingsfor
              = /2008/5/driverStanding
              = /2009/constructorStandings
              = /current/6/driverStandings
  */
  $routeProvider.when('/standings/:year/:standingsFor',
  {
    controller: 'StandingsCtrl',
    templateUrl: function(params) { return 'partials/' + params.standingsFor + 'Standings.tpl.html' }
  });

  $routeProvider.when('/standings/:year/:round/:standingsFor',
  {
    controller: 'StandingsCtrl',
    templateUrl: function(params) { return 'partials/' + params.standingsFor + 'Standings.tpl.html' }
  });

  $routeProvider.when('/seasons', {templateUrl: 'partials/seasons.tpl.html', controller: 'SeasonsCtrl'});
  $routeProvider.when('/results', {templateUrl: 'partials/results.tpl.html', controller: 'ResultsCtrl'});
  $routeProvider.otherwise({redirectTo: '/seasons'});
}]);
