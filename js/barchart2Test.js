function drawBarChart(){

	var totalHeight = 800;
	var totalWidth = 1200;
				
	var margin = {top: 0, right: 0, bottom: 120, left: 160},
	    width = totalWidth - margin.left - margin.right,
	    height = totalHeight - margin.top - margin.bottom;
	    // width =+svg.attr("width") - margin.left - margin.right.
	    // width =+svg.attr("height") - margin.top - margin.bottom;

	var yScale = d3.scaleBand()
					.rangeRound([0,height])
					.padding(.6);

	var xScale = d3.scaleLinear()
					.rangeRound([0,width]);
				
	//Create SVG element
	var svg2 = d3.select("#area2")
				.append("svg")
				.attr("width", totalWidth)
				.attr("height", totalHeight)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top +")");

	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{	

				capitoldata.forEach(function(d){
					d["US_Gross"] = +d["US_Gross"];
				});

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

				var combinedData = {};
					statsdata.forEach( function(element){
						var source = element.Source;
						if (!(source in combinedData)){
							var title_array = [];
							statsdata.forEach( function(source_element){
								if (source == source_element.Source){
									var title = source_element.Title;
									title_array.push(title);
								}
							});						

							var us_gross_avg;
							var us_gross_array = [];
							capitoldata.forEach(function(gross_element){
								if (title_array.includes(gross_element.Title)){
									us_gross_array.push(gross_element.US_Gross);
								}
							});
							us_gross_avg = d3.mean(us_gross_array);
							combinedData[source] = {
								title : title_array,
								us_gross : us_gross_avg
							}
						}
					})
					console.log(combinedData);	

				yScale.domain(statsdata.map(function(d){return d["Source"]}))
	 			xScale.domain([0, d3.max(d3.keys(combinedData), function(d) { return combinedData[d]["us_gross"]; })]);

	 			console.log( d3.keys(combinedData).map( key => combinedData[key]["us_gross"] ) )

				//Create bars
				svg2.selectAll(".bar")
				   .data(d3.keys(combinedData))
				   .enter()
				   .append("rect")
				   .attr("class", function(d){
				   	return "bar "+sources[d];
				   })
				   .attr("x", function(d) {
				   		return 0;
				   })
				   .attr("width", function(d){
					   	return xScale(combinedData[d]["us_gross"])
				   })

				   .attr("y", function(d) {
				   		return yScale(d);
				   })
				   .attr("height", function(d) {
				   		return yScale.bandwidth();
				   });
								
				  //create labels
				  svg2.append("g")
				  	  .attr("transform", "translate(0,"+height+")")
				  	  .call(d3.axisBottom(xScale).ticks(20, "s"));


				  svg2.append("g")
				      .call(d3.axisLeft(yScale))
				  	  .selectAll("text")
				  	  .style("text-anchor", "end")
				  	  .attr("transform", "translate(-10,-8) rotate(-45)");

				     //creates an x axis label
				  svg2.append("text")
					.attr("transform", "translate(" + (width/2) + " ," +
														(height + margin.top+60) + ")")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Average US Gross Income in USD");
				

				     //creates a y axis label
				  svg2.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0 - margin.left)
					.attr("x", 0 - (height/2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Original Source of Inspiration");
		}
	})
	})
}
