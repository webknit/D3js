var width = 500;
var height = 500;

var padding = 50;

// Creates the initial SVG
var viz = d3.select("#viz-wrapper").append('svg').attr('height', height + padding * 2 ).attr('width', width + padding * 2).append('g').attr('id', 'viz').attr('transform', 'translate(' + padding + ',' + padding + ')');

var yScale = d3.scale.linear().range([height, 0]);
var xScale = d3.time.scale().range([0, width]);

// Set up the x axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(8);

// Set up the y axis 
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(20);

d3.json('http://api.openweathermap.org/data/2.5/box/city?bbox=-3,54,1,50,10&cluster=yes', function(data) {

	console.log(data);

	yDomain = d3.extent(data.list, function(element){
	
		return parseInt(element.wind.speed)
		
	});
	
	xDomain = d3.extent(data.list, function(element) {
	
		return parseInt(element.main.temp)
	
	});
	
	yScale.domain(yDomain);
	xScale.domain(xDomain);
	
	viz.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        
    viz.append("g")
          .attr("class", "y axis")
          .call(yAxis);

});