// var width = 600,
//     height = 250,
//     radius = 12;

var $container = $('div#chartblabla'),
    width = $container.width(),
    height = $container.height();
var radius = 50,
    radius_constant = 5,
    radius_scalar = 100;

var fill = d3.scale.category20();

var force = d3.layout.force()
    .gravity(.05)
    .charge(-240)
    .linkDistance(50)
    .size([width, height]);

// var svg = d3.select("div#chartblabla").append("svg")
//     .attr("width", width)
//     .attr("height", height);

var svg = d3.select('div#chartblabla').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g");
    // .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");


d3.json("/assets/data/force.json", function(error, graph) {

  if (error) throw error;

  var link = svg.selectAll("line")
      .data(graph.links)
    .enter().append("line");

  var node = svg.selectAll("circle")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("r", function(d) { return radius_constant + d.radius * radius_scalar; })
      .style("fill", function(d) { return fill(d.group); })
      .style("stroke", function(d) { return d3.rgb(fill(d.group)).darker(); })
      .call(force.drag);

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .on("tick", tick)
      .start();

  function tick() {
    node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  }
});
