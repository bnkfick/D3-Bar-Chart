var mydata = [
    { date: '6/01/2019', low: 55, high: 78 },
    { date: '6/02/2019', low: 65, high: 83 },
    { date: '6/03/2019', low: 77, high: 90 },
    { date: '6/04/2019', low: 58, high: 78 },
    { date: '6/05/2019', low: 67, high: 92 },
  ];
  
  d3.select('tbody')
    .selectAll('tr')
    .data(mydata)
    .enter().append('tr')
    .html(function(d) {
      return '<th scope="row">' + d.date +
              '</th><td>' + d.low +
              '&deg; <span class="notation">F' +
              '</td><td>' + d.high + 
              '&deg; <span class="notation">F' +
              '</td>'
    })

d3.select('#d3draw')
  .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('background', '#93A1A1')
  .append('rect')
    .attr('x', 200)
    .attr('y', 100)
    .attr('height', 200)
    .attr('width', 200)
    .style('fill', '#CB4B19');

d3.select('#d3draw svg')
  .append('circle')
  .attr('cx', 300)
  .attr('cy', 200)
  .attr('r', 50)
  .style('fill', '#840043');


d3.select('#d3draw svg') 
    .append('text')
    .style("fill", "white")   
    .style("font-family", "Montserrat")   
    .style("font-size", "25")   
    .attr("x", 10)           
    .attr("y", 390)           
    .text("ficktastic"); 

d3.json('js/data/forecast.json', function(d) {

    var temperatures = [],
        dates = [],
        margin = { top: 0, right: 0, bottom: 30, left: 20 }
        height = 400 - margin.top - margin.bottom,
        width = 600 - margin.left - margin.right;
    
    var   tempColor,
            yScale,
            yAxisValues,
            yAxisTicks,
            yGuide,
            xScale,
            xAxisValues,
            xAxisTicks,
            xGuide,
            colors,
            tooltip,
            myChart;
    
    for (var i = 0; i<d.list.length; i++) {
        temperatures.push(d.list[i].main.temp);
        dates.push( new Date(d.list[i].dt_txt) );
    }
    
    yScale = d3.scaleLinear()
        .domain([0, d3.max(temperatures)])
        .range([0,height]);
    
    yAxisValues = d3.scaleLinear()
        .domain([0, 'd3.max(temperatures)'])
        .range([height,0]);
    
    yAxisTicks = d3.axisLeft(yAxisValues)
    .ticks(10)
    
    xScale = d3.scaleBand()
        .domain(temperatures)
        .paddingInner(.1)
        .paddingOuter(.1)
        .range([0, width])
    
    xAxisValues = d3.scaleTime()
        .domain([dates[0],dates[(dates.length-1)]])
        .range([0, width])
    
    xAxisTicks = d3.axisBottom(xAxisValues)
        .ticks(d3.timeDay.every(1))
    
    colors = d3.scaleLinear()
        .domain([0, 65, d3.max(temperatures)])
        .range(['#FFFFFF', '#2D8BCF', '#DA3637'])
    
    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0);
    
    myChart = d3.select('#viz').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.right + ')')
        .selectAll('rect').data(temperatures)
        .enter().append('rect')
        .attr('fill', colors)
        .attr('width', function(d) {
            return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function(d) {
            return xScale(d);
        })
        .attr('y', height)
        
        .on('mouseover', function(d) {
            tooltip.transition().duration(200)
            .style('opacity', .9)
            tooltip.html(
            '<div style="font-size: 2rem; font-weight: bold">' +
                d + '&deg;</div>'
            )
            .style('left', (d3.event.pageX -35) + 'px')
            .style('top', (d3.event.pageY -30) + 'px')
            tempColor = this.style.fill;
            d3.select(this)
            .style('fill', 'yellow')
        })
    
        .on('mouseout', function(d) {
            tooltip.html('')
            d3.select(this)
            .style('fill', tempColor)
        });
    
    yGuide = d3.select('#viz svg').append('g')
                .attr('transform', 'translate(20,0)')
                .call(yAxisTicks)
    
    xGuide = d3.select('#viz svg').append('g')
                .attr('transform', 'translate(20,'+ height + ')')
                .call(xAxisTicks)
    
    myChart.transition()
        .attr('height', function(d) {
        return yScale(d);
        })
        .attr('y', function(d) {
        return height - yScale(d);
        })
        .delay(function(d, i) {
        return i * 20;
        })
        .duration(1000)
        .ease(d3.easeBounceOut)
    
    }); // json import