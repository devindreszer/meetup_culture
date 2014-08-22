(function(){

  var barChart = function(){

    function link(scope, element, attr) {

      var margin = {top: 30, right: 20, bottom: 30, left: 20},
        width = 960 - margin.left - margin.right,
        height = 200, // placeholder
        barHeight = 20,
        spacing = 3,
        percent = d3.format('.1%'),
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.ordinal();

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
          colors;

        if(data.city) {
          type = "cities";
        } else {
          type = "categories";
        }

        data = data.group_counts;
        data = _.sortBy(data, 'group_percentages').reverse();

        x.domain([0, d3.max(data, function(d) { return d.group_percentages; })]);

        y.domain(d3.range(data.length))
          .rangeBands([0, data.length * barHeight]);

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
        bars = chart
          .selectAll('.bar')
            .data(data);

        bars.exit().remove();

        bars.enter().append('g')
            .attr('class', 'bar')
            .attr('transform', function(d, i) { return 'translate(0,'  + y(i) + ')'; });

        bars.append('rect')
          .attr('class', 'background')
          .attr('height', y.rangeBand())
          .attr('width', width);

        bars.append('rect')
          .attr('class', 'percent')
          .attr('height', y.rangeBand())
          .attr('width', function(d) { return x(d.group_percentages); });

        // category based table
        if(type === "categories") {
          bars.append('text')
            .text(function(d) { return d.city + ", " + d.state; })
            .attr('class', 'name')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);

        // city based table
        } else {
          bars.append('text')
            .text(function(d) { return d.category; })
            .attr('class', 'name')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);
        }

      // add median ticks
        median = d3.median(data.map(function(d){ return d.group_percentages; }));
        d3.select('span.median').text(percent(median));

        bars.append('line')
          .attr('class', 'median')
          .attr('x1', x(median))
          .attr('x2', x(median))
          .attr('y1', 1)
          .attr('y2', y.rangeBand() - 1);

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
