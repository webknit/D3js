// API reference - https://github.com/mbostock/d3/wiki/API-Reference

var width = 500;
var height = 500;

var padding = 50;

// Creates the initial SVG
var viz = d3.select("#viz-wrapper").append('svg').attr('height', height + padding * 2 ).attr('width', width + padding * 2).append('g').attr('id', 'viz').attr('transform', 'translate(' + padding + ',' + padding + ')');

// d3.scale.linear() - construct a linear quantitative scale
// range() - generate a range of numeric values.
// These two return the function to be used later
var yScale = d3.scale.linear().range([height, 0]);
var xScale = d3.scale.linear().range([0, width]);

// d3.svg.axis() - Create a new default axis.
// axis.sclae() - get or set the axis scale
// orient - determines the orientation, defaults to bottom
// ticks - generate tick values
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);

d3.json('http://api.openweathermap.org/data/2.5/box/city?bbox=-3,54,1,50,10&cluster=yes', function(data) {

	//console.log(data);

	// d3.extent(array[, accessor])
	// Returns the minimum and maximum value in the given array using natural order. 
	// This is equivalent to calling d3.min and d3.max simultaneously.
	// Will return something like [1, 22]
	yDomain = d3.extent(data.list, function(element){
	
		return parseInt(element.wind.speed)
		
	});
	
	xDomain = d3.extent(data.list, function(element) {
	
		return parseInt(element.main.temp)
	
	});
	
	// Referring to the varibales we created above
	// Domain inserts the data domain that shoudl map to range
	yScale.domain(yDomain);
	xScale.domain(xDomain);
	
	// call - call a function passing in the current selection
	viz.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    viz.append("g").attr("class", "y axis").call(yAxis);

    dots = viz.selectAll('g.dots').data(data.list).enter().append('g').attr('class', 'dots');

    dots.attr('transform', function(d) {
		
		x = xScale(d.main.temp)
		y = yScale(d.wind.speed)

		return 'translate(' + x + ',' + y + ')'

	}).style('stroke', '#00ffd2').style('fill', '#006bff');

	dots.append('circle').attr('r', 5);

	dots.on("mouseenter", function(d, i) {

		var name = d.name;
		var temp = d.main.temp;
		var wspeed = d.wind.speed;

		d3.select("#name").text(name + " wind speed is " + wspeed + "m/s temp is " + Math.round(temp) + "°C");

	});


});