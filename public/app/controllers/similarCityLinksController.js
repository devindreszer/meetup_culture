(function() {

  var SimilarCityLinksController = function($scope, similarCityLinksFactory) {

    function init() {
      similarCityLinksFactory.getSimilarCityLinks()
        .success(function(data) {
          var sources = [],
            similarCityNodes = [],
            similarCityLinks = [];

          data.forEach(function(link){
            sources.push(link.source);
          });
          sources = _.uniq(sources);
          sources = _.sortBy(sources);

          for(var i = 0; i < sources.length; i++) {
            similarCityNodes.push({
              city: sources[i],
              x: (360 / sources.length) * i,
              y: 360
            });
          }

          data.forEach(function(link){
            sourceNode = similarCityNodes.filter(function(node){
              return node.city === link.source;
            });
            targetNode = similarCityNodes.filter(function(node){
              return node.city === link.target;
            });

            similarCityLinks.push({
              source: sourceNode[0],
              target: targetNode[0]
            });
          });

          $scope.similarCities = {
            links: similarCityLinks,
            nodes: similarCityNodes
          };
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
