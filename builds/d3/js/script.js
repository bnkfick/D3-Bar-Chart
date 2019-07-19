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


var bardata = [];
    for (var i = 0; i<50; i++) {
      bardata.push(Math.random() * 30);
    }

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5,
    tempColor;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0,height]);

var xScale = d3.scaleBand()
    .domain(bardata)
    .paddingInner(.3)
    .paddingOuter(.1)
    .range([0, width])

var colors = d3.scaleLinear()
    .domain([0, bardata.length *.33,
                bardata.length *.66,
                bardata.length
                ])
    .range(['#B58929', '#C61C6F',
            '#268BD2', '#85992C'])

var tooltip = d3.select('body')
                .append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0)
                .style('border-radius', '3px');

var myChart = 
d3.select('#viz').append('svg')
  .attr('width', width)
  .attr('height', height)
.selectAll('rect').data(bardata)
  .enter().append('rect')
    .attr('fill', function(d, i) {
      return colors(i)
    })
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

      tooltip.html(d)
        .style('left', (d3.event.pageX -35) + 'px')
        .style('top', (d3.event.pageY -30) + 'px')

      tempColor = this.style.fill;
      d3.select(this)
        .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
      d3.select(this)
        .style('fill', tempColor)
    });


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