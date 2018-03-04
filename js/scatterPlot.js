//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

//values for svg element
var svgWidth = 1700;                                                                 //determines width size of new svg
var svgHeight = 1500;
var barPad = 50;	


d3.json("http://www.sfu.ca/~hmaskell/iat335/movies_IMDB.json",function(error,data){
	if(error){
		console.log("There was an error")
	} else{	
		
		//create variables to scale the x and y dimensions
		var xScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d) { return d["US_Gross"];})])
							.range([barPad, svgWidth - barPad]);     

		var	yScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d) { return d["IMDB_Rating"]; })])
							.range([svgHeight - barPad, barPad]);                                 //output range will have 10 pixels of space around the edges

		
		//scales the radius of each circle					
		var rScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d){ return d["IMDB_Rating"];})])	
							.range ([1,5]);		

		//create the svg element					
		var svg = d3.select("body")
					.append("svg")
					.attr("width", svgWidth)
					.attr("height", svgHeight);

		//create a circle at each of the data points
		svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d){
				return xScale(d["US_Gross"]);
			})
			.attr("cy", function(d){
				return yScale(d["IMDB_Rating"]);
			})
			.attr("r", function(d){
				return rScale(d["IMDB_Rating"]);
			})			
	}
})