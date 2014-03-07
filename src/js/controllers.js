'use strict';

/* Controllers */

angular.module('F1Feed.controllers', []) 
.controller('StandingsCtrl', function($scope, ergastAPIservice, $routeParams)
{
  $scope.StandingsList = [];
  $scope.$routeParams        = $routeParams;

  var year         = $routeParams.year,
      round        = $routeParams.round,
      standingsFor = $routeParams.standingsFor;

  ergastAPIservice.getStandings(year, round, standingsFor).success(function (response)
  {
      $scope.StandingsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});