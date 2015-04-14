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

	// southernmost and northernmost latitudes for the UK
	// North: 60.85
	// South: 49.85
	// West: -13.683333
	// East: 1.766667

	// Adding styles the the data
	// d is the data and i the count
	dots.attr('r', function(d, i) {

		return Math.abs(d.main.temp);

	}).attr('cx', function(d) {

		var lon = d.coord.lon;

		var Xcoord = ((lon - (-13.683333)) / (1.766667 - (-13.683333))) * 500;

		console.log((d.coord.lon - -13.683333) / (1.766667 - 13.683333) * 100);

		// Random onto canvas
		//return Math.round(0 + padding, Math.random() * width - padding);
		return Math.round(Xcoord);

	}).attr('cy', function(d) {

		var lat = d.coord.lat;

		var Ycoord = ((lat - 60.85) / (49.85 - 60.85)) * 500;

		// Random onto canvas
		//return Math.max(0 + padding, Math.random() * height - padding);
		return Math.round(Ycoord);

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