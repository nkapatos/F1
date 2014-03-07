'use strict';

/*

  # - CONTROLLER - DESCRIPTION
    - StandingsCtrl - Standings list for drivers and constructors.
                      Params for db query are year, round and a string
                      to determine which list to show (driver/constructor).

*/

/* Controllers */
angular.module('F1Feed.controllers', [])
.controller('StandingsCtrl', function($scope, ergastAPIservice, $routeParams)
{
  $scope.StandingsList = [];
  $scope.$routeParams  = $routeParams;

  var year         = $routeParams.year,
      round        = $routeParams.round,
      standingsFor = $routeParams.standingsFor;

  ergastAPIservice.getStandings(year, round, standingsFor).success(function (response)
  {
    if (standingsFor === 'driver')
      $scope.StandingsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    else
      $scope.StandingsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  });
})
.controller('ConstructorsCtrl', function($scope, ergastAPIservice, $routeParams)
{
  $scope.ConstructorsList = [];
  $scope.season           = '';
  $scope.constructor_id   = '';
  $scope.$routeParams     = $routeParams;

  var year           = $routeParams.year,
      constructor_id = $routeParams.constructor_id,
      filter         = $routeParams.filter;

  ergastAPIservice.getConstructors(year, constructor_id, filter).success(function (response)
  {
    if (!constructor_id)
      $scope.ConstructorsList = response.MRData.ConstructorTable.Constructors;
    
    if(constructor_id)
    {
      $scope.constructor_id = constructor_id;
      $scope.year = year;
      switch (filter)
      {
        case 'circuits':
          $scope.ConstructorsList = response.MRData.CircuitTable.Circuits;
          break;

        case 'drivers':
          $scope.ConstructorsList = response.MRData.DriverTable.Drivers;
          break;

        case 'grid':
          $scope.ConstructorsList = response.MRData.StatusTable.Status;
          break;

        case 'results':
          $scope.ConstructorsList = response.MRData.RaceTable.Races;
          break;

        case 'fastest':
          $scope.ConstructorsList = response.MRData.StatusTable.Status;
          break;

        case 'status':
        default:
          $scope.ConstructorsList = response.MRData.StatusTable.Status;
          break;
      }
    };

  });

});