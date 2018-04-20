//REFERENCE USED: Interactive Design and Visualizations by Scott Murray
function combineData(){
	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{	
			var tooltipData = {};
				statsdata.forEach( function(movie){
					var title = movie["Title"];
					var IMDB = movie["IMDB_Rating"];
					var RT = movie["Rotten_Tomatoes_Rating"];
					var source = movie["Source"];
					tooltipData[title]= {
						title: title,
						IMDB: IMDB,
						RT: RT,
						source: source
					}
				});

				capitoldata.forEach( function(element){
					d3.keys(tooltipData).forEach( function(movie){
						if (movie == element["Title"]){
							var us_gross = element["US_Gross"];
							tooltipData[movie]["us_gross"] = us_gross;
						}
					})
				});
				drawIMDBScatterplot(tooltipData);
				drawRTScatterplot(tooltipData);
			}
		})
	})
}

function drawIMDBScatterplot(tooltipData){
	//values for svg element
	var svgWidth = 1200;  
	var svgHeight = 500;
	var padding = 50;	
	var h = 200;
	var width = 8; //used for the width of rect plot points
	var height = 8; //used for the height of rect plot points

	var sources = {
		"Original Screenplay": "screenplay",
		"Based on Book/Short Story": "book",
		"Based on Play": "play",
		"Based on Real Life Events": "life",
		"Based on Short Film": "short",
		"Based on Comic/Graphic Novel": "comic",
		"Remake": "remake",
		"Traditional/Legend/Fairytale": 'traditional',
		"Based on TV": "tv",
		"Compilation": "compilation",
		"Based on Musical/Opera": "musical",
		"Based on Game": "game",
		"Spin-Off": "spin-off",
		"Based on Factual Book/Article": "fact-book",
		"Based on Magazine Article": "magazine",
		"Disney Ride": "ride"
	};

	var margin = {top: 0, right: 40, bottom: 120, left: 100},
    mar_width = svgWidth - margin.left - margin.right,
    mar_height = svgHeight;

	console.log(tooltipData);

			var xDomainLow = 10000;
			var xDomainHigh = d3.max(d3.keys(tooltipData), function(d) { return tooltipData[d]["us_gross"];});
			
			//create variables to scale the x and y dimensions
			var xScale = d3.scaleLog()
				.base(2)
				.domain([xDomainLow, xDomainHigh])
				.range([padding, svgWidth - padding]);  

			var	yScaleIMDB = d3.scaleLinear()
				.domain([0, 10])
				.range([svgHeight - padding, padding]);     //output range will have 50 pixels of space around the edges

					
			//Define the x axis, orientation and number of ticks					
			var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(20, ".2s");	
			
			//Define the y axis, orientation and number of ticks						
			var yAxis = d3.axisLeft()
				.scale(yScaleIMDB)
				.ticks(20);

			d3.keys(tooltipData).forEach( function(d){
				if (tooltipData[d]["us_gross"] == undefined){
					console.log(tooltipData[d]);
				}

			})

			//create the svg element					
			var svg = d3.select("#areaA")
				.append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight);

				//create a rect at each of the data points
				svg.selectAll("rect")
					.data(d3.keys(tooltipData))
					.enter()
					.append("rect")
					.attr("class", "square")
					.attr("x", function(d){
						//console.log(xScale(tooltipData[d]["us_gross"])-width/2);
						return xScale(tooltipData[d]["us_gross"])-width/2;
					})
					.attr("class", function(d){
						return "square "+sources[tooltipData[d]["source"]];
					})
					.attr("y", function(d){
						return yScaleIMDB(tooltipData[d]["IMDB"])-height/2;
					})
					
					.attr("width", width)
					.attr("height", height)

					.on("mouseover", function(d) {

						//Update the tooltip position and value
						d3.select("#tooltip")
							.select("#Title")
							.text(tooltipData[d]["title"]);

						d3.select("#tooltip")
							.select("#IMDB_R")
							.text(tooltipData[d]["IMDB"]);

						d3.select("#tooltip")
							.select("#RT_R")
							.text(tooltipData[d]["RT"]);

						d3.select("#tooltip")
							.select("#Source")
							.text(tooltipData[d]["source"]);

						d3.select("#tooltip")
							.select("#US_Gross")
							.text("$"+tooltipData[d]["us_gross"]);
				   
						//Show the tooltip
						d3.select("#tooltip").classed("hidden", false);
						d3.select("#tooltip2").classed("hidden", true);

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



function drawRTScatterplot(tooltipData){
	//values for svg element
	var svgWidth = 1200;  
	var svgHeight = 500;
	var padding = 50;	
	var h = 200;
	var radius = 4; //used for the radius of circular plot points

	var sources = {
		"Original Screenplay": "screenplay",
		"Based on Book/Short Story": "book",
		"Based on Play": "play",
		"Based on Real Life Events": "life",
		"Based on Short Film": "short",
		"Based on Comic/Graphic Novel": "comic",
		"Remake": "remake",
		"Traditional/Legend/Fairytale": 'traditional',
		"Based on TV": "tv",
		"Compilation": "compilation",
		"Based on Musical/Opera": "musical",
		"Based on Game": "game",
		"Spin-Off": "spin-off",
		"Based on Factual Book/Article": "fact-book",
		"Based on Magazine Article": "magazine",
		"Disney Ride": "ride"
	};

	var margin = {top: 0, right: 40, bottom: 120, left: 100},
    mar_width = svgWidth - margin.left - margin.right,
    mar_height = svgHeight 
			
			//create variables to scale the x and y dimensions
			var xScale = d3.scaleLog()
				.base(2)
				.domain([10000, d3.max(d3.keys(tooltipData), function(d) { return tooltipData[d]["us_gross"];})])
				.range([padding, svgWidth - padding]);  

			var	yScaleRT = d3.scaleLinear()
				.domain([0, d3.max(d3.keys(tooltipData), function(d) { return tooltipData[d]["RT"]; })])
				.range([svgHeight - padding, padding]);     //output range will have 50 pixels of space around the edges

					
			//Define the x axis, orientation and number of ticks					
			var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(20, ".2s");	

			var yAxis = d3.axisLeft()
				.scale(yScaleRT)
				.ticks(10);

			//create the svg element					
			var svg = d3.select("#areaB")
				.append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight);


				//create a circle at each of the data points
				svg.selectAll("circle")
					.data(d3.keys(tooltipData))
					.enter()
					.append("circle")
					.attr("cx", function(d){
						return xScale(tooltipData[d]["us_gross"]);
					})	
					.attr("class", function(d){
						return "circle "+sources[tooltipData[d]["source"]];
					})
					.attr("cy", function(d){
						return yScaleRT(tooltipData[d]["RT"]);
					})
					.attr("r", radius)
								
					.on("mouseover", function(d) {
						//Update the tooltip position and value
						d3.select("#tooltip")
							.select("#Title")
							.text(tooltipData[d]["title"])
						d3.select("#tooltip")
							.select("#IMDB_R")
							.text(tooltipData[d]["IMDB"])
						d3.select("#tooltip")
							.select("#RT_R")
							.text(tooltipData[d]["RT"])
						d3.select("#tooltip")
							.select("#Source")
							.text(tooltipData[d]["source"])
						d3.select("#tooltip")
							.select("#US_Gross")
							.text(tooltipData[d]["us_gross"]);

						//Show the tooltip
						d3.select("#tooltip").classed("hidden", false);
						d3.select("#tooltip2").classed("hidden", true);

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
