'use strict';

/* jasmine specs for controllers go here */
describe('StandingsCtrl', function(){

  var scope, httpBackend, controller, routeParams;
  var year, round, standingsFor, theUrl;

  beforeEach(angular.mock.module('F1Feed'));
  beforeEach(angular.mock.inject(function($rootScope, $httpBackend, $controller, $routeParams)
  {
    scope       = $rootScope;
    httpBackend = $httpBackend;
    controller  = $controller;
    routeParams = $routeParams;

    routeParams.year = 'current',
    //routeParams.round = 5,
    routeParams.standingsFor = 'driver';

    theUrl = 'http://ergast.com/api/f1/'+routeParams.year+'/'+routeParams.standingsFor+'Standings.json?callback=JSON_CALLBACK';

    /*httpBackend.when('GET', theUrl)
      .respond(
        {userId: 'userX'},
        {'A-Token': 'xxx'}
      );*/

    controller('StandingsCtrl', {$scope: scope});

  }));

  it('Is should return current year standings for drivers', function()
  { 
    httpBackend.expectGET(theUrl);
    httpBackend.flush();
  });

});
