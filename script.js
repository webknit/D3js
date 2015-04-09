var width = 500;
var height = 500;

var padding = 50;

// Creates the initial SVG
var viz = d3.select('#viz-wrapper').append('svg').attr('id', 'viz').attr('height', height).attr('width', width);


// Get the data
// http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&cluster=yes
d3.json('http://api.openweathermap.org/data/2.5/box/city?bbox=-3,54,1,50,10&cluster=yes', function(data) {

	console.log(data);

	dots = viz.selectAll('circle').data(data.list).enter().append('circle');

	// Adding styles the the data
	// d is the data and i the count
	dots.attr('r', function(d, i) {

		return Math.abs(d.main.temp);

	}).attr('cx', function(d) {

		return Math.max(0 + padding, Math.random() * width - padding);

	}).attr('cy', function(d) {

		return Math.max(0 + padding, Math.random() * height - padding);

	}).style('fill', function(d) {

		var temp = d.main.temp;

		if(temp > 20) return 'red';
		if(temp > 14) return 'orange';
		else return 'blue';

	})

	dots.on("mouseenter", function(d, i) {

		var name = d.name;

		d3.select("#name").text(name)

	});

});