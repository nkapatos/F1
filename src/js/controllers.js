'use strict';

/* Controllers */

angular.module('F1Feed.controllers', []).controller('DriversCtrl', function($scope, ergastAPIservice)
{
  $scope.nameFilter = null;
  $scope.driversList = [];

  ergastAPIservice.getDrivers().success(function (response) {
      $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});