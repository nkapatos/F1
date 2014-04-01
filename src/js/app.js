'use strict';

// Declare app level module which depends on filters, and services
angular.module('F1Feed',
[
  'ngRoute',
  'F1Feed.controllers',
  'F1Feed.services',
  'ngSanitize'
]);

// Routes Configuration
angular.module('F1Feed').config(['$routeProvider', function($routeProvider)
{
  /*
    route patterns for Standings
    Structure = /year/round/standingsfor
              = /2008/5/driverStanding
              = /2009/constructorStandings
              = /current/6/driverStandings
  */
  $routeProvider.when('/standings/:year/:standingsFor',
  {
    controller:  'StandingsCtrl',
    templateUrl: function(params) { return 'partials/' + params.standingsFor + 'Standings.tpl.html'; }
  });

  $routeProvider.when('/standings/:year/:round/:standingsFor',
  {
    controller:  'StandingsCtrl',
    templateUrl: function(params) { return 'partials/' + params.standingsFor + 'Standings.tpl.html'; }
  });

  /*
    Route patterns for Constructors
    Structure = /year/constructors
              = /year/constructor/constructor_id
              = /year/constructor/constructor_id/circuits
              = /year/constructor/constructor_id/drivers
              = /year/constructor/constructor_id/grid
              = /year/constructor/constructor_id/results
              = /year/constructor/constructor_id/fastest
              = /year/constructor/constructor_id/status
  */
  $routeProvider.when('/:year/constructors',
  {
    controller:  'ConstructorsCtrl',
    templateUrl: 'partials/constructorsList.tpl.html'
  });

  $routeProvider.when('/:year/constructor/:constructor_id',
  {
    controller:  'ConstructorsCtrl',
    templateUrl: 'partials/constructorDetails.tpl.html'
  });

  $routeProvider.when('/:year/constructor/:constructor_id/:filter',
  {
    controller:  'ConstructorsCtrl',
    templateUrl: 'partials/constructorDetails.tpl.html'
  });

  /*
    Route patterns for drivers
    Structure = /year/drivers
              = /year/driver/driverID
              = /year/driver/driverID/status
  */
  $routeProvider.when('/info/:year/drivers',
  {
    controller:  'DriversCtrl',
    templateUrl: 'partials/drivers.tpl.html'
  });

  $routeProvider.when('/info/:year/driver/:driverID',
  {
    controller:  'DriversCtrl',
    templateUrl: 'partials/driverDetails.tpl.html'
  });

  /*
    Route patterns for circuits
    Structure = /year/constructors
  */
  $routeProvider.when('/info/:year/circuits',
  {
    controller:  'CircuitsCtrl',
    templateUrl: 'partials/circuits.tpl.html'
  });

  // Home - Dashboard
  $routeProvider.when('/',
  {
    controller:  'DashboardCtrl',
    templateUrl: 'partials/dashboard.tpl.html'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
