(function() {

  var NavigationController = function($scope, $location) {

    function init() {
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }

    init();

  };

  NavigationController.$inject = ['$scope', '$location'];

  angular.module('MeetupCulture')
    .controller('NavigationController', NavigationController);

})();
