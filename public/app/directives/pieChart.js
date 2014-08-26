(function(){

  var pieChart = function(){

    function link(scope, element, attr) {

      var pieWidth = 400,
        pieHeight = 400,
        radius = Math.min(pieWidth, pieHeight) / 2;

      var svg = d3.select(element[0]).append("svg")
        .attr("width", pieWidth)
        .attr("height", pieHeight)
        .append("g")
        .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

      var color = d3.scale.ordinal()
        .range(['#F20000', '#eee']);

      var pie = d3.layout.pie()
        .sort(null);

      var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

      scope.$watch('data', function(data){
        if(!data){ return; }

        var category = data.category || "Arts & Culture";
        var city = data.city;
        var group = city.group_counts.filter(function(d){ return d.category === category; })[0]
        var group_percentage = group.group_percentage;
        var pieData = [group_percentage, 1 - group_percentage];

        svg.selectAll("path").remove();

        var path = svg.selectAll("path")
          .data(pie(pieData))
        .enter().append("path")
          .attr("fill", function(d, i) { return color(i); })
          .attr("d", arc);

      }, true);

    }

    return {
      link: link,
      restrict: 'E',
      scope: { data: '=' }
    };

  };

  angular.module('MeetupCulture').directive('pieChart', pieChart);

})();
