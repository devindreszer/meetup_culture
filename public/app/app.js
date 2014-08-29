(function() {

  var app = angular.module('MeetupCulture', ['ngRoute', 'ngAnimate']);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/',
        {
          templateUrl: 'app/views/home.html',
          controller: 'HomeController'
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
      .when('/compare-cities',
        {
          templateUrl: 'app/views/compareCities.html',
          controller: 'CompareCitiesController'
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
