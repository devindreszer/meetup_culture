(function() {

  var SimilarCityLinksController = function($scope, similarCityLinksFactory) {

    function init() {
      similarCityLinksFactory.getSimilarCityLinks()
        .success(function(similarCityLinks) {
          $scope.similarCityLinks = similarCityLinks;
        })
        .error(function(data) {
          console.log(data);
        });
    }

    init();

  };

  SimilarCityLinksController.$inject = ['$scope', 'similarCityLinksFactory'];

  angular.module('MeetupCulture')
    .controller('SimilarCityLinksController', SimilarCityLinksController);

})();
