'use strict';

// Declare app level module which depends on filters, and services
angular.module('F1Feed', [
  'ngRoute',
  'F1Feed.controllers',
  'F1Feed.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/seasons', {templateUrl: 'partials/seasons.tpl.html', controller: 'SeasonsCtrl'});
  $routeProvider.when('/drivers', {templateUrl: 'partials/drivers.tpl.html', controller: 'DriversCtrl'});
  $routeProvider.when('/results', {templateUrl: 'partials/results.tpl.html', controller: 'ResultsCtrl'});
  $routeProvider.otherwise({redirectTo: '/seasons'});
}]);
