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
