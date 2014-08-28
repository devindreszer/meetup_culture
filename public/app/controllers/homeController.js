(function() {

  var HomeController = function($scope, $window) {

    function init() {
    }

    init();

  };

  HomeController.$inject = ['$scope', '$window'];

  angular.module('MeetupCulture')
    .controller('HomeController', HomeController);

})();
