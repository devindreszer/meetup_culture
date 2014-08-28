(function(){

  var resizable = function($window){

    return function (scope, element) {

      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return { 'height': $window.innerHeight, 'width': $window.innerWidth };
      };

      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight = newValue.height;
        scope.windowWidth = newValue.width;

        scope.style = function () {
          return {
            'background': red,
            'height': (newValue.height) + 'px',
            'width': (newValue.width) + 'px'
          };
        };

        scope.cssStyle = scope.style;

      }, true);

      w.bind('resizable', function () {
        scope.$apply();
      });
    };


  };

  resizable.$inject = ['$window'];

  angular.module('MeetupCulture').directive('resizable', resizable);

})();
