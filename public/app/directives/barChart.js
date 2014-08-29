(function(){

  var barChart = function(){

    function link(scope, element, attr) {

      var margin = {top: 30, right: 20, bottom: 30, left: 130},
        width = 960 - margin.left - margin.right,
        height = 200, // placeholder
        barHeight = 16,
        spacing = 2,
        percent = d3.format('.1%'),
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.ordinal();

      // create the chart
      var chart = d3.select(element[0]).append('svg')
        .style('width', (width + margin.left + margin.right) + 'px')
      .append('g')
        .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

      var bars = chart.selectAll('.bar');

      scope.$watch('data', function(data){
        if(!data){ return; }
        var type,
          xAxis,
          yAxis,
          median;

        if(data.city) {
          type = "cities";
        } else {
          type = "categories";
        }

        if(type === "categories") {
          median = data.median_percentage;
        }

        data = data.group_counts;
        data = _.sortBy(data, 'group_percentage').reverse();

        if(type === "categories") {
          data = _.first(data, 25);
        }

        x.domain([0, d3.max(data, function(d) { return d.group_percentage; })]);

        if(type === "categories") {
          y.domain(data.map(function(d) { return d.city; }))
            .rangeRoundBands([0, data.length * barHeight]);
        } else {
          y.domain(data.map(function(d) { return d.category; }))
            .rangeRoundBands([0, data.length * barHeight]);
        }

        xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(percent);

        yAxis = d3.svg.axis()
          .scale(y)
          .tickSize(0);

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

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis.orient('left'));

        // render the bars
        bars = bars.data(data, function(d) { return d; });

        if(type === "categories") {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('height', y.rangeBand())
            .attr('y', function(d) { return y(d.city); })
            .transition()
              .delay(500)
              .duration(1000)
              .attr('width', function(d) { return x(d.group_percentage); });
        } else {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('height', y.rangeBand())
            .attr('y', function(d) { return y(d.category); })
            .transition()
              .delay(500)
              .duration(1000)
              .attr('width', function(d) { return x(d.group_percentage); });
        }

        bars.exit().transition()
          .remove();

        // add median line
        if(type === "cities") {
          median = d3.median(data.map(function(d){ return d.group_percentage; }));
        }

        chart.selectAll('.median').remove();

        chart.append('line')
          .attr('class', 'median')
          .transition()
            .delay(500)
            .duration(1000)
            .attr('x1', x(median))
            .attr('x2', x(median))
            .attr('y1', 1)
            .attr('y2', height);

      }, true);

    }

    return {
      link: link,
      restrict: 'E',
      scope: { data: '=' }
    };

  };

  angular.module('MeetupCulture').directive('barChart', barChart);

})();
