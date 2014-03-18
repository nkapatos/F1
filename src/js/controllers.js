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
    - DashboardCtrl

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

  })
  .controller('StandingsCtrl', function($scope, ergastAPIservice, $routeParams)
  {
    $scope.$routeParams  = $routeParams;

    var year         = $routeParams.year,
        round        = $routeParams.round,
        standingsFor = $routeParams.standingsFor;

//    console.log($scope.StandingsList.length);

    if (StandingsList.length === 0)
    {
      $scope.StandingsList = [];
      ergastAPIservice.getStandings(year, round, standingsFor).success(function (response)
      {
        if (standingsFor === 'driver')
          $scope.StandingsList = StandingsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        else
          $scope.StandingsList = StandingsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      });
    }
    else
    {
      $scope.StandingsList = StandingsList;
    };
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
        $scope.ConstructorsList = ConstructorsList = response.MRData.ConstructorTable.Constructors;
      
      if(constructor_id)
      {
        $scope.constructor_id = constructor_id;
        $scope.year = year;
        switch (filter)
        {
          case 'circuits':
            $scope.ConstructorsList = ConstructorsList = response.MRData.CircuitTable.Circuits;
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
  .controller('DriversCtrl', function($scope, ergastAPIservice, wikiApiService, $routeParams)
  {
    $scope.$routeParams  = $routeParams;

    var year         = $routeParams.year,
        driverID     = $routeParams.driverID,
        filter       = $routeParams.filter;

    ergastAPIservice.getDrivers(year, driverID, filter).success(function (response)
    {
      if (!driverID)
      {
        $scope.DriversList = [];
        $scope.DriversList = response.MRData.DriverTable.Drivers;
      }
      
      if (driverID)
      {
        $scope.DriverStatus = [];
        $scope.DriverStatus = DriverStatus = response.MRData.StatusTable;
        ergastAPIservice.getDriverWikiLink(driverID).success(function (response)
        {
          $scope.DriverWikiLink = response.MRData.DriverTable.Drivers[0].url;
          wikiApiService.getDriverInfo($scope.DriverWikiLink).success(function (response)
          {
            $scope.DriverBio = [];
            var wikiResponse = response.query.pages;

            for (var property in wikiResponse)
            {
              if (wikiResponse.hasOwnProperty(property))
              {
                  console.log(property + '=' + wikiResponse[property]);
              }
            }

          }).error(function (status)
          {
            $scope.DriverBio = status;
          });
        })
      };
    });

  })
  .controller('CircuitsCtrl', function($scope, ergastAPIservice, $routeParams)
  {
    $scope.CircuitsList = [];
    $scope.$routeParams  = $routeParams;

    var year         = $routeParams.year,
        round        = $routeParams.round,
        standingsFor = $routeParams.standingsFor;

    ergastAPIservice.getCircuits(year).success(function (response)
    {

        $scope.CircuitsList = response.MRData.CircuitTable.Circuits;
        
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
  }).controller('DashboardCtrl', function($scope, ergastAPIservice, $routeParams)
  {

    $scope.nextEvent = [];
    // Next event from now
    ergastAPIservice.getNextEvent().success(function (response){
      $scope.nextEvent = nextEvent = response.MRData.RaceTable.Races[0];
      
      // Time conversion applying UTC offset to start time (Time is in zulu which is the same with UTC)
      var d = new Date();
      var locale_utc_offset = (d.getTimezoneOffset() * 60) * -1;
      var hms_zulu = nextEvent.time;
      var hms = hms_zulu.slice(0, -1);
      var hms_clean = hms.split(':');
      var utc_seconds = (+hms_clean[0]) * 60 * 60 + (+hms_clean[1]) * 60 + (+hms_clean[2]);
      var total_seconds = utc_seconds + locale_utc_offset;

      var sec_num = parseInt(total_seconds, 10);
      var hours = Math.floor(sec_num / 3600);

      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      var time = hours + ':' + minutes + ':' + seconds;

      $scope.local_time = time.toString();

      // Reverse date order
      // function parseDate(input)
      // {
      //   var date_parts = nextEvent..split('-');
      //   return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
      // }

    });
    

  });