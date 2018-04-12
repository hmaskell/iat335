function drawBarChart(){

	var totalWidth = 1200;
	var totalHeight = 600;
				
	var margin = {top: 0, right: 0, bottom: 160, left: 60},
	    width = totalWidth - margin.left - margin.right,
	    height = totalHeight - margin.top - margin.bottom;
	    // width =+svg.attr("width") - margin.left - margin.right.
	    // width =+svg.attr("height") - margin.top - margin.bottom;

	var xScale = d3.scaleBand()
					.rangeRound([0,width])
					.padding(.6);

	var yScale = d3.scaleLinear()
					.rangeRound([height,0]);
				
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

				xScale.domain(statsdata.map(function(d){return d["Source"]}))
	 			yScale.domain([0, d3.max(d3.keys(combinedData), function(d) { return combinedData[d]["us_gross"]; })]);

	 			console.log( d3.keys(combinedData).map( key => combinedData[key]["us_gross"] ) )

				//Create bars
				svg2.selectAll(".bar")
				   .data(d3.keys(combinedData))
				   .enter()
				   .append("rect")
				   .attr("class", "bar")
				   .attr("x", function(d) {
				   		return xScale(d);
				   })
				   .attr("width", xScale.bandwidth())

				   .attr("y", function(d) {
				   		return yScale(combinedData[d]["us_gross"]);
				   })
				   .attr("height", function(d) {
				   		return height- yScale(combinedData[d]["us_gross"]);
				   });
								
				  //create labels
				  svg2.append("g")
				  	  .attr("transform", "translate(0,"+height+")")
				  	  .call(d3.axisBottom(xScale))
				  	  .selectAll("text")
				  	  .style("text-anchor", "end")
				  	  .attr("transform", "rotate(-45)");

				  svg2.append("g")
				      .call(d3.axisLeft(yScale).ticks(20, "s"));

				     //creates an x axis label
				  svg2.append("text")
					.attr("transform", "translate(" + (width/2) + " ," +
														(height + margin.top +130) + ")")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Original Source of Inspiration");
				

				     //creates a y axis label
				  svg2.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0 - margin.left)
					.attr("x", 0 - (height/2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Average US Gross Income in USD");
		}
	})
	})
}
