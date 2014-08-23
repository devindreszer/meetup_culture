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
      .when('/categories',
        {
          templateUrl: 'app/views/categories.html',
          controller: 'CategoriesController'
        }
      )
      .when('/cities',
        {
          templateUrl: 'app/views/cities.html',
          controller: 'CitiesController'
        }
      )
      .when('/similar-city-links',
        {
          templateUrl: 'app/views/similarCityLinks.html',
          controller: 'SimilarCityLinksController'
        }
      )
      .otherwise({ redirectTo: '/' });
  }]);

  app.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }]);

})();
