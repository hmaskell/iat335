//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

var svgWidth = 500;                                                                 //determines width size of new svg
var svgHeight = 100;
var barPad = 1;																//determines height size of new svg 	





var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


d3.json("http://www.sfu.ca/~hmaskell/iat335/stats-movies-clean",function(error,statsdata){
	d3.json("http://www.sfu.ca/~hmaskell/iat335/capitol-movies-clean",function(error,capitoldata){
	if(error){
		console.log("There was an error")
	} else{	
    data.forEach(function(d) {
        d.Source = d.Source;
        d.US_Gross = +d.US_Gross;
 });

	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Source; }));
  y.domain([0, d3.max(statsdata, function(d) { return d.US_Gross; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");


  // Add bar chart
  svg.selectAll("rect")
      .data(statsdata)
    .enter().append("rect")
      .attr("class", "rect")
      .attr("x", function(d) { return x(d.Source); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.US_Gross); })
      .attr("height", function(d) { return height - y(d.US_Gross); 

	});
}
})
})

