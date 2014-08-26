(function() {

  var CompareCitiesController = function($scope, citiesFactory) {

    function init() {
      citiesFactory.getCities()
        .success(function(cities) {
          cities = _.sortBy(cities, 'city');
          $scope.cities = cities;
          $scope.cityComparison = [cities[0]];
        })
        .error(function(data) {
          console.log(data);
        });
    }

    init();

  };

  CompareCitiesController.$inject = ['$scope', 'citiesFactory'];

  angular.module('MeetupCulture')
    .controller('CompareCitiesController', CompareCitiesController);

})();
