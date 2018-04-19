//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

function drawIMDBScatterplot(){
	//values for svg element
	var svgWidth = 1200;  
	var svgHeight = 500;
	var padding = 50;	
	var h = 200;
	var width = 8; //used for the width of rect plot points
	var height = 8; //used for the height of rect plot points

	var margin = {top: 0, right: 40, bottom: 120, left: 100},
    mar_width = svgWidth - margin.left - margin.right,
    mar_height = svgHeight 


	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{	
			
			//create variables to scale the x and y dimensions
			var xScale = d3.scaleLog()
				.base(2)
				.domain([10000, d3.max(capitoldata, function(d) { return d["US_Gross"];})])
				.range([padding, svgWidth - padding]);  

			var	yScaleIMDB = d3.scaleLinear()
				.domain([0, d3.max(statsdata, function(d) { return d["IMDB_Rating"]; })])
				.range([svgHeight - padding, padding]);     //output range will have 50 pixels of space around the edges

					
			//Define the x axis, orientation and number of ticks					
			var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(20, "s");	
			
			//Define the y axis, orientation and number of ticks						
			var yAxis = d3.axisLeft()
				.scale(yScaleIMDB)
				.ticks(20);

			//create the svg element					
			var svg = d3.select("#area1")
				.append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight);

				//create a rect at each of the data points
				svg.selectAll("rect")
					.data(capitoldata)
					.enter()
					.append("rect")
					.attr("class", "square")
					.attr("x", function(d){
						return xScale(d["US_Gross"]);
					})
					.data(statsdata)
					.attr("y", function(d){
						return yScaleIMDB(d["IMDB_Rating"]);
					})
					
					.attr("width", width)
					.attr("height", height)

					.on("mouseover", function(d) {

						//Update the tooltip position and value
						d3.select("#tooltip")
							.select("#Title")
							.text(d["Title"]);

						d3.select("#tooltip")
							.select("#IMDB_R")
							.text(d["IMDB_Rating"]);

						d3.select("#tooltip")
							.select("#RT_R")
							.text(d["Rotten_Tomatoes_Rating"]);

						d3.select("#tooltip")
							.select("#Source")
							.text(d["Source"]);
				   
						//Show the tooltip
						d3.select("#tooltip").classed("hidden", false);

					})

	/*				.on("mouseout", function() {
					   
						//Hide the tooltip
						d3.select("#tooltip").classed("hidden", true);
						
				    })

					.on("mouseout", function(d) {
					    d3.select(this)
					   		.transition()
					   		.duration(250)
							.attr("fill", "rgb(0, 0, " + (d * 10) + ")");
					});	*/	
				  		
				// creates a svg element for the x axis	
				svg.append("g")
					.attr("class","axis")
					.attr("transform", "translate(0," + (svgHeight-padding) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class","axis")
					.attr("transform", "translate(" + padding +  ",0)")
					.call(yAxis);		

				//creates an x axis label
				svg.append("text")
					.attr("transform", "translate(" + (mar_width/2) + " ," +
														(mar_height + margin.top) + ")")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("US Gross Income in USD");

				 //creates a y axis label
				  svg.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0)
					.attr("x", 0 - (mar_height/2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("IMDB User Rating");

			}
		})
	})
}


function drawRTScatterplot(){
	//values for svg element
	var svgWidth = 1200;  
	var svgHeight = 500;
	var padding = 50;	
	var h = 200;
	var radius = 4; //used for the radius of circular plot points

	var margin = {top: 0, right: 40, bottom: 120, left: 100},
    mar_width = svgWidth - margin.left - margin.right,
    mar_height = svgHeight 


	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{	
			
			//create variables to scale the x and y dimensions
			var xScale = d3.scaleLog()
				.base(2)
				.domain([10000, d3.max(capitoldata, function(d) { return d["US_Gross"];})])
				.range([padding, svgWidth - padding]);  

			var	yScaleRT = d3.scaleLinear()
				.domain([0, d3.max(statsdata, function(d) { return d["Rotten_Tomatoes_Rating"]; })])
				.range([svgHeight - padding, padding]);     //output range will have 50 pixels of space around the edges

					
			//Define the x axis, orientation and number of ticks					
			var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(20, "s");	

			var yAxis = d3.axisLeft()
				.scale(yScaleRT)
				.ticks(10);

			//create the svg element					
			var svg = d3.select("#area1")
				.append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight);


				//create a circle at each of the data points
				svg.selectAll("circle")
					.data(capitoldata)
					.enter()
					.append("circle")
					.attr("cx", function(d){
						return xScale(d["US_Gross"]);
					})	
					.data(statsdata)
					.attr("cy", function(d){
						return yScaleRT(d["Rotten_Tomatoes_Rating"]);
					})
					.attr("r", radius)
								
					.on("mouseover", function(d) {
						//Update the tooltip position and value
						d3.select("#tooltip")
							.select("#Title")
							.text(d["Title"])
							.select("#IMDB_R")
							.text(d["IMDB_Rating"])
							.select("#RT_R")
							.text(d["Rotten_Tomatoes_Rating"])
							.select("#Source")
							.text(d["Source"])
							.data(capitoldata)
							.select("#US_Gross")
							.text(d["US_Gross"]);
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

				//creates an x axis label
				svg.append("text")
					.attr("transform", "translate(" + (mar_width/2) + " ," +
														(mar_height + margin.top) + ")")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("US Gross Income in USD");

				 //creates a y axis label
				  svg.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0)
					.attr("x", 0 - (mar_height/2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Rotten Tomatoes Critic Score");

			}
		})
	})
}