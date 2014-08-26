(function(){

  var bundleChart = function(){

    function link(scope, element, attr) {

      var diameter = 960,
        radius = diameter / 2,
        innerRadius = radius - 120;

      var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function(d) { return d.size; });

      var bundle = d3.layout.bundle();

      var diagonal = d3.svg.diagonal()
        .projection(function projection(d) {
          var r = d.y, a = (d.x - 90) / 180 * Math.PI;
          return [r * Math.cos(a), r * Math.sin(a)];
        });

      var svg = d3.select(element[0]).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      scope.$watch('data', function(data){
        if(!data){ return; }

        links = data.links;
        nodes = data.nodes;

        svg.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal);

        svg.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("text")
          .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
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

// var diameter = 960,
//     radius = diameter / 2,
//     innerRadius = radius - 120;

// var cluster = d3.layout.cluster()
//     .size([360, innerRadius])
//     .sort(null)
//     .value(function(d) { return d.size; });

// var bundle = d3.layout.bundle();

// var line = d3.svg.line.radial()
//     .interpolate("bundle")
//     .tension(0.85)
//     .radius(function(d) { return d.y; })
//     .angle(function(d) { return d.x / 180 * Math.PI; });

// var svg = d3.select("body").append("svg")
//     .attr("width", diameter)
//     .attr("height", diameter)
//   .append("g")
//     .attr("transform", "translate(" + radius + "," + radius + ")");

// d3.json("readme-flare-imports.json", function(error, classes) {
//   var nodes = cluster.nodes(packageHierarchy(classes)),
//       links = packageImports(nodes);

//   svg.selectAll(".link")
//       .data(bundle(links))
//     .enter().append("path")
//       .attr("class", "link")
//       .attr("d", line);

//   svg.selectAll(".node")
//       .data(nodes.filter(function(n) { return !n.children; }))
//     .enter().append("g")
//       .attr("class", "node")
//       .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
//     .append("text")
//       .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
//       .attr("dy", ".31em")
//       .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
//       .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
//       .text(function(d) { return d.key; });
// });

// d3.select(self.frameElement).style("height", diameter + "px");
