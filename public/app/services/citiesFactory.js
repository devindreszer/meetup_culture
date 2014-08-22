(function() {

  var citiesFactory = function($http) {

    var factory = {};
    factory.getCities = function() {
      return $http.get('/cities', { cache: true });
    };

    return factory;
  };

  citiesFactory.$inject = ['$http'];

  angular.module('MeetupCulture').factory('citiesFactory', citiesFactory);

})();
