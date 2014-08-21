(function(){

  var barChart = function(){

    function link(scope, element, attr) {

      var margin = {top: 30, right: 10, bottom: 30, left: 10},
        width = 960,
        height = 200, // placeholder
        barHeight = 20,
        spacing = 3,
        percent = d3.format('%');

      width = width - margin.left - margin.right;

      scope.$watch('data', function(data){
        if(!data){ return; }

        data = data[0].group_counts;
        data = _.sortBy(data, 'group_percentages').reverse();

        // scales and axes
        var x = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return d.group_percentages; })])
          .range([0, width]);

        var y = d3.scale.ordinal()
          .domain(d3.range(data.length))
            .rangeBands([0, data.length * barHeight]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(percent);

        // create the chart
        var chart = d3.select(element[0]).append('svg')
          .style('width', (width + margin.left + margin.right) + 'px')
        .append('g')
          .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

        // set height based on data
        height = y.rangeExtent()[1];
        d3.select(chart.node().parentNode)
          .style('height', (height + margin.top + margin.bottom) + 'px');

        // render the axes
        chart.append('g')
          .attr('class', 'x axis top')
          .call(xAxis.orient('top'));

        chart.append('g')
          .attr('class', 'x axis bottom')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis.orient('bottom'));

        // render the bars
        var bars = chart.selectAll('.bar')
          .data(data)
        .enter().append('g')
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

        bars.append('text')
          .text(function(d) { return d.city + ", " + d.state; })
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

  angular.module('MeetupCulture').directive('barChart', barChart);

})();
