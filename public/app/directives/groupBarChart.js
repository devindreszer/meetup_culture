(function(){

  var groupBarChart = function(){

    function link(scope, element, attr) {

      var margin = {top: 30, right: 20, bottom: 30, left: 20},
        width = 960 - margin.left - margin.right,
        height = 200, // placeholder
        barHeight = 20,
        spacing = 3,
        percent = d3.format('.1%'),
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.ordinal();

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      // create the chart
      var chart = d3.select(element[0]).append('svg')
        .style('width', (width + margin.left + margin.right) + 'px')
      .append('g')
        .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

      scope.$watch('data', function(data){
        if(!data){ return; }
        var type,
          xAxis,
          bars,
          median,
          colors,
          length,
          barData;

        barData = [];
        data.forEach(function(d) {
          barData.push(d.group_counts);
        });
        barData = _.flatten(barData);
        barData = _.sortBy(barData, 'category');

        length = barData.length;

        x.domain([0, d3.max(data, function(d) { return d3.max(d.group_counts, function(d) { return d.group_percentage; }); })]);

        y.domain(d3.range(length))
          .rangeBands([0, length * barHeight]);

        xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(percent);

        // set height based on data
        height = y.rangeExtent()[1];
        d3.select(chart.node().parentNode)
          .style('height', (height + margin.top + margin.bottom) + 'px');

        // render the axes
        chart.selectAll(".axis").remove();

        chart.append('g')
          .attr('class', 'x axis top')
          .call(xAxis.orient('top'));

        chart.append('g')
          .attr('class', 'x axis bottom')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis.orient('bottom'));

        // render the bars
        chart.selectAll('.bar').remove();

        bars = chart.selectAll('.bar')
          .data(barData);

        bars.enter()
          .append('g')
            .attr('class', 'bar')
            .attr('transform', function(d, i) { return 'translate(0,'  + y(i) + ')'; })

        bars.append('rect')
          .attr('class', 'background')
          .attr('height', y.rangeBand())
          .attr('width', width);

        bars.append('rect')
            .attr('class', 'percent')
            .attr('height', y.rangeBand())
            .attr('width', function(d) { return x(d.group_percentage); })
            .style("fill", function(d) { return color(d.city); });

        bars.append('text')
          .text(function(d){ return d.category; })
          .attr('class', 'name')
          .attr('y', y.rangeBand() - 5)
          .attr('x', spacing);

      }, true);

    }

    return {
      link: link,
      restrict: 'E',
      scope: { data: '=' }
    };

  };

  angular.module('MeetupCulture').directive('groupBarChart', groupBarChart);

})();
