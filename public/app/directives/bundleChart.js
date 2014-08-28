(function(){

  var bundleChart = function(){

    function link(scope, element, attr) {

      var diameter = 600,
        radius = diameter / 2,
        innerRadius = radius - 120;

      var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function(d) { return d.size; });

      var bundle = d3.layout.bundle();

      var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(0.6)
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; });

      var svg = d3.select(element[0]).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");

      scope.$watch('data', function(data){
        if(!data){ return; }

        var links = data.links;
        var nodes = data.nodes;

        link = link
          .data(bundle(links))
        .enter().append("path")
          .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
          .attr("class", "link")
          .attr("d", line);

        node = node
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("text")
          .attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
          .attr("dy", ".31em")
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
          .text(function(d) { return d.city + ", " + d.state; })
          .on("mouseover", mouseovered)
          .on("mouseout", mouseouted);

      }, true);

      function mouseovered(d) {

        node
            .each(function(n) { n.target = n.source = false; });

        link
            .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
            .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
          .filter(function(l) { return l.target === d || l.source === d; })
            .each(function() { this.parentNode.appendChild(this); });

        node
            .classed("node--target", function(n) { return n.target; })
            .classed("node--source", function(n) { return n.source; });
      }

      function mouseouted(d) {
        var link = svg.append("g").selectAll(".link"),
          node = svg.append("g").selectAll(".node");

        link
            .classed("link--target", false)
            .classed("link--source", false);

        node
            .classed("node--target", false)
            .classed("node--source", false);
      }

    }

    return {
      link: link,
      restrict: 'E',
      scope: { data: '=' }
    };

  };

  angular.module('MeetupCulture').directive('bundleChart', bundleChart);

})();

