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


    var bardata = [12, 78, 45, 15];
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0,height]);

d3.select('#viz').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
.selectAll('rect').data(bardata)
  .enter().append('rect')
    .style('fill', '#C61C6F')
    .attr('width', barWidth)
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('x', function(d, i) {
      return i*(barWidth + barOffset)
    })
    .attr('y', function(d) {
      return height - yScale(d);
    });