(function() {

  var CategoriesController = function($scope, categoriesFactory) {

    function init() {
      categoriesFactory.getCategories()
        .success(function(categories) {
          categories = _.sortBy(categories, 'name');
          $scope.categories = categories;
          $scope.currentCategory = categories[0];
        })
        .error(function(data) {
          console.log(data);
        });
    }

    init();

  };

  CategoriesController.$inject = ['$scope', 'categoriesFactory'];

  angular.module('MeetupCulture')
    .controller('CategoriesController', CategoriesController);

})();
