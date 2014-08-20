(function() {

  var CategoriesController = function($scope, categoriesFactory) {

    function init() {
      categoriesFactory.getCategories()
        .success(function(categories) {
          $scope.categories = categories;
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
