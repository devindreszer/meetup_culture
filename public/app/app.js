var app = angular.module('MeetupCulture', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: 'HomeController'
    });
}]);
