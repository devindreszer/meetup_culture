(function() {

  var CompareCitiesController = function($scope, citiesFactory) {

    function init() {
      citiesFactory.getCities()
        .success(function(cities) {
          cities = _.sortBy(cities, 'city');
          var categories = cities[0].group_counts.map(function(d){ return d.category; });
          $scope.cities = cities;
          $scope.cityComparison = [];
          $scope.categories = _.sortBy(categories);
          $scope.currentCategory = $scope.categories[0];

          $scope.setCategory = function(category) {
            $scope.currentCategory = category;
          };

          $scope.isActive = function(category) {
            return category === $scope.currentCategory;
          };

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
