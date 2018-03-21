//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

//values for svg element
var svgWidth = 1700;                                                                 //determines width size of new svg
var svgHeight = 1500;
var padding = 50;	
var h = 200;


d3.json("http://www.sfu.ca/~hmaskell/iat335/movies_IMDB.json",function(error,data){
	if(error){
		console.log("There was an error")
	} else{	
		
		//create variables to scale the x and y dimensions
		var xScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d) { return d["US_Gross"];})])
							.range([padding, svgWidth - padding]);     

		var	yScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d) { return d["IMDB_Rating"]; })])
							.range([svgHeight - padding, padding]);                                 //output range will have 50 pixels of space around the edges

		
		//scales the radius of each circle					
		var rScale = d3.scaleLinear()
							.domain([0, d3.max(data, function(d){ return d["IMDB_Rating"];})])	
							.range ([1,7]);		

		//Define the x axis, orientation and number of ticks					
		var xAxis = d3.axisBottom()
							.scale(xScale)
							.ticks(10);	
		
		//Define the y axis, orientation and number of ticks						
		var yAxis = d3.axisLeft()
							.scale(yScale)
							.ticks(9);

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

			   .on("mouseover", function(d) {

					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x"));
					var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")						
						.select("#Title")
						.text(d);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);

			   })
			   .on("mouseout", function() {
			   
					//Hide the tooltip
					d3.select("#tooltip").classed("hidden", true);
					
			   })
/*
			   .on("mouseout", function(d) {
				   d3.select(this)
				   		.transition()
				   		.duration(250)
						.attr("fill", "rgb(0, 0, " + (d * 10) + ")");
			   });*/		
		
		   	   


			  		
		// creates a svg element for the x axis	
		svg.append("g")
				.attr("class","axis")
				.attr("transform", "translate(0," + (svgHeight-padding) + ")")
				.call(xAxis);

		svg.append("g")
				.attr("class","axis")
				.attr("transform", "translate(" + padding +  ",0)")
				.call(yAxis);		


	}
})