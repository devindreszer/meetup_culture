(function() {

  var app = angular.module('MeetupCulture', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/',
        {
          templateUrl: 'app/views/categories.html',
          controller: 'CategoriesController'
        }
      )
      .otherwise({ redirectTo: '/' });
  }]);

})();
