'use strict';

/*

  # - CONTROLLER       - DESCRIPTION
    - MainCtrl         - Controller attached to body to give access
                         to utilities. e.g. return current year.

    - StandingsCtrl    - Standings list for drivers and constructors.
                         Params for db query are year, round and a string
                         to determine which list to show (driver/constructor).

    - ConstructorsCtrl - Gets all constructors for the current year
                         Params for db query are year, constructors_id, and filter.
                         Filters : /circuits
                                   /drivers
                                   /grid
                                   /results
                                   /fastest
                                   /status
    - DriversCtrl
    - CircuitsCtrl
    - RaceScheduleCtrl

*/

/* Controllers */
angular.module('F1Feed.controllers', [])
  .controller('MainCtrl', function($scope)
  {
    function getYear()
    {
      var currentDate = new Date();
      return currentDate.getFullYear();
    }
    $scope.currentYear = getYear();

    $scope.StandingsList = [];

  })
  .controller('StandingsCtrl', function($scope, ergastAPIservice, $routeParams)
  {
    $scope.$routeParams  = $routeParams;

    var year         = $routeParams.year,
        round        = $routeParams.round,
        standingsFor = $routeParams.standingsFor;

        console.log($scope.StandingsList.length);
    //if ($scope.StandingsList.length === 0)
   // {
      ergastAPIservice.getStandings(year, round, standingsFor).success(function (response)
      {
        if (standingsFor === 'driver')
          $scope.StandingsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        else
          $scope.StandingsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      });
      console.log($scope.StandingsList.length);
    //};
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
  })
  .controller('DriversCtrl', function($scope, ergastAPIservice, $routeParams)
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
  .controller('CircuitsCtrl', function($scope, ergastAPIservice, $routeParams)
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
  .controller('RaceScheduleCtrl', function($scope, ergastAPIservice, $routeParams)
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