(function() {

  var CitiesController = function($scope, citiesFactory) {

    function init() {
      citiesFactory.getCities()
        .success(function(cities) {
          cities = _.sortBy(cities, 'city');
          $scope.cities = cities;
          $scope.currentCity = cities[0];
        })
        .error(function(data) {
          console.log(data);
        });
    }

    init();

  };

  CitiesController.$inject = ['$scope', 'citiesFactory'];

  angular.module('MeetupCulture')
    .controller('CitiesController', CitiesController);

})();
