(function(){

  var bundleChart = function(){

    function link(scope, element, attr) {

      var diameter = 800,
        radius = diameter / 2,
        innerRadius = radius - 120;

      var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function(d) { return d.size; });

      var bundle = d3.layout.bundle();

      var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(0.5)
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; });

      var svg = d3.select(element[0]).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      scope.$watch('data', function(data){
        if(!data){ return; }

        var links = data.links;
        var nodes = data.nodes;

        svg.selectAll(".link")
          .data(bundle(links))
        .enter().append("path")
          .attr("class", "link")
          .attr("d", line);

        svg.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("text")
          .attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
          .attr("dy", ".31em")
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
          .text(function(d) { return d.city; });

      }, true);

    }

    return {
      link: link,
      restrict: 'E',
      scope: { data: '=' }
    };

  };

  angular.module('MeetupCulture').directive('bundleChart', bundleChart);

})();
