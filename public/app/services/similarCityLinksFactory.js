(function() {

  var similarCityLinksFactory = function($http) {

    var factory = {};
    factory.getSimilarCityLinks = function() {
      return $http.get('/similar_city_links', { cache: true });
    };

    return factory;
  };

  similarCityLinksFactory.$inject = ['$http'];

  angular.module('MeetupCulture').factory('similarCityLinksFactory', similarCityLinksFactory);

})();
