//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

//values for svg element
var svgWidth = 1700;               //determines width size of new svg
var svgHeight = 1500;
var padding = 50;	


d3.json("http://www.sfu.ca/~hmaskell/iat335/stats-movies-clean",function(error,statsdata){
	if(error){
		console.log("There was an error")
	} else{	
		
		//create variables to scale the x and y dimensions
		var xScale = d3.scaleLinear()
							.domain([0, d3.max(statsdata, function(d) { return d["IMDB_Votes"];})])
							.range([padding, svgWidth - padding]);  

		//scales the radius of each circle					
		var rScale = d3.scaleLinear()
							.domain([0, d3.max(statsdata, function(d){ return d["IMDB_Rating"];})])	
							.range ([1,5]);	   

		var	yScaleIMDB = d3.scaleLinear()
							.domain([0, d3.max(statsdata, function(d) { return d["IMDB_Rating"]; })])
							.range([svgHeight - padding, padding]);                                 //output range will have 50 pixels of space around the edges

		var	yScaleRT = d3.scaleLinear()
							.domain([0, d3.max(statsdata, function(d) { return d["Rotten_Tomatoes_Rating"]; })])
							.range([svgHeight - padding, padding]);                                 //output range will have 50 pixels of space around the edges

				
		//Define the x axis, orientation and number of ticks					
		var xAxis = d3.axisBottom()
							.scale(xScale)
							.ticks(10);	
		
		//Define the y axis, orientation and number of ticks						
		var yAxis = d3.axisLeft()
							.scale(yScaleIMDB)
							.ticks(9);

		//create the svg element					
		var svg = d3.select("#area1")
					.append("svg")
					.attr("width", svgWidth)
					.attr("height", svgHeight);

		//create a circle at each of the IMDB data points
		svg.selectAll("circle")
			.data(statsdata)
			.enter()
			.append("circle")
			.attr("cx", function(d){
				return xScale(d["IMDB_Votes"]);
			})
			.attr("cy", function(d){
				return yScaleIMDB(d["IMDB_Rating"]);
			})
			.attr("r", function(d){
				return rScale(d["IMDB_Rating"]);
			})	

		//create a circle at each of the RT data points
		svg.selectAll("circle")
			.data(statsdata)
			.enter()
			.append("circle")
			.attr("cx", function(d){
				return xScale(d["IMDB_Votes"]);
			})
			.attr("cy", function(d){
				return yScaleRT(d["Rotten_Tomatoes_Rating"]);
			})		
			.attr("r", function(d){
				return rScale(d["IMDB_Rating"]);
			})	
		
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