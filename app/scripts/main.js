// jshint devel:true
var height = 200;
var width = 200;
var margin = 2;
var data = [{
  status: 'passing',
  rate: 70
}, {
  status: 'fail',
  rate: 10
}, {
  status: 'success',
  rate: 20
}];
var color = d3.scale.category10();
// задаем радиус
var radius = Math.min(width - 2 * margin, height - 2 * margin) / 2;

var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(0);

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.rate;
  });
var svg = d3.select(".sircle").append("svg")
  .attr("class", "axis")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
    "translate(" + (width / 2) + "," + (height / 2) + ")");
var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", function(d) {
    return color(d.data.status);
  });

g.append("text")
  .attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .text(function(d) {
    return d.data.status;
  });
