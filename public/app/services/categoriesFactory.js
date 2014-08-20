(function() {

  var categoriesFactory = function($http) {

    var factory = {};
    factory.getCategories = function() {
      return $http.get('/categories', { cache: true });
    };

    return factory;
  };

  angular.module('MeetupCulture').factory('categoriesFactory', categoriesFactory);

})();
