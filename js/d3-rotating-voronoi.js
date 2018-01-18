/*

  Rotating Voronoi. Original source code: https://bl.ocks.org/mbostock/4636377
  Credit: Mike Bostok https://bl.ocks.org/mbostock

*/
(function() {

  var DOMSvg = document.getElementById("rotating-voronoi"),
      width = DOMSvg.parentElement.clientWidth,
      height = DOMSvg.parentElement.clientHeight;

  var start = Date.now(),
      points = [];

  var bounds = d3.geom.polygon([
    [-width / 2, -height / 2],
    [-width / 2, +height / 2],
    [+width / 2, +height / 2],
    [+width / 2, -height / 2]
  ]);

  circle(0, 0, 120, 96, -.001);
  circle(0, 0, 30, 10, .03);
  circle(0, 0, 60, 3, -.05);
  circle(0, 0, 15, 4, -.02);
  circle(0, 0, 0, 1, -.02);

  circle(240, -120, 80, 4, -.02);
  circle(240, -120, 0, 1, -.02);

  circle(280, +120, 40, 8, .02);
  circle(280, +120, 20, 8, -.02);
  circle(280, +120, 0, 1, .02);

  var line = d3.svg.line().interpolate("basis-closed");

  var svg = d3.select("#rotating-voronoi")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");


  var path = svg.selectAll("path")
                .data(points)
                .enter().append("path");

  d3.timer(function() {
    var voronoi = d3.geom.voronoi(points).map(function(cell) { return bounds.clip(cell); });
    path.attr("d", function(point, i) { return line(resample(voronoi[i])); });
  });

  function circle(cx, cy, r, n, δθ) {
    d3.range(1e-6, 2 * Math.PI, 2 * Math.PI / n).map(function(θ, i) {
      var point = [cx + Math.cos(θ) * r, cy + Math.sin(θ) * r];
      d3.timer(function(elapsed) {
        var angle = θ + δθ * elapsed / 60;
        point[0] = cx + Math.cos(angle) * r;
        point[1] = cy + Math.sin(angle) * r;
      }, 0, start);
      points.push(point);
      return point;
    });
  }

  function resample(points) {
    var i = -1,
        n = points.length,
        p0 = points[n - 1], x0 = p0[0], y0 = p0[1], p1, x1, y1,
        points2 = [];
    while (++i < n) {
      p1 = points[i], x1 = p1[0], y1 = p1[1];
      points2.push(
        [(x0 * 2 + x1) / 3, (y0 * 2 + y1) / 3],
        [(x0 + x1 * 2) / 3, (y0 + y1 * 2) / 3],
        p1
      );
      p0 = p1, x0 = x1, y0 = y1;
    }
    return points2;
  }


})();



/*

 App startup
 Put something cool and different in the javascript console window.

*/
(function(url) {
  console.log("%cCustom "+"%cHTML5"+" %c/ "+"%cCSS3"+" %c/ "+"%cJS "+"%cby Lawrence McDaniel: https://lawrencemcdaniel.com | lpm0073@gmail.com", "color: black; background-color: #f1f1f1;","color: red; background-color: #f1f1f1;", "color: black; background-color: #f1f1f1;", "color: green; background-color: #f1f1f1;", "color: black; background-color: #f1f1f1;", "color: blue; background-color: #f1f1f1;", "color: black; background-color: #f1f1f1;");
  // Create a new `Image` instance
  var image = new Image();

  image.onload = function() {
    // Inside here we already have the dimensions of the loaded image
    var style = [
      // Hacky way of forcing image's viewport using `font-size` and `line-height`
      'font-size: 1px;',
      'line-height: ' + this.height + 'px;',

      // Hacky way of forcing a middle/center anchor point for the image
      'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',

      // Set image dimensions
      'background-size: ' + this.width + 'px ' + this.height + 'px;',

      // Set image URL
      'background: url('+ url +');'
     ].join(' ');

     console.log('%c', style);
  };

  // Actually loads the image
  image.src = url;
})('https://edx.lawrencemcdaniel.com/images/Lawrence6.JPG');
