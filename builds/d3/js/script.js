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
              '</td><td>' + d.high + '</td>'
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



